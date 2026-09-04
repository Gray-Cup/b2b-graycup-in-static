import type { ActionFunctionArgs } from "react-router";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { insertLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { message, email, twitter } = body;

    if (!message || !email) {
      return NextResponse.json({ error: "Message and email are required" }, { status: 400 });
    }

    await insertLead({
      kind: "new-product-request",
      email,
      message: `[Feature request] ${message}${twitter ? ` (twitter: ${twitter})` : ""}`,
      payload: body,
      request,
    });

    const webhookUrl = process.env.DISCORD_FEATURE_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🚀 New Feature Request",
              color: 3447003,
              fields: [
                { name: "Feature Request", value: String(message).slice(0, 1000) },
                { name: "Contact", value: `Email: ${email}\nTwitter: ${twitter || "Not provided"}` },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).catch((err) => console.error("Discord webhook error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("webhooks/feature error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
