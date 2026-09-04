import type { LoaderFunctionArgs } from "react-router";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { db } from "@/db";
import { b2b_graycup_in_orders } from "@/db/schema";
import { CASHFREE_BASE_URL, cashfreeHeaders } from "@/lib/cashfree";

// Fallback for a delayed/missed webhook: the return page calls this with the
// link_id from the return_url to actively reconcile against Cashfree.
export async function GET(request: NextRequest) {
  const linkId = request.nextUrl.searchParams.get("link_id");
  if (!linkId) {
    return NextResponse.json({ error: "link_id is required" }, { status: 400 });
  }

  const [order] = await db
    .select()
    .from(b2b_graycup_in_orders)
    .where(eq(b2b_graycup_in_orders.link_id, linkId))
    .limit(1);

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.payment_status === "paid" || order.payment_status === "failed") {
    return NextResponse.json({ status: order.payment_status });
  }

  try {
    const response = await fetch(`${CASHFREE_BASE_URL}/links/${linkId}`, { headers: cashfreeHeaders() });
    const data = (await response.json()) as any;
    if (!response.ok) {
      console.error("Cashfree link status error:", data);
      return NextResponse.json({ status: order.payment_status });
    }

    let newStatus: "paid" | "failed" | null = null;
    if (data.link_status === "PAID") newStatus = "paid";
    else if (data.link_status === "EXPIRED" || data.link_status === "CANCELLED") newStatus = "failed";

    if (newStatus && newStatus !== order.payment_status) {
      await db
        .update(b2b_graycup_in_orders)
        .set({ payment_status: newStatus, status_updated_at: new Date().toISOString() })
        .where(eq(b2b_graycup_in_orders.link_id, linkId));
    }
    return NextResponse.json({ status: newStatus || order.payment_status });
  } catch (error) {
    console.error("verify-payment error:", error);
    return NextResponse.json({ status: order.payment_status });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return GET(new NextRequest(request));
}
