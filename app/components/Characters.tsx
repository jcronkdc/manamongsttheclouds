export default function Characters() {
  const chars = [
    {
      name: "Aelo",
      role: "The Boy Who Hears",
      hook: "Raised on herbs and lies in a village too small to have a name. He doesn\u2019t know why the old man drugs him every morning. He doesn\u2019t know his mother died holding a note that shook the sky. He doesn\u2019t know he can hear the world sing.",
      detail: "His greatest power is the willingness to listen.",
    },
    {
      name: "Jalo",
      role: "The Guardian",
      hook: "The village drunk with a scarred face and a shattered knee. He burned his own face to hide who he was. He broke his own knee to explain why he couldn\u2019t run. He drugs a child every morning to keep him safe. He drinks so the boy can sleep.",
      detail: "Everything he does is a lie. Every lie is an act of love.",
    },
    {
      name: "The Knife",
      role: "The King\u2019s Weapon",
      hook: "He carries a wooden box of five beautiful objects and checks them every night. A feather, a shell, a glass bead, a pressed flower, a child\u2019s drawing. They are the only proof he was ever a person. The objects are going blank. He doesn\u2019t know why.",
      detail:
        "He was sent to find a boy. He will find something worse: a reason to stop.",
    },
    {
      name: "King Varas",
      role: "The Deaf King",
      hook: "Born without the ability to hear the Song in a world where everything sings. He has spent seventy years on an obsidian throne, draining the memories of hundreds to feed a silence nothing can fill. He is the most dangerous man alive.",
      detail:
        "He didn\u2019t want to be a monster. He wanted to hear the music.",
    },
    {
      name: "Sereth",
      role: "The Collector of Orphans",
      hook: "She collects orphans the way other people collect regrets. Perhaps they are the same thing. She runs a school hidden in the Canopy where children learn to listen to the world\u2019s memory \u2014 and to survive the cost.",
      detail: "She has buried more students than she has graduated.",
    },
    {
      name: "Maera",
      role: "The Mother Who Sang",
      hook: "She appears only in memory and dream. She held five notes \u2014 five disciplines \u2014 simultaneously, something no one had done in centuries. She died holding a lullaby that kept soldiers at bay long enough for a scarred man to run with her son.",
      detail:
        "She is dead before the story begins. She is present on every page.",
    },
  ];

  return (
    <section id="characters" className="py-28 px-6 bg-[#080808] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />
      <div className="max-w-5xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          The Characters
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center mb-4">
          Every character could be the protagonist
          <br className="hidden sm:block" /> of their own book.
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {chars.map((c) => (
            <article key={c.name} className="group">
              <div className="border-l-2 border-[#c9a84c]/20 group-hover:border-[#c9a84c]/60 pl-6 transition-all duration-500">
                <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/50 mb-2">
                  {c.role}
                </p>
                <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-4">
                  {c.name}
                </h3>
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] leading-[1.8] mb-3">
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
