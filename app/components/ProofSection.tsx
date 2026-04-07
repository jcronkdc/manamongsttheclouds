export default function ProofSection() {
  return (
    <section
      id="proof"
      className="py-10 sm:py-14 px-5 sm:px-6 border-t border-[#1a1a1a]"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#555] mb-3">
          Proof of Authorship
        </p>
        <p className="font-[family-name:var(--font-serif)] text-sm text-[#888] leading-relaxed mb-4">
          The complete manuscript is cryptographically hashed and recorded on
          the Polygon blockchain &mdash; an immutable, timestamped proof of
          ownership.
        </p>
        <p className="font-mono text-[10px] sm:text-xs text-[#666] break-all leading-relaxed mb-4">
          SHA-256:
          3cc70e0d02bba340d2e24cb391bbd9680d458c173d9aad33916e9b19b25ea9f7
        </p>
        <a
          href="https://polygonscan.com/tx/0xe7e0990d75efd6e1da84f5438fe3265435c79d6e09e19f615419d92428dac52a"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors tracking-wider uppercase"
        >
          Verify on PolygonScan &rarr;
        </a>
      </div>
    </section>
  );
}
