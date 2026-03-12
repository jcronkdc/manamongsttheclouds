import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";
import { rateLimit } from "@/app/lib/rate-limit";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGINS = [
  "https://stillfirepress.com",
  "https://www.stillfirepress.com",
];

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

const VALID_KEYS = new Set([
  "general",
  "chapter-0",
  ...Array.from({ length: 10 }, (_, i) => `chapter-${i + 1}`),
]);

const VALID_SENTIMENTS = new Set(["like", "confused", "suggestion", "general"]);

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key || !VALID_KEYS.has(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("reader_comments")
    .select("id, chapter, name, body, quote, sentiment, created_at")
    .eq("section_key", key)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json({ comments: [] });
  }

  return NextResponse.json(
    { comments: data || [] },
    { headers: corsHeaders(req) },
  );
}

export async function POST(req: NextRequest) {
  const cors = corsHeaders(req);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = rateLimit(`comments:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { ...cors, "Retry-After": String(retryAfter) } },
    );
  }

  try {
    const { key, chapter, name, body, sentiment, quote } = await req.json();

    if (!body || typeof body !== "string" || body.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment body required" },
        { status: 400 },
      );
    }

    const sectionKey = key && VALID_KEYS.has(key) ? key : "general";
    const cleanSentiment =
      sentiment && VALID_SENTIMENTS.has(sentiment) ? sentiment : null;

    const row = {
      section_key: sectionKey,
      chapter:
        typeof chapter === "number" && chapter >= 1 && chapter <= 10
          ? chapter
          : null,
      name: (name || "Anonymous Reader").slice(0, 100),
      body: body.trim().slice(0, 2000),
      quote: quote ? String(quote).slice(0, 500) : null,
      sentiment: cleanSentiment,
    };

    const { error } = await supabaseServer.from("reader_comments").insert(row);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save comment" },
        { status: 500, headers: cors },
      );
    }

    return NextResponse.json({ success: true }, { headers: cors });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: cors },
    );
  }
}
