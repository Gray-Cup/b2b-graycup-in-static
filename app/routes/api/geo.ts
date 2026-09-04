import type { LoaderFunctionArgs } from "react-router";
import { NextResponse } from "@/lib/next-server-compat";

export function loader({ request }: LoaderFunctionArgs) {
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    "IN";
  return NextResponse.json({ country });
}
