// ============================================================================
// @stillfire/canonical-data
// Single source of truth for the Stillfire Press ecosystem.
// Update data HERE — all three sites (manamongsttheclouds.com, ashtofury.com,
// stillfirepress.com) import from this file.
// ============================================================================

// ---------------------------------------------------------------------------
// Sites
// ---------------------------------------------------------------------------

export const sites = {
  matc: {
    name: "Man Amongst the Clouds",
    shortName: "MATC",
    url: "https://www.manamongsttheclouds.com",
    description:
      "In a world where magic is memory and every act of power costs a piece of who you are, a boy raised on silence discovers he can hear the world sing. A 153,000-word literary fantasy debut nine years in the making.",
    accentColor: "#c9a84c",
    accentHover: "#e8c85a",
  },
  ashToFury: {
    name: "Ash to Fury",
    shortName: "ATF",
    url: "https://ashtofury.com",
    description:
      "A disciplined man. A devastating betrayal. A transformation forged in grief and fire. Ash to Fury is a dark fantasy novel about restraint, fury, and the cost of obedience.",
    accentColor: "#c45a2d",
    accentHover: "#e87040",
  },
  stillfirePress: {
    name: "Stillfire Press",
    shortName: "Stillfire",
    url: "https://stillfirepress.com",
    description:
      "Stillfire Press is an independent fantasy publishing house founded by father-son duo Justin Cronk and Carter Cronk. Every manuscript is blockchain-verified on the Polygon network. Readers buy direct from the authors — 97% of every sale goes to the writer.",
    accentColor: "#c9a84c",
    accentHover: "#e8c85a",
  },
} as const;

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const authors = {
  justinCronk: {
    name: "Justin Cronk",
    jobTitle: "Co-Founder & Author",
    bio: "First-time novelist, military veteran, and co-founder of Stillfire Press. Nine years writing a literary fantasy debut rooted in real research, real places, and a magic system based on memory.",
    url: `${sites.matc.url}/about-the-author`,
    bookSlug: "man-amongst-the-clouds",
  },
  carterCronk: {
    name: "Carter Cronk",
    jobTitle: "Co-Founder & Author",
    bio: "Author of Ash to Fury, a dark fantasy about discipline, grief, and transformation. Co-founder of Stillfire Press.",
    url: sites.ashToFury.url,
    bookSlug: "ash-to-fury",
  },
} as const;

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export const organization = {
  name: "Stillfire Press",
  legalName: "Cronk Companies, LLC",
  foundingDate: "2026",
  tagline: "Independent Fantasy. Buy Direct from the Authors.",
  shortDescription:
    "Indie fantasy press. Father & son. Two books. Every word ours.",
  email: "hello@stillfirepress.com",
  founders: [authors.justinCronk, authors.carterCronk],
} as const;

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

export const social = {
  facebookStillfirePress: {
    label: "Stillfire Press on Facebook",
    url: "https://www.facebook.com/profile.php?id=61583731204411",
  },
  facebookMATC: {
    label: "Man Amongst the Clouds on Facebook",
    url: "https://www.facebook.com/profile.php?id=61575289025498",
  },
} as const;

// ---------------------------------------------------------------------------
// Blockchain proofs
// ---------------------------------------------------------------------------

export const blockchainProofs = {
  matc: {
    label: "MATC Proof → PolygonScan",
    txHash:
      "0xe7e0990d75efd6e1da84f5438fe3265435c79d6e09e19f615419d92428dac52a",
    url: "https://polygonscan.com/tx/0xe7e0990d75efd6e1da84f5438fe3265435c79d6e09e19f615419d92428dac52a",
  },
  ashToFury: {
    label: "Ash to Fury Proof → PolygonScan",
    txHash:
      "0xb036067aacde04eefa439008cd3621b86a46bd2eeb1890de5876f9f9b09b7d81",
    url: "https://polygonscan.com/tx/0xb036067aacde04eefa439008cd3621b86a46bd2eeb1890de5876f9f9b09b7d81",
  },
} as const;

// ---------------------------------------------------------------------------
// Books
// ---------------------------------------------------------------------------

