import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function GET(req: NextRequest) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://manamongsttheclouds.com";

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(`${siteUrl}/read/part-one`, 303);
  }

  const stripe = getStripe();
  const amountParam = req.nextUrl.searchParams.get("amount");
  const isCustom = req.nextUrl.searchParams.get("custom") === "true";

  try {
    // For custom amounts, use a preset of $15 as default (user-friendly fallback)
    const amount = isCustom ? 15 : parseInt(amountParam || "10", 10);
    if (amount < 1 || amount > 999) {
      return NextResponse.redirect(`${siteUrl}/read/part-one`, 303);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Support Stillfire Press",
              description:
                "Help fund editing, cover art, and publishing for Man Amongst the Clouds and Ash to Fury.",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
          adjustable_quantity: isCustom
            ? { enabled: true, minimum: 1, maximum: 100 }
            : undefined,
        },
      ],
      success_url: `${siteUrl}/read/part-one?donated=true`,
      cancel_url: `${siteUrl}/read/part-one`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe session error:", err);
    return NextResponse.redirect(`${siteUrl}/read/part-one`, 303);
  }
}
