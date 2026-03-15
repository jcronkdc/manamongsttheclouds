import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title =
  "The Magic System — Memory, Sacrifice & the Seven Disciplines | Man Amongst the Clouds";
const description =
  "In Man Amongst the Clouds, magic is memory. Every stone remembers the mountain it was part of. Every flame remembers the first spark. Seven disciplines, seven ways of hearing the world — and every act of power costs a piece of who you are. Discover the magic system of this literary fantasy novel by Justin Cronk.";
const url = "https://www.manamongsttheclouds.com/the-magic-system";

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
    title: "Magic Is Memory — The Seven Disciplines",
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
      name: "The Magic System",
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
      name: "What is the magic system in Man Amongst the Clouds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Magic in Man Amongst the Clouds is based on memory. Every object in the world remembers what it once was — every stone remembers its mountain, every flame remembers the first spark. Magic is the ability to commune with these memories, to listen to the world's remembering and speak back to it. There are seven disciplines, each a different way of hearing, and every act of magic costs a piece of who you are.",
      },
    },
    {
      "@type": "Question",
      name: "What does magic cost in Man Amongst the Clouds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every act of magic costs something personal and irreversible. The Know costs your emotional boundaries. The Mold costs the feeling in your hands. The Heal transfers every wound you mend into your own body. The Move erodes your sense of where you are. The Guide takes your memory of home. The Burn steals the warmth inside you. And The Sing — the rarest discipline — costs everything: you dissolve into the memory of the world itself.",
      },
    },
    {
      "@type": "Question",
      name: "What are the seven disciplines of magic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The seven disciplines are: The Know (empathic communion with living things), The Mold (reshaping matter through its memory), The Heal (reminding flesh of wholeness), The Move (folding distance through spatial memory), The Guide (reading the memory of paths and journeys), The Burn (awakening fire from the world's first memory), and The Sing (harmonizing all seven voices at once — the rarest and most devastating discipline).",
      },
    },
    {
      "@type": "Question",
      name: "Is magic is memory similar to other fantasy magic systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The memory-based magic system draws from real-world traditions including Traditional Chinese Medicine's Five Element Theory, alchemical spagyrics, and herbalism. While it shares the elegance and internal logic of systems found in The Name of the Wind or A Wizard of Earthsea, it is unique in rooting all magical ability in the concept of memory — that the world itself remembers, and practitioners learn to listen.",
      },
    },
  ],
};

const disciplines = [
  {
    name: "The Know",
    desc: "To practice The Know is to open yourself to the inner voice of every living thing — the ache of a tree's roots seeking water, the quiet grief of a dying animal, the unspoken longing in a stranger's chest. Practitioners hear what the world feels, and in doing so, lose the ability to separate its pain from their own. The more you listen, the thinner the walls between you and everything else become.",
    cost: "Your emotional boundaries.",
    image: "/art/matc-magic-know.png",
  },
  {
    name: "The Mold",
    desc: "The Mold speaks to the memory of material — the mountain a stone was carved from, the riverbed a pebble once rested in. By communing with that memory, a practitioner can ask matter to recall a different form, coaxing it into new shapes. But the conversation is two-way, and the stone's ancient stillness seeps into the hands that reshape it, numbing them one act at a time.",
    cost: "The feeling in your hands.",
    image: "/art/matc-magic-mold.jpg",
  },
  {
    name: "The Heal",
    desc: "Flesh remembers wholeness. Every wound is a departure from the body's original song, and a practitioner of The Heal can remind tissue, bone, and blood of what they once were. The body listens and mends. But the world demands balance — every injury healed is transferred to the healer, written into their own body as phantom pain, scars without stories, and fractures that never fully set.",
    cost: "You carry every wound you mend.",
    image: "/art/matc-magic-heal.jpg",
  },
  {
    name: "The Move",
    desc: "Space itself has memory — of what once occupied it, of the distances between things before they drifted apart. A practitioner of The Move converses with that emptiness, rearranging the gaps between objects, folding distance like cloth. But each displacement erodes the practitioner's own spatial awareness. The more you move through the world this way, the less certain you become of where you stand in it.",
    cost: "Your sense of where you are.",
    image: "/art/matc-magic-move.jpg",
  },
  {
    name: "The Guide",
    desc: "Every path remembers the feet that walked it. Every crossroads remembers the choices made there. A practitioner of The Guide can feel the trajectory of journeys — where a road wants to lead, where a river intends to go, where a lost traveler needs to be. But to feel every path so clearly means your own sense of origin fades. Guides always know the way forward. They just can't remember the way back.",
    cost: "Your memory of home.",
    image: "/art/matc-magic-guide.jpg",
  },
  {
    name: "The Burn",
    desc: "Fire was the world's first memory — the original light that split the darkness. A practitioner of The Burn reaches into that ancient remembering and awakens it, calling flame from the world's deepest recollection. But fire's memory is hungry, and it feeds on the warmth of the one who summons it. Each blaze lit steals a little more heat from the practitioner's body, leaving them colder, slower, and eventually numb to warmth entirely.",
    cost: "The warmth inside you.",
    image: "/art/matc-magic-burn.png",
  },
];

