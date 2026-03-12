import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.manamongsttheclouds.com";
  const now = new Date();

  const chapterSlugs = [
    "prologue",
    "chapter-1-the-herbs",
    "chapter-2-the-collection",
    "chapter-3-the-blue-sun",
    "chapter-4-the-running",
    "chapter-5-the-merchant",
    "chapter-6-the-history",
    "chapter-7-the-growing",
    "chapter-8-the-patrol",
    "chapter-9-the-flood",
    "chapter-10-the-report",
  ];

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/the-book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/the-magic-system`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/characters`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about-the-author`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/read/part-one`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...chapterSlugs.map((slug) => ({
      url: `${base}/chapters/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/share`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/thank-you`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
