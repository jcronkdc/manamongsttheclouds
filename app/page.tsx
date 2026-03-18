import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Synopsis from "./components/Synopsis";
import WorldSection from "./components/WorldSection";
import Characters from "./components/Characters";
import Excerpt from "./components/Excerpt";
import Journey from "./components/Journey";
import Origins from "./components/Origins";
import CompTitles from "./components/CompTitles";
import ReadSection from "./components/ReadSection";
import SignupSection from "./components/SignupSection";
import ProofSection from "./components/ProofSection";
import SEOArticle from "./components/SEOArticle";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import { faqs } from "./lib/faq-data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const seriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWorkSeries",
  name: "Man Amongst the Clouds",
  alternateName: "MATC",
  author: {
    "@type": "Person",
    name: "Justin Cronk",
    url: "https://www.manamongsttheclouds.com/about-the-author",
  },
  publisher: {
    "@type": "Organization",
    name: "Stillfire Press",
    url: "https://stillfirepress.com",
  },
  genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"],
  inLanguage: "en",
  description:
    "A 146,000-word literary fantasy novel where magic is memory and every act of power costs a piece of who you are. Five parts, 48 chapters. By Justin Cronk, published by Stillfire Press. Available now on Amazon Kindle.",
  url: "https://www.manamongsttheclouds.com",
  datePublished: "2026-03-17",
  bookFormat: "EBook",
  bookEdition: "First Edition",
  numberOfPages: 463,
  wordCount: 146007,
  isbn: "979-8-234-03365-9",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.amazon.com/dp/B0GSXVL4HB",
  },
};

const disciplinesListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Seven Disciplines of Magic in Man Amongst the Clouds",
  description:
    "The seven disciplines of the memory-based magic system in Man Amongst the Clouds by Justin Cronk. Each discipline is a different way of hearing the world's memory, and each exacts an irreversible personal cost.",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "The Know",
      description:
        "Empathic communion with every living thing. Cost: your emotional boundaries.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "The Mold",
      description:
        "Reshaping matter through its memory of what it once was. Cost: the feeling in your hands.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "The Heal",
      description:
        "Reminding flesh of wholeness. Cost: you carry every wound you mend.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "The Move",
      description:
        "Folding distance through spatial memory. Cost: your sense of where you are.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "The Guide",
      description:
        "Reading the memory of paths and journeys. Cost: your memory of home.",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "The Burn",
      description:
        "Awakening fire from the world's first memory. Cost: the warmth inside you.",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "The Sing",
      description:
        "Harmonizing all seven voices at once. The rarest discipline. Cost: everything — you dissolve into the memory of the world itself.",
    },
  ],
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Book",
    name: "Man Amongst the Clouds",
    author: { "@type": "Person", name: "Justin Cronk" },
  },
  author: {
    "@type": "Organization",
    name: "Stillfire Press Editorial",
  },
  reviewBody:
    "A 146,000-word literary fantasy debut featuring a magic system rooted in memory and sacrifice, a villain whose monstrousness is fully human, and a hero whose greatest power is the willingness to listen. For fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and Ursula K. Le Guin.",
  name: "Editorial Review",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(disciplinesListJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <Nav />
      <Hero />
      <Synopsis />
      <WorldSection />
      <Characters />
      <Excerpt />
      <CompTitles />
      <Journey />
      <Origins />
      <ReadSection />
      <SignupSection />
      <ProofSection />
      <SEOArticle />
      <FAQSection />
      <Footer />
    </main>
  );
}
