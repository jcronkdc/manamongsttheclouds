import Image from "next/image";

export default function Characters() {
  const chars = [
    {
      name: "Aelo",
      role: "The Boy Who Hears",
      hook: "Raised on herbs and lies in a village too small to have a name. He doesn’t know why the old man drugs him every morning. He doesn’t know his mother died holding a note that shook the sky. He doesn’t know he can hear the world sing.",
      detail: "His greatest power is the willingness to listen.",
      image: "/art/matc-char-aelo.png",
    },
    {
      name: "Jalo",
      role: "The Guardian",
      hook: "The village drunk with a scarred face and a shattered knee. He burned his own face to hide who he was. He broke his own knee to explain why he couldn’t run. He drugs a child every morning to keep him safe. He drinks so the boy can sleep.",
      detail: "Everything he does is a lie. Every lie is an act of love.",
      image: "/art/matc-char-jalo.jpg",
    },
    {
      name: "The Knife",
      role: "The King’s Weapon",
      hook: "He carries a wooden box of five beautiful objects and checks them every night. A feather, a shell, a glass bead, a pressed flower, a child’s drawing. They are the only proof he was ever a person. The objects are going blank. He doesn’t know why.",
      detail:
        "He was sent to find a boy. He will find something worse: a reason to stop.",
      image: "/art/matc-char-knife.png",
    },
    {
      name: "King Varas",
      role: "The Deaf King",
      hook: "Born without the ability to hear the Song in a world where everything sings. He has spent seventy years on an obsidian throne, draining the memories of hundreds to feed a silence nothing can fill. He is the most dangerous man alive.",
      detail: "He didn’t want to be a monster. He wanted to hear the music.",
      image: "/art/matc-char-varas.png",
    },
    {
      name: "Sereth",
      role: "The Collector of Orphans",
      hook: "She collects orphans the way other people collect regrets. Perhaps they are the same thing. She runs a school hidden in the Canopy where children learn to listen to the world’s memory — and to survive the cost.",
      detail: "She has buried more students than she has graduated.",
      image: "/art/matc-char-sereth.jpg",
    },
    {
      name: "Maera",
      role: "The Mother Who Sang",
      hook: "She appears only in memory and dream. She held five notes — every discipline but Burn and the Sing — simultaneously, something no one had done in centuries. The night the soldiers came, a man with a shattered knee carried her son over the garden wall. Behind him, her voice thinned and broke and stopped.",
      detail:
        "She is dead before the story begins. She is present on every page.",
      image: "/art/matc-scene-mother-lullaby.png",
    },
  ];

  return (
    <section id="characters" className="py-16 sm:py-28 bg-[#080808] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />
      <div className="max-w-5xl mx-auto">
        <div className="px-5 sm:px-6">
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
            The Characters
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center mb-4">
            Every character could be the protagonist
            <br className="hidden sm:block" /> of their own book.
          </h2>
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10 sm:mb-16" />
        </div>

        {/* Mobile: horizontal scroll carousel / Desktop: grid */}
        <div className="flex md:hidden scroll-snap-x gap-4 px-5 pb-4">
          {chars.map((c) => (
            <article
              key={c.name}
              className="flex-shrink-0 w-[80vw] max-w-[320px]"
            >
              {c.image && (
                <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-sm">
                  <Image
                    src={c.image}
                    alt={`${c.name} — ${c.role} — Man Amongst the Clouds character art`}
                    fill
                    className="object-cover object-top"
                    sizes="80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-[family-name:var(--font-sans)] text-[8px] tracking-[0.3em] uppercase text-[#c9a84c]/70 mb-1">
                      {c.role}
                    </p>
                    <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed]">
                      {c.name}
                    </h3>
                  </div>
                </div>
              )}
              <div className="px-1">
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] leading-[1.7] mb-2">
                  {c.hook}
                </p>
                <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#c9a84c]/70">
                  {c.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: 2-column grid */}
        <div className="hidden md:grid grid-cols-2 gap-x-12 gap-y-14 px-6">
          {chars.map((c) => (
            <article key={c.name} className="group">
              {c.image && (
                <div className="relative w-full aspect-[2/3] mb-6 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`${c.name} — ${c.role} — Man Amongst the Clouds character art`}
                    fill
                    className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                </div>
              )}
              <div className="border-l-2 border-[#c9a84c]/20 group-hover:border-[#c9a84c]/60 pl-6 transition-all duration-500">
                <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-2">
                  {c.role}
                </p>
                <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-4">
                  {c.name}
                </h3>
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
      </div>
    </section>
  );
}
