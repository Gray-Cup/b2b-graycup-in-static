import type { ActionFunctionArgs } from "react-router";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { db } from "@/db";
import { b2b_graycup_in_orders } from "@/db/schema";
import { verifyCashfreeWebhookSignature, fetchCfPaymentId } from "@/lib/cashfree";

// Cashfree fires these for both Payment Links and the Order underneath.
// Register https://b2b.graycup.in/api/webhooks/cashfree in the Cashfree
// dashboard (Developers -> Webhooks) for the "Payment link" + "Payment"
// event groups. Signature is verified with CASHFREE_CLIENT_SECRET.
type CashfreeWebhookPayload = {
  type?: string;
  data?: {
    order?: { order_id?: string };
    payment?: { payment_status?: string; cf_payment_id?: string | number };
    link_id?: string;
    link_status?: string;
  };
};

function statusFromPayload(p: CashfreeWebhookPayload): "paid" | "failed" | null {
  const ps = p.data?.payment?.payment_status;
  if (ps === "SUCCESS") return "paid";
  if (ps === "FAILED" || ps === "CANCELLED" || ps === "VOID") return "failed";

  if (p.type === "PAYMENT_SUCCESS_WEBHOOK") return "paid";
  if (p.type === "PAYMENT_FAILED_WEBHOOK" || p.type === "PAYMENT_USER_DROPPED_WEBHOOK") return "failed";

  const ls = p.data?.link_status;
  if (ls === "PAID") return "paid";
  if (ls === "EXPIRED" || ls === "CANCELLED") return "failed";
  return null;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const timestamp = request.headers.get("x-webhook-timestamp");
  const signature = request.headers.get("x-webhook-signature");

  if (!verifyCashfreeWebhookSignature(rawBody, timestamp, signature)) {
    console.error("Cashfree webhook: signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: CashfreeWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const linkId = payload.data?.link_id || payload.data?.order?.order_id;
  const newStatus = statusFromPayload(payload);
  if (!linkId || !newStatus) {
    // Not an event we act on — ack so Cashfree stops retrying.
    return NextResponse.json({ received: true });
  }

  let cfPaymentId = payload.data?.payment?.cf_payment_id ? String(payload.data.payment.cf_payment_id) : null;
  const cfOrderId = payload.data?.order?.order_id ?? null;
  if (!cfPaymentId && newStatus === "paid" && cfOrderId) {
    cfPaymentId = await fetchCfPaymentId(cfOrderId);
  }

  const patch: Record<string, unknown> = {
    payment_status: newStatus,
    status_updated_at: new Date().toISOString(),
  };
  if (cfPaymentId) patch.cf_payment_id = cfPaymentId;

  // link_id == our own generated id (also passed as the Cashfree order_id).
  await db.update(b2b_graycup_in_orders).set(patch).where(eq(b2b_graycup_in_orders.link_id, linkId));

  return NextResponse.json({ received: true });
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
