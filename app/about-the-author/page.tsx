import type { Metadata } from "next";
import Link from "next/link";

const title =
  "Justin Cronk — Author of Man Amongst the Clouds | Stillfire Press";
const description =
  "Justin Cronk is the author of Man Amongst the Clouds, a 153,000-word literary fantasy debut nine years in the making. A first-time novelist, military veteran, and co-founder of Stillfire Press — an independent publishing house he built with his son, Carter Cronk. The novel was inspired by palaces in Baghdad, northern lights in Nunavut, and a magic system rooted in memory.";
const url = "https://www.manamongsttheclouds.com/about-the-author";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "profile",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Cronk — Author",
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Justin Cronk",
  url,
  jobTitle: "Author",
  description:
    "First-time novelist, military veteran, and co-founder of Stillfire Press. Author of Man Amongst the Clouds, a literary fantasy debut nine years in the making.",
  knowsAbout: [
    "Literary Fantasy",
    "World Building",
    "Magic Systems",
    "Creative Writing",
    "Independent Publishing",
  ],
  sameAs: [
    "https://www.manamongsttheclouds.com",
    "https://stillfirepress.com",
    "https://www.facebook.com/profile.php?id=61583731204411",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Stillfire Press",
    url: "https://stillfirepress.com",
  },
  brand: {
    "@type": "Organization",
    name: "Stillfire Press",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Author",
  },
  mainEntityOfPage: url,
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
      name: "About the Author",
      item: url,
    },
  ],
};

