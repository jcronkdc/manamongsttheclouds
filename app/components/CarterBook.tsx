export default function CarterBook() {
  return (
    <section id="atf" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.35em] uppercase text-[#b34a2a] mb-4">
            Coming June 2027
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-light tracking-wide mb-3">
            Ash to Fury
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#b34a2a]/80 tracking-wider mb-6">
            by Carter Cronk
          </p>
        </div>

        {/* Teaser — intentionally minimal */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <p className="font-[family-name:var(--font-serif)] text-xl leading-relaxed text-[#bbb] mb-8 italic">
            &ldquo;He had crossed a line. Now he would cross every other one it
            took to make the one who had led him there answer for it.&rdquo;
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#8a8a8a] mb-6">
            A man built on restraint. A power held in careful hands. A family
            that was everything.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#ededed] font-semibold">
            Then the ashes.
          </p>
        </div>

        {/* Ember divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b34a2a] to-transparent" />
        </div>

        {/* Minimal details */}
        <div className="max-w-md mx-auto text-center">
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#666] leading-relaxed mb-8">
            A dark fantasy about grief, transformation, and the beast that lives
            inside discipline when discipline is no longer enough.
          </p>
          <div className="border border-[#b34a2a]/20 p-6">
            <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.3em] uppercase text-[#b34a2a]/60 mb-2">
              Status
            </p>
            <p className="font-[family-name:var(--font-serif)] text-lg text-[#ededed]">
              In Progress
            </p>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#555] mt-2">
              More details coming 2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
