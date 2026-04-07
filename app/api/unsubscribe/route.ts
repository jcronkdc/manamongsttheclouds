import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";
import crypto from "crypto";

function verifyToken(token: string): string | null {
  try {
    const secret = process.env.UNSUBSCRIBE_SECRET || process.env.DOWNLOAD_SECRET;
    if (!secret) return null;

    const decoded = Buffer.from(token, "base64url").toString();
    const [email, expiryStr, signature] = decoded.split(":");
    if (!email || !expiryStr || !signature) return null;

    const expiry = parseInt(expiryStr, 10);
    if (Date.now() > expiry) return null;

    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${email}:${expiryStr}`)
      .digest("hex");

    if (signature !== expected) return null;
    return email;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const email = verifyToken(token);
  if (!email) {
    return NextResponse.json(
      { error: "Invalid or expired link" },
      { status: 400 },
    );
  }

  const { error } = await supabaseServer
    .from("email_signups")
    .update({ unsubscribed: true })
    .eq("email", email);

  if (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 },
    );
  }

  // Redirect to the unsubscribe confirmation page
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.manamongsttheclouds.com";
  return NextResponse.redirect(`${siteUrl}/unsubscribe?success=true`);
}