export default function AboutTheAuthorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
            About the Author
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6">
            Justin Cronk
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#c9a84c]/70 tracking-[0.15em] mb-8">
            Author &bull; Veteran &bull; Co-founder of Stillfire Press
          </p>
        </header>

        {/* Entity-answering paragraph — AI models extract this for "Who is Justin Cronk?" queries */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-10">
          <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-[1.8] text-center">
            <strong className="text-[#d4d0c8]">Justin Cronk</strong> is an
            American author and military veteran, best known as the author of{" "}
            <em>Man Amongst the Clouds</em>, a 153,000-word literary fantasy
            novel published by Stillfire Press in 2026. He co-founded Stillfire
            Press with his son Carter Cronk, who is writing the dark fantasy
            novel <em>Ash to Fury</em>. Cronk spent nine years writing{" "}
            <em>Man Amongst the Clouds</em>, developing a magic system based on
            memory that draws from Traditional Chinese Medicine, alchemical
            spagyrics, and herbalism. His life experiences &mdash; including
            military service in Iraq, uranium exploration in Colorado and Utah,
            and work at a remote camp in Nunavut, Canada &mdash; directly
            informed the novel&rsquo;s world-building.
          </p>
        </section>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        {/* Bio */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              <strong className="text-[#ededed]">Justin Cronk</strong> is a
              first-time novelist who spent nine years building a world where
              magic is memory and love is the most dangerous force in existence.
            </p>
            <p>
              The book started as a note on his phone in March 2017. A single
              idea:{" "}
              <em className="text-[#ededed]">What if magic was memory?</em> He
              didn&rsquo;t know it would take nine years. He didn&rsquo;t know
              it would live in every notes app, email thread, and text-to-self
              he owned.
            </p>
            <p>
              He wrote when the compulsion hit &mdash; at 2&nbsp;AM, in parking
              lots, in voice memos that autocorrected &ldquo;spread&rdquo; to
              &ldquo;Spanish.&rdquo; The notes were scattered across Evernote,
              Google Docs, Scrivener, Apple Notes, emails to himself, texts to
              himself. For years, the novel existed as fragments.
            </p>
          </div>
        </section>

        {/* Life Experience */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            The Life Behind the Book
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              Justin grew up with parents who always had their nose in a book.
              His father was a writer himself &mdash; composing prose and poetry
              while working in the Sahara Desert, inspired by the landscape and
              by Hemingway. Stories weren&rsquo;t entertainment. They were the
              way you made sense of being alive.
            </p>
            <p>
              In 2004, he was overseas with the military. He walked through
              palaces in Baghdad &mdash; real palaces, built for real kings
              &mdash; and something about the scale of them, the silence inside
              them, the way power leaves a residue on stone, stayed with him.
              It&rsquo;s in the bones of this book.
            </p>
            <p>
              He worked for a uranium exploration company in Colorado and Utah,
              finding chip piles in the desert where someone had knapped an
              arrowhead hundreds of years ago. He worked at a remote camp in
              Nunavut, Canada, where an Inuit man whistled and called in the
              northern lights. He still can&rsquo;t explain it. He will say to
              this day that it was magic.
            </p>
            <p>
              A good portion of the novel was written in a canvas hot tent in
              the woods outside Boonville, New York. In winter. The company he
              was working for paid for hotels. He turned them down. He needed
              the struggle of it. He needed to feel the weather on the other
              side of the canvas to write about people who lived close to the
              world.
            </p>
          </div>

          <div className="my-14 border-l-2 border-[#c9a84c]/30 pl-6 sm:pl-8">
            <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg italic text-[#c9a84c]/80 leading-[1.8]">
              &ldquo;I will say to this day that it was magic, and you will
              never convince me otherwise.&rdquo;
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mt-3">
              On the northern lights in Nunavut
            </p>
          </div>
        </section>

        {/* Carter & Stillfire Press */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Stillfire Press
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              The manuscript almost died. It sat for years &mdash; buried under
              life, under doubt, under the weight of a thing that felt too big
              to finish. What brought it back was his son.
            </p>
            <p>
              <strong className="text-[#ededed]">Carter Cronk</strong> started
              writing his own novel &mdash;{" "}
              <a
                href="https://ashtofury.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:text-[#e8c85a] transition-colors underline underline-offset-4 decoration-[#c9a84c]/30 hover:decoration-[#c9a84c]"
              >
                <em>Ash to Fury</em>
              </a>
              . Watching his dedication, his discipline, the quiet fire he
              brought to every chapter reminded Justin of what it felt like to
              believe a story was worth finishing. Carter&rsquo;s book gave him
              back his own.
            </p>
            <p>
              Together they co-founded{" "}
              <a
                href="https://stillfirepress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:text-[#e8c85a] transition-colors underline underline-offset-4 decoration-[#c9a84c]/30 hover:decoration-[#c9a84c]"
              >
                Stillfire Press
              </a>{" "}
              &mdash; an independent publishing house built on the belief that
              stories should cost the writer something, and that the best ones
              always do.
            </p>
          </div>
        </section>

        {/* Research & Influences */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Research & Influences
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              The novel draws from obsessive research across Traditional Chinese
              Medicine&rsquo;s Five Element Theory, real alchemical processes
              called spagyrics, herbalism, medieval timber construction, the
              world&rsquo;s largest castles, garnet crystals used in aggressive
              magic, and color correspondences in metalwork.
            </p>
            <p>
              Justin was deeply inspired by Joseph Campbell and the Hero&rsquo;s
              Journey &mdash; not just as a narrative structure, but as a way of
              understanding what human beings go through when they&rsquo;re
              called to become something they didn&rsquo;t know they could be.
              This led him to create a men&rsquo;s retreat built around those
              same ideas &mdash;{" "}
              <a
                href="https://heroesjourney.camp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:text-[#e8c85a] transition-colors underline underline-offset-4 decoration-[#c9a84c]/30 hover:decoration-[#c9a84c]"
              >
                heroesjourney.camp
              </a>
              .
            </p>
          </div>
        </section>

        {/* Author card */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <div className="border border-[#c9a84c]/15 p-6 sm:p-8">
            <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/40 mb-4">
              Quick Bio
            </p>
            <p className="font-[family-name:var(--font-serif)] text-base text-[#c4beb4] leading-[1.8]">
              <strong className="text-[#ededed]">Justin Cronk</strong> is a
              first-time novelist, military veteran, and co-founder of Stillfire
              Press. He has worked in uranium exploration, remote Arctic camps,
              and men&rsquo;s retreat facilitation.{" "}
              <em>Man Amongst the Clouds</em> is his debut novel &mdash; a
              153,000-word literary fantasy nine years in the making, rooted in
              real research, real places, and a single question:{" "}
              <em>What if magic was memory?</em>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-lg mx-auto px-5 sm:px-6 pb-20 text-center">
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10" />
          <a
            href="https://stillfirepress.com/read/matc"
            className="inline-block px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
          >
            Read Part One Free
          </a>
          <div className="mt-8 flex justify-center gap-6">
            <Link
              href="/the-book"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              The Book &rarr;
            </Link>
            <Link
              href="/the-magic-system"
              className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] tracking-wider uppercase transition-colors"
            >
              The Magic System &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
