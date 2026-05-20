import { NextRequest, NextResponse } from "next/server";
import { shopProducts } from "@/data/shop-products";

const CASHFREE_API_URL = "https://api.cashfree.com/pg/links";
const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

interface CheckoutRequest {
  productId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 },
      );
    }

    const body: CheckoutRequest = await request.json();
    const { productId, customerName, customerPhone, customerEmail } = body;

    if (!productId || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Product ID, name, and phone are required" },
        { status: 400 },
      );
    }

    const product = shopProducts.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const phone = customerPhone.replace(/\D/g, "").slice(-10);
    if (phone.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number" },
        { status: 400 },
      );
    }

    const linkId = `gc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    const origin = request.headers.get("origin") || "https://b2b.graycup.in";

    const payload = {
      link_id: linkId,
      order_id: orderId,
      link_amount: product.price,
      link_currency: "INR",
      link_purpose: `${product.name} (${product.weight}) — GrayCup`,
      customer_details: {
        customer_name: customerName,
        customer_phone: phone,
        ...(customerEmail && { customer_email: customerEmail }),
      },
      link_meta: {
        return_url: `${origin}/shop/success?link_id=${linkId}&product=${encodeURIComponent(product.name)}&amount=${product.price}`,
      },
      link_notify: {
        send_sms: true,
        send_email: !!customerEmail,
      },
      link_expiry_time: expiryTime.toISOString(),
    };

    const response = await fetch(CASHFREE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "x-api-version": "2025-01-01",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create payment link" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      paymentLink: data.link_url,
      linkId: data.link_id,
      orderId,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
