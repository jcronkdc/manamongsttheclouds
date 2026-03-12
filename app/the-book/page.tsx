import type { Metadata } from "next";
import Link from "next/link";

const title = "The Book — Man Amongst the Clouds by Justin Cronk";
const description =
  "Man Amongst the Clouds is a 153,000-word literary fantasy novel where magic is memory and every act of power costs a piece of who you are. A debut novel nine years in the making by Justin Cronk, published by Stillfire Press. Part I available now for $2.99.";
const url = "https://www.manamongsttheclouds.com/the-book";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "book",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
    url: "https://www.manamongsttheclouds.com/about-the-author",
  },
  bookFormat: "EBook",
  bookEdition: "First Edition",
  numberOfPages: 480,
  genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"],
  inLanguage: "en",
  description,
  url: "https://www.manamongsttheclouds.com",
  isbn: "",
  publisher: {
    "@type": "Organization",
    name: "Stillfire Press",
    url: "https://stillfirepress.com",
  },
  offers: {
    "@type": "Offer",
    price: "2.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g",
  },
  datePublished: "2026",
  keywords:
    "literary fantasy, magic is memory, epic fantasy debut, memory magic system, fantasy novel about sacrifice, books like Name of the Wind, books like Robin Hobb, fantasy books where magic has a cost",
  sameAs: [
    "https://stillfirepress.com",
    "https://www.facebook.com/profile.php?id=61583731204411",
  ],
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
      name: "The Book",
      item: url,
    },
  ],
};

export default function TheBookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
        {/* Header */}
        <header className="pt-20 pb-12 px-5 sm:px-6 text-center">
          <nav className="mb-8">
            <Link
              href="/"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              &larr; Back to Home
            </Link>
          </nav>
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
            The Book
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6">
            Man Amongst
            <br />
            the Clouds
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#c9a84c]/70 tracking-[0.2em] mb-8">
            by Justin Cronk
          </p>
          <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl text-[#d4d0c8] max-w-2xl mx-auto leading-relaxed">
            A 153,000-word literary fantasy debut where{" "}
            <strong className="text-[#c9a84c]">magic is memory</strong> and
            every act of power costs a piece of who you are.
          </p>
        </header>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        {/* Synopsis */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            The Story
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              For fifteen years, <strong className="text-[#ededed]">Aelo</strong>{" "}
              has lived in silence &mdash; raised by a scarred old man in a
              village too small to have a name, fed herbs every morning that
              suppress a power he doesn&rsquo;t know he carries. He has never
              heard the world sing.
            </p>
            <p>
              When the herbs fail and the silence breaks, Aelo discovers that
              magic is not a force to be wielded &mdash; it is a conversation
              with the world&rsquo;s memory. And he can hear{" "}
              <em className="text-[#ededed]">all of it</em>.
            </p>
            <p>
              But a king sits on an obsidian throne at the center of a dead
              zone, draining the memories of hundreds to feed a hunger that was
              born the day the world chose everyone except him.{" "}
              <strong className="text-[#ededed]">King Varas</strong> cannot hear
              the Song. He never could. And he has spent seventy years consuming
              the world to fill the silence.
            </p>
            <p>
              Now Varas has sent his most lethal weapon &mdash; a man known only
              as <strong className="text-[#ededed]">The Knife</strong>, who
              carries a wooden box of five beautiful objects and checks them
              every night because the checking is the only act that proves he is
              still a person &mdash; to find the boy who made a stone sing.
            </p>
          </div>
          <div className="mt-10 border-l-2 border-[#c9a84c]/30 pl-6">
            <p className="font-[family-name:var(--font-serif)] text-lg italic text-[#ededed] leading-relaxed">
              A story about what it means to hear and be heard. About what we
              lose to become what we&rsquo;re meant to be. About a man who was
              born without the Song &mdash; and burned the world trying to find
              it.
            </p>
          </div>
        </section>

        {/* Five Parts */}
        <section className="max-w-3xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-4">
            Five Parts. One Journey.
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] text-center mb-10">
            153,000 words &bull; 48 chapters &bull; A prologue and an epilogue
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { part: "I", name: "The Still Water", status: "available" },
              { part: "II", name: "The Waking", status: "preorder" },
              { part: "III", name: "The Breaking", status: "coming" },
              { part: "IV", name: "The Chamber", status: "coming" },
              { part: "V", name: "The Remembering", status: "coming" },
            ].map((p) => (
              <div
                key={p.part}
                className={`px-4 py-5 text-center ${
                  p.status === "available"
                    ? "border border-[#c9a84c]/40 bg-[#c9a84c]/5"
                    : p.status === "preorder"
                      ? "border border-[#c9a84c]/20 bg-[#c9a84c]/[0.02]"
                      : "border border-[#222]"
                }`}
              >
                <p
                  className={`font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase ${
                    p.status === "available"
                      ? "text-[#c9a84c]"
                      : p.status === "preorder"
                        ? "text-[#c9a84c]/70"
                        : "text-[#555]"
                  }`}
                >
                  Part {p.part}
                </p>
                <p
                  className={`font-[family-name:var(--font-serif)] text-sm mt-1 ${
                    p.status === "available"
                      ? "text-[#ededed]"
                      : p.status === "preorder"
                        ? "text-[#b0a89e]"
                        : "text-[#444]"
                  }`}
                >
                  {p.name}
                </p>
                {p.status === "available" && (
                  <p className="font-[family-name:var(--font-sans)] text-[8px] tracking-[0.15em] uppercase text-[#c9a84c] mt-1">
                    Available Now
                  </p>
                )}
                {p.status === "preorder" && (
                  <p className="font-[family-name:var(--font-sans)] text-[8px] tracking-[0.15em] uppercase text-[#c9a84c]/50 mt-1">
                    Pre-Order
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What makes it different */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            What Makes This Book Different
          </h2>
          <div className="space-y-8">
            {[
              {
                label: "A magic system rooted in memory",
                text: "Every stone remembers the mountain it was part of. Every flame remembers the first spark. Magic is the ability to commune with these memories — and every act of listening costs a piece of who you are.",
              },
              {
                label: "A villain who is fully human",
                text: "King Varas was born deaf to the Song in a world where everything sings. He didn't choose to be a monster. He wanted to hear the music. His seventy-year reign of consumption is grief turned to empire.",
              },
              {
                label: "Nine years of obsessive world-building",
                text: "Researched from Traditional Chinese Medicine, real alchemical processes, medieval timber construction, and the world's largest castles. Every detail earned, nothing invented from convenience.",
              },
              {
                label: "Literary prose in a fantasy framework",
                text: "For readers who love the sentence-level beauty of Guy Gavriel Kay, the emotional devastation of Robin Hobb, the lyrical world-building of Patrick Rothfuss, and the philosophical depth of Ursula K. Le Guin.",
              },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-[#c9a84c]/20 pl-6">
                <h3 className="font-[family-name:var(--font-serif)] text-lg text-[#ededed] mb-2">
                  {item.label}
                </h3>
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-lg mx-auto px-5 sm:px-6 pb-20 text-center">
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10" />
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide mb-4">
            Start Reading
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#b0a89e] mb-8">
            Part I: The Still Water &mdash; Prologue + Chapters 1&ndash;10
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://stillfirepress.com/read/matc"
              className="px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
            >
              Read Part One Free
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-6">
            <Link
              href="/the-magic-system"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              The Magic System &rarr;
            </Link>
            <Link
              href="/characters"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              The Characters &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
