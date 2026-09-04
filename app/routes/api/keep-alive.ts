import { NextResponse } from "@/lib/next-server-compat";

// Pinged by an uptime monitor / cron to keep the Worker + D1 warm.
export function loader() {
  return NextResponse.json({ ok: true, ts: Date.now() });
}
