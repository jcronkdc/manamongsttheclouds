import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import crypto from "crypto";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

function generateDownloadToken(sessionId: string): string {
  const secret = process.env.DOWNLOAD_SECRET!;
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = `${sessionId}:${expiry}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const resend = getResend();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://manamongsttheclouds.com";

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error("No customer email found in session:", session.id);
      return NextResponse.json({ received: true });
    }

    const token = generateDownloadToken(session.id);
    const downloadUrl = `${siteUrl}/api/download/${token}`;

    try {
      await resend.emails.send({
        from: "Stillfire Press <books@stillfirepress.com>",
        to: customerEmail,
        subject: "Your copy of Man Amongst the Clouds — Part I",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;color:#ededed;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <p style="color:#c9a84c;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;text-align:center;margin-bottom:32px;">
      Stillfire Press
    </p>

    <h1 style="font-size:28px;font-weight:300;text-align:center;letter-spacing:0.05em;line-height:1.3;margin-bottom:8px;">
      Thank you for your purchase.
    </h1>

    <p style="text-align:center;color:#8a8a8a;font-style:italic;font-size:16px;margin-bottom:40px;">
      The Song begins.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.2);padding:32px;text-align:center;margin-bottom:32px;">
      <p style="font-size:14px;color:#b0a89e;margin-bottom:4px;">
        Man Amongst the Clouds
      </p>
      <p style="font-size:12px;color:#666;margin-bottom:24px;">
        Part I: The Still Water — Prologue + Chapters 1–10
      </p>
      <a href="${downloadUrl}" style="display:inline-block;padding:14px 32px;background-color:#c9a84c;color:#0a0a0a;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;font-family:sans-serif;">
        Download Your Book (EPUB)
      </a>
      <p style="font-size:11px;color:#555;margin-top:16px;">
        This link expires in 7 days. Save your file after downloading.
      </p>
    </div>

    <p style="font-size:14px;color:#999;line-height:1.7;margin-bottom:24px;">
      The full novel — all five parts, 48 chapters, 153,000 words — is coming Fall 2026.
      Visit <a href="${siteUrl}" style="color:#c9a84c;text-decoration:none;">manamongsttheclouds.com</a> to stay updated.
    </p>

    <div style="border-top:1px solid #222;padding-top:24px;margin-top:32px;">
      <p style="font-size:12px;color:#444;text-align:center;font-style:italic;">
        &ldquo;The world sang to itself. And in the space between the notes, where silence lived, a man breathed — and the air remembered.&rdquo;
      </p>
      <p style="font-size:11px;color:#333;text-align:center;margin-top:16px;">
        Stillfire Press · A Cronk Companies, LLC Project
      </p>
    </div>

  </div>
</body>
</html>
        `.trim(),
      });

      console.log(
        `Book delivery email sent to ${customerEmail} for session ${session.id}`,
      );
    } catch (emailError) {
      console.error("Failed to send delivery email:", emailError);
    }
  }

  return NextResponse.json({ received: true });
}
