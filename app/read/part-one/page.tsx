import { Metadata } from "next";
import fs from "fs";
import path from "path";
import PartOneReader from "./PartOneReader";

export const metadata: Metadata = {
  title: "Read Part One: The Still Water — Free",
  description:
    "Read Part One of Man Amongst the Clouds for free. Ten chapters. Leave feedback, highlight what works, flag what doesn\u2019t. Help shape this book.",
  alternates: { canonical: "https://manamongsttheclouds.com/read/part-one" },
  openGraph: {
    title: "Read Part One: The Still Water — Free",
    description:
      "Part One of Man Amongst the Clouds is free to read. Leave comments. Help shape the book before it publishes.",
    images: [
      { url: "/read/part-one/opengraph-image", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Read Part One: The Still Water — Free",
    description:
      "Part One of Man Amongst the Clouds is free to read. Leave comments. Help shape the book before it publishes.",
    images: ["/read/part-one/opengraph-image"],
  },
};

const CHAPTER_META: { title: string; pov: string; file?: string }[] = [
  { title: "The First Song", pov: "", file: "prologue.md" },
  { title: "The Herbs", pov: "Aelo" },
  { title: "The Collection", pov: "The Knife" },
  { title: "The Blue Sun", pov: "Aelo" },
  { title: "The Running", pov: "Aelo" },
  { title: "The Merchant", pov: "Sereth" },
  { title: "The History", pov: "Jalo" },
  { title: "The Growing", pov: "Aelo" },
  { title: "The Patrol", pov: "The Knife" },
  { title: "The Flood", pov: "Aelo" },
  { title: "The Report", pov: "The Knife" },
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

export default function PartOnePage() {
  const manuscriptDir = path.join(process.cwd(), "content", "chapters");

  const chapters = CHAPTER_META.map((meta, i) => {
    const num = i; // 0 = prologue, 1-10 = chapters
    const fileName = meta.file || `chapter_${String(num).padStart(2, "0")}.md`;
    const filePath = path.join(manuscriptDir, fileName);
    const raw = fs.readFileSync(filePath, "utf-8");
    return {
      number: num,
      title: meta.title,
      pov: meta.pov,
      html: markdownToHtml(raw),
    };
  });

  return <PartOneReader chapters={chapters} />;
}
