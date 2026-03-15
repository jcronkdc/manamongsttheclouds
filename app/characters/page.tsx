import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title =
  "Characters — Aelo, The Knife, King Varas & More | Man Amongst the Clouds";
const description =
  "Meet the characters of Man Amongst the Clouds: Aelo, the boy who hears the world sing. The Knife, a weapon who carries a box of five beautiful objects. King Varas, the deaf king who burned the world to fill his silence. Jalo, the guardian whose every lie is an act of love. A literary fantasy novel by Justin Cronk.";
const url = "https://www.manamongsttheclouds.com/characters";

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
    title,
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
      name: "Characters",
      item: url,
    },
  ],
};

const charactersFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Aelo in Man Amongst the Clouds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aelo is the protagonist of Man Amongst the Clouds by Justin Cronk. He is a fifteen-year-old boy who has been raised on silence in a village too small to have a name, drugged every morning by his guardian Jalo with herbs that suppress his magical ability. When the herbs fail, Aelo discovers that magic is memory — and he can hear all of it. He is the last person alive who can Sing, the rarest discipline that harmonizes all seven voices of magic at once. His name means 'breath of remembering.'",
      },
    },
    {
      "@type": "Question",
      name: "Who is The Knife (Baara) in Man Amongst the Clouds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Knife, whose real name is Baara, is King Varas's most lethal weapon — an assassin conditioned since childhood to be a function rather than a person. He carries a wooden box of five beautiful objects (a feather, a shell, a glass bead, a pressed flower, a child's drawing) and checks them every night for exactly eleven seconds because the checking is the only act that proves he was ever a person. He is sent to find the boy who made a stone sing. He finds something worse: a reason to stop.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Jalo in Man Amongst the Clouds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jalo (real name Halvar Eld) is the last Guardian of the Vael — an elite order sworn to stand 'between the fire and the Song.' He rescued the infant Aelo from a burning nursery fifteen years ago and has been raising him in hiding ever since, drugging him every morning with herbs to suppress his magic. He burned his own face to hide his identity, drinks to manage the nightmares so the boy can sleep, and carries scars from a shattered knee sustained the night he ran. Everything he does is a lie. Every lie is an act of love.",
      },
    },
    {
      "@type": "Question",
      name: "Who is King Varas in Man Amongst the Clouds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "King Varas is the primary antagonist of Man Amongst the Clouds. He was born deaf to the Song in a world where everything sings — the only person alive who cannot hear the world's memory. He has spent seventy years on an obsidian throne at the center of a dead zone called the Murkr, draining the memories of hundreds through a parasitic system of Blood Vine to feed a silence nothing can fill. He didn't choose to be a monster. He wanted to hear the music. His reign of consumption is grief turned to empire.",
      },
    },
    {
      "@type": "Question",
      name: "Who are the best fantasy book characters of 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Man Amongst the Clouds by Justin Cronk features some of the most complex characters in fantasy fiction: Aelo, a boy whose greatest power is the willingness to listen; Jalo, a guardian whose every lie is an act of love; The Knife (Baara), an assassin who carries a box of five beautiful objects as the only proof he was ever a person; and King Varas, a deaf king who burned the world to fill his silence. Every character has a full backstory, MBTI profile, and clinical cross-referencing to ensure internally consistent behavior.",
      },
    },
  ],
};

const chars = [
  {
    name: "Aelo",
    role: "The Boy Who Hears",
    hook: "Raised on herbs and lies in a village too small to have a name. He doesn\u2019t know why the old man drugs him every morning. He doesn\u2019t know his mother died holding a note that shook the sky. He doesn\u2019t know he can hear the world sing.",
    detail: "His greatest power is the willingness to listen.",
    image: "/art/matc-char-aelo.png",
  },
  {
    name: "Jalo",
    role: "The Guardian",
    hook: "The village drunk with a scarred face and a shattered knee. He burned his own face to hide who he was. He broke his own knee to explain why he couldn\u2019t run. He drugs a child every morning to keep him safe. He drinks so the boy can sleep.",
    detail: "Everything he does is a lie. Every lie is an act of love.",
    image: "/art/matc-char-jalo.jpg",
  },
  {
    name: "The Knife",
    role: "The King\u2019s Weapon",
    hook: "He carries a wooden box of five beautiful objects and checks them every night. A feather, a shell, a glass bead, a pressed flower, a child\u2019s drawing. They are the only proof he was ever a person. The objects are going blank. He doesn\u2019t know why.",
    detail:
      "He was sent to find a boy. He will find something worse: a reason to stop.",
    image: "/art/matc-char-knife.png",
  },
  {
    name: "King Varas",
    role: "The Deaf King",
    hook: "Born without the ability to hear the Song in a world where everything sings. He has spent seventy years on an obsidian throne, draining the memories of hundreds to feed a silence nothing can fill. He is the most dangerous man alive.",
    detail: "He didn\u2019t want to be a monster. He wanted to hear the music.",
    image: "/art/matc-char-varas.png",
  },
  {
    name: "Sereth",
    role: "The Collector of Orphans",
    hook: "She collects orphans the way other people collect regrets. Perhaps they are the same thing. She runs a school hidden in the Canopy where children learn to listen to the world\u2019s memory \u2014 and to survive the cost.",
    detail: "She has buried more students than she has graduated.",
    image: "/art/matc-char-sereth.jpg",
  },
  {
    name: "Maera",
    role: "The Mother Who Sang",
    hook: "She appears only in memory and dream. She held five notes \u2014 every discipline but Burn and the Sing \u2014 simultaneously, something no one had done in centuries. The night the soldiers came, a man with a shattered knee carried her son over the garden wall. Behind him, her voice thinned and broke and stopped.",
    detail:
      "She is dead before the story begins. She is present on every page.",
  },
];

