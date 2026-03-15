import Image from "next/image";

export default function WorldSection() {
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

  return (
    <section id="world" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          The Magic System
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center leading-tight mb-6">
          The world remembers everything.
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12" />

        <div className="max-w-2xl mx-auto space-y-6 mb-20">
          <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] text-center">
            Every stone remembers the mountain it was part of. Every river
            remembers the glacier that bore it. Every flame remembers the first
            spark that ever split the dark.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] text-center">
            Magic is the ability to commune with these memories &mdash; to
            listen to the world&rsquo;s remembering, and to speak back to it.
            Seven disciplines. Seven ways of hearing. And one Song that
            harmonizes them all.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-xl text-center text-[#ededed] font-semibold mt-8">
            But every act of magic costs a piece of who you are.
          </p>
        </div>

        {/* Seven Disciplines Grid */}
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

        {/* The Sing — elevated */}
        <div className="mt-px bg-[#c9a84c]/10">
          <div className="bg-[#0a0a0a] text-center relative overflow-hidden">
            <div className="relative w-full aspect-[3/1] overflow-hidden">
              <Image
                src="/art/matc-magic-sing.jpg"
                alt="The Sing — the rarest magic discipline from Man Amongst the Clouds"
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
                The rarest and most devastating of all disciplines. The Sing is
                not learned — it is surrendered to. It is the harmonization of
                all seven voices at once, a moment when a practitioner becomes a
                vessel for the world&rsquo;s entire memory. In that instant,
                they do not listen to the world — they become its song. Love
                made audible. But the cost is absolute: to sing the
                world&rsquo;s truth is to lose yourself inside it, dissolved
                into the memory of everything.
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#a09888]">
                <span className="text-[#c9a84c]/60">Cost:</span>{" "}
                <em className="text-[#ededed]">Everything.</em>
              </p>
            </div>
          </div>
        </div>

        <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] text-center italic mt-8">
          A magic system rooted in memory, sacrifice, and the belief that the
          world is alive and listening.
        </p>
      </div>
    </section>
  );
}
