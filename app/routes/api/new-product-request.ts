import type { ActionFunctionArgs } from "react-router";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { getClientIP, verifyTurnstile } from "@/lib/turnstile";
import { insertLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { company, email, name, phone, category, productName, quantity, details, turnstileToken } = body;

    const errors: string[] = [];
    if (!name?.trim()) errors.push("Contact name is required");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required");
    if (!company?.trim()) errors.push("Company name is required");
    if (!phone?.trim()) errors.push("Phone number is required");
    if (!productName?.trim()) errors.push("Product name is required");
    if (errors.length) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    if (!(await verifyTurnstile(turnstileToken, getClientIP(request)))) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 });
    }

    const summary = [
      `Product: ${productName}`,
      category ? `Category: ${category}` : null,
      quantity ? `Quantity: ${quantity}` : null,
      details ? `\n${details}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    await insertLead({
      kind: "new-product-request",
      name,
      email,
      phone,
      company,
      message: summary,
      payload: body,
      request,
    });

    return NextResponse.json({ success: true, message: "Product request submitted successfully" });
  } catch (error) {
    console.error("new-product-request API error:", error);
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
