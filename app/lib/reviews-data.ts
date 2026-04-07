// ============================================================================
// Amazon Reviews — Man Amongst the Clouds
// Source: https://www.amazon.com/dp/B0GSSPN6LN
// ============================================================================

export interface Review {
  author: string;
  rating: number;
  date: string;
  format: string;
  verified: boolean;
  title?: string;
  body: string;
  helpfulCount?: number;
}

export const reviews: Review[] = [
  {
    author: "Amazon Customer",
    rating: 5,
    date: "2026-03-25",
    format: "Kindle",
    verified: true,
    body: "I picked up Man Amongst the Clouds not really knowing what to expect, and it ended up sticking with me more than most books I've read lately. This isn't a fast, plot-driven story — it's more reflective and philosophical, but in a way that feels intentional rather than slow. The writing has a kind of raw honesty to it, like the author is working through something real instead of just telling a story. There were multiple moments where I had to pause and reread a paragraph because it hit harder than I expected. What stood out most to me was the voice. It feels personal without being overly polished, which I actually appreciated — it made the whole thing feel more human. There's a mix of introspection, subtle world-building, and emotional weight that builds as you go. It's not the kind of book that hands you everything; you have to sit with it a bit.",
    helpfulCount: 3,
  },
  {
    author: "Amazon Customer",
    rating: 5,
    date: "2026-03-25",
    format: "Kindle",
    verified: true,
    body: "It's not your typical fantasy, which is what makes it so good. It's more thoughtful and character-driven, and the writing just feels real. There were a few moments that really stuck with me even after I finished.",
  },
];

export const aggregateRating = {
  ratingValue: 5.0,
  reviewCount: reviews.length,
  bestRating: 5,
  worstRating: 1,
};

// JSON-LD for Google rich snippets
export function buildReviewJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Man Amongst the Clouds",
    author: {
      "@type": "Person",
      name: "Justin Cronk",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.author,
      },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body,
    })),
  };
}
