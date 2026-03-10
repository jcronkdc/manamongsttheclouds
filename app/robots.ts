import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/download/"],
      },
    ],
    sitemap: "https://www.manamongsttheclouds.com/sitemap.xml",
  };
}
