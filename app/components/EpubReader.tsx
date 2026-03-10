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
  const [error, setError] = useState("");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const storageKey = `matc-pos-${token.slice(0, 16)}`;
  const downloadUrl = `/api/download/${token}?dl=1`;

  const applyTheme = useCallback(
    (rendition: Rendition) => {
      rendition.themes.default({
        "body, p, div, span, li, td, th, dd, dt, blockquote": {
          color: "#ededed !important",
          "font-family": "Georgia, 'Times New Roman', serif !important",
          "line-height": "1.9 !important",
        },
        body: {
          background: "transparent !important",
          margin: "0 !important",
          padding: "20px 0 !important",
          "font-size": `${fontSize}% !important`,
        },
        "h1, h2, h3, h4, h5, h6": {
          color: "#ededed !important",
          "font-family": "Georgia, 'Times New Roman', serif !important",
        },
        h2: { color: "#c9a84c !important" },
        a: { color: "#c9a84c !important" },
        "p + p": { "text-indent": "1.5em !important" },
        hr: {
          border: "none !important",
          "border-top": "1px solid #333 !important",
          margin: "2em auto !important",
          width: "40% !important",
        },
        "em, i": { color: "inherit !important" },
      });
    },
    [fontSize],
  );

  // Initialize the book
  useEffect(() => {
    if (!viewerRef.current) return;
    let cancelled = false;

    async function init() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const body = await res.text();
          setError(`Failed to load book (${res.status}): ${body}`);
          setLoading(false);
          return;
        }
        const arrayBuffer = await res.arrayBuffer();
        if (cancelled) return;

        const book = ePub(arrayBuffer);
        bookRef.current = book;

        const rendition = book.renderTo(viewerRef.current!, {
          width: "100%",
          height: "100%",
          spread: "none",
          flow: "scrolled-doc",
          allowScriptedContent: false,
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
        await rendition.display(startCfi);
        if (!cancelled) setLoading(false);

        // Save position on page changes
        rendition.on(
          "relocated",
          (location: { start: { cfi: string }; end: { cfi: string } }) => {
            try {
              localStorage.setItem(storageKey, location.start.cfi);
            } catch {
              // ignore
            }
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
          if (!cancelled) setToc(nav.toc);
        });

        // Keyboard navigation
        rendition.on("keydown", (e: KeyboardEvent) => {
          if (e.key === "ArrowLeft") rendition.prev();
          if (e.key === "ArrowRight") rendition.next();
        });
      } catch (err) {
        console.error("EPUB load error:", err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load book");
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (bookRef.current) bookRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Update font size
  useEffect(() => {
    if (renditionRef.current) applyTheme(renditionRef.current);
  }, [fontSize, applyTheme]);

  // Keyboard navigation at document level
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!renditionRef.current) return;
      if (e.key === "ArrowLeft") renditionRef.current.prev();
      if (e.key === "ArrowRight") renditionRef.current.next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Auto-hide header on scroll down
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    function onScroll() {
      const y = container!.scrollTop;
      if (y > lastScrollY.current + 10 && y > 60) {
        setHeaderVisible(false);
      } else if (y < lastScrollY.current - 10 || y < 60) {
        setHeaderVisible(true);
      }
      lastScrollY.current = y;
    }
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [loading]);

  const goNext = () => {
    renditionRef.current?.next();
    setAtStart(false);
  };
  const goPrev = () => {
    renditionRef.current?.prev();
    setAtEnd(false);
  };
  const goToChapter = (href: string) => {
    renditionRef.current?.display(href);
    setTocOpen(false);
    setAtStart(false);
    setAtEnd(false);
  };

  // Check if at boundaries
  useEffect(() => {
    if (!renditionRef.current) return;
    renditionRef.current.on("relocated", () => {
      const loc = renditionRef.current?.location;
      if (loc) {
        setAtStart(loc.atStart ?? false);
        setAtEnd(loc.atEnd ?? false);
      }
    });
  }, [loading]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col">
      {/* Top bar — auto-hides on scroll */}
      <div
        className={`flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a] z-30 shrink-0 transition-transform duration-300 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link
          href="/"
          className="text-[#c9a84c] text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-[#e8c85a] transition-colors"
        >
          Man Amongst the Clouds
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setFontSize((s) => Math.max(80, s - 10))}
            className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#ededed] transition-colors text-sm rounded-full hover:bg-[#1a1a1a]"
            title="Decrease font size"
          >
            A−
          </button>
          <span className="text-[10px] text-[#444] tabular-nums w-8 text-center">
            {fontSize}%
          </span>
          <button
            onClick={() => setFontSize((s) => Math.min(160, s + 10))}
            className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#ededed] transition-colors text-base rounded-full hover:bg-[#1a1a1a]"
            title="Increase font size"
          >
            A+
          </button>

          <div className="w-px h-4 bg-[#222] mx-1" />

          <button
            onClick={() => setTocOpen((v) => !v)}
            className="px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase text-[#666] hover:text-[#ededed] transition-colors rounded-full hover:bg-[#1a1a1a]"
          >
            Contents
          </button>

          <div className="w-px h-4 bg-[#222] mx-1 hidden sm:block" />

          <a
            href={downloadUrl}
            className="px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors hidden sm:inline-block"
          >
            Download
          </a>
        </div>
      </div>

      {/* TOC overlay */}
      {tocOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setTocOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-[85vw] bg-[#0f0f0f] border-l border-[#1a1a1a] overflow-y-auto">
            <div className="sticky top-0 bg-[#0f0f0f] p-5 border-b border-[#1a1a1a] flex items-center justify-between">
              <h3 className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase">
                Table of Contents
              </h3>
              <button
                onClick={() => setTocOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#ededed] transition-colors rounded-full hover:bg-[#1a1a1a]"
              >
                ✕
              </button>
            </div>
            <div className="py-2">
              {toc.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goToChapter(item.href)}
                  className="block w-full text-left px-5 py-3.5 text-sm text-[#999] hover:text-[#ededed] hover:bg-[#161616] transition-colors font-[Georgia,serif]"
                >
                  {item.label?.trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reading area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="max-w-2xl mx-auto px-6 sm:px-10 md:px-16">
          <div ref={viewerRef} className="min-h-screen py-8" />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#1a1a1a] z-20 shrink-0">
        <button
          onClick={goPrev}
          disabled={atStart}
          className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-full ${
            atStart
              ? "text-[#333] cursor-default"
              : "text-[#888] hover:text-[#ededed] hover:bg-[#1a1a1a]"
          }`}
        >
          ← Prev
        </button>

        <p className="text-[10px] text-[#555] tracking-wider truncate max-w-[50%] text-center font-[Georgia,serif] italic">
          {chapter}
        </p>

        <button
          onClick={goNext}
          disabled={atEnd}
          className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-full ${
            atEnd
              ? "text-[#333] cursor-default"
              : "text-[#888] hover:text-[#ededed] hover:bg-[#1a1a1a]"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Loading / Error overlay */}
      {(loading || error) && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
          <div className="text-center max-w-md px-6">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase mb-6">
              Stillfire Press
            </p>
            {error ? (
              <>
                <p className="text-[#ff6b6b] text-sm mb-4 font-[Georgia,serif]">
                  {error}
                </p>
                <p className="text-[#555] text-xs">
                  Try refreshing, or{" "}
                  <a
                    href={`/api/download/${token}`}
                    className="text-[#c9a84c] underline"
                  >
                    download the EPUB
                  </a>{" "}
                  to read on your device.
                </p>
              </>
            ) : (
              <div>
                <div className="w-8 h-8 border-2 border-[#c9a84c]/20 border-t-[#c9a84c] rounded-full animate-spin mx-auto mb-6" />
                <p className="text-[#888] text-sm font-[Georgia,serif]">
                  Preparing your book...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
