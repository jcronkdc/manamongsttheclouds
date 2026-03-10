"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ePub from "epubjs";
import type { Book, Rendition } from "epubjs";
import type { NavItem } from "epubjs/types/navigation";
import Link from "next/link";

interface EpubReaderProps {
  url: string;
  token: string;
}

export default function EpubReader({ url, token }: EpubReaderProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<Book | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [toc, setToc] = useState<NavItem[]>([]);
  const [tocOpen, setTocOpen] = useState(false);
  const [fontSize, setFontSize] = useState(110);
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(true);

  const storageKey = `matc-pos-${token.slice(0, 16)}`;

  const applyTheme = useCallback(
    (rendition: Rendition) => {
      rendition.themes.default({
        body: {
          background: "#0a0a0a !important",
          color: "#ededed !important",
          "font-family": "Georgia, 'Times New Roman', serif !important",
          "line-height": "1.8 !important",
          "font-size": `${fontSize}% !important`,
        },
        p: { color: "#ededed !important" },
        h1: { color: "#ededed !important" },
        h2: { color: "#c9a84c !important" },
        a: { color: "#c9a84c !important" },
      });
    },
    [fontSize],
  );

  // Initialize the book
  useEffect(() => {
    if (!viewerRef.current) return;

    const book = ePub(url);
    bookRef.current = book;

    const rendition = book.renderTo(viewerRef.current, {
      width: "100%",
      height: "100%",
      spread: "none",
      flow: "paginated",
    });
    renditionRef.current = rendition;

    applyTheme(rendition);

    // Load saved position or start from beginning
    let startCfi: string | undefined;
    try {
      startCfi = localStorage.getItem(storageKey) || undefined;
    } catch {
      // ignore
    }
    rendition.display(startCfi).then(() => setLoading(false));

    // Save position on page changes
    rendition.on(
      "relocated",
      (location: { start: { cfi: string }; end: { cfi: string } }) => {
        try {
          localStorage.setItem(storageKey, location.start.cfi);
        } catch {
          // ignore
        }

        // Update chapter label
        if (book.navigation) {
          const navItems = book.navigation.toc;
          for (let i = navItems.length - 1; i >= 0; i--) {
            if (rendition.location && book.spine) {
              setChapter(navItems[i]?.label?.trim() || "");
              break;
            }
          }
        }
      },
    );

    // Load TOC
    book.loaded.navigation.then((nav) => {
      setToc(nav.toc);
    });

    return () => {
      book.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Update font size
  useEffect(() => {
    if (renditionRef.current) {
      applyTheme(renditionRef.current);
    }
  }, [fontSize, applyTheme]);

  const goNext = () => renditionRef.current?.next();
  const goPrev = () => renditionRef.current?.prev();
  const goToChapter = (href: string) => {
    renditionRef.current?.display(href);
    setTocOpen(false);
  };

  const downloadUrl = `/api/download/${token}?dl=1`;

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-[#222] z-10 shrink-0">
        <Link
          href="/"
          className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase hover:text-[#e8c85a] transition-colors"
        >
          Man Amongst the Clouds
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setFontSize((s) => Math.max(80, s - 10))}
            className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#ededed] transition-colors text-sm"
            title="Decrease font size"
          >
            A−
          </button>
          <button
            onClick={() => setFontSize((s) => Math.min(160, s + 10))}
            className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#ededed] transition-colors text-base"
            title="Increase font size"
          >
            A+
          </button>

          <div className="w-px h-5 bg-[#333] mx-1 hidden sm:block" />

          <button
            onClick={() => setTocOpen((v) => !v)}
            className="px-2 sm:px-3 py-1.5 text-xs tracking-wider uppercase text-[#888] hover:text-[#ededed] transition-colors"
          >
            Chapters
          </button>

          <div className="w-px h-5 bg-[#333] mx-1 hidden sm:block" />

          <a
            href={downloadUrl}
            className="px-2 sm:px-3 py-1.5 text-xs tracking-wider uppercase text-[#c9a84c] hover:text-[#e8c85a] transition-colors"
          >
            Download
          </a>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* TOC sidebar */}
        {tocOpen && (
          <div className="absolute sm:relative inset-0 sm:inset-auto z-20 sm:z-0 flex">
            <div className="w-64 bg-[#111] border-r border-[#222] overflow-y-auto shrink-0">
              <div className="p-4 border-b border-[#222]">
                <h3 className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase">
                  Chapters
                </h3>
              </div>
              {toc.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goToChapter(item.href)}
                  className="block w-full text-left px-4 py-3 text-sm text-[#ededed]/70 hover:text-[#ededed] hover:bg-[#111]/50 transition-colors border-b border-[#222]/50"
                >
                  {item.label?.trim()}
                </button>
              ))}
            </div>
            {/* Overlay to close on mobile */}
            <div
              className="flex-1 sm:hidden"
              onClick={() => setTocOpen(false)}
            />
          </div>
        )}

        {/* Previous button */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 flex items-center justify-center text-[#888] hover:text-[#ededed] transition-colors text-3xl"
          aria-label="Previous page"
        >
          ‹
        </button>

        {/* EPUB render area */}
        <div ref={viewerRef} className="flex-1 mx-12 sm:mx-16" />

        {/* Next button */}
        <button
          onClick={goNext}
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 flex items-center justify-center text-[#888] hover:text-[#ededed] transition-colors text-3xl"
          aria-label="Next page"
        >
          ›
        </button>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-30">
            <div className="text-center">
              <p className="text-[#c9a84c] text-xs tracking-[0.35em] uppercase mb-4">
                Stillfire Press
              </p>
              <p className="text-[#888] text-sm animate-pulse">
                Loading your book...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-t border-[#222] shrink-0">
        <p className="text-[10px] text-[#888]/50 tracking-wider truncate max-w-[60%]">
          {chapter}
        </p>
        <p className="text-[10px] text-[#888]/30 tracking-wider">
          Stillfire Press &middot; &copy; 2026 Justin Cronk
        </p>
      </div>
    </div>
  );
}
