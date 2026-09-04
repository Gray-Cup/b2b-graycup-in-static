import type { ActionFunctionArgs } from "react-router";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { getClientIP, verifyTurnstile } from "@/lib/turnstile";
import { insertLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { name, phone, companyName, agenda, turnstileToken } = body;

    if (!name || !phone || !companyName || !agenda) {
      return NextResponse.json(
        { error: "Name, phone, company name, and agenda are required" },
        { status: 400 },
      );
    }

    if (turnstileToken && !(await verifyTurnstile(turnstileToken, getClientIP(request)))) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 });
    }

    await insertLead({
      kind: "call-request",
      name,
      phone,
      company: companyName,
      message: agenda,
      payload: body,
      request,
    });

    return NextResponse.json({ success: true, message: "Call request submitted successfully" });
  } catch (error) {
    console.error("call-request API error:", error);
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
