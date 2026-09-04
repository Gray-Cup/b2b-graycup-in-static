import type { ActionFunctionArgs } from "react-router";
import { NextRequest, NextResponse } from "@/lib/next-server-compat";
import { getClientIP, verifyTurnstile } from "@/lib/turnstile";
import { insertLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { company, name, email, feedbackType, rating, feedback, turnstileToken } = body;

    if (!email || !feedback) {
      return NextResponse.json({ error: "Email and feedback are required" }, { status: 400 });
    }

    if (turnstileToken && !(await verifyTurnstile(turnstileToken, getClientIP(request)))) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 });
    }

    await insertLead({
      kind: "feedback",
      name,
      email,
      company,
      message: `[${feedbackType || "General"}${rating ? `, ${rating}` : ""}] ${feedback}`,
      payload: body,
      request,
    });

    const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "💬 New Feedback",
              color: 10181046,
              fields: [
                { name: "Company", value: company || "Not provided", inline: true },
                { name: "Contact", value: `${name || "Anonymous"} (${email})`, inline: true },
                { name: "Type", value: feedbackType || "General", inline: true },
                { name: "Rating", value: rating || "Not rated", inline: true },
                { name: "Feedback", value: String(feedback).slice(0, 1000) },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).catch((err) => console.error("Discord webhook error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("webhooks/feedback error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return POST(new NextRequest(request));
}
