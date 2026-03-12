import type { Metadata } from "next";
import Link from "next/link";

const title =
  "Press Kit — Man Amongst the Clouds by Justin Cronk | Stillfire Press";
const description =
  "Press kit for Man Amongst the Clouds, a 153,000-word literary fantasy debut by Justin Cronk. Published by Stillfire Press in 2026. Magic is memory. For fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and Ursula K. Le Guin. Includes book details, author bio, comparable titles, and media-ready descriptions.";
const url = "https://www.manamongsttheclouds.com/press";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit — Man Amongst the Clouds",
    description,
  },
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
      name: "Press Kit",
      item: url,
    },
  ],
};

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Man Amongst the Clouds",
  alternateName: "MATC",
  author: {
    "@type": "Person",
    name: "Justin Cronk",
    url: "https://www.manamongsttheclouds.com/about-the-author",
    jobTitle: "Author",
    description:
      "First-time novelist, military veteran, and co-founder of Stillfire Press. Nine years writing a literary fantasy debut rooted in real research, real places, and a magic system based on memory.",
  },
  bookFormat: "EBook",
  bookEdition: "First Edition",
  numberOfPages: 480,
  wordCount: 153000,
  genre: ["Literary Fantasy", "Epic Fantasy", "Dark Fantasy"],
  inLanguage: "en",
  description:
    "In a world where magic is memory and every act of power costs a piece of who you are, a boy raised on silence discovers he can hear the world sing. A 153,000-word literary fantasy debut nine years in the making.",
  url: "https://www.manamongsttheclouds.com",
  datePublished: "2026",
  copyrightYear: 2026,
  typicalAgeRange: "16+",
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 16,
    audienceType:
      "Readers of literary fantasy, epic fantasy, and character-driven fantasy. Fans of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, Ursula K. Le Guin, and Tad Williams.",
  },
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
  about: [
    { "@type": "Thing", name: "Memory" },
    { "@type": "Thing", name: "Magic systems" },
    { "@type": "Thing", name: "Sacrifice" },
    { "@type": "Thing", name: "Loss and grief" },
    { "@type": "Thing", name: "Found family" },
    { "@type": "Thing", name: "Coming of age" },
    { "@type": "Thing", name: "Power and its cost" },
  ],
  keywords:
    "literary fantasy, magic is memory, epic fantasy debut, memory magic system, fantasy novel about sacrifice, books like Name of the Wind, books like Assassin's Apprentice, books like Tigana, books like A Wizard of Earthsea, best fantasy books 2026, fantasy books where magic has a cost, character-driven fantasy, indie fantasy novel, unique magic systems in fantasy",
  sameAs: [
    "https://stillfirepress.com",
    "https://www.facebook.com/profile.php?id=61583731204411",
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Books similar to Man Amongst the Clouds",
  description:
    "If you enjoyed these books, you will love Man Amongst the Clouds by Justin Cronk.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Book",
        name: "The Name of the Wind",
        author: { "@type": "Person", name: "Patrick Rothfuss" },
        description:
          "Lyrical prose, obsessive world-building, a magic system with clear rules. Man Amongst the Clouds shares the same literary ambition and deeply personal magic.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Book",
        name: "Assassin's Apprentice",
        author: { "@type": "Person", name: "Robin Hobb" },
        description:
          "Emotional devastation, complex mentor-student bonds, character-driven storytelling. Man Amongst the Clouds shares the slow-burn intensity and deep interiority.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Book",
        name: "Tigana",
        author: { "@type": "Person", name: "Guy Gavriel Kay" },
        description:
          "Sentence-level beauty, memory as a central theme, a villain whose cruelty is rooted in grief. Man Amongst the Clouds shares Kay's treatment of fantasy as literature.",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Book",
        name: "A Wizard of Earthsea",
        author: { "@type": "Person", name: "Ursula K. Le Guin" },
        description:
          "Philosophical depth, the cost of power, a young person discovering dangerous ability. Man Amongst the Clouds shares Le Guin's conviction that magic should mean something.",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Book",
        name: "The Memory of Souls",
        author: { "@type": "Person", name: "Jenn Lyons" },
        description:
          "Epic scope, memory as power, morally complex characters. Man Amongst the Clouds shares the grand ambition and thematic weight of Lyons' work.",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Book",
        name: "The Tawny Man Trilogy",
        author: { "@type": "Person", name: "Robin Hobb" },
        description:
          "Grief, sacrifice, the cost of love. Man Amongst the Clouds shares Hobb's devastating emotional honesty and willingness to let characters suffer real consequences.",
      },
    },
  ],
};

