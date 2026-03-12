import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Chapter data                                                       */
/* ------------------------------------------------------------------ */

interface ChapterDef {
  slug: string;
  file: string;
  number: number;
  title: string;
  pov: string;
  description: string;
}

const CHAPTERS: ChapterDef[] = [
  {
    slug: "prologue",
    file: "prologue.md",
    number: 0,
    title: "The First Song",
    pov: "",
    description:
      "Before there were kings, the world sang to itself. Read the Prologue of Man Amongst the Clouds — a literary fantasy novel where magic is memory. Free to read online.",
  },
  {
    slug: "chapter-1-the-herbs",
    file: "chapter_01.md",
    number: 1,
    title: "The Herbs",
    pov: "Aelo",
    description:
      "Aelo tastes smoke in his sleep and wakes reaching for a woman he has never met. Chapter 1 of Man Amongst the Clouds — a literary fantasy debut by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-2-the-collection",
    file: "chapter_02.md",
    number: 2,
    title: "The Collection",
    pov: "The Knife",
    description:
      "The Knife carries a wooden box of five beautiful objects and checks them every night. Chapter 2 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-3-the-blue-sun",
    file: "chapter_03.md",
    number: 3,
    title: "The Blue Sun",
    pov: "Aelo",
    description:
      "When the herbs fail and the silence breaks, Aelo hears the world for the first time. Chapter 3 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-4-the-running",
    file: "chapter_04.md",
    number: 4,
    title: "The Running",
    pov: "Aelo",
    description:
      "Aelo runs from the only home he has ever known. Chapter 4 of Man Amongst the Clouds — literary fantasy where magic is memory. Free to read online.",
  },
  {
    slug: "chapter-5-the-merchant",
    file: "chapter_05.md",
    number: 5,
    title: "The Merchant",
    pov: "Sereth",
    description:
      "Sereth collects orphans the way other people collect regrets. Chapter 5 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-6-the-history",
    file: "chapter_06.md",
    number: 6,
    title: "The History",
    pov: "Jalo",
    description:
      "Jalo's past catches up with him — a soldier's history written in scars and silence. Chapter 6 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-7-the-growing",
    file: "chapter_07.md",
    number: 7,
    title: "The Growing",
    pov: "Aelo",
    description:
      "Aelo begins to understand what the world sounds like when you truly listen. Chapter 7 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-8-the-patrol",
    file: "chapter_08.md",
    number: 8,
    title: "The Patrol",
    pov: "The Knife",
    description:
      "The Knife is sent to find a boy who made a stone sing. Chapter 8 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
  {
    slug: "chapter-9-the-flood",
    file: "chapter_09.md",
    number: 9,
    title: "The Flood",
    pov: "Aelo",
    description:
      "The world breaks open. Chapter 9 of Man Amongst the Clouds — a literary fantasy novel where every act of magic costs a piece of who you are. Free to read online.",
  },
  {
    slug: "chapter-10-the-report",
    file: "chapter_10.md",
    number: 10,
    title: "The Report",
    pov: "The Knife",
    description:
      "The Knife reports back to the obsidian throne. Chapter 10 of Man Amongst the Clouds by Justin Cronk. Free to read online.",
  },
];

const CHAPTER_MAP = new Map(CHAPTERS.map((c) => [c.slug, c]));

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const base = "https://www.manamongsttheclouds.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ch = CHAPTER_MAP.get(slug);
  if (!ch) return {};

  const label =
    ch.number === 0
      ? `Prologue: ${ch.title}`
      : `Chapter ${ch.number}: ${ch.title}`;
  const title = `${label} — Man Amongst the Clouds by Justin Cronk`;
  const url = `${base}/chapters/${slug}`;

  return {
    title,
    description: ch.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: ch.description,
      url,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: label,
      description: ch.description,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Markdown → HTML (same logic as the API route)                      */
/* ------------------------------------------------------------------ */

function markdownToHtml(md: string): string {
  let html = md
    .replace(new RegExp("^# PART ONE:[\\s\\S]*?\\n\\n"), "")
    .replace(
      new RegExp('^_"In the time before[\\s\\S]*?"_\\s*\\n\\n---\\s*\\n\\n'),
      "",
    )
    .replace(
      new RegExp("^# PROLOGUE\\s*\\n\\n## [\\s\\S]+?\\s*\\n\\n---\\s*\\n\\n"),
      "",
    )
    .replace(
      new RegExp(
        "^# Chapter \\d+\\s*\\n\\n## [\\s\\S]+?\\s*\\n\\n---\\s*\\n\\n",
      ),
      "",
    )
    .trim();

  html = html.replace(/\n---\n/g, "\n<hr />\n");
  html = html.replace(/(^|[^\w])_([^_]+)_(?!\w)/g, "$1<em>$2</em>");

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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ch = CHAPTER_MAP.get(slug);
  if (!ch) notFound();

  const manuscriptDir = path.join(process.cwd(), "content", "chapters");
  const raw = await fs.readFile(path.join(manuscriptDir, ch.file), "utf-8");
  const html = markdownToHtml(raw);

  const label =
    ch.number === 0
      ? `Prologue: ${ch.title}`
      : `Chapter ${ch.number}: ${ch.title}`;

  const idx = CHAPTERS.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "The Book",
        item: `${base}/the-book`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${base}/chapters/${slug}`,
      },
    ],
  };

  const chapterJsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: label,
    isPartOf: {
      "@type": "Book",
      name: "Man Amongst the Clouds",
      author: {
        "@type": "Person",
        name: "Justin Cronk",
      },
    },
    position: ch.number,
    url: `${base}/chapters/${slug}`,
    description: ch.description,
    inLanguage: "en",
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chapterJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
        {/* Header */}
        <header className="pt-16 pb-8 px-5 sm:px-6 text-center">
          <nav className="mb-6 flex justify-center gap-6">
            <Link
              href="/"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/the-book"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              The Book
            </Link>
            <Link
              href="/read/part-one"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              Full Reader
            </Link>
          </nav>

          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-4">
            Part I: The Still Water
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-[1.15] mb-3">
            {label}
          </h1>
          {ch.pov && (
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#999]">
              {ch.pov}
            </p>
          )}
        </header>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12" />

        {/* Chapter Content */}
        <article className="max-w-2xl mx-auto px-5 sm:px-6 mb-16">
          <div
            className="font-[family-name:var(--font-serif)] text-base sm:text-[17px] leading-[1.9] text-[#d4d0c8] chapter-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        {/* Chapter Navigation */}
        <nav className="max-w-2xl mx-auto px-5 sm:px-6 pb-20">
          <div className="w-12 h-px bg-[#c9a84c]/20 mx-auto mb-8" />
          <div className="flex justify-between items-center">
            {prev ? (
              <Link
                href={`/chapters/${prev.slug}`}
                className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
              >
                &larr;{" "}
                {prev.number === 0
                  ? "Prologue"
                  : `Ch. ${prev.number}`}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/chapters/${next.slug}`}
                className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
              >
                {`Ch. ${next.number}: ${next.title}`} &rarr;
              </Link>
            ) : (
              <div className="text-center">
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] italic mb-4">
                  End of Part I: The Still Water
                </p>
                <Link
                  href="/the-book"
                  className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
                >
                  Continue to The Book &rarr;
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
