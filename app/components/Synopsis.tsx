export default function Synopsis() {
  return (
    <section id="story" className="py-24 sm:py-40 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12 sm:mb-16" />

        <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
          <p>
            For fifteen years, <strong className="text-[#ededed]">Aelo</strong>{" "}
            has lived in silence &mdash; raised by a scarred old man in a
            village too small to have a name, fed herbs every morning that
            suppress a power he doesn&rsquo;t know he carries. When the herbs
            fail and the silence breaks, he discovers that magic is not a force
            to be wielded &mdash; it is a conversation with the world&rsquo;s
            memory. And he can hear{" "}
            <em className="text-[#ededed]">all of it</em>.
          </p>
          <p>
            But a king sits on an obsidian throne at the center of a dead zone,
            draining the memories of hundreds to feed a hunger that was born the
            day the world chose everyone except him.{" "}
            <strong className="text-[#ededed]">King Varas</strong> cannot hear
            the Song. He never could. And he has spent seventy years consuming
            the world to fill the silence.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 border-l-2 border-[#c9a84c]/30 pl-6">
          <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl italic text-[#ededed] leading-relaxed">
            A story about what it means to hear and be heard. About what we lose
            to become what we&rsquo;re meant to be.
          </p>
        </div>
      </div>
    </section>
  );
}
