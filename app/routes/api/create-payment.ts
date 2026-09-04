import type { ActionFunctionArgs } from "react-router";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { db } from "@/db";
import { b2b_graycup_in_orders } from "@/db/schema";
import { CASHFREE_BASE_URL, CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET, cashfreeHeaders } from "@/lib/cashfree";

const SAMPLE_FEE_INR = 299;

interface SampleRequest {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  // Optional — sent once the sample-request form is ported to collect them.
  address?: string;
  pincode?: string;
  state?: string;
  country?: string;
  gstOrTaxId?: string;
  businessType?: string;
  products?: string[]; // selected sample product ids
}

export async function POST(request: NextRequest) {
  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const body = (await request.json()) as SampleRequest;
    const { customerName, customerPhone, customerEmail } = body;

    if (!customerName || !customerPhone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const phone10 = customerPhone.replace(/\D/g, "").slice(-10);
    if (phone10.length !== 10) {
      return NextResponse.json({ error: "Enter a valid 10-digit phone number" }, { status: 400 });
    }

    const products = Array.isArray(body.products) ? body.products : [];
    const linkId = `gcin_sample_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    const origin = request.headers.get("origin") || "https://b2b.graycup.in";

    // Save the order first so a paid webhook always has a row to reconcile.
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
      order_kind: "sample",
      products: JSON.stringify(products),
      quantity_tier: "sample",
      items_detail: JSON.stringify(
        products.map((slug) => ({ slug, name: slug, price: 0, quantity: 1 })),
      ),
      total_amount: SAMPLE_FEE_INR,
      link_id: linkId,
      payment_status: "pending",
    });

    const payload = {
      link_id: linkId,
      link_amount: SAMPLE_FEE_INR,
      link_currency: "INR",
      link_purpose: "Sample Request — GrayCup B2B",
      customer_details: {
        customer_name: customerName,
        customer_phone: phone10,
        ...(customerEmail && { customer_email: customerEmail }),
      },
      link_meta: { return_url: `${origin}/sample-request?link_id=${linkId}` },
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
    console.error("create-payment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
