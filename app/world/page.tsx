import type { Metadata } from "next";
import Link from "next/link";
import WorldGuide from "./WorldGuide";

const title =
  "World Guide — Glossary, Regions, Characters & Magic | Man Amongst the Clouds";
const description =
  "Explore the world of Man Amongst the Clouds: seven regions, seven disciplines of memory-based magic, and the characters who inhabit them. An interactive, spoiler-free guide to the literary fantasy novel by Justin Cronk.";
const url = "https://www.manamongsttheclouds.com/world";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "World Guide — Man Amongst the Clouds",
    description,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.manamongsttheclouds.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "World Guide",
      item: url,
    },
  ],
};

export default function WorldPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
        {/* Header */}
        <header className="pt-20 pb-12 px-5 sm:px-6 text-center">
          <nav className="mb-8">
            <Link
              href="/"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              &larr; Back to Home
            </Link>
          </nav>
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
            World Guide
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6">
            The World Remembers
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl text-[#d4d0c8] max-w-2xl mx-auto leading-relaxed">
            An interactive guide to the people, places, magic, and creatures of{" "}
            <em>Man Amongst the Clouds</em>. Spoiler&#8209;free.
          </p>
        </header>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12" />

        {/* Interactive Guide */}
        <WorldGuide />

        {/* CTA */}
        <section className="max-w-lg mx-auto px-5 sm:px-6 pb-20 text-center">
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10" />
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] italic mb-8">
            A world built on memory, sacrifice, and the belief that the world is
            alive and listening.
          </p>
          <a
            href="https://stillfirepress.com/read/matc"
            className="inline-block px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
          >
            Read Part One Free
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link
              href="/the-book"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              The Book &rarr;
            </Link>
            <Link
              href="/characters"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              Characters &rarr;
            </Link>
            <Link
              href="/the-magic-system"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              Magic System &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
