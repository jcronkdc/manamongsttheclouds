import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  sites,
  books,
  authors,
  organization,
  buildBookJsonLd,
  buildWebsiteJsonLd,
  buildOrganizationJsonLd,
} from "@/app/lib/canonical-data";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const matc = books.manAmongstTheClouds;
const site = sites.matc;
const title = `${matc.title} — A Literary Fantasy Novel by ${matc.author.name}`;
const description = `${site.description} Part I available now. For fans of ${matc.comparables}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${matc.title}`,
  },
  description,
  keywords: matc.seoKeywords as unknown as string[],
  authors: [{ name: authors.justinCronk.name, url: site.url }],
  creator: authors.justinCronk.name,
  publisher: organization.name,
  alternates: { canonical: site.url },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: matc.title,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${matc.title} — Literary Fantasy Novel`,
    description: matc.twitterDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "umVXIJMyiqGuIK_6Mh1z642XnsO04fW6rcbyq-v11T8",
  },
};

const jsonLd = buildBookJsonLd("manAmongstTheClouds");
const websiteJsonLd = buildWebsiteJsonLd("matc");
const organizationJsonLd = buildOrganizationJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${serif.variable} ${sans.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#c9a84c] focus:text-[#0a0a0a] focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
