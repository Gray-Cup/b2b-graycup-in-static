import type { ActionFunctionArgs } from "react-router";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { getClientIP } from "@/lib/turnstile";
import { insertLead } from "@/lib/leads";

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_PER_WINDOW = 5;
const HITS = new Map<string, { count: number; resetTime: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cur = HITS.get(ip);
  if (!cur || now > cur.resetTime) {
    HITS.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (cur.count >= MAX_PER_WINDOW) return true;
  cur.count++;
  return false;
}

function validate(d: any): string[] {
  const e: string[] = [];
  if (!d?.name?.trim()) e.push("Name is required");
  if (!d?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.push("Valid email is required");
  if (!d?.company?.trim()) e.push("Company name is required");
  if (!d?.message?.trim() || d.message.trim().length < 10) e.push("Message must be at least 10 characters");
  return e;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    const errors = validate(body);
    if (errors.length) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    await insertLead({
      kind: "contact",
      name: body.name,
      email: body.email,
      company: body.company,
      companySize: body.companySize,
      message: body.message,
      payload: body,
      request,
    });

    return NextResponse.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("contact API error:", error);
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
