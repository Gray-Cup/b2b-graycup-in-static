import type { ActionFunctionArgs } from "react-router";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { db } from "@/db";
import { b2b_graycup_in_orders } from "@/db/schema";
import { CASHFREE_BASE_URL, CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET, cashfreeHeaders } from "@/lib/cashfree";
import { shopProducts } from "@/data/shop-products";

interface CheckoutItem {
  productId: string;
  quantity?: number;
}

interface CheckoutRequest {
  // Single-item (current form) or multi-item cart.
  productId?: string;
  items?: CheckoutItem[];
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  // Optional — sent once the shop checkout form is ported to collect them.
  address?: string;
  pincode?: string;
  state?: string;
  country?: string;
  gstOrTaxId?: string;
  businessType?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const body = (await request.json()) as CheckoutRequest;
    const { customerName, customerPhone, customerEmail } = body;

    const items: CheckoutItem[] = body.items?.length
      ? body.items
      : body.productId
        ? [{ productId: body.productId, quantity: 1 }]
        : [];

    if (!customerName || !customerPhone || items.length === 0) {
      return NextResponse.json({ error: "Product, name and phone are required" }, { status: 400 });
    }

    const phone10 = customerPhone.replace(/\D/g, "").slice(-10);
    if (phone10.length !== 10) {
      return NextResponse.json({ error: "Enter a valid 10-digit phone number" }, { status: 400 });
    }

    // Amount is ALWAYS computed here from our own catalogue — never trust a
    // client-sent price.
    const resolved = items.map((it) => {
      const product = shopProducts.find((p) => p.id === it.productId);
      if (!product) throw new Error(`Unknown product: ${it.productId}`);
      const quantity = Math.max(1, Math.floor(Number(it.quantity) || 1));
      return { product, quantity, lineTotal: product.price * quantity };
    });
    const totalAmount = resolved.reduce((s, r) => s + r.lineTotal, 0);

    const linkId = `gcin_shop_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    const origin = request.headers.get("origin") || "https://b2b.graycup.in";

    const itemsDetail = resolved.map((r) => ({
      slug: r.product.id,
      name: r.product.name,
      image: `${origin}${r.product.image}`,
      tier: r.product.weight,
      grams: 0,
      price: r.lineTotal,
      quantity: r.quantity,
    }));
    const purpose = resolved.map((r) => `${r.product.name} (${r.product.weight})${r.quantity > 1 ? ` x${r.quantity}` : ""}`).join(", ");

    await db.insert(b2b_graycup_in_orders).values({
      name: customerName.trim(),
      phone: phone10,
      email: customerEmail?.trim() || null,
      country: body.country?.trim() || "IN",
      pincode: body.pincode?.trim() || "",
      address: body.address?.trim() || "",
      state: body.state?.trim() || null,
      gst_or_tax_id: body.gstOrTaxId?.trim() || null,
      business_type: body.businessType?.trim() || null,
      order_kind: "shop",
      products: JSON.stringify(resolved.map((r) => r.product.id)),
      quantity_tier: "mixed",
      items_detail: JSON.stringify(itemsDetail),
      total_amount: totalAmount,
      link_id: linkId,
      payment_status: "pending",
    });

    const payload = {
      link_id: linkId,
      link_amount: totalAmount,
      link_currency: "INR",
      link_purpose: `${purpose} — GrayCup`.slice(0, 100),
      customer_details: {
        customer_name: customerName,
        customer_phone: phone10,
        ...(customerEmail && { customer_email: customerEmail }),
      },
      link_meta: {
        return_url: `${origin}/shop/success?link_id=${linkId}&amount=${totalAmount}`,
      },
      link_notify: { send_sms: true, send_email: !!customerEmail },
      link_expiry_time: expiryTime.toISOString(),
    };

    const response = await fetch(`${CASHFREE_BASE_URL}/links`, {
      method: "POST",
      headers: cashfreeHeaders(),
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as any;

    if (!response.ok) {
      console.error("Cashfree link error:", data);
      return NextResponse.json({ error: data.message || "Failed to create payment link" }, { status: response.status });
    }

    if (data.cf_link_id) {
      await db.update(b2b_graycup_in_orders).set({ cf_link_id: String(data.cf_link_id) }).where(eq(b2b_graycup_in_orders.link_id, linkId));
    }

    return NextResponse.json({ success: true, paymentLink: data.link_url, linkId });
  } catch (error) {
    console.error("checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
