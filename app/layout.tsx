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
const url = "https://www.manamongsttheclouds.com";

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
        url: "/opengraph-image",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Man Amongst the Clouds",
  alternateName: "MATC",
  author: {
    "@type": "Person",
    name: "Justin Cronk",
    url: `${url}/about-the-author`,
    jobTitle: "Author",
    description:
      "First-time novelist, military veteran, and co-founder of Stillfire Press. Nine years writing a literary fantasy debut rooted in real research, real places, and a magic system based on memory.",
    sameAs: [
      `${url}/about-the-author`,
      "https://stillfirepress.com",
      "https://www.facebook.com/profile.php?id=61583731204411",
    ],
  },
  bookFormat: "EBook",
  bookEdition: "First Edition",
  numberOfPages: 480,
  genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"],
  inLanguage: "en",
  description,
  url,
  datePublished: "2026",
  copyrightYear: 2026,
  isFamilyFriendly: true,
  typicalAgeRange: "16+",
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 16,
    audienceType:
      "Readers of literary fantasy, epic fantasy, and character-driven fantasy. Fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, Ursula K. Le Guin, and Tad Williams.",
  },
  wordCount: 153000,
  about: [
    { "@type": "Thing", name: "Memory" },
    { "@type": "Thing", name: "Magic systems" },
    { "@type": "Thing", name: "Sacrifice" },
    { "@type": "Thing", name: "Loss and grief" },
    { "@type": "Thing", name: "Found family" },
    { "@type": "Thing", name: "Coming of age" },
    { "@type": "Thing", name: "Power and its cost" },
    { "@type": "Thing", name: "World building" },
  ],
  publisher: {
    "@type": "Organization",
    name: "Stillfire Press",
    url: "https://stillfirepress.com",
    description:
      "Independent fantasy press founded by father-son duo Justin and Carter Cronk. Blockchain-verified authorship. Buy direct from the authors.",
    parentOrganization: {
      "@type": "Organization",
      name: "Cronk Companies, LLC",
    },
  },
  offers: {
    "@type": "Offer",
    price: "2.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g",
  },
  workExample: [
    {
      "@type": "Book",
      name: "Man Amongst the Clouds: Part I — The Still Water",
      bookEdition: "Part I",
      bookFormat: "EBook",
      description:
        "Prologue and Chapters 1–10. Aelo has lived in silence for fifteen years, raised by a scarred old man in a village too small to have a name. When the herbs fail and the silence breaks, he discovers magic is memory — and he can hear all of it.",
      offers: {
        "@type": "Offer",
        price: "2.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Book",
      name: "Man Amongst the Clouds: Part II — The Waking",
      bookEdition: "Part II",
      bookFormat: "EBook",
      description:
        "The journey out of silence and into the larger world. Aelo begins to learn what magic costs — and what it means to be heard.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
      },
    },
  ],
  sameAs: [
    "https://stillfirepress.com",
    "https://ashtofury.com",
    "https://www.facebook.com/profile.php?id=61583731204411",
  ],
  keywords:
    "literary fantasy, magic system, memory magic, epic fantasy, indie fantasy, debut novel, self-published, magic is memory, fantasy books where magic has a cost, books like Name of the Wind, books like Assassin's Apprentice, books like Tigana, books like A Wizard of Earthsea, best fantasy books 2026, new fantasy novels 2026, fantasy novels about memory, fantasy novels about sacrifice, fantasy novels with unique magic systems, character-driven fantasy, literary fiction meets fantasy, dark fantasy with heart, fantasy debut novels, indie fantasy books, buy fantasy books direct from author",
  mainEntityOfPage: `${url}/the-book`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Man Amongst the Clouds",
  alternateName: "MATC",
  url,
  description,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: "Justin Cronk",
  },
  publisher: {
    "@type": "Organization",
    name: "Stillfire Press",
    url: "https://stillfirepress.com",
  },
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/chapters/{search_term}`,
      },
      "query-input": "required name=search_term",
    },
    {
      "@type": "ReadAction",
      target: `${url}/read/part-one`,
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Stillfire Press",
  alternateName: "Stillfire",
  url: "https://stillfirepress.com",
  description:
    "Stillfire Press is an independent fantasy publishing house founded by father-son duo Justin Cronk and Carter Cronk. Every manuscript is blockchain-verified on the Polygon network. Readers buy direct from the authors — 97% of every sale goes to the writer. No middlemen, no distributors, no algorithms.",
  foundingDate: "2026",
  founder: [
    {
      "@type": "Person",
      name: "Justin Cronk",
      jobTitle: "Co-Founder & Author",
      url: `${url}/about-the-author`,
    },
    {
      "@type": "Person",
      name: "Carter Cronk",
      jobTitle: "Co-Founder & Author",
      url: "https://ashtofury.com",
    },
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Cronk Companies, LLC",
  },
  sameAs: [
    "https://stillfirepress.com",
    "https://www.manamongsttheclouds.com",
    "https://ashtofury.com",
    "https://www.facebook.com/profile.php?id=61583731204411",
  ],
  knowsAbout: [
    "Literary Fantasy",
    "Dark Fantasy",
    "Independent Publishing",
    "Blockchain-Verified Authorship",
    "Direct-to-Reader Publishing",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://stillfirepress.com/contact",
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
      </body>
    </html>
  );
}
