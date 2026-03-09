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

        {/* Purchase card */}
        <div className="max-w-lg mx-auto">
          <div className="border border-[#c9a84c]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.02] to-transparent" />
            <div className="relative z-10 p-10 text-center">
              <p className="font-[family-name:var(--font-serif)] text-5xl text-[#ededed] mb-2">
                $2.99
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-8">
                ebook &mdash; epub format &mdash; instant download
              </p>
              <a
                href="https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] mb-4"
              >
                Buy Part I Now
              </a>
              <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#555] tracking-wider">
                Secure checkout via Stripe &bull; Instant EPUB download &bull;
                No account required
              </p>
            </div>
          </div>

          {/* What you get */}
          <div className="grid grid-cols-3 gap-px mt-px bg-[#c9a84c]/10">
            {[
              { num: "11", label: "Chapters" },
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
              { part: "II", name: "The Listening", status: "coming" },
              { part: "III", name: "The Cost", status: "coming" },
              { part: "IV", name: "The Silence", status: "coming" },
              { part: "V", name: "The Song", status: "coming" },
            ].map((p) => (
              <div
                key={p.part}
                className={`px-4 py-3 text-center ${
                  p.status === "available"
                    ? "border border-[#c9a84c]/40 bg-[#c9a84c]/5"
                    : "border border-[#222]"
                }`}
              >
                <p
                  className={`font-[family-name:var(--font-sans)] text-[9px] tracking-[0.2em] uppercase ${
                    p.status === "available" ? "text-[#c9a84c]" : "text-[#555]"
                  }`}
                >
                  Part {p.part}
                </p>
                <p
                  className={`font-[family-name:var(--font-serif)] text-xs mt-1 ${
                    p.status === "available" ? "text-[#ededed]" : "text-[#444]"
                  }`}
                >
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