export const books = {
  manAmongstTheClouds: {
    title: "Man Amongst the Clouds",
    shortTitle: "MATC",
    slug: "man-amongst-the-clouds",
    author: authors.justinCronk,
    site: sites.matc,
    genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"] as string[],
    wordCount: 153000,
    numberOfPages: 480,
    bookFormat: "EBook",
    bookEdition: "First Edition",
    datePublished: "2026",
    releaseLabel: "Coming August 2026",
    typicalAgeRange: "16+",
    isFamilyFriendly: true,
    inLanguage: "en",
    description: sites.matc.description,
    shortDescription:
      "In a world where magic is memory and every act of power costs a piece of who you are, a boy raised on silence discovers he can hear the world sing. 153,000 words. Nine years in the making.",
    twitterDescription:
      "Magic is memory. The Song is love made audible. The cost is everything. A 153,000-word literary fantasy debut. Part I available now — $2.99.",
    comparables:
      "Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, Ursula K. Le Guin",
    keywords:
      "literary fantasy, epic fantasy, magic is memory, epic fantasy debut, books like Name of the Wind, books like Assassin's Apprentice, books like Tigana, books like A Wizard of Earthsea, fantasy books where magic has a cost, best fantasy books 2026, best epic fantasy books 2026, unique magic systems, character-driven fantasy, best new fantasy novels, fantasy books about sacrifice, fantasy novel about memory, best indie fantasy books, coming of age fantasy, fantasy with complex villains, found family fantasy, serialized fantasy novel, best literary fantasy books, fantasy debut authors 2026",
    readFreeUrl: `${sites.matc.url}/read/part-one`,
    readFreeUrlStillfire: `${sites.stillfirePress.url}/read/matc`,
    buyUrl: "https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g",
    price: "2.99",
    priceCurrency: "USD",
    blockchainProof: blockchainProofs.matc,
    parts: [
      {
        title: "Man Amongst the Clouds: Part I — The Still Water",
        edition: "Part I",
        description:
          "Prologue and Chapters 1–10. Aelo has lived in silence for fifteen years, raised by a scarred old man in a village too small to have a name. When the herbs fail and the silence breaks, he discovers magic is memory — and he can hear all of it.",
        price: "2.99" as string | undefined,
        priceCurrency: "USD" as string | undefined,
        availability: "https://schema.org/InStock",
      },
      {
        title: "Man Amongst the Clouds: Part II — The Waking",
        edition: "Part II",
        description:
          "The journey out of silence and into the larger world. Aelo begins to learn what magic costs — and what it means to be heard.",
        price: undefined as string | undefined,
        priceCurrency: undefined as string | undefined,
        availability: "https://schema.org/PreOrder",
      },
    ],
    seoKeywords: [
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
      "best epic fantasy books",
      "best epic fantasy books 2026",
      "best epic fantasy novels",
      "epic fantasy series 2026",
      "new epic fantasy series",
      "best fantasy books of all time",
      "best fantasy books like Name of the Wind",
      "books like Assassins Apprentice",
      "books like Tigana",
      "books like A Wizard of Earthsea",
      "fantasy books where magic has a cost",
      "best fantasy books with unique magic systems",
      "best character driven fantasy",
      "best literary fantasy books",
      "fantasy books about sacrifice",
      "fantasy novels about found family",
      "best indie fantasy books 2026",
      "best self published fantasy books",
      "fantasy novel with mentor student relationship",
      "coming of age fantasy novel",
      "fantasy books with complex villains",
      "best new fantasy authors 2026",
      "epic fantasy with literary prose",
      "fantasy novel about love and loss",
      "best fantasy world building",
      "fantasy books for adults",
      "serialized fantasy novel",
      "five part fantasy series",
      "best fantasy books to read in 2026",
      "fantasy debut authors to watch",
    ],
    about: [
      "Memory",
      "Magic systems",
      "Sacrifice",
      "Loss and grief",
      "Found family",
      "Coming of age",
      "Power and its cost",
      "World building",
    ],
  },
  ashToFury: {
    title: "Ash to Fury",
    shortTitle: "ATF",
    slug: "ash-to-fury",
    author: authors.carterCronk,
    site: sites.ashToFury,
    genre: ["Dark Fantasy", "Epic Fantasy"] as string[],
    inLanguage: "en",
    releaseLabel: "Coming 2027",
    description: sites.ashToFury.description,
    shortDescription:
      "A dark fantasy about a man of extraordinary discipline who is unmade by the very obedience he believed was strength. Grief becomes transformation. Restraint becomes fury.",
    twitterDescription:
      "A disciplined man. A devastating betrayal. A transformation forged in grief and fire.",
    comparables: "Joe Abercrombie, Mark Lawrence, R. Scott Bakker",
    keywords:
      "dark fantasy, grimdark, discipline and fury, transformation, dark fantasy debut, indie fantasy novel, new dark fantasy 2027",
    blockchainProof: blockchainProofs.ashToFury,
    seoKeywords: [
      "Ash to Fury",
      "Carter Cronk",
      "dark fantasy novel",
      "fantasy book",
      "Stillfire Press",
      "shapeshifter fantasy",
      "grief fantasy",
      "dark fantasy 2027",
      "new fantasy books",
      "debut fantasy novel",
      "magic academy fantasy",
      "revenge fantasy",
      "transformation fantasy",
      "literary dark fantasy",
      "epic fantasy",
      "fantasy series",
      "indie fantasy",
      "self-published fantasy",
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Cross-site navigation (the "ecosystem ring")
// Used in every site's footer and/or a shared ecosystem bar so users can
// navigate between all three sites seamlessly.
// ---------------------------------------------------------------------------

export type EcosystemLink = {
  label: string;
  shortLabel: string;
  url: string;
  description: string;
  accentColor: string;
};

export const ecosystemLinks: EcosystemLink[] = [
  {
    label: "Man Amongst the Clouds",
    shortLabel: "MATC",
    url: sites.matc.url,
    description: "Literary fantasy by Justin Cronk — read Part I free",
    accentColor: sites.matc.accentColor,
  },
  {
    label: "Ash to Fury",
    shortLabel: "Ash to Fury",
    url: sites.ashToFury.url,
    description: "Dark fantasy by Carter Cronk — coming 2027",
    accentColor: sites.ashToFury.accentColor,
  },
  {
    label: "Stillfire Press",
    shortLabel: "Stillfire Press",
    url: sites.stillfirePress.url,
    description: "Indie fantasy press — buy direct from the authors",
    accentColor: sites.stillfirePress.accentColor,
  },
];

// ---------------------------------------------------------------------------
// sameAs arrays (for JSON-LD structured data)
// ---------------------------------------------------------------------------

export const sameAs = {
  matc: [
    sites.stillfirePress.url,
    sites.ashToFury.url,
    social.facebookStillfirePress.url,
  ],
  ashToFury: [
    sites.stillfirePress.url,
    sites.matc.url,
    social.facebookStillfirePress.url,
  ],
  stillfirePress: [
    sites.matc.url,
    sites.ashToFury.url,
    social.facebookStillfirePress.url,
  ],
};

// ---------------------------------------------------------------------------
// JSON-LD generators
// Structured data builders so each site produces consistent schema.org markup.
// ---------------------------------------------------------------------------

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    alternateName: "Stillfire",
    url: sites.stillfirePress.url,
    description: sites.stillfirePress.description,
    foundingDate: organization.foundingDate,
    founder: organization.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.jobTitle,
      url: f.url,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: organization.legalName,
    },
    sameAs: sameAs.stillfirePress,
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
      url: `${sites.stillfirePress.url}/contact`,
    },
  };
}

