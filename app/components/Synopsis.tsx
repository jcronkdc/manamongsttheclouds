export default function Synopsis() {
  return (
    <section id="story" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          The Story
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center leading-tight mb-6">
          In a world where magic is memory,
          <br />
          <span className="text-[#c9a84c]">every gift has a price.</span>
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12" />

        <div className="font-[family-name:var(--font-serif)] text-base sm:text-lg leading-[1.9] text-[#d4d0c8] space-y-6">
          <p>
            For fifteen years, <strong className="text-[#ededed]">Aelo</strong>{" "}
            has lived in silence &mdash; raised by a scarred old man in a
            village too small to have a name, fed herbs every morning that
            suppress a power he doesn&rsquo;t know he carries. He has never
            heard the world sing. He has never felt the hum in the stone beneath
            his feet or the voices in the ancient trees. He has never known that
            his mother died holding a note that shook the sky.
          </p>
          <p>
            When the herbs fail and the silence breaks, Aelo discovers that
            magic is not a force to be wielded &mdash; it is a conversation with
            the world&rsquo;s memory. And he can hear{" "}
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
          <p>
            Now Varas has sent his most lethal weapon &mdash; a man known only
            as <strong className="text-[#ededed]">The Knife</strong>, who
            carries a wooden box of five beautiful objects and checks them every
            night because the checking is the only act that proves he is still a
            person &mdash; to find the boy who made a stone sing.
          </p>
        </div>

        <div className="mt-12 border-l-2 border-[#c9a84c]/30 pl-6">
          <p className="font-[family-name:var(--font-serif)] text-xl italic text-[#ededed] leading-relaxed">
            A story about what it means to hear and be heard. About what we lose
            to become what we&rsquo;re meant to be. About a man who was born
            without the Song &mdash; and burned the world trying to find it.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#8a8a8a] mb-1">
            153,000 words &bull; Five parts &bull; 48 chapters &bull; A prologue
            and an epilogue
          </p>
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#c9a84c]/70 italic">
            Part I: The Still Water &mdash; available now
          </p>
        </div>
      </div>
    </section>
  );
}
