import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";
import { rateLimit } from "@/app/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = rateLimit(`donate:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(`https://stillfirepress.com/read/matc`, 303);
  }

  const stripe = getStripe();
  const amountParam = req.nextUrl.searchParams.get("amount");
  const isCustom = req.nextUrl.searchParams.get("custom") === "true";

  try {
    // For custom amounts, use a preset of $15 as default (user-friendly fallback)
    const parsed = parseInt(amountParam || "10", 10);
    const amount = isCustom ? 15 : parsed;
    if (isNaN(amount) || amount < 1 || amount > 999) {
      return NextResponse.redirect(`https://stillfirepress.com/read/matc`, 303);
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
      success_url: `https://stillfirepress.com/read/matc`,
      cancel_url: `https://stillfirepress.com/read/matc`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe session error:", err);
    return NextResponse.redirect(`https://stillfirepress.com/read/matc`, 303);
  }
}
