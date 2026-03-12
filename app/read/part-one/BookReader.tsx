"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  BookOpen,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Send,
  ArrowUp,
  Bookmark,
  BookmarkCheck,
  Highlighter,
  Palette,
  List,
  X,
  Trash2,
  Download,
  Mail,
  Share2,
  Link,
  Facebook,
  Twitter,
  Smartphone,
  Heart,
  FileText,
} from "lucide-react";

type ReaderTheme = "dark" | "light" | "kindle" | "ink";

const THEME_KEY = "matc-reader-theme";

const THEME_OPTIONS: {
  id: ReaderTheme;
  label: string;
  preview: string;
  desc: string;
}[] = [
  { id: "dark", label: "Dark", preview: "#0a0a0a", desc: "Default dark mode" },
  {
    id: "light",
    label: "Light",
    preview: "#ffffff",
    desc: "Clean white background",
  },
  {
    id: "kindle",
    label: "Kindle",
    preview: "#f4ecd8",
    desc: "Warm sepia like an e-reader",
  },
  {
    id: "ink",
    label: "Fresh Ink",
    preview: "#faf9f6",
    desc: "Crisp ink on paper",
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChapterData {
  number: number;
  title: string;
  pov: string;
  html: string;
}

interface Comment {
  id: string;
  chapter: number | null;
  name: string;
  body: string;
  quote: string | null;
  sentiment: "like" | "confused" | "suggestion" | "general" | null;
  created_at: string;
}

const STORAGE_KEY = "matc-reading-position";
const STORAGE_PERCENT_KEY = "matc-reading-percent";
const BOOKMARKS_KEY = "matc-bookmarks";
const HIGHLIGHTS_KEY = "matc-highlights";
const TOC_SEEN_KEY = "matc-toc-seen";

interface HighlightEntry {
  id: string;
  text: string;
  chapterNumber: number;
  chapterLabel: string;
  createdAt: number;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface BookmarkEntry {
  id: string;
  scrollY: number;
  chapterIndex: number;
  chapterLabel: string;
  percent: number;
  label: string;
  createdAt: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BookReader({ chapters }: { chapters: ChapterData[] }) {
  /* --- State --- */
  const [showToc, setShowToc] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [bookmarkFlash, setBookmarkFlash] = useState(false);
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<HighlightEntry[]>([]);
  const [selectionPopup, setSelectionPopup] = useState<{
    x: number;
    y: number;
    text: string;
    chapterNumber: number;
    chapterLabel: string;
  } | null>(null);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>("dark");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [readingPercent, setReadingPercent] = useState(0);
  const [showResumeBar, setShowResumeBar] = useState(false);
  const [savedPosition, setSavedPosition] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [copied, setCopied] = useState(false);

  // comments
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentName, setCommentName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentSentiment, setCommentSentiment] =
    useState<Comment["sentiment"]>("general");
  const [submittingComment, setSubmittingComment] = useState<string | null>(
    null,
  );
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [activeCommentChapter, setActiveCommentChapter] = useState<
    number | null
  >(null);

  // Part Two signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasRestoredRef = useRef(false);

  /* --- Restore saved position + bookmarks on mount --- */
  useEffect(() => {
    if (hasRestoredRef.current) return;
    hasRestoredRef.current = true;

    try {
      // Restore bookmarks
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BookmarkEntry[];
        if (Array.isArray(parsed)) setBookmarks(parsed);
      }

      // Restore theme
      const savedTheme = localStorage.getItem(THEME_KEY) as ReaderTheme | null;
      if (
        savedTheme &&
        ["dark", "light", "kindle", "ink"].includes(savedTheme)
      ) {
        setReaderTheme(savedTheme);
      }

      // Restore highlights
      const hlRaw = localStorage.getItem(HIGHLIGHTS_KEY);
      if (hlRaw) {
        const hlParsed = JSON.parse(hlRaw) as HighlightEntry[];
        if (Array.isArray(hlParsed)) setHighlights(hlParsed);
      }

      // Restore reading position
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedPct = localStorage.getItem(STORAGE_PERCENT_KEY);
      if (saved) {
        const pos = parseFloat(saved);
        const pct = savedPct ? parseInt(savedPct, 10) : 0;
        if (pos > 200) {
          setSavedPosition(pos);
          setShowResumeBar(true);
          setReadingPercent(pct);
          return; // skip auto-open TOC when resuming
        }
      }

      // Auto-open TOC on first visit so readers discover it
      const tocSeen = localStorage.getItem(TOC_SEEN_KEY);
      if (!tocSeen) {
        setShowToc(true);
        localStorage.setItem(TOC_SEEN_KEY, "1");
      }
    } catch {
      /* silent */
    }
  }, []);

  /* --- Resume reading --- */
  const resumeReading = useCallback(() => {
    if (savedPosition) {
      window.scrollTo({ top: savedPosition, behavior: "instant" });
    }
    setShowResumeBar(false);
  }, [savedPosition]);

  /* --- Save position + track current chapter on scroll --- */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const percent =
          docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;

        setShowScrollTop(scrollY > 800);
        setReadingPercent(percent);

        // Save position every scroll frame
        try {
          localStorage.setItem(STORAGE_KEY, String(scrollY));
          localStorage.setItem(STORAGE_PERCENT_KEY, String(percent));
        } catch {
          /* silent */
        }

        // Determine which chapter is currently in view
        const viewportMid = scrollY + window.innerHeight * 0.3;
        for (let i = chapterRefs.current.length - 1; i >= 0; i--) {
          const el = chapterRefs.current[i];
          if (el && el.offsetTop <= viewportMid) {
            setCurrentChapter(i);
            break;
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Scroll to chapter --- */
  const scrollToChapter = useCallback((index: number) => {
    const el = chapterRefs.current[index];
    if (el) {
      const offset = el.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "instant" });
    }
    setShowToc(false);
  }, []);

  /* --- Persist bookmarks to localStorage --- */
  const saveBookmarks = useCallback((updated: BookmarkEntry[]) => {
    setBookmarks(updated);
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    } catch {
      /* silent */
    }
  }, []);

  /* --- Add bookmark at current position --- */
  const addBookmark = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;

    // Determine current chapter
    let chIdx = 0;
    const viewportMid = scrollY + window.innerHeight * 0.3;
    for (let i = chapterRefs.current.length - 1; i >= 0; i--) {
      const el = chapterRefs.current[i];
      if (el && el.offsetTop <= viewportMid) {
        chIdx = i;
        break;
      }
    }

    const ch = chapters[chIdx];
    const chapterLabel = ch
      ? ch.number === 0
        ? "Prologue"
        : `Ch ${ch.number}: ${ch.title}`
      : "Unknown";

    const entry: BookmarkEntry = {
      id: `bm-${Date.now()}`,
      scrollY,
      chapterIndex: chIdx,
      chapterLabel,
      percent,
      label: `${chapterLabel} — ${percent}%`,
      createdAt: Date.now(),
    };

    saveBookmarks([...bookmarks, entry]);
    setBookmarkFlash(true);
    setBookmarkToast(`Bookmarked: ${chapterLabel} — ${percent}%`);
    setTimeout(() => setBookmarkFlash(false), 2000);
    setTimeout(() => setBookmarkToast(null), 3000);
  }, [bookmarks, chapters, saveBookmarks]);

  /* --- Remove a bookmark --- */
  const removeBookmark = useCallback(
    (id: string) => {
      saveBookmarks(bookmarks.filter((b) => b.id !== id));
    },
    [bookmarks, saveBookmarks],
  );

  /* --- Navigate to a bookmark --- */
  const goToBookmark = useCallback((bm: BookmarkEntry) => {
    window.scrollTo({ top: bm.scrollY, behavior: "instant" });
    setShowToc(false);
  }, []);

  /* --- Persist highlights to localStorage --- */
  const saveHighlights = useCallback((updated: HighlightEntry[]) => {
    setHighlights(updated);
    try {
      localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(updated));
    } catch {
      /* silent */
    }
  }, []);

  /* --- Add highlight --- */
  const addHighlight = useCallback(() => {
    if (!selectionPopup) return;
    const entry: HighlightEntry = {
      id: `hl-${Date.now()}`,
      text: selectionPopup.text,
      chapterNumber: selectionPopup.chapterNumber,
      chapterLabel: selectionPopup.chapterLabel,
      createdAt: Date.now(),
    };
    saveHighlights([...highlights, entry]);
    setSelectionPopup(null);
    window.getSelection()?.removeAllRanges();
  }, [highlights, selectionPopup, saveHighlights]);

  /* --- Remove highlight --- */
  const removeHighlight = useCallback(
    (id: string) => {
      saveHighlights(highlights.filter((h) => h.id !== id));
    },
    [highlights, saveHighlights],
  );

  /* --- Selection listener for highlight popup --- */
  useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.toString().trim()) {
        return;
      }

      const text = sel.toString().trim();
      if (text.length < 3 || text.length > 500) return;

      // Check that selection is inside a chapter-prose div
      const range = sel.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const proseEl =
        container instanceof Element
          ? container.closest(".chapter-prose")
          : container.parentElement?.closest(".chapter-prose");
      if (!proseEl) return;

      // Find which chapter
      const chapterDiv = proseEl.closest("[id^='ch-']");
      if (!chapterDiv) return;
      const chNum = parseInt(chapterDiv.id.replace("ch-", ""), 10);
      const ch = chapters.find((c) => c.number === chNum);
      const chapterLabel = ch
        ? ch.number === 0
          ? "Prologue"
          : `Ch ${ch.number}: ${ch.title}`
        : "Unknown";

      const rect = range.getBoundingClientRect();
      setSelectionPopup({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        text,
        chapterNumber: chNum,
        chapterLabel,
      });
    };

    const onMouseUp = () => {
      setTimeout(onSelectionChange, 10);
    };

    const onMouseDown = (e: MouseEvent) => {
      // Dismiss popup if clicking outside it
      const target = e.target as HTMLElement;
      if (!target.closest("[data-highlight-popup]")) {
        setSelectionPopup(null);
      }
    };

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onMouseDown as EventListener);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("touchstart", onMouseDown as EventListener);
    };
  }, [chapters]);

  /* --- Build highlighted HTML for each chapter --- */
  const highlightedHtml = useMemo(() => {
    const map: Record<number, string> = {};
    for (const ch of chapters) {
      let html = ch.html;
      if (!html) {
        map[ch.number] = html;
        continue;
      }
      // Find highlights for this chapter
      const chHighlights = highlights.filter(
        (h) => h.chapterNumber === ch.number,
      );
      for (const hl of chHighlights) {
        const escaped = escapeRegExp(hl.text);
        // Only replace first occurrence to avoid unintended duplicates
        const regex = new RegExp(`(?<!<[^>]*)${escaped}`, "");
        html = html.replace(
          regex,
          `<mark class="reader-highlight" data-hl-id="${hl.id}">${hl.text}</mark>`,
        );
      }
      map[ch.number] = html;
    }
    return map;
  }, [chapters, highlights]);

  /* --- Scroll to a highlight --- */
  const goToHighlight = useCallback((hl: HighlightEntry) => {
    setShowToc(false);
    setTimeout(() => {
      const el = document.querySelector(`[data-hl-id="${hl.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }, 100);
  }, []);

  /* --- Switch theme --- */
  const switchTheme = useCallback((t: ReaderTheme) => {
    setReaderTheme(t);
    setShowThemePicker(false);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* silent */
    }
  }, []);

  /* --- Lock body scroll when TOC is open + Escape to close --- */
  useEffect(() => {
    if (showToc) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowToc(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [showToc]);

  /* --- Fetch comments --- */
  const fetchComments = useCallback(async (key: string) => {
    try {
      const res = await fetch(`/api/comments?key=${encodeURIComponent(key)}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => ({ ...prev, [key]: data.comments }));
      }
    } catch {
      /* silent */
    }
  }, []);

  /* --- Submit comment --- */
  async function submitComment(key: string, chapter: number | null) {
    if (!commentBody.trim()) return;
    setSubmittingComment(key);
    setCommentError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          chapter,
          name: commentName.trim() || "Anonymous Reader",
          body: commentBody.trim(),
          sentiment: commentSentiment,
        }),
      });
      if (res.ok) {
        setCommentBody("");
        setCommentSentiment("general");
        setCommentSuccess(key);
        setTimeout(() => setCommentSuccess(null), 3000);
        fetchComments(key);
      } else {
        setCommentError(key);
        setTimeout(() => setCommentError(null), 4000);
      }
    } catch {
      setCommentError(key);
      setTimeout(() => setCommentError(null), 4000);
    } finally {
      setSubmittingComment(null);
    }
  }

  /* --- Toggle comments for a chapter --- */
  function toggleChapterComments(chapterNum: number) {
    if (activeCommentChapter === chapterNum) {
      setActiveCommentChapter(null);
    } else {
      setActiveCommentChapter(chapterNum);
      const key = `chapter-${chapterNum}`;
      if (!comments[key]) fetchComments(key);
    }
  }

  /* --- Part Two signup --- */
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupStatus("submitting");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupEmail,
          source: "part-two-early-access",
        }),
      });
      setSignupStatus(res.ok ? "success" : "error");
      if (res.ok) setSignupEmail("");
    } catch {
      setSignupStatus("error");
    }
  }

  /* --- Render comment form --- */
  function renderCommentForm(key: string, chapter: number | null) {
    const list = comments[key] || [];
    const sentimentOptions: {
      value: Comment["sentiment"];
      label: string;
      emoji: string;
    }[] = [
      { value: "like", label: "I liked this", emoji: "\u2764\uFE0F" },
      { value: "confused", label: "Confusing", emoji: "\u2753" },
      { value: "suggestion", label: "Suggestion", emoji: "\uD83D\uDCA1" },
      { value: "general", label: "General", emoji: "\uD83D\uDCAC" },
    ];

    return (
      <div className="border border-[#222] bg-[#0f0f0f] px-6 sm:px-8 py-6 mt-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageCircle className="w-4 h-4 text-[#c9a84c]" />
          <h4 className="font-[family-name:var(--font-sans)] text-xs tracking-[0.2em] uppercase text-[#c9a84c]">
            {chapter !== null
              ? chapter === 0
                ? "Prologue Feedback"
                : `Chapter ${chapter} Feedback`
              : "General Discussion"}
          </h4>
          {list.length > 0 && (
            <span className="text-[10px] text-[#8a8a8a] ml-auto">
              {list.length} comment{list.length !== 1 && "s"}
            </span>
          )}
        </div>

        {list.length > 0 && (
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
            {list.map((c) => (
              <div key={c.id} className="border-l-2 border-[#c9a84c]/20 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-[family-name:var(--font-sans)] text-xs text-[#ededed]">
                    {c.name}
                  </span>
                  {c.sentiment && (
                    <span className="text-[10px]">
                      {c.sentiment === "like" && "\u2764\uFE0F"}
                      {c.sentiment === "confused" && "\u2753"}
                      {c.sentiment === "suggestion" && "\uD83D\uDCA1"}
                      {c.sentiment === "general" && "\uD83D\uDCAC"}
                    </span>
                  )}
                  <span className="text-[10px] text-[#888] ml-auto">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                {c.quote && (
                  <p className="font-[family-name:var(--font-serif)] text-xs italic text-[#c9a84c]/60 mb-1 border-l border-[#c9a84c]/20 pl-2">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                )}
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#aaa] leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {commentError === key && (
          <p className="font-[family-name:var(--font-sans)] text-xs text-red-400 mb-3">
            Something went wrong. Please try again.
          </p>
        )}
        {commentSuccess === key ? (
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c]">
            Thanks for your feedback!
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {sentimentOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setCommentSentiment(s.value)}
                  aria-pressed={commentSentiment === s.value}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    commentSentiment === s.value
                      ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                      : "border-[#333] text-[#888] hover:border-[#555]"
                  }`}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full sm:w-40 px-3 py-2.5 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-xs placeholder:text-[#888] focus:border-[#c9a84c] focus:outline-none transition-colors"
              />
              <div className="flex gap-2 sm:gap-3 flex-1">
                <input
                  type="text"
                  placeholder="Your comment, suggestion, or question&hellip;"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && commentBody.trim())
                      submitComment(key, chapter);
                  }}
                  className="flex-1 px-3 py-2.5 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-xs placeholder:text-[#888] focus:border-[#c9a84c] focus:outline-none transition-colors"
                />
                <button
                  onClick={() => submitComment(key, chapter)}
                  disabled={!commentBody.trim() || submittingComment === key}
                  className="px-4 py-2.5 bg-[#c9a84c] text-[#0a0a0a] text-xs disabled:opacity-40 hover:bg-[#e8c85a] transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const currentMeta = chapters[currentChapter];

  return (
    <div className="min-h-screen" data-reader-theme={readerTheme}>
      {/* ---- Reading progress bar ---- */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        style={{ background: "var(--rt-progress-track)" }}
      >
        <div
          className="h-full transition-[width] duration-150"
          style={{
            width: `${readingPercent}%`,
            background: "var(--rt-accent)",
          }}
        />
      </div>

      {/* ---- Sticky header ---- */}
      <header
        className="sticky top-[2px] z-50 backdrop-blur-sm"
        style={{
          background: "var(--rt-header-bg)",
          borderBottom: "1px solid var(--rt-border)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowToc(!showToc)}
              className="p-1.5 transition-colors rounded"
              style={{ color: "var(--rt-text-muted)" }}
              aria-label="Table of contents"
            >
              <List className="w-4 h-4" />
            </button>
            <a
              href="/"
              className="font-[family-name:var(--font-serif)] text-sm transition-colors tracking-wider hidden sm:block"
              style={{ color: "var(--rt-accent-dim)" }}
            >
              MATC
            </a>
          </div>
          <div className="text-center flex-1 min-w-0 px-4">
            <p
              className="font-[family-name:var(--font-serif)] text-sm truncate"
              style={{ color: "var(--rt-text-heading)" }}
            >
              {currentMeta
                ? currentMeta.number === 0
                  ? "Prologue"
                  : `Chapter ${currentMeta.number}: ${currentMeta.title}`
                : "Part One"}
            </p>
            <p
              className="font-[family-name:var(--font-sans)] text-[10px]"
              style={{ color: "var(--rt-text-muted)" }}
            >
              {readingPercent}% read
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={addBookmark}
              className="p-1.5 transition-colors rounded relative"
              style={{
                color: bookmarkFlash
                  ? "var(--rt-accent)"
                  : "var(--rt-text-muted)",
              }}
              aria-label="Add bookmark"
              title="Bookmark this spot"
            >
              {bookmarkFlash ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              {bookmarks.length > 0 && !bookmarkFlash && (
                <span
                  className="absolute -top-1 -right-1 min-w-[14px] h-[14px] flex items-center justify-center text-[8px] font-bold rounded-full leading-none px-0.5"
                  style={{
                    background: "var(--rt-accent)",
                    color: "var(--rt-bg)",
                  }}
                >
                  {bookmarks.length}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="p-1.5 transition-colors rounded"
                style={{ color: "var(--rt-text-muted)" }}
                aria-label="Change reading theme"
                title="Reading theme"
              >
                <Palette className="w-4 h-4" />
              </button>
              {showThemePicker && (
                <>
                  <div
                    className="fixed inset-0 z-[90]"
                    onClick={() => setShowThemePicker(false)}
                  />
                  <div
                    data-theme-picker
                    className="absolute right-0 top-full mt-2 z-[100] w-52 rounded shadow-lg shadow-black/30 py-2"
                    style={{
                      background: "var(--rt-bg-secondary)",
                      border: "1px solid var(--rt-border)",
                    }}
                  >
                    {/* Mobile drag handle */}
                    <div className="sm:hidden flex justify-center pt-1 pb-3">
                      <div
                        className="w-10 h-1 rounded-full"
                        style={{ background: "var(--rt-border-light)" }}
                      />
                    </div>
                    {THEME_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => switchTheme(t.id)}
                        className="w-full text-left px-4 py-3 sm:py-2.5 flex items-center gap-3 transition-colors"
                        style={{
                          background:
                            readerTheme === t.id
                              ? "var(--rt-accent-bg)"
                              : "transparent",
                          color:
                            readerTheme === t.id
                              ? "var(--rt-accent)"
                              : "var(--rt-text-muted)",
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 border"
                          style={{
                            background: t.preview,
                            borderColor:
                              readerTheme === t.id
                                ? "var(--rt-accent)"
                                : "var(--rt-border)",
                          }}
                        />
                        <span>
                          <span className="font-[family-name:var(--font-sans)] text-xs font-medium block">
                            {t.label}
                          </span>
                          <span
                            className="font-[family-name:var(--font-sans)] text-[10px] block"
                            style={{ color: "var(--rt-text-faint)" }}
                          >
                            {t.desc}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-1.5 transition-colors rounded"
              style={{
                color: showComments
                  ? "var(--rt-accent)"
                  : "var(--rt-text-muted)",
              }}
              aria-label="Toggle comments"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ---- Bookmark toast ---- */}
      {bookmarkToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[90] animate-[slideDown_0.3s_ease-out]">
          <div className="flex items-center gap-2 px-5 py-3 bg-[#c9a84c] text-[#0a0a0a] rounded shadow-lg shadow-black/30">
            <BookmarkCheck className="w-4 h-4 shrink-0" />
            <p className="font-[family-name:var(--font-sans)] text-xs font-medium whitespace-nowrap">
              {bookmarkToast}
            </p>
          </div>
        </div>
      )}

      {/* ---- Resume bar ---- */}
      {showResumeBar && (
        <div
          className="fixed top-14 left-0 right-0 z-40 backdrop-blur-sm"
          style={{
            background: "var(--rt-accent-bg)",
            borderBottom: "1px solid var(--rt-border)",
          }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Bookmark
                className="w-4 h-4 shrink-0"
                style={{ color: "var(--rt-accent)" }}
              />
              <p
                className="font-[family-name:var(--font-sans)] text-[11px] sm:text-xs truncate"
                style={{ color: "var(--rt-text-heading)" }}
              >
                <span className="hidden sm:inline">
                  You were {readingPercent}% through. Pick up where you left
                  off?
                </span>
                <span className="sm:hidden">Resume at {readingPercent}%?</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={resumeReading}
                className="px-3 sm:px-4 py-1.5 font-[family-name:var(--font-sans)] text-xs transition-colors"
                style={{
                  background: "var(--rt-accent)",
                  color: "var(--rt-bg)",
                }}
              >
                Resume
              </button>
              <button
                onClick={() => setShowResumeBar(false)}
                className="p-1.5 transition-colors"
                style={{ color: "var(--rt-text-muted)" }}
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Table of contents overlay ---- */}
      {showToc && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70]"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setShowToc(false)}
            onTouchMove={(e) => e.stopPropagation()}
          />
          <nav
            className="fixed top-0 left-0 bottom-0 w-72 sm:w-80 max-w-[80vw] z-[80] overflow-y-auto shadow-2xl shadow-black/40 animate-[slideIn_0.2s_ease-out]"
            style={{
              background: "var(--rt-toc-bg)",
              borderRight: "1px solid var(--rt-border)",
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="font-[family-name:var(--font-serif)] text-lg"
                  style={{ color: "var(--rt-text-heading)" }}
                >
                  Contents
                </h2>
                <button
                  onClick={() => setShowToc(false)}
                  className="p-1.5 transition-colors"
                  style={{ color: "var(--rt-text-muted)" }}
                  aria-label="Close table of contents"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {chapters.map((ch, i) => (
                  <button
                    key={ch.number}
                    onClick={() => scrollToChapter(i)}
                    className="w-full text-left px-3 py-2.5 transition-colors rounded"
                    style={{
                      background:
                        currentChapter === i
                          ? "var(--rt-accent-bg)"
                          : "transparent",
                      color:
                        currentChapter === i
                          ? "var(--rt-accent)"
                          : "var(--rt-text-muted)",
                    }}
                  >
                    <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase block mb-0.5">
                      {ch.number === 0 ? "Prologue" : `Chapter ${ch.number}`}
                    </span>
                    <span className="font-[family-name:var(--font-serif)] text-sm block">
                      {ch.title}
                    </span>
                    {ch.pov && (
                      <span
                        className="font-[family-name:var(--font-sans)] text-[10px] block"
                        style={{ color: "var(--rt-text-faint)" }}
                      >
                        {ch.pov}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* --- Bookmarks section --- */}
              {bookmarks.length > 0 && (
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid var(--rt-border)" }}
                >
                  <h3
                    className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: "var(--rt-accent-dim)" }}
                  >
                    Bookmarks ({bookmarks.length})
                  </h3>
                  <div className="space-y-1">
                    {bookmarks.map((bm) => (
                      <div
                        key={bm.id}
                        className="flex items-center gap-2 group"
                      >
                        <button
                          onClick={() => goToBookmark(bm)}
                          className="flex-1 text-left px-3 py-2 transition-colors rounded text-[#999] hover:text-[#ededed] hover:bg-[#111]"
                        >
                          <span className="flex items-center gap-2">
                            <Bookmark className="w-3 h-3 text-[#c9a84c]/50 shrink-0" />
                            <span className="font-[family-name:var(--font-serif)] text-sm truncate">
                              {bm.label}
                            </span>
                          </span>
                          <span className="font-[family-name:var(--font-sans)] text-[10px] text-[#666] block pl-5">
                            {new Date(bm.createdAt).toLocaleDateString()}
                          </span>
                        </button>
                        <button
                          onClick={() => removeBookmark(bm.id)}
                          className="p-1.5 text-[#444] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove bookmark"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bookmarks.length === 0 && (
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid var(--rt-border)" }}
                >
                  <p
                    className="font-[family-name:var(--font-sans)] text-[10px] tracking-wider text-center"
                    style={{ color: "var(--rt-text-faint)" }}
                  >
                    Tap{" "}
                    <Bookmark className="w-3 h-3 inline-block mx-0.5 -mt-0.5" />{" "}
                    in the header to save a bookmark
                  </p>
                </div>
              )}

              {/* --- Highlights section --- */}
              {highlights.length > 0 && (
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid var(--rt-border)" }}
                >
                  <h3
                    className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: "var(--rt-accent-dim)" }}
                  >
                    Highlights ({highlights.length})
                  </h3>
                  <div className="space-y-1">
                    {highlights.map((hl) => (
                      <div key={hl.id} className="flex items-start gap-2 group">
                        <button
                          onClick={() => goToHighlight(hl)}
                          className="flex-1 text-left px-3 py-2 transition-colors rounded text-[#999] hover:text-[#ededed] hover:bg-[#111]"
                        >
                          <span className="font-[family-name:var(--font-serif)] text-xs italic text-[#c9a84c]/70 line-clamp-2 leading-relaxed">
                            &ldquo;{hl.text}&rdquo;
                          </span>
                          <span className="font-[family-name:var(--font-sans)] text-[10px] text-[#666] block mt-0.5">
                            {hl.chapterLabel}
                          </span>
                        </button>
                        <button
                          onClick={() => removeHighlight(hl.id)}
                          className="p-1.5 mt-1 text-[#444] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                          aria-label="Remove highlight"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {highlights.length === 0 && (
                <div
                  className={bookmarks.length > 0 ? "mt-4" : "mt-6 pt-6"}
                  style={
                    bookmarks.length > 0
                      ? {}
                      : { borderTop: "1px solid var(--rt-border)" }
                  }
                >
                  <p
                    className="font-[family-name:var(--font-sans)] text-[10px] tracking-wider text-center"
                    style={{ color: "var(--rt-text-faint)" }}
                  >
                    Select text in a chapter to highlight it
                  </p>
                </div>
              )}
            </div>
          </nav>
        </>
      )}

      {/* ---- Main content ---- */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        {/* Hero */}
        <div className="py-16 sm:py-24 text-center">
          <p
            className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--rt-accent-dim)" }}
          >
            Man Amongst the Clouds
          </p>
          <h1
            className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6"
            style={{ color: "var(--rt-text-heading)" }}
          >
            Part One
          </h1>
          <h2
            className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide mb-8"
            style={{ color: "var(--rt-accent)" }}
          >
            The Still Water
          </h2>
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{
              background: `linear-gradient(to right, transparent, var(--rt-hr), transparent)`,
            }}
          />
          <p
            className="font-[family-name:var(--font-serif)] text-base sm:text-lg italic max-w-lg mx-auto leading-relaxed mb-4"
            style={{ color: "var(--rt-accent-dim)" }}
          >
            &ldquo;In the time before the taking, the world sang to itself, and
            men were wise enough to listen.&rdquo;
          </p>
          <p
            className="font-[family-name:var(--font-sans)] text-xs mt-6"
            style={{ color: "var(--rt-text-muted)" }}
          >
            by Justin Cronk
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/matc-part-one.epub"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border font-[family-name:var(--font-sans)] text-xs tracking-wide transition-colors"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-accent)",
              }}
            >
              <Download className="w-3.5 h-3.5" /> Download EPUB
            </a>
            <a
              href="/matc-part-one.docx"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border font-[family-name:var(--font-sans)] text-xs tracking-wide transition-colors"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-accent)",
              }}
            >
              <FileText className="w-3.5 h-3.5" /> Download DOCX
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <BookOpen
              className="w-4 h-4"
              style={{ color: "var(--rt-text-faint)" }}
            />
            <p
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-wider"
              style={{ color: "var(--rt-text-faint)" }}
            >
              Your reading position saves automatically — just close and come
              back anytime
            </p>
          </div>
        </div>

        {/* Chapters — continuous */}
        {chapters.map((chapter, i) => (
          <div
            key={chapter.number}
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            id={`ch-${chapter.number}`}
          >
            {/* Chapter heading */}
            <div
              className="py-12 sm:py-16 text-center"
              style={{ borderTop: "1px solid var(--rt-border)" }}
            >
              <p
                className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase mb-3"
                style={{ color: "var(--rt-accent-dim)" }}
              >
                {chapter.number === 0
                  ? "Prologue"
                  : `Chapter ${chapter.number}`}
              </p>
              <h3
                className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide mb-2"
                style={{ color: "var(--rt-text-heading)" }}
              >
                {chapter.title}
              </h3>
              {chapter.pov && (
                <p
                  className="font-[family-name:var(--font-sans)] text-[10px] tracking-wider"
                  style={{ color: "var(--rt-text-muted)" }}
                >
                  {chapter.pov}
                </p>
              )}
            </div>

            {/* Chapter body */}
            {chapter.html ? (
              <div
                className="chapter-prose pb-12 sm:pb-16"
                dangerouslySetInnerHTML={{
                  __html: highlightedHtml[chapter.number] || chapter.html,
                }}
              />
            ) : (
              <div className="pb-12 sm:pb-16 text-center py-16">
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#888]">
                  This chapter could not be loaded. Please refresh the page or
                  try again later.
                </p>
              </div>
            )}

            {/* Per-chapter comment toggle (only when comments mode is on) */}
            {showComments && (
              <div className="pb-8">
                <button
                  onClick={() => toggleChapterComments(chapter.number)}
                  className="flex items-center gap-2 text-left hover:bg-[#0f0f0f] transition-colors px-3 py-2 rounded"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#c9a84c]/50" />
                  <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#8a8a8a]">
                    {activeCommentChapter === chapter.number
                      ? "Hide feedback"
                      : "Leave feedback"}
                  </span>
                  {(comments[`chapter-${chapter.number}`]?.length ?? 0) > 0 && (
                    <span className="text-[10px] text-[#888]">
                      ({comments[`chapter-${chapter.number}`].length})
                    </span>
                  )}
                  {activeCommentChapter === chapter.number ? (
                    <ChevronUp className="w-3 h-3 text-[#888]" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-[#888]" />
                  )}
                </button>
                {activeCommentChapter === chapter.number &&
                  renderCommentForm(
                    `chapter-${chapter.number}`,
                    chapter.number,
                  )}
              </div>
            )}
          </div>
        ))}

        {/* End of Part One */}
        <div
          className="py-20 sm:py-28 text-center"
          style={{ borderTop: "1px solid var(--rt-border)" }}
        >
          <p
            className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--rt-accent-dim)" }}
          >
            End of Part One
          </p>
          <h3
            className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide mb-8"
            style={{ color: "var(--rt-text-heading)" }}
          >
            The Still Water
          </h3>
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{
              background: `linear-gradient(to right, transparent, var(--rt-hr), transparent)`,
            }}
          />

          {/* Part Two signup */}
          <div className="mb-12">
            <Mail
              className="w-5 h-5 mx-auto mb-4"
              style={{ color: "var(--rt-accent)" }}
            />
            <h3
              className="font-[family-name:var(--font-serif)] text-xl mb-2"
              style={{ color: "var(--rt-text-heading)" }}
            >
              Part Two: The Waking
            </h3>
            <p
              className="font-[family-name:var(--font-serif)] text-sm mb-6 max-w-md mx-auto leading-relaxed"
              style={{ color: "var(--rt-text-muted)" }}
            >
              Part Two is expected by May 2026. Get notified when it drops
              &mdash; same deal, free to read, your feedback welcome.
            </p>
            {signupStatus === "success" ? (
              <p
                className="font-[family-name:var(--font-serif)] text-sm"
                style={{ color: "var(--rt-accent)" }}
              >
                You&apos;re on the list. We&apos;ll let you know.
              </p>
            ) : (
              <form
                onSubmit={handleSignup}
                className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={signupStatus === "submitting"}
                  className="flex-1 px-4 py-3 font-[family-name:var(--font-sans)] text-sm focus:outline-none transition-colors disabled:opacity-50"
                  style={{
                    background: "var(--rt-input-bg)",
                    border: "1px solid var(--rt-border-light)",
                    color: "var(--rt-text-heading)",
                  }}
                />
                <button
                  type="submit"
                  disabled={signupStatus === "submitting"}
                  className="px-6 py-3 font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
                  style={{
                    background: "var(--rt-accent)",
                    color: "var(--rt-bg)",
                  }}
                >
                  {signupStatus === "submitting" ? "..." : "Notify Me"}
                </button>
              </form>
            )}

            {/* Pre-order + Founder's Edition */}
            <div
              className="mt-8 pt-8"
              style={{ borderTop: "1px solid var(--rt-border)" }}
            >
              <p
                className="font-[family-name:var(--font-serif)] text-sm mb-4"
                style={{ color: "var(--rt-text-muted)" }}
              >
                Or lock it in now &mdash; get the EPUB sent to your email on
                release day:
              </p>
              <a
                href="/api/preorder"
                className="inline-block px-8 py-3 border text-xs tracking-widest uppercase transition-all duration-300 font-[family-name:var(--font-sans)]"
                style={{
                  borderColor: "var(--rt-border-light)",
                  color: "var(--rt-accent)",
                }}
              >
                Pre-Order Part II &mdash; $2.99
              </a>
              <p
                className="font-[family-name:var(--font-sans)] text-[10px] mt-3"
                style={{ color: "var(--rt-text-muted)" }}
              >
                Secure checkout via Stripe &bull; No account required
              </p>
            </div>

            <div
              className="mt-6 pt-6"
              style={{ borderTop: "1px solid var(--rt-border)" }}
            >
              <p
                className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--rt-accent-dim)" }}
              >
                Founder&rsquo;s Edition
              </p>
              <p
                className="font-[family-name:var(--font-serif)] text-sm mb-1"
                style={{ color: "var(--rt-text-heading)" }}
              >
                Want the whole thing? All 5 parts digitally + a signed physical
                copy.
              </p>
              <p
                className="font-[family-name:var(--font-serif)] text-sm mb-4"
                style={{ color: "var(--rt-text-muted)" }}
              >
                Full refund anytime, no questions asked. Targeting August 2026.
              </p>
              <a
                href="/api/founders-edition"
                className="inline-block px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 font-[family-name:var(--font-sans)]"
                style={{
                  background: "var(--rt-accent)",
                  color: "var(--rt-bg)",
                }}
              >
                Become a Founder &mdash; $39.99
              </a>
              <p
                className="font-[family-name:var(--font-sans)] text-[10px] mt-3"
                style={{ color: "var(--rt-text-muted)" }}
              >
                Shipping address collected at checkout
              </p>
            </div>
          </div>

          {/* General discussion (when comments on) */}
          {showComments && (
            <div className="text-left max-w-xl mx-auto mt-12">
              <h4
                className="font-[family-name:var(--font-serif)] text-lg mb-2 text-center"
                style={{ color: "var(--rt-text-heading)" }}
              >
                General Discussion
              </h4>
              <p
                className="font-[family-name:var(--font-serif)] text-sm mb-4 text-center"
                style={{ color: "var(--rt-text-muted)" }}
              >
                Overall thoughts on Part One, questions about the world, things
                that stayed with you.
              </p>
              {renderCommentForm("general", null)}
            </div>
          )}
        </div>

        {/* Support section */}
        <div className="mb-20">
          <div
            className="p-6 sm:p-8"
            style={{ border: "1px solid var(--rt-border)" }}
          >
            <button
              onClick={() => setShowSupport(!showSupport)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Heart
                  className="w-4 h-4"
                  style={{ color: "var(--rt-accent-dim)" }}
                />
                <span
                  className="font-[family-name:var(--font-serif)] text-sm"
                  style={{ color: "var(--rt-text-muted)" }}
                >
                  {showSupport
                    ? "Thank you for considering."
                    : "Want to support the work?"}
                </span>
              </div>
              {showSupport ? (
                <ChevronUp
                  className="w-4 h-4"
                  style={{ color: "var(--rt-text-muted)" }}
                />
              ) : (
                <ChevronDown
                  className="w-4 h-4"
                  style={{ color: "var(--rt-text-muted)" }}
                />
              )}
            </button>

            {showSupport && (
              <div
                className="mt-6 pt-6"
                style={{ borderTop: "1px solid var(--rt-border)" }}
              >
                <p
                  className="font-[family-name:var(--font-serif)] text-sm leading-relaxed mb-6"
                  style={{ color: "var(--rt-text-muted)" }}
                >
                  Nine years in the making. If it meant something to you,
                  contributions help cover editing, cover art, and publishing.
                  Every dollar goes directly to the book. No middlemen.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[5, 10, 25, 50].map((amount) => (
                    <a
                      key={amount}
                      href={`/api/donate?amount=${amount}`}
                      className="py-3 border text-center font-[family-name:var(--font-sans)] text-sm transition-colors"
                      style={{
                        borderColor: "var(--rt-border-light)",
                        color: "var(--rt-accent)",
                      }}
                    >
                      ${amount}
                    </a>
                  ))}
                </div>
                <a
                  href="/api/donate?custom=true"
                  className="block w-full py-3 border text-center font-[family-name:var(--font-sans)] text-xs transition-colors"
                  style={{
                    borderColor: "var(--rt-border)",
                    color: "var(--rt-text-muted)",
                  }}
                >
                  Custom Amount
                </a>
                <p
                  className="font-[family-name:var(--font-sans)] text-[10px] text-center mt-3"
                  style={{ color: "var(--rt-text-muted)" }}
                >
                  Secure payment via Stripe &middot; No account required
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Share section */}
        <div
          className="p-6 sm:p-8 mb-16 text-center"
          style={{ border: "1px solid var(--rt-border)" }}
        >
          <Share2
            className="w-5 h-5 mx-auto mb-4"
            style={{ color: "var(--rt-accent)" }}
          />
          <h3
            className="font-[family-name:var(--font-serif)] text-xl mb-2"
            style={{ color: "var(--rt-text-heading)" }}
          >
            Share Part One
          </h3>
          <p
            className="font-[family-name:var(--font-serif)] text-sm mb-6 max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--rt-text-muted)" }}
          >
            Know someone who&apos;d enjoy this? Send it their way.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border text-xs tracking-wide transition-colors font-[family-name:var(--font-sans)]"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-text-heading)",
              }}
            >
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Read%20Part%20One%20of%20Man%20Amongst%20the%20Clouds%20%E2%80%94%20free%2C%20ten%20chapters%2C%20no%20signup%20needed.&url=https%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border text-xs tracking-wide transition-colors font-[family-name:var(--font-sans)]"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-text-heading)",
              }}
            >
              <Twitter className="w-3.5 h-3.5" /> Twitter / X
            </a>
            <a
              href="mailto:?subject=Read%20this%20%E2%80%94%20Man%20Amongst%20the%20Clouds&body=I%20just%20read%20Part%20One%20of%20Man%20Amongst%20the%20Clouds%20by%20Justin%20Cronk%20%E2%80%94%20ten%20chapters%2C%20free%20to%20read%20online.%0A%0Ahttps%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              className="flex items-center gap-2 px-5 py-2.5 border text-xs tracking-wide transition-colors font-[family-name:var(--font-sans)]"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-text-heading)",
              }}
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            <a
              href="sms:?&body=Read%20Part%20One%20of%20Man%20Amongst%20the%20Clouds%20%E2%80%94%20free%2C%20ten%20chapters%3A%20https%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              className="flex items-center gap-2 px-5 py-2.5 border text-xs tracking-wide transition-colors font-[family-name:var(--font-sans)]"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-text-heading)",
              }}
            >
              <Smartphone className="w-3.5 h-3.5" /> Text
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://www.manamongsttheclouds.com/read/part-one",
                );
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 px-5 py-2.5 border text-xs tracking-wide transition-colors font-[family-name:var(--font-sans)]"
              style={{
                borderColor: "var(--rt-border)",
                color: "var(--rt-text-heading)",
              }}
            >
              <Link className="w-3.5 h-3.5" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div
          className="py-12 text-center"
          style={{ borderTop: "1px solid var(--rt-border)" }}
        >
          <p
            className="font-[family-name:var(--font-serif)] text-sm italic mb-4"
            style={{ color: "var(--rt-text-muted)" }}
          >
            &ldquo;The world sang to itself, as it always had.&rdquo;
          </p>
          <p
            className="font-[family-name:var(--font-sans)] text-[10px] tracking-wider"
            style={{ color: "var(--rt-text-muted)" }}
          >
            &copy; 2026 Justin Cronk &middot; Stillfire Press &middot; All
            rights reserved
          </p>
        </div>
      </div>

      {/* ---- Highlight selection popup ---- */}
      {selectionPopup && (
        <div
          data-highlight-popup
          className="fixed z-[100] animate-[slideDown_0.15s_ease-out]"
          style={{
            left: `${Math.min(Math.max(selectionPopup.x, 60), typeof window !== "undefined" ? window.innerWidth - 60 : 800)}px`,
            top: `${selectionPopup.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <button
            onClick={addHighlight}
            className="flex items-center gap-2 px-4 py-2.5 rounded shadow-lg shadow-black/40 transition-colors"
            style={{ background: "var(--rt-accent)", color: "var(--rt-bg)" }}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span className="font-[family-name:var(--font-sans)] text-xs font-medium">
              Highlight
            </span>
          </button>
          <div
            className="w-3 h-3 rotate-45 mx-auto -mt-1.5"
            style={{ background: "var(--rt-accent)" }}
          />
        </div>
      )}

      {/* ---- Scroll to top ---- */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-11 h-11 sm:w-10 sm:h-10 rounded-full sm:rounded flex items-center justify-center transition-colors z-40 shadow-lg shadow-black/20"
          style={{ background: "var(--rt-accent)", color: "var(--rt-bg)" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
