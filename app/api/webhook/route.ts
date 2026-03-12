import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { supabaseServer } from "@/app/lib/supabase-server";
import { getStripe } from "@/app/lib/stripe";
import crypto from "crypto";

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
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.manamongsttheclouds.com";

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

    const productType = session.metadata?.product_type;

    if (productType === "founders-edition") {
      // --- Founder's Edition: store in Supabase + send confirmation email ---
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const shipping = (session as any).shipping_details;
      const shippingAddress = shipping?.address
        ? {
            name: shipping.name,
            line1: shipping.address.line1,
            line2: shipping.address.line2,
            city: shipping.address.city,
            state: shipping.address.state,
            postal_code: shipping.address.postal_code,
            country: shipping.address.country,
          }
        : null;

      try {
        // Idempotency check: skip if this session was already processed
        const { data: existing } = await supabaseServer
          .from("founders_orders")
          .select("id")
          .eq("stripe_session_id", session.id)
          .maybeSingle();

        if (existing) {
          console.log(
            `Founder's Edition order already exists for session ${session.id}, skipping`,
          );
          return NextResponse.json({ received: true });
        }

        await supabaseServer.from("founders_orders").insert({
          email: customerEmail.toLowerCase().trim(),
          name: session.customer_details?.name || null,
          stripe_session_id: session.id,
          stripe_payment_intent:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
          amount_cents: session.amount_total || 3999,
          status: "paid",
          shipping_address: shippingAddress,
        });
        console.log(`Founder's Edition order stored for ${customerEmail}`);
      } catch (dbError) {
        console.error("Failed to store founder's order:", dbError);
      }

      try {
        await resend.emails.send({
          from: "Stillfire Press <books@stillfirepress.com>",
          to: customerEmail,
          subject: "Welcome to the Founder's Edition — Man Amongst the Clouds",
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
      Stillfire Press &middot; Founder&rsquo;s Edition
    </p>

    <h1 style="font-size:28px;font-weight:300;text-align:center;letter-spacing:0.05em;line-height:1.3;margin-bottom:8px;">
      You&rsquo;re a Founder.
    </h1>

    <p style="text-align:center;color:#8a8a8a;font-style:italic;font-size:16px;margin-bottom:40px;">
      The Song remembers those who listened first.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.2);padding:32px;margin-bottom:32px;">
      <p style="font-size:14px;color:#b0a89e;margin-bottom:4px;text-align:center;">
        Man Amongst the Clouds
      </p>
      <p style="font-size:12px;color:#666;margin-bottom:24px;text-align:center;">
        Founder&rsquo;s Edition
      </p>

      <p style="font-size:14px;color:#ededed;line-height:1.8;margin-bottom:16px;">
        Here&rsquo;s what&rsquo;s coming your way:
      </p>
      <ul style="font-size:14px;color:#c4beb4;line-height:2;padding-left:20px;margin-bottom:16px;">
        <li>All 5 parts delivered digitally (EPUB) as each one releases</li>
        <li>A signed physical copy of the complete novel (targeting August 2026)</li>
        <li>Part I is already free to read &mdash; <a href="https://stillfirepress.com/read/matc" style="color:#c9a84c;text-decoration:none;">start here</a></li>
      </ul>
    </div>

    <div style="border:1px solid #222;padding:24px;margin-bottom:32px;">
      <p style="font-size:13px;color:#999;line-height:1.7;">
        <strong style="color:#ededed;">Our promise:</strong> If at any point you change your mind &mdash; for any reason, or no reason at all &mdash; reply to this email and we&rsquo;ll issue a full refund. No questions asked, no hard feelings. This book is nine years in the making. We want you here because you want to be.
      </p>
    </div>

    <p style="font-size:14px;color:#999;line-height:1.7;margin-bottom:24px;">
      We&rsquo;ll email you directly each time a new part is ready for download. The signed copy ships when the full novel is complete.
    </p>

    <div style="border-top:1px solid #222;padding-top:24px;margin-top:32px;">
      <p style="font-size:12px;color:#444;text-align:center;font-style:italic;">
        &ldquo;The world sang to itself. And in the space between the notes, where silence lived, a man breathed &mdash; and the air remembered.&rdquo;
      </p>
      <p style="font-size:11px;color:#333;text-align:center;margin-top:16px;">
        Stillfire Press &middot; A Cronk Companies, LLC Project
      </p>
    </div>

  </div>
</body>
</html>
          `.trim(),
        });

        console.log(
          `Founder's Edition confirmation email sent to ${customerEmail} for session ${session.id}`,
        );
      } catch (emailError) {
        console.error("Failed to send founder's edition email:", emailError);
      }
    } else if (productType === "preorder") {
      // --- Pre-order: store in Supabase + send confirmation email ---
      const preorderProduct = session.metadata?.preorder_product || "part-two";

      try {
        // Idempotency check: skip if this session was already processed
        const { data: existing } = await supabaseServer
          .from("preorders")
          .select("id")
          .eq("stripe_session_id", session.id)
          .maybeSingle();

        if (existing) {
          console.log(
            `Pre-order already exists for session ${session.id}, skipping`,
          );
          return NextResponse.json({ received: true });
        }

        await supabaseServer.from("preorders").insert({
          email: customerEmail.toLowerCase().trim(),
          stripe_session_id: session.id,
          stripe_payment_intent:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
          product: preorderProduct,
          amount_cents: session.amount_total || 299,
          status: "paid",
        });
        console.log(
          `Pre-order stored for ${customerEmail}, product: ${preorderProduct}`,
        );
      } catch (dbError) {
        console.error("Failed to store pre-order:", dbError);
      }

      try {
        await resend.emails.send({
          from: "Stillfire Press <books@stillfirepress.com>",
          to: customerEmail,
          subject:
            "You're in — Part II of Man Amongst the Clouds is yours when it drops",
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
      Part II is yours.
    </h1>

    <p style="text-align:center;color:#8a8a8a;font-style:italic;font-size:16px;margin-bottom:40px;">
      The Waking is coming.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.2);padding:32px;text-align:center;margin-bottom:32px;">
      <p style="font-size:14px;color:#b0a89e;margin-bottom:4px;">
        Man Amongst the Clouds
      </p>
      <p style="font-size:12px;color:#666;margin-bottom:16px;">
        Part II: The Waking &mdash; Pre-Order Confirmed
      </p>
      <p style="font-size:14px;color:#ededed;line-height:1.7;">
        Your pre-order is locked in. When Part II releases (expected May 2026), we&rsquo;ll send the EPUB directly to this email address &mdash; no action needed on your end.
      </p>
    </div>

    <p style="font-size:14px;color:#999;line-height:1.7;margin-bottom:16px;">
      In the meantime, if you haven&rsquo;t read Part I yet, the entire first part is free to read online:
    </p>
    <p style="text-align:center;margin-bottom:32px;">
      <a href="https://stillfirepress.com/read/matc" style="display:inline-block;padding:12px 28px;border:1px solid rgba(201,168,76,0.3);color:#c9a84c;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;font-family:sans-serif;">
        Read Part One Free
      </a>
    </p>

    <div style="border-top:1px solid #222;padding-top:24px;margin-top:32px;">
      <p style="font-size:12px;color:#444;text-align:center;font-style:italic;">
        &ldquo;To learn what you are, first you must lose everything you were.&rdquo;
      </p>
      <p style="font-size:11px;color:#333;text-align:center;margin-top:16px;">
        Stillfire Press &middot; A Cronk Companies, LLC Project
      </p>
    </div>

  </div>
</body>
</html>
          `.trim(),
        });

        console.log(
          `Pre-order confirmation email sent to ${customerEmail} for session ${session.id}`,
        );
      } catch (emailError) {
        console.error(
          "Failed to send pre-order confirmation email:",
          emailError,
        );
      }
    } else {
      // --- Regular Part I purchase: send download link ---
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
  }

  return NextResponse.json({ received: true });
}
