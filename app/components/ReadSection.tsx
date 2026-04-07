export default function ReadSection() {
  return (
    <section
      id="read"
      className="py-24 sm:py-40 px-4 sm:px-6 bg-[#080808] relative"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
          Now Available
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight mb-4">
          The complete novel is here.
        </h2>
        <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#b0a89e] italic mb-10">
          Five parts &bull; 48 chapters &bull; Published March 17, 2026
        </p>

        {/* Buy CTA */}
        <a
          href="https://www.amazon.com/dp/B0GSSPN6LN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 mb-4"
        >
          Buy on Amazon
        </a>
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] text-[#888] mb-10">
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

        {/* Read free */}
        <a
          href="https://stillfirepress.com/read/matc"
          className="inline-block px-10 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
        >
          Or Read Part One Free
        </a>
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#8a8a8a] mt-3 mb-14">
          No account. No signup. Prologue + Chapters 1&ndash;10, right in your
          browser.
        </p>

        {/* Part names */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
          {[
            { part: "I", name: "The Still Water" },
            { part: "II", name: "The Waking" },
            { part: "III", name: "The Burning" },
            { part: "IV", name: "The Song" },
            { part: "V", name: "The Morning" },
          ].map((p) => (
            <div
              key={p.part}
              className="px-4 py-3 text-center border border-[#c9a84c]/40 bg-[#c9a84c]/5"
            >
              <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase text-[#c9a84c]">
                Part {p.part}
              </p>
              <p className="font-[family-name:var(--font-serif)] text-xs mt-1 text-[#ededed]">
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
