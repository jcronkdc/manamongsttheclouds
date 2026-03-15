export default function CompTitles() {
  const comps = [
    {
      author: "Patrick Rothfuss",
      book: "The Name of the Wind",
      why: "Lyrical prose, a magic system rooted in understanding rather than force, and a protagonist whose greatest weapon is the ability to listen.",
    },
    {
      author: "Robin Hobb",
      book: "The Farseer Trilogy",
      why: "Deep interiority, the cost of magical gifts, and a relationship between mentor and student that will break your heart.",
    },
    {
      author: "Guy Gavriel Kay",
      book: "Tigana",
      why: "Literary fantasy that treats its world with the gravity of real history. Memory as both weapon and wound.",
    },
    {
      author: "Ursula K. Le Guin",
      book: "A Wizard of Earthsea",
      why: "A coming-of-age story where the real enemy is internal. Magic as discipline, restraint, and balance with the living world.",
    },
  ];

  return (
    <section className="py-16 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
          For Readers Of
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl font-light tracking-wide mb-4">
          If you love these authors,
          <br className="hidden sm:block" />
          you&rsquo;ll love this book.
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-16" />

        <div className="grid grid-cols-2 gap-6 sm:gap-8 text-left max-w-2xl mx-auto">
          {comps.map((c) => (
            <div key={c.author} className="group">
              <p className="font-[family-name:var(--font-serif)] text-lg text-[#ededed] mb-1 group-hover:text-[#c9a84c] transition-colors duration-300">
                {c.author}
              </p>
              <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#c9a84c]/60 mb-3">
                {c.book}
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#c4beb4] leading-relaxed">
                {c.why}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#1a1a1a] pt-8">
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] italic max-w-lg mx-auto leading-relaxed">
            &ldquo;A 153,000-word literary fantasy debut featuring a magic
            system rooted in memory and sacrifice, a villain whose monstrousness
            is fully human, and a hero whose greatest power is the willingness
            to listen.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
