import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

const VALID_KEYS = new Set([
  "general",
  ...Array.from({ length: 10 }, (_, i) => `chapter-${i + 1}`),
]);

const VALID_SENTIMENTS = new Set(["like", "confused", "suggestion", "general"]);

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key || !VALID_KEYS.has(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reader_comments")
    .select("id, chapter, name, body, quote, sentiment, created_at")
    .eq("section_key", key)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json({ comments: [] });
  }

  return NextResponse.json({ comments: data || [] });
}

export async function POST(req: NextRequest) {
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

    const { error } = await supabase.from("reader_comments").insert(row);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save comment" },
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
