"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#story", label: "The Story" },
  { href: "#world", label: "The World" },
  { href: "#characters", label: "Characters" },
  { href: "#excerpt", label: "Read an Excerpt" },
  { href: "#journey", label: "The Author" },
  { href: "#origins", label: "Origins" },
  { href: "/read/part-one", label: "Read Free" },
  { href: "#read", label: "Buy EPUB" },
  { href: "#proof", label: "Proof" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className={`font-[family-name:var(--font-serif)] tracking-wider transition-all duration-500 ${
            scrolled ? "text-base text-[#c9a84c]" : "text-lg text-[#c9a84c]/60"
          }`}
        >
          MATC
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                l.href === "/read/part-one" || l.href === "#read"
                  ? "text-[#c9a84c] hover:text-[#e8c85a]"
                  : "text-[#666] hover:text-[#ededed]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 w-6"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`h-px bg-[#c9a84c] transition-all duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`h-px bg-[#c9a84c] transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px bg-[#c9a84c] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-md border-t border-[#c9a84c]/10 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-[family-name:var(--font-sans)] text-xs tracking-[0.2em] uppercase ${
                l.href === "/read/part-one" || l.href === "#read"
                  ? "text-[#c9a84c]"
                  : "text-[#888]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
