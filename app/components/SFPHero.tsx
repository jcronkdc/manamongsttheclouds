export default function SFPHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      {/* Dual glow — gold (stillness) and ember (fire) */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#c9a84c]/5 blur-[140px]" />
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-[#b34a2a]/4 blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-serif)] text-5xl sm:text-7xl font-light tracking-wide leading-tight mb-4">
            Stillfire Press
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-[#c9a84c] to-[#b34a2a] mx-auto mb-6" />
          <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl italic text-[#8a8a8a] max-w-lg mx-auto leading-relaxed">
            An independent publishing house for literary fantasy that burns slow and stays with you.
          </p>
        </div>

        <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.35em] uppercase text-[#666] mb-12">
          Founded by Justin &amp; Carter Cronk
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#books"
            className="px-8 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-colors"
          >
            Our Books
          </a>
          <a
            href="#signup"
            className="px-8 py-3 border border-[#c9a84c]/40 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
          >
            Get Updates
          </a>
        </div>
      </div>
    </section>
  );
}
