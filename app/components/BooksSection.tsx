export default function BooksSection() {
  return (
    <section id="books" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
          Our Catalog
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide mb-6">
          Two Novels. Two Voices. One House.
        </h2>
        <p className="font-[family-name:var(--font-serif)] text-lg text-[#8a8a8a] leading-relaxed max-w-xl mx-auto">
          Stillfire Press was born from the collision of two stories &mdash; a
          father&rsquo;s and a son&rsquo;s. One about stillness, one about fire.
          Both about what power costs and what remains after loss.
        </p>
      </div>
    </section>
  );
}
