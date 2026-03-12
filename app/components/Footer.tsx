import Link from "next/link";
import {
  sites,
  books,
  authors,
  organization,
  social,
  ecosystemLinks,
} from "@/app/lib/canonical-data";

export default function Footer() {
  const currentSiteUrl = sites.matc.url;
  const otherSites = ecosystemLinks.filter(
    (l: { url: string }) => l.url !== currentSiteUrl,
  );

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
                { href: "/the-book", label: "The Book" },
                { href: "/world", label: "World Guide" },
                { href: "/the-magic-system", label: "The Magic System" },
                { href: "/characters", label: "Characters" },
                { href: "/about-the-author", label: "The Author" },
                { href: "#excerpt", label: "Read an Excerpt" },
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
              {organization.name}
            </p>
            <div className="flex flex-col gap-2">
              {otherSites.map((s: { url: string; label: string }) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
                >
                  {s.label}
                </a>
              ))}
              <a
                href={social.facebookStillfirePress.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-sans)] text-xs text-[#999] hover:text-[#ededed] transition-colors"
              >
                Facebook
              </a>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#999] leading-relaxed mt-1">
                {organization.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a]">
            {books.manAmongstTheClouds.title}
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#8a8a8a]">
            &copy; {new Date().getFullYear()} {authors.justinCronk.name} &bull;{" "}
            {organization.name} &bull; A {organization.legalName} Project &bull;
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
