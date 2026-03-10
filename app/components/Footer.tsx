import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 sm:py-20 px-5 sm:px-6 border-t border-[#1a1a1a] relative">
      <div className="max-w-4xl mx-auto">
        {/* Closing quote */}
        <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl italic text-[#777] text-center max-w-xl mx-auto leading-relaxed mb-16">
          &ldquo;The world sang to itself, as it always had. And in the space
          between the notes, where silence lived, a man breathed &mdash; and the
          air remembered.&rdquo;
        </p>

        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div>
            <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/40 mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              {[
                { href: "#story", label: "The Story" },
                { href: "#world", label: "The World" },
                { href: "#characters", label: "Characters" },
                { href: "#excerpt", label: "Read an Excerpt" },
                { href: "#journey", label: "The Author" },
                { href: "#read", label: "Buy Part I" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/40 mb-4">
              More
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/share"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                Share a Passage
              </Link>
              <a
                href="#proof"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                Proof of Authorship
              </a>
              <a
                href="#signup"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                Get Updates
              </a>
            </div>
          </div>

          <div>
            <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-[#c9a84c]/40 mb-4">
              Stillfire Press
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://stillfirepress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                stillfirepress.com
              </a>
              <a
                href="https://ashtofury.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                Ash to Fury &mdash; Carter Cronk
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61583731204411"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                Facebook
              </a>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#999] leading-relaxed mt-1">
                An independent publishing house
                <br />
                founded by Justin &amp; Carter Cronk
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a]">
            Man Amongst the Clouds
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#8a8a8a]">
            &copy; 2026 Justin Cronk &bull; Stillfire Press &bull; A Cronk
            Companies, LLC Project &bull; All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
