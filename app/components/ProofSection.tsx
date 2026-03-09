export default function ProofSection() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 bg-[#0f0f0f]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide mb-4 text-center text-[#c9a84c]">
          Proof of Authorship
        </h2>
        <p className="font-[family-name:var(--font-serif)] text-center text-[#b0a89e] italic mb-12">
          This story is human-written, blockchain-verified, and nine years in
          the making.
        </p>

        {/* Blockchain Proof */}
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-6 text-center">
            Blockchain Proof of Ownership
          </h3>
          <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#c4beb4] space-y-4 mb-8">
            <p>
              The complete manuscript has been cryptographically hashed and
              recorded on the{" "}
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
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#999] mt-4">
              50 files &bull; 153,000 words &bull; Recorded on Polygon
            </p>
            <a
              href="https://polygonscan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 border border-[#333] text-[#b0a89e] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
            >
              View on PolygonScan
            </a>
          </div>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#777] text-center mt-6">
            Any change to any character in any chapter would produce a
            completely different hash.
            <br />
            The blockchain record is permanent, public, and cannot be modified
            or deleted.
          </p>
        </div>
      </div>
    </section>
  );
}
