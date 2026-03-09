export default function SignupSection() {
  return (
    <section id="signup" className="py-28 px-6 relative">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
          Stay Close
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight mb-6">
          The Song isn&rsquo;t finished.
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-8" />
        <p className="font-[family-name:var(--font-serif)] text-lg text-[#999] mb-10 leading-relaxed">
          Get notified when new parts release, behind-the-scenes content drops,
          and the complete novel launches. From Stillfire Press &mdash; an
          independent publishing house that believes stories should cost the
          writer something.
        </p>
        <form
          action="https://formspree.io/f/xzaborvj"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-4 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-sm placeholder:text-[#555] focus:border-[#c9a84c] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] whitespace-nowrap"
          >
            Notify Me
          </button>
        </form>
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] mt-4">
          No spam. Just books worth the wait. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
