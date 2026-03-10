"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ePub from "epubjs";
import type { Book, Rendition } from "epubjs";
import type { NavItem } from "epubjs/types/navigation";
import Link from "next/link";

/* ── Theme definitions ──────────────────────────────────────────── */

type ThemeId = "dark" | "sepia" | "light";

interface ThemeColors {
  bg: string;
  text: string;
  headingAccent: string;
  linkColor: string;
  uiBg: string;
  uiBorder: string;
  uiText: string;
  uiMuted: string;
  uiAccent: string;
  hrColor: string;
  tocBg: string;
  tocHover: string;
  overlayBg: string;
  progressBg: string;
  progressFill: string;
}

const THEMES: Record<ThemeId, ThemeColors> = {
  dark: {
    bg: "#0a0a0a",
    text: "#d4d4d4",
    headingAccent: "#c9a84c",
    linkColor: "#c9a84c",
    uiBg: "rgba(10,10,10,0.95)",
    uiBorder: "#1a1a1a",
    uiText: "#999",
    uiMuted: "#555",
    uiAccent: "#c9a84c",
    hrColor: "#333",
    tocBg: "#0f0f0f",
    tocHover: "#161616",
    overlayBg: "#0a0a0a",
    progressBg: "#1a1a1a",
    progressFill: "#c9a84c",
  },
  sepia: {
    bg: "#f4ecd8",
    text: "#433422",
    headingAccent: "#8b6914",
    linkColor: "#8b6914",
    uiBg: "rgba(234,225,206,0.97)",
    uiBorder: "#d4c9a8",
    uiText: "#6b5d4d",
    uiMuted: "#9a8b76",
    uiAccent: "#8b6914",
    hrColor: "#c9b88a",
    tocBg: "#ede4cf",
    tocHover: "#e6dbc3",
    overlayBg: "#f4ecd8",
    progressBg: "#d4c9a8",
    progressFill: "#8b6914",
  },
  light: {
    bg: "#ffffff",
    text: "#1a1a1a",
    headingAccent: "#7a6520",
    linkColor: "#7a6520",
    uiBg: "rgba(255,255,255,0.97)",
    uiBorder: "#e5e5e5",
    uiText: "#666",
    uiMuted: "#aaa",
    uiAccent: "#7a6520",
    hrColor: "#ddd",
    tocBg: "#fafafa",
    tocHover: "#f0f0f0",
    overlayBg: "#ffffff",
    progressBg: "#e5e5e5",
    progressFill: "#7a6520",
  },
};

const THEME_LABELS: Record<ThemeId, string> = {
  dark: "Dark",
  sepia: "Sepia",
  light: "Light",
};

/* ── Width presets ──────────────────────────────────────────────── */

type WidthId = "narrow" | "medium" | "wide";
const WIDTHS: Record<WidthId, string> = {
  narrow: "max-w-lg",
  medium: "max-w-2xl",
  wide: "max-w-4xl",
};
const WIDTH_LABELS: Record<WidthId, string> = {
  narrow: "Narrow",
  medium: "Medium",
  wide: "Wide",
};

/* ── Line spacing presets ───────────────────────────────────────── */

type SpacingId = "tight" | "normal" | "relaxed" | "loose";
const SPACINGS: Record<SpacingId, string> = {
  tight: "1.5",
  normal: "1.8",
  relaxed: "2.1",
  loose: "2.4",
};
const SPACING_LABELS: Record<SpacingId, string> = {
  tight: "Tight",
  normal: "Normal",
  relaxed: "Relaxed",
  loose: "Loose",
};

/* ── Preference helpers ─────────────────────────────────────────── */

const PREFS_KEY = "matc-reader-prefs";

interface ReaderPrefs {
  theme: ThemeId;
  fontSize: number;
  width: WidthId;
  spacing: SpacingId;
}

const DEFAULT_PREFS: ReaderPrefs = {
  theme: "dark",
  fontSize: 110,
  width: "medium",
  spacing: "normal",
};