export function buildBookJsonLd(bookKey: "manAmongstTheClouds" | "ashToFury") {
  const book = books[bookKey];
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author.name,
      url: book.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: organization.name,
      url: sites.stillfirePress.url,
    },
    genre: book.genre,
    inLanguage: book.inLanguage,
    description: book.description,
    url: book.site.url,
    sameAs: sameAs[bookKey === "manAmongstTheClouds" ? "matc" : "ashToFury"],
  };

  if (bookKey === "manAmongstTheClouds") {
    const matc = books.manAmongstTheClouds;
    base["alternateName"] = matc.shortTitle;
    base["bookFormat"] = matc.bookFormat;
    base["bookEdition"] = matc.bookEdition;
    base["numberOfPages"] = matc.numberOfPages;
    base["wordCount"] = matc.wordCount;
    base["datePublished"] = matc.datePublished;
    base["copyrightYear"] = parseInt(matc.datePublished);
    base["isFamilyFriendly"] = matc.isFamilyFriendly;
    base["typicalAgeRange"] = matc.typicalAgeRange;
    base["audience"] = {
      "@type": "PeopleAudience",
      suggestedMinAge: 16,
      audienceType: `Readers of literary fantasy, epic fantasy, and character-driven fantasy. Fans of ${matc.comparables}.`,
    };
    base["about"] = matc.about.map((t: string) => ({
      "@type": "Thing",
      name: t,
    }));
    base["offers"] = {
      "@type": "Offer",
      price: matc.price,
      priceCurrency: matc.priceCurrency,
      availability: "https://schema.org/InStock",
      url: matc.buyUrl,
    };
    base["workExample"] = matc.parts.map((p) => {
      const offer: Record<string, string> = {
        "@type": "Offer",
        availability: p.availability,
      };
      if (p.price) {
        offer["price"] = p.price;
      }
      if (p.priceCurrency) {
        offer["priceCurrency"] = p.priceCurrency;
      }
      return {
        "@type": "Book",
        name: p.title,
        bookEdition: p.edition,
        bookFormat: "EBook",
        description: p.description,
        offers: offer,
      };
    });
    base["keywords"] = matc.keywords;
    base["mainEntityOfPage"] = `${sites.matc.url}/the-book`;
  }

  return base;
}

