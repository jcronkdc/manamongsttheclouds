import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import BookReader from "./BookReader";

export const metadata: Metadata = {
  title: "Read Part One: The Still Water — Free",
  description:
    "Read Part One of Man Amongst the Clouds for free — all ten chapters, one continuous read. No account needed. Save your place automatically.",
  alternates: {
    canonical: "https://www.manamongsttheclouds.com/read/part-one",
  },
  openGraph: {
    title: "Read Part One: The Still Water — Free",
    description:
      "Part One of Man Amongst the Clouds. All ten chapters in one continuous read. No signup. Save your place and come back anytime.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Read Part One: The Still Water — Free",
    description:
      "Part One of Man Amongst the Clouds. All ten chapters, one continuous read.",
    images: ["/opengraph-image"],
  },
};

interface ChapterData {
  number: number;
  title: string;
  pov: string;
  html: string;
}

const CHAPTER_META: {
  number: number;
  title: string;
  pov: string;
  file: string;
}[] = [
  { number: 0, title: "The First Song", pov: "", file: "prologue.md" },
  { number: 1, title: "The Herbs", pov: "Aelo", file: "chapter_01.md" },
  {
    number: 2,
    title: "The Collection",
    pov: "The Knife",
    file: "chapter_02.md",
  },
  { number: 3, title: "The Blue Sun", pov: "Aelo", file: "chapter_03.md" },
  { number: 4, title: "The Running", pov: "Aelo", file: "chapter_04.md" },
  { number: 5, title: "The Merchant", pov: "Sereth", file: "chapter_05.md" },
  { number: 6, title: "The History", pov: "Jalo", file: "chapter_06.md" },
  { number: 7, title: "The Growing", pov: "Aelo", file: "chapter_07.md" },
  { number: 8, title: "The Patrol", pov: "The Knife", file: "chapter_08.md" },
  { number: 9, title: "The Flood", pov: "Aelo", file: "chapter_09.md" },
  { number: 10, title: "The Report", pov: "The Knife", file: "chapter_10.md" },
];

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

export default async function PartOnePage() {
  const manuscriptDir = path.join(process.cwd(), "content", "chapters");

  const chapters: ChapterData[] = await Promise.all(
    CHAPTER_META.map(async (meta) => {
      try {
        const raw = await fs.readFile(
          path.join(manuscriptDir, meta.file),
          "utf-8",
        );
        return {
          number: meta.number,
          title: meta.title,
          pov: meta.pov,
          html: markdownToHtml(raw),
        };
      } catch {
        return {
          number: meta.number,
          title: meta.title,
          pov: meta.pov,
          html: "",
        };
      }
    }),
  );

  return <BookReader chapters={chapters} />;
}