function loadPrefs(): ReaderPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULT_PREFS;
}

function savePrefs(prefs: ReaderPrefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

/* ── Component ──────────────────────────────────────────────────── */

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Preferences (persisted)
  const [prefs, setPrefs] = useState<ReaderPrefs>(DEFAULT_PREFS);
  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  const updatePref = useCallback(
    <K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]) => {
      setPrefs((prev) => {
        const next = { ...prev, [key]: value };
        savePrefs(next);
        return next;
      });
    },
    [],
  );

  const theme = THEMES[prefs.theme];
  const storageKey = `matc-pos-${token.slice(0, 16)}`;
  const downloadUrl = `/api/download/${token}?dl=1`;

  /* ── Apply epub.js theme ──────────────────────────────────────── */

  const applyTheme = useCallback(
    (rendition: Rendition) => {
      const t = THEMES[prefs.theme];
      const sp = SPACINGS[prefs.spacing];
      rendition.themes.default({
        "body, p, div, span, li, td, th, dd, dt, blockquote": {
          color: `${t.text} !important`,
          "font-family": "Georgia, 'Times New Roman', serif !important",
          "line-height": `${sp} !important`,
        },
        body: {
          background: "transparent !important",
          margin: "0 !important",
          padding: "20px 0 !important",
          "font-size": `${prefs.fontSize}% !important`,
        },
        "h1, h2, h3, h4, h5, h6": {
          color: `${t.text} !important`,
          "font-family": "Georgia, 'Times New Roman', serif !important",
        },
        h2: { color: `${t.headingAccent} !important` },
        a: { color: `${t.linkColor} !important` },
        "p + p": { "text-indent": "1.5em !important" },
        hr: {
          border: "none !important",
          "border-top": `1px solid ${t.hrColor} !important`,
          margin: "2em auto !important",
          width: "40% !important",
        },
        "em, i": { color: "inherit !important" },
      });
    },
    [prefs.theme, prefs.fontSize, prefs.spacing],
  );

  /* ── Initialize the book ──────────────────────────────────────── */

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

        let startCfi: string | undefined;
        try {
          startCfi = localStorage.getItem(storageKey) || undefined;
        } catch {
          // ignore
        }
        await rendition.display(startCfi);
        if (!cancelled) setLoading(false);

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

        book.loaded.navigation.then((nav) => {
          if (!cancelled) setToc(nav.toc);
        });

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

  /* ── Re-apply theme on pref changes ───────────────────────────── */

  useEffect(() => {
    if (renditionRef.current) applyTheme(renditionRef.current);
  }, [prefs.fontSize, prefs.theme, prefs.spacing, applyTheme]);

  /* ── Keyboard nav ─────────────────────────────────────────────── */

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!renditionRef.current) return;
      if (e.key === "ArrowLeft") renditionRef.current.prev();
      if (e.key === "ArrowRight") renditionRef.current.next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ── Auto-hide header + reading progress ──────────────────────── */

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    function onScroll() {
      const el = container!;
      const y = el.scrollTop;
      if (y > lastScrollY.current + 10 && y > 60) setHeaderVisible(false);
      else if (y < lastScrollY.current - 10 || y < 60) setHeaderVisible(true);
      lastScrollY.current = y;

      // Update reading progress
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0) setProgress(Math.min(100, (y / total) * 100));
    }
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [loading]);

  /* ── Navigation helpers ───────────────────────────────────────── */

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

  /* ── Render ───────────────────────────────────────────────────── */

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: theme.bg }}
    >
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-200"
        style={{
          width: `${progress}%`,
          background: theme.progressFill,
          opacity: progress > 0 ? 1 : 0,
        }}
      />

      {/* Top bar — auto-hides on scroll */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-sm z-30 shrink-0 transition-transform duration-300"
        style={{
          background: theme.uiBg,
          borderBottom: `1px solid ${theme.uiBorder}`,
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <Link
          href="/"
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase transition-colors"
          style={{ color: theme.uiAccent }}
        >
          Man Amongst the Clouds
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Settings toggle */}
          <button
            onClick={() => setSettingsOpen((v) => !v)}
            className="w-8 h-8 flex items-center justify-center transition-colors text-sm rounded-full"
            style={{ color: settingsOpen ? theme.uiAccent : theme.uiText }}
            title="Reading settings"
          >
            ⚙
          </button>

          <div
            className="w-px h-4 mx-1"
            style={{ background: theme.uiBorder }}
          />

          {/* Contents */}
          <button
            onClick={() => setTocOpen((v) => !v)}
            className="px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase transition-colors rounded-full"
            style={{ color: theme.uiText }}
          >
            Contents
          </button>

          <div
            className="w-px h-4 mx-1 hidden sm:block"
            style={{ background: theme.uiBorder }}
          />

          <a
            href={downloadUrl}
            className="px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase transition-colors hidden sm:inline-block"
            style={{ color: theme.uiAccent, opacity: 0.7 }}
          >
            Download
          </a>
        </div>
      </div>

      {/* Settings panel */}
      {settingsOpen && (
        <div
          className="absolute top-[49px] right-4 z-40 w-72 rounded-lg shadow-2xl border p-5"
          style={{ background: theme.tocBg, borderColor: theme.uiBorder }}
        >
          {/* Theme */}
          <div className="mb-5">
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: theme.uiMuted }}
            >
              Theme
            </p>
            <div className="flex gap-2">
              {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => updatePref("theme", id)}
                  className="flex-1 py-2.5 rounded text-xs tracking-wider transition-all border"
                  style={{
                    background: THEMES[id].bg,
                    color: THEMES[id].text,
                    borderColor:
                      prefs.theme === id ? theme.uiAccent : theme.uiBorder,
                    boxShadow:
                      prefs.theme === id
                        ? `0 0 0 1px ${theme.uiAccent}`
                        : "none",
                  }}
                >
                  {THEME_LABELS[id]}
                </button>
              ))}
            </div>
          </div>

          {/* Font size */}
          <div className="mb-5">
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: theme.uiMuted }}
            >
              Font Size
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updatePref("fontSize", Math.max(80, prefs.fontSize - 10))
                }
                className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors text-sm"
                style={{ borderColor: theme.uiBorder, color: theme.uiText }}
              >
                A−
              </button>
              <div className="flex-1 text-center">
                <span
                  className="text-sm tabular-nums font-medium"
                  style={{ color: theme.text }}
                >
                  {prefs.fontSize}%
                </span>
              </div>
              <button
                onClick={() =>
                  updatePref("fontSize", Math.min(180, prefs.fontSize + 10))
                }
                className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors text-base"
                style={{ borderColor: theme.uiBorder, color: theme.uiText }}
              >
                A+
              </button>
            </div>
          </div>

          {/* Line spacing */}
          <div className="mb-5">
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: theme.uiMuted }}
            >
              Line Spacing
            </p>
            <div className="flex gap-2">
              {(Object.keys(SPACINGS) as SpacingId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => updatePref("spacing", id)}
                  className="flex-1 py-2 rounded text-[10px] tracking-wider uppercase transition-all border"
                  style={{
                    background:
                      prefs.spacing === id ? theme.uiAccent : "transparent",
                    color:
                      prefs.spacing === id
                        ? prefs.theme === "dark"
                          ? "#0a0a0a"
                          : "#fff"
                        : theme.uiText,
                    borderColor:
                      prefs.spacing === id ? theme.uiAccent : theme.uiBorder,
                  }}
                >
                  {SPACING_LABELS[id]}
                </button>
              ))}
            </div>
          </div>

          {/* Column width */}
          <div>
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: theme.uiMuted }}
            >
              Column Width
            </p>
            <div className="flex gap-2">
              {(Object.keys(WIDTHS) as WidthId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => updatePref("width", id)}
                  className="flex-1 py-2 rounded text-[10px] tracking-wider uppercase transition-all border"
                  style={{
                    background:
                      prefs.width === id ? theme.uiAccent : "transparent",
                    color:
                      prefs.width === id
                        ? prefs.theme === "dark"
                          ? "#0a0a0a"
                          : "#fff"
                        : theme.uiText,
                    borderColor:
                      prefs.width === id ? theme.uiAccent : theme.uiBorder,
                  }}
                >
                  {WIDTH_LABELS[id]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOC overlay */}
      {tocOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setTocOpen(false)}
          />
          <div
            className="relative ml-auto w-80 max-w-[85vw] overflow-y-auto border-l"
            style={{ background: theme.tocBg, borderColor: theme.uiBorder }}
          >
            <div
              className="sticky top-0 p-5 flex items-center justify-between border-b"
              style={{ background: theme.tocBg, borderColor: theme.uiBorder }}
            >
              <h3
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: theme.uiAccent }}
              >
                Table of Contents
              </h3>
              <button
                onClick={() => setTocOpen(false)}
                className="w-8 h-8 flex items-center justify-center transition-colors rounded-full"
                style={{ color: theme.uiText }}
              >
                ✕
              </button>
            </div>
            <div className="py-2">
              {toc.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goToChapter(item.href)}
                  className="block w-full text-left px-5 py-3.5 text-sm transition-colors font-[Georgia,serif]"
                  style={{ color: theme.uiText }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.tocHover;
                    e.currentTarget.style.color = theme.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = theme.uiText;
                  }}
                >
                  {item.label?.trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click-away to close settings */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setSettingsOpen(false)}
        />
      )}

      {/* Reading area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          className={`${WIDTHS[prefs.width]} mx-auto px-6 sm:px-10 md:px-16`}
        >
          <div ref={viewerRef} className="min-h-screen py-8" />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-2.5 backdrop-blur-sm z-20 shrink-0"
        style={{
          background: theme.uiBg,
          borderTop: `1px solid ${theme.uiBorder}`,
        }}
      >
        <button
          onClick={goPrev}
          disabled={atStart}
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-full"
          style={{
            color: atStart ? theme.uiBorder : theme.uiText,
            cursor: atStart ? "default" : "pointer",
          }}
        >
          ← Prev
        </button>

        <p
          className="text-[10px] tracking-wider truncate max-w-[50%] text-center font-[Georgia,serif] italic"
          style={{ color: theme.uiMuted }}
        >
          {chapter}
        </p>

        <button
          onClick={goNext}
          disabled={atEnd}
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-full"
          style={{
            color: atEnd ? theme.uiBorder : theme.uiText,
            cursor: atEnd ? "default" : "pointer",
          }}
        >
          Next →
        </button>
      </div>

      {/* Loading / Error overlay */}
      {(loading || error) && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: theme.overlayBg }}
        >
          <div className="text-center max-w-md px-6">
            <p
              className="text-[10px] tracking-[0.4em] uppercase mb-6"
              style={{ color: theme.uiAccent }}
            >
              Stillfire Press
            </p>
            {error ? (
              <>
                <p className="text-[#ff6b6b] text-sm mb-4 font-[Georgia,serif]">
                  {error}
                </p>
                <p className="text-xs" style={{ color: theme.uiMuted }}>
                  Try refreshing, or{" "}
                  <a
                    href={`/api/download/${token}`}
                    className="underline"
                    style={{ color: theme.uiAccent }}
                  >
                    download the EPUB
                  </a>{" "}
                  to read on your device.
                </p>
              </>
            ) : (
              <div>
                <div
                  className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-6"
                  style={{
                    borderColor: `${theme.uiAccent}33`,
                    borderTopColor: theme.uiAccent,
                  }}
                />
                <p
                  className="text-sm font-[Georgia,serif]"
                  style={{ color: theme.uiText }}
                >
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
