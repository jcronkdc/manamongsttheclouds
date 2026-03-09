import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-[#c9a84c] tracking-[0.35em] uppercase text-xs mb-8 font-[family-name:var(--font-sans)]">
          Thank you
        </p>
        <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-light tracking-wide leading-tight mb-6">
          The Song begins.
        </h1>
        <p className="font-[family-name:var(--font-serif)] text-lg text-[#8a8a8a] italic mb-12 max-w-md mx-auto leading-relaxed">
          Thank you for being here at the beginning. Your copy of Part I is ready.
        </p>
        <a
          href="/download/matc-part1.epub"
          download="Man Amongst the Clouds - Part I The Still Water.epub"
          className="inline-block px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-colors mb-4"
        >
          Download Part I (EPUB)
        </a>
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#555] mb-12">
          Right-click &amp; &ldquo;Save As&rdquo; if the download doesn&rsquo;t start automatically
        </p>
        <div className="border-t border-[#222] pt-8 space-y-4">
          <p className="font-[family-name:var(--font-serif)] text-base text-[#bbb] leading-relaxed">
            The full novel &mdash; all five parts, 48 chapters, 153,000 words &mdash; is coming Fall 2026.
            Sign up below so you never miss a release.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto mt-6">
            <form
              action="https://formspree.io/f/xzaborvj"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-sm placeholder:text-[#555] focus:border-[#c9a84c] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/share" className="text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#e8c85a] transition-colors">
              Share a passage
            </Link>
            <Link href="/" className="text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#ededed] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
        <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#333] mt-16">
          &ldquo;The world sang to itself. And in the space between the notes, where silence lived, a man breathed &mdash; and the air remembered.&rdquo;
        </p>
      </div>
    </main>
  );
}
