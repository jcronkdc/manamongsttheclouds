import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const title =
  "The Book — Man Amongst the Clouds by Justin Cronk | Best New Epic Fantasy 2026 on Amazon Kindle";
const description =
  "Man Amongst the Clouds is a literary fantasy novel where magic is memory and every act of power costs a piece of who you are. By Justin Cronk, published by Stillfire Press. For fans of Patrick Rothfuss, Robin Hobb, and Guy Gavriel Kay. Available now on Amazon Kindle, hardcover, and paperback. One of the best new epic fantasy books of 2026.";
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
  numberOfPages: 463,
  genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"],
  inLanguage: "en",
  description,
  url: "https://www.manamongsttheclouds.com",
  isbn: "979-8-234-03365-9",
  publisher: {
    "@type": "Organization",
    name: "Stillfire Press",
    url: "https://stillfirepress.com",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.amazon.com/dp/B0GSSPN6LN",
  },
  datePublished: "2026-03-17",
  keywords:
    "literary fantasy, magic is memory, epic fantasy debut, memory magic system, fantasy novel about sacrifice, books like Name of the Wind, books like Robin Hobb, fantasy books where magic has a cost",
  sameAs: [
    "https://stillfirepress.com",
    "https://www.facebook.com/profile.php?id=61583731204411",
    "https://www.facebook.com/profile.php?id=61575289025498",
    "https://x.com/justinwcronk",
    "https://www.amazon.com/dp/B0GSSPN6LN",
    "https://www.amazon.com/dp/B0GT5PJKJX",
    "https://www.amazon.com/dp/B0GT1GFXRT",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the best new fantasy books of 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk is a literary fantasy debut published in March 2026 by Stillfire Press. In a world where magic is memory and every act of power costs a piece of who you are, a boy raised on silence discovers he can hear the world sing. For fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and Ursula K. Le Guin. Available now on Amazon Kindle.",
      },
    },
    {
      "@type": "Question",
      name: "What fantasy books are similar to The Name of the Wind by Patrick Rothfuss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk shares the lyrical prose, obsessive world-building, and deeply personal magic system that fans of The Name of the Wind love. Both feature a protagonist discovering extraordinary magical ability, a magic system with clear rules and costs, and literary prose that elevates the fantasy genre. The magic in Man Amongst the Clouds is rooted in memory — every object remembers what it once was, and practitioners pay an irreversible personal cost for every act of power.",
      },
    },
    {
      "@type": "Question",
      name: "What fantasy books are similar to Robin Hobb's Assassin's Apprentice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk shares Robin Hobb's emotional devastation, complex mentor-student relationships, and character-driven storytelling. Like Fitz, protagonist Aelo is raised in secrecy by a guardian whose every lie is an act of love. The novel features the slow-burn emotional intensity, morally complex characters, and deep interiority that define Hobb's work.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best fantasy books where magic has a cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk features one of the most personal magic costs in fantasy. Magic is memory — practitioners commune with the world's remembering, but every act of power costs something irreversible. The Know costs your emotional boundaries. The Heal transfers every wound into your own body. The Burn steals the warmth inside you. And The Sing — the rarest discipline — costs everything: you dissolve into the memory of the world itself. Seven disciplines, seven costs, all rooted in real research from Traditional Chinese Medicine and alchemical traditions.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best fantasy books with unique magic systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk features a magic system where magic is memory. Every stone remembers the mountain it was part of. Every flame remembers the first spark. Seven disciplines — The Know, The Mold, The Heal, The Move, The Guide, The Burn, and The Sing — each a different way of hearing the world's memory. The system was built from nine years of research including Traditional Chinese Medicine's Five Element Theory, real alchemical processes called spagyrics, and herbalism.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best indie fantasy novels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk is an indie literary fantasy published by Stillfire Press, an independent press founded by a father-son duo. The manuscript is blockchain-verified on the Polygon network. Available now on Amazon Kindle, and also available direct from the author at stillfirepress.com. For fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and Ursula K. Le Guin.",
      },
    },
    {
      "@type": "Question",
      name: "What fantasy books are similar to Guy Gavriel Kay's Tigana?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk shares Kay's lyrical sentence-level beauty, the weight of memory as a central theme, and a villain whose cruelty is rooted in grief rather than evil for its own sake. King Varas was born deaf to the Song in a world where everything sings — his seventy-year reign of consumption is grief turned to empire. Like Tigana, this is fantasy that treats its genre as literature.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best character-driven fantasy novels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk is built around deeply human characters. Aelo, the boy who hears the world sing. Jalo, a guardian whose every lie is love. The Knife, an assassin who carries a box of five beautiful objects to prove he was ever a person. King Varas, the deaf king who burned the world to fill his silence. Every character has a full backstory, MBTI profile, and clinical cross-referencing to ensure internally consistent behavior.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best epic fantasy books of 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk is among the best epic fantasy books of 2026. It is a literary fantasy spanning five parts, featuring seven distinct regions, a memory-based magic system with seven disciplines, a complex villain born deaf to magic in a world where everything sings, and an intimate story about a guardian who raises a child in hiding for fifteen years. Epic in scope, literary in voice. Available now on Amazon Kindle.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best epic fantasy series to start in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk is a five-part epic literary fantasy novel published in March 2026 by Stillfire Press. The complete novel spans 48 chapters. It features a memory-based magic system, seven distinct regions, and characters whose emotional complexity rivals literary fiction. Available now on Amazon Kindle. For fans of The Kingkiller Chronicle, The Farseer Trilogy, Tigana, and A Wizard of Earthsea.",
      },
    },
    {
      "@type": "Question",
      name: "What fantasy books have the best world building?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk features nine years of obsessive world-building drawn from Traditional Chinese Medicine, alchemical spagyrics, herbalism, medieval timber construction, and the world's largest castles. The magic system has seven disciplines based on memory, each with an irreversible cost. The world spans seven regions from the Canopy forest to the Cloud Palace to the Murkr dead zone. Every detail was researched and earned, nothing invented from convenience.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best fantasy books about found family?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk is one of the best found-family fantasy novels. At its heart is the relationship between Jalo (a scarred guardian who burned his own face to hide his identity) and Aelo (the boy he rescued from a burning nursery and raised in secret for fifteen years). The novel explores how love and harm can be the same gesture — a man who drugged a child every morning to suppress his magic, who lied about everything, and who did it all because it was the only way to keep him alive.",
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
        <Nav />
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
            A literary fantasy debut where{" "}
            <strong className="text-[#c9a84c]">magic is memory</strong> and
            every act of power costs a piece of who you are.
          </p>
        </header>

        {/* Entity-answering paragraph */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-10">
          <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-[1.8] text-center">
            <strong className="text-[#d4d0c8]">Man Amongst the Clouds</strong>{" "}
            is a literary fantasy novel by Justin Cronk, published by Stillfire
            Press on March 17, 2026. The novel is set in a world where magic is
            rooted in memory &mdash; every object remembers what it once was,
            and practitioners who learn to listen to the world&rsquo;s
            remembering pay an irreversible personal cost for every act of
            power. The story follows Aelo, a boy raised on silence who discovers
            he can hear the world sing, and is pursued by an assassin known as
            The Knife, sent by a deaf king who has spent seventy years draining
            the memories of others to fill his own silence. Available now on
            Amazon in Kindle, hardcover, and paperback editions. Comparable to
            the works of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and
            Ursula K. Le Guin.
          </p>
        </section>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        {/* Synopsis */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            The Story
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              For fifteen years,{" "}
              <strong className="text-[#ededed]">Aelo</strong> has lived in
              silence &mdash; raised by a scarred old man in a village too small
              to have a name, fed herbs every morning that suppress a power he
              doesn&rsquo;t know he carries. He has never heard the world sing.
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
            48 chapters &bull; Five parts &bull; A prologue and an epilogue
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { part: "I", name: "The Still Water" },
              { part: "II", name: "The Waking" },
              { part: "III", name: "The Burning" },
              { part: "IV", name: "The Song" },
              { part: "V", name: "The Morning" },
            ].map((p) => (
              <div
                key={p.part}
                className="px-4 py-5 text-center border border-[#c9a84c]/40 bg-[#c9a84c]/5"
              >
                <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase text-[#c9a84c]">
                  Part {p.part}
                </p>
                <p className="font-[family-name:var(--font-serif)] text-sm mt-1 text-[#ededed]">
                  {p.name}
                </p>
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
              <div
                key={item.label}
                className="border-l-2 border-[#c9a84c]/20 pl-6"
              >
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
            Available now on Amazon
          </p>
          <div className="flex flex-col items-center">
            <a
              href="https://www.amazon.com/dp/B0GSSPN6LN"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
            >
              Buy on Amazon
            </a>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] text-[#888] mt-4">
              <a
                href="https://www.amazon.com/dp/B0GSSPN6LN"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c9a84c] transition-colors"
              >
                Kindle
              </a>
              &ensp;&bull;&ensp;
              <a
                href="https://www.amazon.com/dp/B0GT5PJKJX"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c9a84c] transition-colors"
              >
                Hardcover
              </a>
              &ensp;&bull;&ensp;
              <a
                href="https://www.amazon.com/dp/B0GT1GFXRT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c9a84c] transition-colors"
              >
                Paperback
              </a>
            </p>
            <a
              href="https://stillfirepress.com/read/matc"
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] text-[#666] hover:text-[#c9a84c] transition-colors mt-3"
            >
              or read Part One free &rarr;
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
        <Footer />
      </div>
    </>
  );
}
