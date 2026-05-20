import { NextRequest, NextResponse } from "next/server";

const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const linkId = searchParams.get("link_id");

  if (!linkId) {
    return NextResponse.json({ error: "link_id is required" }, { status: 400 });
  }

  if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Payment gateway not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://api.cashfree.com/pg/links/${linkId}`,
      {
        headers: {
          "x-client-id": CASHFREE_CLIENT_ID,
          "x-client-secret": CASHFREE_CLIENT_SECRET,
          "x-api-version": "2025-01-01",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch payment status" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      status: data.link_status,
      amount: data.link_amount,
      currency: data.link_currency,
      purpose: data.link_purpose,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
