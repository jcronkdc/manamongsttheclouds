export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 sm:pt-20 pb-12 text-center overflow-hidden">
      {/* Layered atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a84c]/[0.03] blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#c9a84c]/[0.02] blur-[100px] animate-float" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

      <div className="relative z-20 max-w-3xl mx-auto">
        {/* Epigraph — the first line readers see */}
        <p
          className="font-[family-name:var(--font-serif)] text-base sm:text-lg italic text-[#b0a89e] max-w-lg mx-auto leading-relaxed mb-12 sm:mb-16 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          &ldquo;In the time before the taking, the world sang to itself,
          <br className="hidden sm:block" /> and men were wise enough to
          listen.&rdquo;
        </p>

        {/* Title */}
        <h1
          className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl lg:text-8xl font-light tracking-wide leading-[1.1] mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          Man Amongst
          <br />
          the Clouds
        </h1>

        <p
          className="font-[family-name:var(--font-serif)] text-lg text-[#c9a84c]/70 tracking-[0.2em] mb-10 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
        >
          by Justin Cronk
        </p>

        {/* The hook — this is what sells the book */}
        <div
          className="max-w-2xl mx-auto mb-14 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}
        >
          <p className="font-[family-name:var(--font-serif)] text-lg sm:text-2xl leading-relaxed text-[#d4d0c8]">
            <span className="text-[#c9a84c]">Magic is memory.</span> Every act
            of power costs a piece of who you are. A boy raised on silence
            discovers he can hear the world sing. A king born deaf to the Song
            will consume everything to fill it.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base sm:text-xl italic text-[#b0a89e] mt-4">
            The cost is everything.
          </p>
        </div>

        {/* Badge */}
        <div
          className="flex items-center justify-center gap-3 mb-10 opacity-0 animate-fade-in"
          style={{ animationDelay: "2.2s", animationFillMode: "forwards" }}
        >
          <span className="h-px w-8 bg-[#c9a84c]/30" />
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/60">
            153,000 words &bull; Nine years in the making &bull; Part I
            available now
          </p>
          <span className="h-px w-8 bg-[#c9a84c]/30" />
        </div>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
        >
          <a
            href="/read/part-one"
            className="group relative px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            Read Part One Free
          </a>
          <a
            href="#read"
            className="px-10 py-4 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
          >
            Buy the EPUB &mdash; $2.99
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in"
        style={{ animationDelay: "3.5s", animationFillMode: "forwards" }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#555]">
            Scroll
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c]/40 to-transparent animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
}
