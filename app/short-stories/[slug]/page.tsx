import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {
  getStoryBySlug,
  getAllStorySlugs,
} from "@/app/lib/short-stories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  const url = `https://www.manamongsttheclouds.com/short-stories/${slug}`;
  return {
    title: `${story.title} — Short Story`,
    description: story.description,
    alternates: { canonical: url },
    openGraph: {
      title: story.title,
      description: story.description,
      url,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
    },
  };
}

export default async function ShortStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

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
        name: "Short Stories",
        item: "https://www.manamongsttheclouds.com/short-stories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: story.title,
        item: `https://www.manamongsttheclouds.com/short-stories/${slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ShortStory",
    name: story.title,
    headline: story.title,
    description: story.description,
    author: {
      "@type": "Person",
      name: "Justin Cronk",
      url: "https://www.manamongsttheclouds.com/about-the-author",
    },
    datePublished: story.datePublished,
    publisher: {
      "@type": "Organization",
      name: "Stillfire Press",
      url: "https://stillfirepress.com",
    },
    inLanguage: "en",
    url: `https://www.manamongsttheclouds.com/short-stories/${slug}`,
  };

  const publishDate = new Date(story.datePublished).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="min-h-screen pt-32 pb-20 px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/short-stories"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#666] hover:text-[#c9a84c] transition-colors mb-12"
          >
            <span className="text-sm">←</span> All Stories
          </Link>

          {/* Story header */}
          <header className="mb-12">
            {story.inUniverse && (
              <span className="inline-block font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase text-[#c9a84c]/50 border border-[#c9a84c]/20 px-2 py-0.5 rounded mb-4">
                MATC Universe
              </span>
            )}
            <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl font-light text-[#ededed] mb-3 leading-tight">
              {story.title}
            </h1>
            {story.subtitle && (
              <p className="font-[family-name:var(--font-serif)] text-lg italic text-[#777] mb-4">
                {story.subtitle}
              </p>
            )}
            <div className="flex items-center gap-4 font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] text-[#666]">
              <span>{publishDate}</span>
              <span className="text-[#333]">·</span>
              <span>{story.readingTime} min read</span>
            </div>
            {story.worldContext && (
              <p className="mt-4 font-[family-name:var(--font-serif)] text-sm italic text-[#555] border-l-2 border-[#c9a84c]/20 pl-4">
                {story.worldContext}
              </p>
            )}
          </header>

          {/* Divider */}
          <div className="w-12 h-px bg-[#c9a84c]/30 mb-12" />

          {/* Story content */}
          <div
            className="story-prose"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* End mark */}
          <div className="mt-16 mb-12 flex justify-center">
            <span className="text-[#c9a84c]/40 text-lg tracking-[0.5em]">
              ✦ ✦ ✦
            </span>
          </div>

          {/* Footer nav */}
          <div className="border-t border-[#1a1a1a] pt-8 flex items-center justify-between">
            <Link
              href="/short-stories"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#666] hover:text-[#c9a84c] transition-colors"
            >
              ← All Stories
            </Link>
            <Link
              href="/"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#666] hover:text-[#c9a84c] transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
