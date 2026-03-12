import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { shortStories } from "@/app/lib/short-stories";

const title = "Short Stories — Man Amongst the Clouds";
const description =
  "Original short fiction from the world of Man Amongst the Clouds and beyond. Free to read.";
const url = "https://www.manamongsttheclouds.com/short-stories";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
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
      name: "Short Stories",
      item: url,
    },
  ],
};

export default function ShortStoriesPage() {
  const hasStories = shortStories.length > 0;

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="min-h-screen pt-32 pb-20 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 mb-4">
            Fiction
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-light text-[#ededed] mb-4">
            Short Stories
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#999] leading-relaxed max-w-xl mb-16">
            Original short fiction — some set in the world of{" "}
            <em className="text-[#c9a84c]">Man Amongst the Clouds</em>, some
            standing on their own.
          </p>

          {/* Story list */}
          {hasStories ? (
            <div className="flex flex-col gap-0">
              {shortStories.map((story) => (
                <Link
                  key={story.slug}
                  href={`/short-stories/${story.slug}`}
                  className="group block py-8 border-t border-[#1a1a1a] first:border-t-0 transition-colors hover:bg-[#0f0f0f] -mx-4 px-4 rounded"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-[#ededed] group-hover:text-[#c9a84c] transition-colors mb-1">
                        {story.title}
                      </h2>
                      {story.subtitle && (
                        <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#777] mb-2">
                          {story.subtitle}
                        </p>
                      )}
                      <p className="font-[family-name:var(--font-serif)] text-sm text-[#888] leading-relaxed line-clamp-2">
                        {story.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 pt-1">
                      {story.inUniverse && (
                        <span className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase text-[#c9a84c]/50 border border-[#c9a84c]/20 px-2 py-0.5 rounded">
                          MATC Universe
                        </span>
                      )}
                      <span className="font-[family-name:var(--font-sans)] text-[10px] text-[#666] mt-1">
                        {story.readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-[family-name:var(--font-serif)] text-lg text-[#555] italic">
                Stories are coming soon.
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] mt-3">
                Check back shortly — the first story is on its way.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
