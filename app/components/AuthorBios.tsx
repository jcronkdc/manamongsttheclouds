export default function AuthorBios() {
  return (
    <section id="authors" className="py-24 px-6 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
            The Authors
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide">
            A Father &amp; Son Publishing House
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Justin */}
          <div>
            <div className="border-l-2 border-[#c9a84c]/40 pl-6">
              <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-1">
                Justin Cronk
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#c9a84c] mb-6">
                Founder &bull; Author
              </p>
              <div className="font-[family-name:var(--font-serif)] text-sm leading-relaxed text-[#999] space-y-4">
                <p>
                  Justin Cronk started writing{" "}
                  <em>Man Amongst the Clouds</em> in March 2017. He finished it
                  in March 2026. Nine years.
                </p>
                <p>
                  The book didn&rsquo;t live in one place. It lived in notes
                  apps, emails to himself, texts to himself, Google Docs,
                  Evernote, Scrivener &mdash; scattered across every device he
                  owned, captured in bursts when the compulsion hit.
                </p>
                <p>
                  The man who started this book in 2017 is not the man who
                  finished it in 2026. He is grateful for the gap. The nine
                  years gave the novel a depth &mdash; an understanding of
                  grief, of love, of what it costs to carry something for a long
                  time &mdash; that the 2017 version could not have had.
                </p>
                <p className="text-[#bbb]">
                  His work explores the intersection of epic fantasy and
                  literary fiction &mdash; the emotional interiority of
                  characters navigating a world where magic is a conversation
                  with memory and every act of power costs a piece of identity.
                </p>
              </div>
            </div>
          </div>

          {/* Carter */}
          <div>
            <div className="border-l-2 border-[#b34a2a]/40 pl-6">
              <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[#ededed] mb-1">
                Carter Cronk
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#b34a2a] mb-6">
                Co-Founder &bull; Author
              </p>
              <div className="font-[family-name:var(--font-serif)] text-sm leading-relaxed text-[#999] space-y-4">
                <p>
                  Carter Cronk is the author of{" "}
                  <em>Ash to Fury</em>, a dark fantasy about a man of
                  extraordinary discipline who is unmade by the very obedience
                  he believed was strength.
                </p>
                <p className="text-[#bbb]">
                  More coming 2027.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Transparency */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-6 text-center">
            AI Transparency
          </h3>
          <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#999] space-y-4">
            <p>
              Every word of prose in our novels is human-written. The stories,
              characters, worlds, and every creative decision are entirely the
              authors&rsquo; own.
            </p>
            <p>
              AI tools were used in a{" "}
              <strong className="text-[#ededed]">support capacity only</strong>{" "}
              &mdash; the same role a copywriter, developmental editor, or
              continuity reader would fill:
            </p>
            <ul className="list-none space-y-2 pl-4 border-l border-[#c9a84c]/20">
              <li>
                <span className="text-[#c9a84c]">&bull;</span> Continuity
                auditing across large manuscripts
              </li>
              <li>
                <span className="text-[#c9a84c]">&bull;</span> Marketing
                copywriting (book descriptions, bios)
              </li>
              <li>
                <span className="text-[#c9a84c]">&bull;</span> Identifying plot
                holes and inconsistencies
              </li>
              <li>
                <span className="text-[#c9a84c]">&bull;</span> Formatting and
                manuscript compilation
              </li>
            </ul>
            <p className="text-[#ededed]">
              AI helped check the work. The work is ours.
            </p>
          </div>
        </div>

        {/* Blockchain Proof */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-6 text-center">
            Blockchain Proof of Ownership
          </h3>
          <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#999] space-y-4 mb-8">
            <p>
              The complete manuscript of{" "}
              <em>Man Amongst the Clouds</em> has been cryptographically hashed
              and recorded on the{" "}
              <strong className="text-[#ededed]">Polygon blockchain</strong> as
              an immutable, timestamped proof of ownership.
            </p>
          </div>
          <div className="border border-[#c9a84c]/30 p-6 text-center">
            <p className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#c9a84c] mb-3">
              Manuscript SHA-256 Hash
            </p>
            <p className="font-mono text-xs sm:text-sm text-[#ededed] break-all leading-relaxed">
              3cc70e0d02bba340d2e24cb391bbd9680d458c173d9aad33916e9b19b25ea9f7
            </p>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#555] mt-4">
              50 files &bull; 153,000 words &bull; Recorded on Polygon
            </p>
            <a
              href="https://polygonscan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 border border-[#333] text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
            >
              View on PolygonScan
            </a>
          </div>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] text-center mt-6">
            Any change to any character in any chapter would produce a
            completely different hash. The blockchain record is permanent,
            public, and cannot be modified or deleted.
          </p>
        </div>
      </div>
    </section>
  );
}
