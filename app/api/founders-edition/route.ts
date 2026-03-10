import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";
import { rateLimit } from "@/app/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = rateLimit(`founders:${ip}`, 5, 60_000);
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
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "AU",
          "DE",
          "FR",
          "NL",
          "IE",
          "NZ",
        ],
      },
      line_items: [
        {
          price: "price_1T9VRg2H6bMdop9guxPEHeuy",
          quantity: 1,
        },
      ],
      metadata: {
        product_type: "founders-edition",
      },
      success_url: `${siteUrl}/thank-you?founders=true`,
      cancel_url: `${siteUrl}/#read`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe founders edition session error:", err);
    return NextResponse.redirect(siteUrl, 303);
  }
}
