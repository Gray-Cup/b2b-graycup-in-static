import type { ActionFunctionArgs } from "react-router";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { getClientIP, verifyTurnstile } from "@/lib/turnstile";
import { insertLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { companyName, contactName, email, phone, quantity, grade, message, productName, turnstileToken } = body;

    if (!companyName || !contactName || !email || !quantity) {
      return NextResponse.json(
        { error: "Company name, contact name, email, and quantity are required" },
        { status: 400 },
      );
    }

    if (turnstileToken && !(await verifyTurnstile(turnstileToken, getClientIP(request)))) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 });
    }

    const summary = [
      productName ? `Product: ${productName}` : null,
      `Quantity: ${quantity}`,
      grade ? `Grade: ${grade}` : null,
      message ? `\n${message}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    await insertLead({
      kind: "quote-request",
      name: contactName,
      email,
      phone,
      company: companyName,
      message: summary,
      payload: body,
      request,
    });

    return NextResponse.json({ success: true, message: "Quote request submitted successfully" });
  } catch (error) {
    console.error("quote-request API error:", error);
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
