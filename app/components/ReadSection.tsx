import Image from "next/image";

export default function ReadSection() {
  return (
    <section
      id="read"
      className="py-20 sm:py-28 px-5 sm:px-6 bg-[#080808] relative"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="max-w-3xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          Start Reading
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center leading-tight mb-4">
          Part I is available now.
        </h2>
        <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#b0a89e] italic text-center mb-12 sm:mb-16">
          The Still Water &mdash; Prologue + Chapters 1&ndash;10
        </p>

        {/* Book cover */}
        <div className="flex justify-center mb-12">
          <Image
            src="/cover-part-one.jpg"
            alt="Man Amongst the Clouds Part One: The Still Water — book cover by Justin Cronk"
            width={280}
            height={362}
            className="border border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            priority
            sizes="280px"
          />
        </div>

        {/* Free reading card */}
        <div className="max-w-lg mx-auto mb-6">
          <a
            href="https://stillfirepress.com/read/matc"
            className="block border border-[#c9a84c]/30 bg-[#c9a84c]/5 hover:bg-[#c9a84c]/10 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="p-8 sm:p-10 text-center">
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/70 mb-3">
                Free for everyone
              </p>
              <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#ededed] mb-3 group-hover:text-[#c9a84c] transition-colors duration-300">
                Read Part One Online
              </p>
              <p className="font-[family-name:var(--font-serif)] text-sm text-[#b0a89e] leading-relaxed max-w-sm mx-auto mb-6">
                No account. No signup. No paywall. Just the story &mdash; ten
                chapters, right here in your browser.
              </p>
              <span className="inline-block px-10 py-3.5 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase group-hover:bg-[#e8c85a] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                Start Reading
              </span>
            </div>
          </a>
        </div>

        {/* Part I stats */}
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-px bg-[#c9a84c]/10">
            {[
              { num: "10", label: "Chapters" },
              { num: "~40K", label: "Words" },
              { num: "1", label: "Prologue" },
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

        {/* Founder's Edition */}
        <div className="max-w-lg mx-auto mt-16">
          <div className="border border-[#c9a84c]/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.04] to-transparent" />
            <div className="relative z-10 p-8 sm:p-10 text-center">
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] mb-3">
                Founder&rsquo;s Edition
              </p>
              <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#ededed] mb-3">
                The Complete Experience
              </p>
              <p className="font-[family-name:var(--font-serif)] text-sm text-[#b0a89e] leading-relaxed max-w-sm mx-auto mb-6">
                All five parts delivered digitally as they release, plus a
                signed physical copy of the finished novel. Targeting August
                2026.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center text-left max-w-xs mx-auto mb-6">
                {[
                  "All 5 parts (EPUB) as they release",
                  "Signed physical copy",
                  "Full refund anytime, no questions asked",
                ].map((item) => (
                  <p
                    key={item}
                    className="font-[family-name:var(--font-sans)] text-[11px] text-[#c4beb4] leading-snug"
                  >
                    <span className="text-[#c9a84c] mr-1.5">&bull;</span>
                    {item}
                  </p>
                ))}
              </div>

              <p className="font-[family-name:var(--font-serif)] text-4xl text-[#c9a84c] mb-6">
                $39.99
              </p>
              <a
                href="/api/founders-edition"
                className="inline-block px-10 py-3.5 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] mb-4"
              >
                Become a Founder
              </a>
              <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#555] tracking-wider">
                Secure checkout via Stripe &bull; Shipping address collected at
                checkout &bull; No account required
              </p>
            </div>
          </div>
        </div>

        {/* Part Two pre-order */}
        <div className="max-w-lg mx-auto mt-8">
          <div className="border border-[#222] relative overflow-hidden">
            <div className="relative z-10 p-8 text-center">
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#666] mb-3">
                Just want Part II?
              </p>
              <p className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-1">
                Pre-Order Part II &mdash; $2.99
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#8a8a8a] mb-5">
                EPUB delivered to your email when it releases (expected May
                2026).
              </p>
              <a
                href="/api/preorder"
                className="inline-block px-10 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300 mb-3"
              >
                Pre-Order Part II
              </a>
              <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#555] tracking-wider">
                Secure checkout via Stripe &bull; No account required
              </p>
            </div>
          </div>
        </div>

        {/* The complete novel */}
        <div className="mt-20 text-center">
          <div className="w-12 h-px bg-[#c9a84c]/20 mx-auto mb-8" />
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#555] mb-4">
            The complete novel
          </p>
          <p className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-3">
            Coming Fall 2026
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-relaxed max-w-md mx-auto">
            Five parts. 48 chapters. 153,000 words. The full journey from
            silence to Song.
          </p>

          {/* Part structure preview */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            {[
              { part: "I", name: "The Still Water", status: "available" },
              { part: "II", name: "The Waking", status: "preorder" },
              { part: "III", name: "The Breaking", status: "coming" },
              { part: "IV", name: "The Chamber", status: "coming" },
              { part: "V", name: "The Remembering", status: "coming" },
            ].map((p) => (
              <div
                key={p.part}
                className={`px-4 py-3 text-center ${
                  p.status === "available"
                    ? "border border-[#c9a84c]/40 bg-[#c9a84c]/5"
                    : p.status === "preorder"
                      ? "border border-[#c9a84c]/20 bg-[#c9a84c]/[0.02]"
                      : "border border-[#222]"
                }`}
              >
                <p
                  className={`font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase ${
                    p.status === "available"
                      ? "text-[#c9a84c]"
                      : p.status === "preorder"
                        ? "text-[#c9a84c]/70"
                        : "text-[#555]"
                  }`}
                >
                  Part {p.part}
                </p>
                <p
                  className={`font-[family-name:var(--font-serif)] text-xs mt-1 ${
                    p.status === "available"
                      ? "text-[#ededed]"
                      : p.status === "preorder"
                        ? "text-[#b0a89e]"
                        : "text-[#444]"
                  }`}
                >
                  {p.name}
                </p>
                {p.status === "preorder" && (
                  <p className="font-[family-name:var(--font-sans)] text-[8px] tracking-[0.15em] uppercase text-[#c9a84c]/50 mt-1">
                    Pre-Order
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
