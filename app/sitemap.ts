import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://manamongsttheclouds.com";
  return [
    {
      url: base,
      lastModified: new Date("2026-03-09"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/read/part-one`,
      lastModified: new Date("2026-03-09"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/share`,
      lastModified: new Date("2026-03-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/thank-you`,
      lastModified: new Date("2026-03-09"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
