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
          Thank you for being here at the beginning.
        </p>

        <div className="border border-[#c9a84c]/20 p-8 sm:p-10 mb-12">
          <p className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-3">
            Check your email.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-relaxed mb-2">
            Your copy of <em>Part I: The Still Water</em> has been sent to the
            email address you used at checkout.
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#666] leading-relaxed">
            The download link expires in 7 days. If you don&rsquo;t see the
            email, check your spam folder or contact{" "}
            <a
              href="mailto:hello@stillfirepress.com"
              className="text-[#c9a84c] hover:text-[#e8c85a] transition-colors"
            >
              hello@stillfirepress.com
            </a>
          </p>
        </div>
        <div className="border-t border-[#222] pt-8 space-y-4">
          <p className="font-[family-name:var(--font-serif)] text-base text-[#bbb] leading-relaxed">
            The full novel &mdash; all five parts, 48 chapters, 153,000 words
            &mdash; is coming Fall 2026. Sign up below so you never miss a
            release.
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
            <Link
              href="/share"
              className="text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#e8c85a] transition-colors"
            >
              Share a passage
            </Link>
            <Link
              href="/"
              className="text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#ededed] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#333] mt-16">
          &ldquo;The world sang to itself. And in the space between the notes,
          where silence lived, a man breathed &mdash; and the air
          remembered.&rdquo;
        </p>
      </div>
    </main>
  );
}
