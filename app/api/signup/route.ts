import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";
import { rateLimit } from "@/app/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = rateLimit(`signup:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  try {
    const { email, source, name } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    const row: Record<string, string> = {
      email: email.toLowerCase().trim(),
      source: source || "man-amongst-the-clouds",
    };
    if (name && typeof name === "string") {
      row.name = name.trim();
    }

    const { error } = await supabaseServer.from("email_signups").insert(row);

    if (error) {
      // Duplicate email — treat as success so user isn't confused
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          message: "Already signed up",
        });
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save signup" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
