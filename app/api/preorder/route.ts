import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";
import { rateLimit } from "@/app/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = rateLimit(`preorder:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.manamongsttheclouds.com";

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(siteUrl, 303);
  }

  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: "price_1T9V8f2H6bMdop9gida7krcd",
          quantity: 1,
        },
      ],
      metadata: {
        product_type: "preorder",
        preorder_product: "part-two",
      },
      success_url: `${siteUrl}/thank-you?preorder=part-two`,
      cancel_url: `${siteUrl}/#read`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe preorder session error:", err);
    return NextResponse.redirect(siteUrl, 303);
  }
}
