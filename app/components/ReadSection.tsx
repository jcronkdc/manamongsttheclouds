import Image from "next/image";

export default function ReadSection() {
  return (
    <section id="read" className="bg-[#080808] relative">
      {/* Chapters banner video */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          poster="/art/matc-hero-chapters.png"
        >
          <source src="/art/matc-hero-chapters.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/30 via-transparent to-[#080808]" />
      </div>
      <div className="py-14 sm:py-28 px-4 sm:px-6 relative -mt-16 sm:-mt-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
            Now Available
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center leading-tight mb-4">
            The complete novel is here.
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#b0a89e] italic text-center mb-12 sm:mb-16">
            Five parts &bull; 48 chapters &bull; Published March 17, 2026
          </p>

          {/* Book cover */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <Image
              src="/cover.jpg"
              alt="Man Amongst the Clouds — book cover by Justin Cronk"
              width={280}
              height={448}
              className="w-[160px] sm:w-[280px] h-auto border border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              priority
              sizes="(max-width: 640px) 160px, 280px"
            />
          </div>

          {/* Buy */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="border border-[#222] p-6 sm:p-10 text-center">
              <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-[#ededed] mb-3">
                Available on Amazon
              </p>
              <p className="font-[family-name:var(--font-serif)] text-sm text-[#b0a89e] leading-relaxed max-w-sm mx-auto mb-6">
                The complete novel &mdash; all five parts, 48 chapters, from
                silence to Song.
              </p>
              <a
                href="https://www.amazon.com/dp/B0GSSPN6LN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-3.5 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 mb-4"
              >
                Buy on Amazon
              </a>
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] text-[#888]">
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
            </div>
          </div>

          {/* Book stats */}
          <div className="max-w-lg mx-auto">
            <div className="grid grid-cols-3 gap-px bg-[#c9a84c]/10">
              {[
                { num: "48", label: "Chapters" },
                { num: "146K", label: "Words" },
                { num: "5", label: "Parts" },
              ].map((item) => (
                <div key={item.label} className="bg-[#080808] p-4 text-center">
                  <p className="font-[family-name:var(--font-serif)] text-xl text-[#c9a84c]">
                    {item.num}
                  </p>
                  <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase text-[#666]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Read Part One free */}
          <div className="max-w-lg mx-auto mt-8">
            <a
              href="https://stillfirepress.com/read/matc"
              className="block border border-[#222] hover:border-[#c9a84c]/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="relative z-10 p-8 text-center">
                <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#666] mb-3">
                  Not sure yet?
                </p>
                <p className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-1 group-hover:text-[#c9a84c] transition-colors duration-300">
                  Read Part One Free Online
                </p>
                <p className="font-[family-name:var(--font-sans)] text-xs text-[#8a8a8a] mb-5">
                  No account. No signup. Prologue + Chapters 1&ndash;10, right
                  in your browser.
                </p>
                <span className="inline-block px-10 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/5 transition-all duration-300">
                  Start Reading
                </span>
              </div>
            </a>
          </div>

          {/* Part structure */}
          <div className="mt-20 text-center">
            <div className="w-12 h-px bg-[#c9a84c]/20 mx-auto mb-8" />
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#555] mb-4">
              The Journey
            </p>
            <p className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-3">
              Five Parts. One Story.
            </p>
            <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-relaxed max-w-md mx-auto">
              From silence to Song. 48 chapters. A prologue and an epilogue.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mt-8">
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
        </div>
      </div>
    </section>
  );
}