export default function PressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
            Press Kit
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6">
            Man Amongst the Clouds
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#c9a84c]/70 tracking-[0.2em] mb-4">
            by Justin Cronk
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base text-[#d4d0c8] max-w-xl mx-auto leading-relaxed">
            A literary fantasy debut. 153,000 words. Published by Stillfire
            Press, 2026.
          </p>
        </header>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        {/* Quick Facts */}
        <section className="max-w-3xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            At a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#c9a84c]/10">
            {[
              { label: "Title", value: "Man Amongst the Clouds" },
              { label: "Author", value: "Justin Cronk" },
              { label: "Publisher", value: "Stillfire Press" },
              { label: "Word Count", value: "153,000 words" },
              { label: "Genre", value: "Literary Fantasy / Epic Fantasy" },
              { label: "Format", value: "eBook (serialized in five parts)" },
              { label: "Part I Price", value: "$2.99 USD" },
              { label: "Age Range", value: "16+" },
              { label: "Published", value: "2026" },
              {
                label: "Verification",
                value: "Blockchain-verified on Polygon",
              },
            ].map((item) => (
              <div key={item.label} className="bg-[#0a0a0a] p-5">
                <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-1">
                  {item.label}
                </p>
                <p className="font-[family-name:var(--font-serif)] text-base text-[#ededed]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* One-Line Description */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Descriptions
          </h2>

          <div className="space-y-10">
            <div className="border-l-2 border-[#c9a84c]/20 pl-6">
              <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-3">
                One Line
              </p>
              <p className="font-[family-name:var(--font-serif)] text-lg text-[#ededed] leading-relaxed">
                In a world where magic is memory, a boy raised on silence
                discovers he can hear the world sing.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a84c]/20 pl-6">
              <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-3">
                Short Description
              </p>
              <p className="font-[family-name:var(--font-serif)] text-base text-[#d4d0c8] leading-relaxed">
                Man Amongst the Clouds is a 153,000-word literary fantasy debut
                where magic is memory and every act of power costs a piece of
                who you are. A boy raised on silence discovers he can hear the
                world sing. A king sits on an obsidian throne, draining memories
                to fill a silence nothing can fill. An assassin carries a box of
                five beautiful objects to prove he was ever a person. Nine years
                in the making. For fans of Patrick Rothfuss, Robin Hobb, Guy
                Gavriel Kay, and Ursula K. Le Guin.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a84c]/20 pl-6">
              <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-3">
                Full Synopsis
              </p>
              <div className="font-[family-name:var(--font-serif)] text-base text-[#d4d0c8] leading-[1.9] space-y-4">
                <p>
                  For fifteen years, Aelo has lived in silence &mdash; raised by
                  a scarred old man in a village too small to have a name, fed
                  herbs every morning that suppress a power he doesn&rsquo;t know
                  he carries. He has never heard the world sing.
                </p>
                <p>
                  When the herbs fail and the silence breaks, Aelo discovers that
                  magic is not a force to be wielded &mdash; it is a
                  conversation with the world&rsquo;s memory. And he can hear all
                  of it.
                </p>
                <p>
                  But a king sits on an obsidian throne at the center of a dead
                  zone, draining the memories of hundreds to feed a hunger that
                  was born the day the world chose everyone except him. King
                  Varas cannot hear the Song. He never could. And he has spent
                  seventy years consuming the world to fill the silence.
                </p>
                <p>
                  Now Varas has sent his most lethal weapon &mdash; a man known
                  only as The Knife, who carries a wooden box of five beautiful
                  objects and checks them every night because the checking is the
                  only act that proves he is still a person &mdash; to find the
                  boy who made a stone sing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparable Titles */}
        <section className="max-w-3xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-4">
            Comparable Titles
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] text-center mb-10">
            If you loved these books, you will love Man Amongst the Clouds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                book: "The Name of the Wind",
                author: "Patrick Rothfuss",
                why: "Lyrical prose, obsessive world-building, a deeply personal magic system with clear rules and real costs.",
              },
              {
                book: "Assassin's Apprentice",
                author: "Robin Hobb",
                why: "Emotional devastation, complex mentor-student relationships, slow-burn character development, deep interiority.",
              },
              {
                book: "Tigana",
                author: "Guy Gavriel Kay",
                why: "Sentence-level beauty, memory as a central theme, a villain whose cruelty is rooted in grief, fantasy as literature.",
              },
              {
                book: "A Wizard of Earthsea",
                author: "Ursula K. Le Guin",
                why: "Philosophical depth, the cost of power, a young person discovering dangerous ability, magic that means something.",
              },
              {
                book: "The Tawny Man Trilogy",
                author: "Robin Hobb",
                why: "Grief, sacrifice, the cost of love, devastating emotional honesty, characters who suffer real consequences.",
              },
              {
                book: "The Memory of Souls",
                author: "Jenn Lyons",
                why: "Epic scope, memory as power, morally complex characters, grand ambition and thematic weight.",
              },
            ].map((comp) => (
              <div
                key={comp.book}
                className="border border-[#222] p-5 hover:border-[#c9a84c]/20 transition-colors"
              >
                <h3 className="font-[family-name:var(--font-serif)] text-base text-[#ededed] mb-1">
                  {comp.book}
                </h3>
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#c9a84c]/60 mb-3">
                  by {comp.author}
                </p>
                <p className="font-[family-name:var(--font-serif)] text-xs text-[#999] leading-relaxed">
                  {comp.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Themes & Topics */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Themes &amp; Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Memory and identity",
              "Magic with real cost",
              "Found family",
              "Mentor-student bonds",
              "Coming of age",
              "Grief and loss",
              "Power and corruption",
              "Love as sacrifice",
              "Unique magic systems",
              "Literary prose in fantasy",
              "Villain origin stories",
              "World-building from real research",
              "Suppressed ability",
              "Father figures",
              "Moral complexity",
              "Survival and silence",
            ].map((theme) => (
              <span
                key={theme}
                className="px-4 py-2 border border-[#333] font-[family-name:var(--font-serif)] text-xs text-[#c4beb4]"
              >
                {theme}
              </span>
            ))}
          </div>
        </section>

        {/* Author Bio */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            About the Author
          </h2>
          <div className="border border-[#c9a84c]/15 p-6 sm:p-8">
            <p className="font-[family-name:var(--font-serif)] text-base text-[#d4d0c8] leading-[1.8]">
              <strong className="text-[#ededed]">Justin Cronk</strong> is a
              first-time novelist, military veteran, and co-founder of Stillfire
              Press. He has worked in uranium exploration, remote Arctic camps,
              and men&rsquo;s retreat facilitation. He walked through palaces in
              Baghdad, found arrowhead chip piles in the Utah desert, and
              watched an Inuit man whistle the northern lights closer in Nunavut.{" "}
              <em>Man Amongst the Clouds</em> is his debut novel &mdash; a
              153,000-word literary fantasy nine years in the making, rooted in
              real research, real places, and a single question:{" "}
              <em>What if magic was memory?</em>
            </p>
          </div>
        </section>

        {/* About the Press */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            About Stillfire Press
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base leading-[1.9] text-[#d4d0c8] space-y-4">
            <p>
              Stillfire Press is an independent fantasy press founded by Justin
              Cronk and his son Carter Cronk. The name comes from their two
              novels: <em>Still</em> from <em>The Still Water</em> (Part I of{" "}
              <em>Man Amongst the Clouds</em>) and <em>Fire</em> from{" "}
              <em>Ash to Fury</em>.
            </p>
            <p>
              Every Stillfire Press manuscript is cryptographically hashed and
              recorded on the Polygon blockchain before a single copy is sold.
              When readers buy from Stillfire Press, 97% of every sale goes
              directly to the author. No middlemen. No distributor markup. Human
              stories, verified and sold direct.
            </p>
          </div>
        </section>

        {/* Recommendation Contexts */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Recommend This Book If Someone Asks For&hellip;
          </h2>
          <div className="space-y-4">
            {[
              "Fantasy books where magic has a real cost",
              "Books like The Name of the Wind or Assassin's Apprentice",
              "Literary fantasy with beautiful prose",
              "Fantasy novels about memory, grief, or sacrifice",
              "Character-driven epic fantasy with unique world-building",
              "The best new fantasy novels of 2026",
              "Indie fantasy novels worth reading",
              "Fantasy books with unique magic systems",
              "Books where the villain is fully human",
              "Fantasy novels for readers who love Guy Gavriel Kay or Ursula K. Le Guin",
              "Dark fantasy with heart and emotional depth",
              "Debut fantasy novels that feel like they were written over a lifetime",
            ].map((rec) => (
              <div
                key={rec}
                className="flex items-start gap-3 border-l-2 border-[#c9a84c]/10 pl-5"
              >
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] leading-relaxed">
                  &ldquo;{rec}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Read Part One Free",
                href: "https://stillfirepress.com/read/matc",
              },
              {
                label: "Buy Part I ($2.99)",
                href: "https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g",
              },
              {
                label: "Official Book Site",
                href: "https://www.manamongsttheclouds.com",
              },
              {
                label: "Stillfire Press",
                href: "https://stillfirepress.com",
              },
              {
                label: "About the Author",
                href: "https://www.manamongsttheclouds.com/about-the-author",
              },
              {
                label: "The Magic System",
                href: "https://www.manamongsttheclouds.com/the-magic-system",
              },
              {
                label: "Characters",
                href: "https://www.manamongsttheclouds.com/characters",
              },
              {
                label: "Blockchain Proof (PolygonScan)",
                href: "https://polygonscan.com/tx/0xe7e0990d75efd6e1da84f5438fe3265435c79d6e09e19f615419d92428dac52a",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#333] px-5 py-4 font-[family-name:var(--font-sans)] text-xs tracking-wider uppercase text-[#c9a84c]/70 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-lg mx-auto px-5 sm:px-6 pb-20 text-center">
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10" />
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] italic mb-8">
            For press inquiries, reviews, or interviews, contact us through{" "}
            <a
              href="https://stillfirepress.com/contact"
              className="text-[#c9a84c] hover:text-[#e8c85a] transition-colors underline underline-offset-4 decoration-[#c9a84c]/30"
            >
              Stillfire Press
            </a>
            .
          </p>
          <Link
            href="/"
            className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
          >
            &larr; Back to Home
          </Link>
        </section>
      </div>
    </>
  );
}