export function buildWebsiteJsonLd(
  siteKey: "matc" | "ashToFury" | "stillfirePress",
) {
  const site = sites[siteKey];
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    ...(siteKey === "matc" ? { alternateName: "MATC" } : {}),
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: organization.name,
      url: sites.stillfirePress.url,
    },
  };
}

export function buildBookStoreJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BookStore",
    name: organization.name,
    url: sites.stillfirePress.url,
    description: sites.stillfirePress.description,
    founder: organization.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.jobTitle,
      description: f.bio,
      sameAs:
        f.name === "Justin Cronk"
          ? [
              `${sites.matc.url}/about-the-author`,
              social.facebookStillfirePress.url,
            ]
          : [sites.ashToFury.url],
    })),
    foundingDate: organization.foundingDate,
    parentOrganization: {
      "@type": "Organization",
      name: organization.legalName,
    },
    sameAs: sameAs.stillfirePress,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${sites.stillfirePress.url}/contact`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Books",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Book",
            name: books.manAmongstTheClouds.title,
            alternateName: books.manAmongstTheClouds.shortTitle,
            author: {
              "@type": "Person",
              name: books.manAmongstTheClouds.author.name,
            },
            bookFormat: "https://schema.org/EBook",
            bookEdition: books.manAmongstTheClouds.bookEdition,
            genre: books.manAmongstTheClouds.genre,
            numberOfPages: books.manAmongstTheClouds.numberOfPages,
            wordCount: books.manAmongstTheClouds.wordCount,
            inLanguage: "en",
            datePublished: books.manAmongstTheClouds.datePublished,
            typicalAgeRange: books.manAmongstTheClouds.typicalAgeRange,
            description: books.manAmongstTheClouds.description,
            url: sites.matc.url,
            keywords: books.manAmongstTheClouds.keywords,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: books.manAmongstTheClouds.readFreeUrlStillfire,
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Book",
            name: books.ashToFury.title,
            author: {
              "@type": "Person",
              name: books.ashToFury.author.name,
            },
            bookFormat: "https://schema.org/EBook",
            genre: books.ashToFury.genre,
            inLanguage: "en",
            description: books.ashToFury.shortDescription,
            url: sites.ashToFury.url,
            keywords: books.ashToFury.keywords,
          },
        },
      ],
    },
  };
}
