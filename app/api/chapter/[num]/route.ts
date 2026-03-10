import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CHAPTER_FILES: Record<number, string> = {
  0: "prologue.md",
  1: "chapter_01.md",
  2: "chapter_02.md",
  3: "chapter_03.md",
  4: "chapter_04.md",
  5: "chapter_05.md",
  6: "chapter_06.md",
  7: "chapter_07.md",
  8: "chapter_08.md",
  9: "chapter_09.md",
  10: "chapter_10.md",
};

function markdownToHtml(md: string): string {
  let html = md
    // strip Part One header + epigraph that only appears in ch1
    .replace(new RegExp("^# PART ONE:[\\s\\S]*?\\n\\n"), "")
    .replace(
      new RegExp('^_"In the time before[\\s\\S]*?"_\\s*\\n\\n---\\s*\\n\\n'),
      "",
    )
    // strip prologue heading + title + divider
    .replace(
      new RegExp("^# PROLOGUE\\s*\\n\\n## [\\s\\S]+?\\s*\\n\\n---\\s*\\n\\n"),
      "",
    )
    // strip chapter heading + title + divider
    .replace(
      new RegExp(
        "^# Chapter \\d+\\s*\\n\\n## [\\s\\S]+?\\s*\\n\\n---\\s*\\n\\n",
      ),
      "",
    )
    .trim();

  // Convert --- to <hr>
  html = html.replace(/\n---\n/g, "\n<hr />\n");

  // Convert _text_ to <em>
  html = html.replace(/(^|[^\w])_([^_]+)_(?!\w)/g, "$1<em>$2</em>");

  // Split into paragraphs
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed === "<hr />") return trimmed;
      if (trimmed.startsWith("<")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .filter(Boolean)
    .join("\n");

  return html;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ num: string }> },
) {
  const { num: numStr } = await params;
  const num = parseInt(numStr, 10);

  if (isNaN(num) || num < 0 || num > 10) {
    return NextResponse.json({ error: "Invalid chapter" }, { status: 400 });
  }

  const fileName = CHAPTER_FILES[num];
  if (!fileName) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  try {
    const manuscriptDir = path.join(process.cwd(), "content", "chapters");
    const filePath = path.join(manuscriptDir, fileName);
    const raw = await fs.readFile(filePath, "utf-8");
    const html = markdownToHtml(raw);

    return NextResponse.json(
      { html },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to load chapter" },
      { status: 500 },
    );
  }
}
