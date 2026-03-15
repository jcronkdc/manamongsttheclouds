export default function Excerpt() {
  return (
    <section
      id="excerpt"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          Read an Excerpt
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl font-light tracking-wide text-center mb-4">
          Chapter 1: The Herbs
        </h2>
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#555] text-center tracking-wider uppercase mb-16">
          Part I &mdash; The Still Water
        </p>

        <div className="font-[family-name:var(--font-serif)] text-base sm:text-[17px] leading-[2] text-[#ddd8d0] space-y-6">
          <p>
            Aelo tasted smoke in his sleep and woke reaching for a woman he had
            never met.
          </p>
          <p>
            His hand closed on nothing. The dark of the room settled around him
            &mdash; familiar, cramped, smelling of dried herbs and the ghost of
            last night&rsquo;s fire &mdash; and the smoke faded from his tongue
            like a word he&rsquo;d forgotten before he could speak it. He lay
            still, breathing, waiting for his heart to slow. Through the thin
            wall that separated his room from Jalo&rsquo;s, he could hear the
            old man thrashing. The cot groaned. A bottle knocked against the
            floor and rolled.
          </p>
          <p>
            The nightmare was still going. Aelo could feel it the way you feel
            weather through a window &mdash; not the thing itself but the
            pressure of it, the charged stillness before the storm breaks. Heat.
            Panic. A door splintering. And beneath it all, threaded through the
            terror like a vein of gold through rock, a voice. A woman&rsquo;s
            voice, high and clear, holding a single note that seemed to push
            against the walls of the dream the way hands push against a closing
            door.
          </p>
          <p>
            He didn&rsquo;t know whose voice it was. He had never known. It was
            always there in Jalo&rsquo;s worst nights &mdash; the smoke, the
            splintering, and the voice &mdash; and it always ended the same way:
            a silence so sudden and so total that it felt like falling.
          </p>
          <p>
            The silence came. Jalo&rsquo;s thrashing stopped. The bottle
            finished its roll and came to rest against the wall.
          </p>
          <p className="text-[#b0a89e] italic">
            Aelo exhaled. He pressed the heels of his palms into his eyes and
            waited for the last of it to drain out of him &mdash; the residue,
            the aftertaste of someone else&rsquo;s terror. It clung to his skin
            like sweat. It always did.
          </p>
        </div>

        {/* Fade-out overlay */}
        <div className="relative mt-0">
          <div className="h-32 bg-gradient-to-b from-transparent to-[#080808]" />
          <div className="text-center -mt-8">
            <a
              href="https://stillfirepress.com/read/matc"
              className="inline-block w-full sm:w-auto px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] text-center"
            >
              Keep Reading Free
            </a>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#999] mt-4">
              Part I continues for 10 more chapters &mdash; free, right here in
              your browser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
