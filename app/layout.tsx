import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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

const title =
  "Man Amongst the Clouds — A Literary Fantasy Novel by Justin Cronk";
const description =
  "In a world where magic is memory and every act of power costs a piece of who you are, a boy raised on silence discovers he can hear the world sing. A 153,000-word literary fantasy debut nine years in the making. Part I available now. For fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and Ursula K. Le Guin.";
const url = "https://manamongsttheclouds.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | Man Amongst the Clouds",
  },
  description,
  keywords: [
    "Man Amongst the Clouds",
    "Justin Cronk",
    "literary fantasy novel",
    "fantasy book 2026",
    "magic is memory",
    "epic fantasy debut",
    "indie fantasy novel",
    "self-published fantasy",
    "new fantasy books 2026",
    "fantasy novel about memory",
    "Patrick Rothfuss comparable",
    "Robin Hobb comparable",
    "Guy Gavriel Kay comparable",
    "Ursula K. Le Guin comparable",
    "fantasy magic system",
    "dark fantasy novel",
    "literary fiction fantasy",
    "best new fantasy novels",
    "indie author fantasy",
    "fantasy ebook",
    "buy fantasy ebook",
    "adult fantasy novel",
    "fantasy world building",
    "fantasy debut novel",
    "epic literary fantasy",
    "memory magic system",
    "sacrifice magic system",
    "Song magic fantasy",
    "seven disciplines magic",
    "fantasy novel about loss",
    "fantasy novel about grief",
    "blockchain verified novel",
    "human written fantasy novel",
    "AI transparency publishing",
  ],
  authors: [{ name: "Justin Cronk", url }],
  creator: "Justin Cronk",
  publisher: "Stillfire Press",
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Man Amongst the Clouds",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Man Amongst the Clouds — A Literary Fantasy Novel by Justin Cronk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man Amongst the Clouds — Literary Fantasy Novel",
    description:
      "Magic is memory. The Song is love made audible. The cost is everything. A 153,000-word literary fantasy debut. Part I available now — $2.99.",
    images: ["/og-image.png"],
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
    "google-site-verification": "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Man Amongst the Clouds",
  author: {
    "@type": "Person",
    name: "Justin Cronk",
    url,
  },
  bookFormat: "EBook",
  isbn: "",
  numberOfPages: 480,
  genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"],
  inLanguage: "en",
  description,
  url,
  publisher: {
    "@type": "Organization",
    name: "Stillfire Press",
  },
  offers: {
    "@type": "Offer",
    price: "2.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g",
  },
  aggregateRating: undefined,
  keywords:
    "literary fantasy, magic system, memory magic, epic fantasy, indie fantasy, debut novel, self-published",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Man Amongst the Clouds",
  url,
  description,
  author: {
    "@type": "Person",
    name: "Justin Cronk",
  },
  potentialAction: {
    "@type": "ReadAction",
    target: url,
  },
};

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
        <link rel="canonical" href={url} />
      </head>
      <body
        className={`${serif.variable} ${sans.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        {children}
      </body>
    </html>
  );
}
