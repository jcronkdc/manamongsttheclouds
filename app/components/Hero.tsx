import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 pt-20 sm:pt-20 pb-28 sm:pb-20 text-center overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a84c]/[0.015] blur-[150px]" />

      <div className="relative z-20 max-w-3xl mx-auto">
        {/* Book cover */}
        <div
          className="flex justify-center mb-8 sm:mb-14 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <Image
            src="/cover.jpg"
            alt="Man Amongst the Clouds — book cover by Justin Cronk"
            width={280}
            height={448}
            className="w-[180px] sm:w-[280px] h-auto border border-[#222] shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(201,168,76,0.08)]"
            priority
            sizes="(max-width: 640px) 180px, 280px"
          />
        </div>

        {/* Title */}
        <h1
          className="font-[family-name:var(--font-serif)] text-3xl sm:text-6xl lg:text-8xl font-light tracking-wide leading-[1.1] mb-3 sm:mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          Man Amongst
          <br />
          the Clouds
        </h1>

        <p
          className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#c9a84c]/70 tracking-[0.15em] sm:tracking-[0.2em] mb-8 sm:mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          by Justin Cronk
        </p>

        {/* The hook */}
        <div
          className="max-w-xl mx-auto mb-10 sm:mb-14 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
        >
          <p className="font-[family-name:var(--font-serif)] text-base sm:text-2xl leading-relaxed text-[#d4d0c8]">
            <span className="text-[#c9a84c]">Magic is memory.</span> Every act
            of power costs a piece of who you are.
          </p>
        </div>

        {/* CTA — Read Free is primary */}
        <div
          className="flex flex-col items-center w-full opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
        >
          <a
            href="https://stillfirepress.com/read/matc"
            className="px-12 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
          >
            Read Part One Free
          </a>
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] text-[#666] mt-4">
            No account &bull; No signup &bull; Start reading now
          </p>
          <a
            href="https://www.amazon.com/dp/B0GSSPN6LN"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors mt-6 uppercase"
          >
            Or buy the complete novel on Amazon &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
