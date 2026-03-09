export default function ProofSection() {
  return (
    <section className="py-24 px-6 bg-[#0f0f0f]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide mb-4 text-center text-[#c9a84c]">
          Proof of Authorship
        </h2>
        <p className="font-[family-name:var(--font-serif)] text-center text-[#8a8a8a] italic mb-12">
          This story is human-written, blockchain-verified, and nine years in the making.
        </p>

        {/* AI Transparency */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-6 text-center">
            AI Transparency
          </h3>
          <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#999] space-y-4">
            <p>
              Every word of prose in <em>Man Amongst the Clouds</em> was written by Justin Cronk. The story, characters, world, magic system, and every creative decision are entirely his own &mdash; developed over nine years beginning in March 2017.
            </p>
            <p>
              AI tools were used in a <strong className="text-[#ededed]">support capacity only</strong> &mdash; the same role a copywriter, developmental editor, or continuity reader would fill:
            </p>
            <ul className="list-none space-y-2 pl-4 border-l border-[#c9a84c]/20">
              <li><span className="text-[#c9a84c]">&bull;</span> Continuity auditing across 48 chapters and 153,000 words</li>
              <li><span className="text-[#c9a84c]">&bull;</span> Marketing copywriting (book descriptions, bios)</li>
              <li><span className="text-[#c9a84c]">&bull;</span> Identifying plot holes and inconsistencies</li>
              <li><span className="text-[#c9a84c]">&bull;</span> Formatting and manuscript compilation</li>
            </ul>
            <p className="text-[#ededed]">
              AI helped check the work. The work is mine. &mdash; <em>Justin</em>
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://gptzero.me" target="_blank" rel="noopener noreferrer"
              className="px-6 py-2 border border-[#333] text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center">
              Verify on GPTZero
            </a>
            <a href="https://originality.ai" target="_blank" rel="noopener noreferrer"
              className="px-6 py-2 border border-[#333] text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center">
              Verify on Originality.ai
            </a>
            <a href="https://gowinston.ai" target="_blank" rel="noopener noreferrer"
              className="px-6 py-2 border border-[#333] text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center">
              Verify on Winston AI
            </a>
          </div>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] text-center mt-4">
            Upload any chapter. Test any passage. We encourage skepticism.
          </p>
        </div>

        {/* Blockchain Proof */}
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-6 text-center">
            Blockchain Proof of Ownership
          </h3>
          <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#999] space-y-4 mb-8">
            <p>
              The complete manuscript has been cryptographically hashed and recorded on the <strong className="text-[#ededed]">Polygon blockchain</strong> as an immutable, timestamped proof of ownership.
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
            <a href="https://polygonscan.com" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 border border-[#333] text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
              View on PolygonScan
            </a>
          </div>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] text-center mt-6">
            Any change to any character in any chapter would produce a completely different hash.<br />
            The blockchain record is permanent, public, and cannot be modified or deleted.
          </p>
        </div>
      </div>
    </section>
  );
}