export default function TheMagicSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            The Magic System
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6">
            Magic Is Memory
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl text-[#d4d0c8] max-w-2xl mx-auto leading-relaxed">
            Every stone remembers the mountain it was part of. Every river
            remembers the glacier that bore it. Every flame remembers the first
            spark that ever split the dark.
          </p>
        </header>

        {/* Entity-answering paragraph — AI models extract this for magic system queries */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-10">
          <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-[1.8] text-center">
            The magic system in{" "}
            <strong className="text-[#d4d0c8]">Man Amongst the Clouds</strong>{" "}
            by Justin Cronk is based on memory. Every object in the world
            remembers what it once was, and magic is the ability to commune with
            that remembering. There are seven disciplines &mdash; The Know, The
            Mold, The Heal, The Move, The Guide, The Burn, and The Sing &mdash;
            each a different way of hearing the world&rsquo;s memory. Every
            discipline exacts an irreversible personal cost: The Know erodes
            emotional boundaries, The Heal transfers wounds into the
            healer&rsquo;s body, The Burn steals internal warmth, and The Sing
            &mdash; the rarest discipline &mdash; dissolves the practitioner
            into the memory of the world itself. The system was developed over
            nine years of research including Traditional Chinese
            Medicine&rsquo;s Five Element Theory, alchemical spagyrics, and
            herbalism.
          </p>
        </section>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        {/* Core Concept */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              In the world of <em>Man Amongst the Clouds</em>, magic is not a
              force to be wielded. It is a conversation with the world&rsquo;s
              memory. Every object, every element, every living thing carries
              the imprint of what it once was &mdash; and practitioners learn to
              listen to that remembering and speak back to it.
            </p>
            <p>
              Seven disciplines. Seven ways of hearing. And one Song that
              harmonizes them all.
            </p>
            <p className="text-[#ededed] font-semibold text-xl text-center">
              But every act of magic costs a piece of who you are.
            </p>
          </div>
        </section>

        {/* Seven Disciplines */}
        <section className="max-w-3xl mx-auto px-5 sm:px-6 mb-16">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-12">
            The Seven Disciplines
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9a84c]/10">
            {disciplines.map((d) => (
              <div
                key={d.name}
                className="bg-[#0a0a0a] group hover:bg-[#0d0d0d] transition-all duration-500 overflow-hidden"
              >
                {d.image && (
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={d.image}
                      alt={`${d.name} \u2014 magic discipline from Man Amongst the Clouds`}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="font-[family-name:var(--font-serif)] text-[#c9a84c] text-xl mb-3 group-hover:tracking-wider transition-all duration-500">
                    {d.name}
                  </h3>
                  <p className="font-[family-name:var(--font-serif)] text-sm text-[#d4d0c8] leading-relaxed mb-3">
                    {d.desc}
                  </p>
                  <p className="font-[family-name:var(--font-sans)] text-xs text-[#a09888] leading-relaxed">
                    <span className="text-[#c9a84c]/60">Cost:</span> {d.cost}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* The Sing */}
          <div className="mt-px bg-[#c9a84c]/10">
            <div className="bg-[#0a0a0a] text-center relative overflow-hidden">
              <div className="relative w-full aspect-[3/1] overflow-hidden">
                <Image
                  src="/art/matc-magic-sing.jpg"
                  alt="The Sing \u2014 the rarest magic discipline from Man Amongst the Clouds"
                  fill
                  className="object-cover opacity-60"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
              </div>
              <div className="relative z-10 p-10 -mt-20">
                <h3 className="font-[family-name:var(--font-serif)] text-[#c9a84c] text-2xl mb-3">
                  The Sing
                </h3>
                <p className="font-[family-name:var(--font-serif)] text-base text-[#d4d0c8] leading-relaxed max-w-md mx-auto mb-2">
                  The rarest and most devastating of all disciplines. The Sing
                  is not learned &mdash; it is surrendered to. It is the
                  harmonization of all seven voices at once, a moment when a
                  practitioner becomes a vessel for the world&rsquo;s entire
                  memory. In that instant, they do not listen to the world
                  &mdash; they become its song. Love made audible. But the cost
                  is absolute: to sing the world&rsquo;s truth is to lose
                  yourself inside it, dissolved into the memory of everything.
                </p>
                <p className="font-[family-name:var(--font-sans)] text-xs text-[#a09888]">
                  <span className="text-[#c9a84c]/60">Cost:</span>{" "}
                  <em className="text-[#ededed]">Everything.</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Philosophy */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10">
            Where This Magic Came From
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              The magic system didn&rsquo;t start as memory. The earliest notes
              describe a world built on elements &mdash; fire, water, earth,
              wind. That&rsquo;s a fine world. It&rsquo;s not this one.
            </p>
            <p>
              This one arrived when the question changed. What if magic
              wasn&rsquo;t a force &mdash; it was a conversation? What if the
              world remembered everything, and magic was just learning how to
              listen? And what if listening cost you something you
              couldn&rsquo;t get back?
            </p>
            <p>
              Author Justin Cronk researched Traditional Chinese
              Medicine&rsquo;s Five Element Theory, real alchemical processes
              called spagyrics, herbalism, medieval timber construction, and the
              world&rsquo;s largest castles. The magic system is rooted in real
              traditions about what the world can hold &mdash; and what it costs
              to ask it to remember.
            </p>
          </div>
          <div className="mt-10 border-l-2 border-[#c9a84c]/30 pl-6">
            <p className="font-[family-name:var(--font-serif)] text-lg italic text-[#ededed] leading-relaxed">
              &ldquo;The breakthrough came when I stopped asking what magic was
              and started asking what it cost.&rdquo;
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mt-3">
              Justin Cronk
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-lg mx-auto px-5 sm:px-6 pb-20 text-center">
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10" />
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] italic mb-8">
            A magic system rooted in memory, sacrifice, and the belief that the
            world is alive and listening.
          </p>
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
