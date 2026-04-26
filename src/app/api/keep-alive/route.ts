import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SECRET = process.env.KEEP_ALIVE_SECRET;

export async function GET(request: NextRequest) {
  if (SECRET) {
    const token = request.headers.get("x-keep-alive-secret");
    if (token !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const { error } = await supabase
    .from("contact_submissions")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Keep-alive ping failed:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
