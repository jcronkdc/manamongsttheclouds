export default function JustinBook() {
  return (
    <section id="matc" className="py-24 px-6 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
            Coming August 2026
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-light tracking-wide mb-3">
            Man Amongst the Clouds
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#c9a84c]/80 tracking-wider mb-6">
            by Justin Cronk
          </p>
          <p className="font-[family-name:var(--font-serif)] text-xl italic text-[#8a8a8a] max-w-xl mx-auto">
            A literary fantasy nine years in the making
          </p>
        </div>

        {/* Blurb */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[#bbb] mb-6">
            <strong className="text-[#ededed]">
              In a world where magic is memory, every gift has a price.
            </strong>
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#bbb] mb-6">
            For fifteen years, Aelo has lived in silence &mdash; raised by a
            scarred old man in a village too small to have a name, fed herbs
            every morning that suppress a power he doesn&rsquo;t know he
            carries. He has never heard the world sing. He has never felt the
            hum in the stone beneath his feet or the voices in the ancient
            trees. He has never known that his mother died holding a note that
            shook the sky.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#bbb] mb-6">
            When the herbs fail and the silence breaks, Aelo discovers that
            magic is not a force to be wielded &mdash; it is a conversation
            with the world&rsquo;s memory. And he can hear all of it.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#bbb] mb-6">
            But a king sits on an obsidian throne at the center of a dead zone,
            draining the memories of hundreds to feed a hunger that was born the
            day the world chose everyone except him. King Varas cannot hear the
            Song. He never could. And he has spent seventy years consuming the
            world to fill the silence.
          </p>
          <p className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#bbb]">
            Now Varas has sent his most lethal weapon &mdash; a man known only
            as The Knife, who carries a wooden box of five beautiful objects and
            checks them every night because the checking is the only act that
            proves he is still a person &mdash; to find the boy who made a
            stone sing.
          </p>
        </div>

        {/* Magic System Grid */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl font-light tracking-wide text-center text-[#c9a84c] mb-8">
            The Seven Disciplines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[
              {
                name: "The Know",
                desc: "Listen to the truth of living things. Cost: your emotional boundaries.",
              },
              {
                name: "The Mold",
                desc: "Ask stone to remember a different shape. Cost: the feeling in your hands.",
              },
              {
                name: "The Heal",
                desc: "Remind flesh of wholeness. Cost: you carry every wound you mend.",
              },
              {
                name: "The Move",
                desc: "Rearrange the space between things. Cost: your sense of where you are.",
              },
              {
                name: "The Guide",
                desc: "Feel the trajectory of paths. Cost: your memory of home.",
              },
              {
                name: "The Burn",
                desc: "Awaken the memory of fire. Cost: the warmth inside you.",
              },
            ].map((d) => (
              <div
                key={d.name}
                className="border border-[#c9a84c]/20 p-6 hover:border-[#c9a84c]/50 transition-colors"
              >
                <h4 className="font-[family-name:var(--font-serif)] text-[#c9a84c] text-lg mb-2">
                  {d.name}
                </h4>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#8a8a8a] leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-[#c9a84c]/40 p-6 text-center">
            <h4 className="font-[family-name:var(--font-serif)] text-[#c9a84c] text-xl mb-2">
              The Sing
            </h4>
            <p className="font-[family-name:var(--font-sans)] text-sm text-[#8a8a8a] leading-relaxed">
              The harmonization of all seven voices. Love made audible. Cost:{" "}
              <em>everything</em>.
            </p>
          </div>
        </div>

        {/* Characters */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl font-light tracking-wide text-center text-[#c9a84c] mb-4">
            The Characters
          </h3>
          <p className="font-[family-name:var(--font-serif)] text-center text-[#8a8a8a] italic mb-12">
            Every character could be the protagonist of their own book.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Aelo",
                hook: "A boy raised on silence who discovers he can hear the world sing. His greatest power is the willingness to listen.",
              },
              {
                name: "Jalo",
                hook: "The village drunk with a scarred face and a shattered knee. He burned his own face to hide who he was. He drugs a child every morning to keep him safe. He drinks so the boy can sleep.",
              },
              {
                name: "The Knife",
                hook: "The King\u2019s weapon. He carries a wooden box of five beautiful objects and checks them every night. The objects are going blank. He doesn\u2019t know why.",
              },
              {
                name: "King Varas",
                hook: "Born deaf to the Song in a world that sings. He has spent seventy years consuming the world to fill a silence nothing can fill.",
              },
            ].map((c) => (
              <div key={c.name} className="border-l-2 border-[#c9a84c]/30 pl-6">
                <h4 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-3">
                  {c.name}
                </h4>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#8a8a8a] leading-relaxed">
                  {c.hook}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Author's Journey */}
        <div className="max-w-2xl mx-auto mb-16">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl font-light tracking-wide text-center text-[#c9a84c] mb-8">
            Nine Years in the Making
          </h3>
          <div className="font-[family-name:var(--font-serif)] text-base leading-relaxed text-[#bbb] space-y-6">
            <p>
              This book started as a note on my phone in March 2017. A single
              idea:{" "}
              <em className="text-[#ededed]">What if magic was memory?</em>
            </p>
            <p>
              I didn&rsquo;t know it would take nine years. I didn&rsquo;t know
              it would live in every notes app, email thread, and text-to-self I
              owned. I wrote when the compulsion hit &mdash; at 2 AM, in parking
              lots, in voice memos that autocorrected &ldquo;spread&rdquo; to
              &ldquo;Spanish.&rdquo;
            </p>
            <p>
              The protagonist was originally called Nim. He became Aelo &mdash;{" "}
              <em className="text-[#c9a84c]">
                &ldquo;breath of remembering&rdquo;
              </em>{" "}
              &mdash; when the magic system crystallized into something larger
              than I&rsquo;d planned.
            </p>
            <p>
              The man I was in 2017 couldn&rsquo;t have written this book. He
              had the bones, but he didn&rsquo;t have the depth. Nine years of
              living gave me that. Nine years of grief, of love, of carrying
              things for a long time and learning what the carrying costs.
            </p>
            <p className="text-[#ededed] font-semibold">
              I&rsquo;m grateful for every year of the gap. The book is better
              for it. I am better for it.
            </p>
          </div>
          <p className="font-[family-name:var(--font-serif)] text-center text-[#8a8a8a] italic mt-8">
            &mdash; Justin Cronk
          </p>
        </div>

        {/* Buy / Coming Soon */}
        <div className="max-w-xl mx-auto">
          <div className="border border-[#c9a84c]/30 p-8 text-center mb-6">
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#8a8a8a] mb-2">
              Part I &mdash; The Still Water
            </p>
            <p className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-1">
              $2.99
            </p>
            <p className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#8a8a8a] mb-6">
              ebook &mdash; epub &amp; kindle
            </p>
            <a
              href="https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-colors"
            >
              Buy Part I
            </a>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#555] mt-4">
              Secure checkout via Stripe &bull; Instant EPUB download
            </p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#8a8a8a] mb-1">
              The complete novel
            </p>
            <p className="font-[family-name:var(--font-serif)] text-lg text-[#ededed]">
              Coming August 2026
            </p>
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#555] mt-2">
              Five parts. 48 chapters. 153,000 words. The full journey from
              silence to Song.
            </p>
          </div>
        </div>

        {/* Comp Titles */}
        <div className="mt-16 text-center">
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#555] italic">
            For readers of Patrick Rothfuss, Robin Hobb, Guy Gavriel Kay, and
            Ursula K. Le Guin.
          </p>
        </div>
      </div>
    </section>
  );
}
