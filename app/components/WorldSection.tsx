export default function WorldSection() {
  const disciplines = [
    {
      name: "The Know",
      desc: "Listen to the truth of living things.",
      cost: "Your emotional boundaries.",
    },
    {
      name: "The Mold",
      desc: "Ask stone to remember a different shape.",
      cost: "The feeling in your hands.",
    },
    {
      name: "The Heal",
      desc: "Remind flesh of wholeness.",
      cost: "You carry every wound you mend.",
    },
    {
      name: "The Move",
      desc: "Rearrange the space between things.",
      cost: "Your sense of where you are.",
    },
    {
      name: "The Guide",
      desc: "Feel the trajectory of paths.",
      cost: "Your memory of home.",
    },
    {
      name: "The Burn",
      desc: "Awaken the memory of fire.",
      cost: "The warmth inside you.",
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
              className="bg-[#0a0a0a] p-8 group hover:bg-[#0d0d0d] transition-all duration-500"
            >
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
          ))}
        </div>

        {/* The Sing — elevated */}
        <div className="mt-px bg-[#c9a84c]/10">
          <div className="bg-[#0a0a0a] p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.02] to-transparent" />
            <div className="relative z-10">
              <h3 className="font-[family-name:var(--font-serif)] text-[#c9a84c] text-2xl mb-3">
                The Sing
              </h3>
              <p className="font-[family-name:var(--font-serif)] text-base text-[#d4d0c8] leading-relaxed max-w-md mx-auto mb-2">
                The harmonization of all seven voices. Love made audible.
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