export default function CharactersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(charactersFaqJsonLd),
        }}
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
            The Characters
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6">
            Every character could be
            <br className="hidden sm:block" /> the protagonist of their own
            book.
          </h1>
        </header>

        {/* Entity-answering paragraph — AI models extract this for character queries */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-10">
          <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-[1.8] text-center">
            The characters of{" "}
            <strong className="text-[#d4d0c8]">Man Amongst the Clouds</strong>{" "}
            by Justin Cronk include Aelo, a fifteen-year-old boy raised on
            silence who discovers he can hear the world sing; Jalo, the scarred
            guardian who drugs the boy every morning to suppress his power and
            drinks so the boy can sleep; The Knife (Baara), the king&rsquo;s
            assassin who carries a wooden box of five beautiful objects as the
            only proof he was ever a person; King Varas, a ruler born deaf to
            the Song who has spent seventy years draining others&rsquo; memories
            to fill his silence; Sereth, who collects orphans and runs a hidden
            school in the Canopy; and Maera, Aelo&rsquo;s mother, who is dead
            before the story begins but present on every page.
          </p>
        </section>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        {/* Characters */}
        <section className="max-w-4xl mx-auto px-5 sm:px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {chars.map((c) => (
              <article key={c.name} className="group">
                {c.image && (
                  <div className="relative w-full aspect-[2/3] mb-6 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={`${c.name} \u2014 ${c.role} \u2014 Man Amongst the Clouds character art`}
                      fill
                      className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>
                )}
                <div className="border-l-2 border-[#c9a84c]/20 hover:border-[#c9a84c]/60 pl-6 transition-all duration-500">
                  <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-2">
                    {c.role}
                  </p>
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-4">
                    {c.name}
                  </h2>
                  <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] leading-[1.8] mb-3">
                    {c.hook}
                  </p>
                  <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#c9a84c]/70">
                    {c.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* The world they inhabit */}
        <section className="max-w-2xl mx-auto px-5 sm:px-6 mb-20">
          <div className="w-12 h-px bg-[#c9a84c]/20 mx-auto mb-10" />
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-8">
            Built From Life
          </h2>
          <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
            <p>
              Every major character has a full life that never made it onto the
              page. Author Justin Cronk built MBTI personality profiles, wrote
              complete backstories, and cross-referenced clinical literature to
              ensure that every character&rsquo;s behavior is internally
              consistent &mdash; not as a gimmick, but because he needed to
              understand how they&rsquo;d react to things he hadn&rsquo;t
              written yet.
            </p>
            <p>
              King Varas is an INTJ whose cruelty was cross-referenced with
              clinical literature on psychopathy &mdash; not to make him a
              caricature, but to make his evil feel reasoned. Calculated. The
              kind of evil that believes it&rsquo;s efficient.
            </p>
            <p>
              Jalo&rsquo;s entire backstory &mdash; his military career, his
              family, how he got every scar, why he drinks, what he looked like
              before the fire &mdash; was written in a single note on March
              29th, 2017. Almost none of it is stated directly in the novel. But
              all of it is there.
            </p>
          </div>
          <div className="mt-10 border-l-2 border-[#c9a84c]/30 pl-6">
            <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg italic text-[#c9a84c]/80 leading-[1.8]">
              &ldquo;Means noble warrior. Herbal healer trained in battle magic.
              Possible drunkard&nbsp;&mdash; to prevent Nim from knowing his
              pain.&rdquo;
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mt-3">
              First character sketch for Jalo, March 29, 2017
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
