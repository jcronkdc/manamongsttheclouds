"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import {
  BookOpen,
  Heart,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  ArrowUp,
  Mail,
  Share2,
  Link,
  Facebook,
  Twitter,
  Smartphone,
  Download,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Chapter {
  number: number;
  title: string;
  pov: string;
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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartOneReader({ chapters }: { chapters: Chapter[] }) {
  const [activeChapter, setActiveChapter] = useState<number | null>(0);
  const [showSupport, setShowSupport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [chapterHtml, setChapterHtml] = useState<Record<number, string>>({});
  const [chapterLoading, setChapterLoading] = useState<Record<number, boolean>>(
    {},
  );

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

  // Part Two signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // scroll-to-top
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Fetch comments for a chapter when expanded --- */
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

  /* --- Lazy-load chapter HTML --- */
  const fetchChapterHtml = useCallback(
    async (num: number) => {
      if (chapterHtml[num] !== undefined) return;
      setChapterLoading((prev) => ({ ...prev, [num]: true }));
      try {
        const res = await fetch(`/api/chapter/${num}`);
        if (res.ok) {
          const data = await res.json();
          setChapterHtml((prev) => ({ ...prev, [num]: data.html }));
        }
      } catch {
        /* silent */
      } finally {
        setChapterLoading((prev) => ({ ...prev, [num]: false }));
      }
    },
    [chapterHtml],
  );

  useEffect(() => {
    if (activeChapter !== null) {
      fetchChapterHtml(activeChapter);
      const key = `chapter-${activeChapter}`;
      if (!comments[key]) fetchComments(key);
    }
    // also fetch general
    if (!comments["general"]) fetchComments("general");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChapter]);

  /* --- Submit a comment --- */
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

  /* --- Part Two signup --- */
  async function handleSignup(e: FormEvent) {
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

  /* --- Toggle chapter --- */
  function toggle(num: number) {
    setActiveChapter(activeChapter === num ? null : num);
  }

  /* --- Comment form (reused for chapter + general) --- */
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
      <div className="border-t border-[#222] bg-[#0f0f0f] px-6 sm:px-8 py-6">
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

        {/* Existing comments */}
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

        {/* Comment form */}
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
            {/* Sentiment pills */}
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
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full sm:w-40 px-3 py-2.5 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-xs placeholder:text-[#888] focus:border-[#c9a84c] focus:outline-none transition-colors"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Your comment, suggestion, or question&hellip;"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && commentBody.trim())
                      submitComment(key, chapter);
                  }}
                  className="flex-1 min-w-0 px-3 py-2.5 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-xs placeholder:text-[#888] focus:border-[#c9a84c] focus:outline-none transition-colors"
                />
                <button
                  onClick={() => submitComment(key, chapter)}
                  disabled={!commentBody.trim() || submittingComment === key}
                  className="px-4 py-2.5 bg-[#c9a84c] text-[#0a0a0a] text-xs disabled:opacity-40 hover:bg-[#e8c85a] transition-colors flex-shrink-0"
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#222]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <a
              href="/"
              className="font-[family-name:var(--font-serif)] text-sm text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors tracking-wider"
            >
              MATC
            </a>
          </div>
          <div className="text-right">
            <p className="font-[family-name:var(--font-serif)] text-sm sm:text-base text-[#ededed]">
              Part One: The Still Water
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#8a8a8a] tracking-wider">
              10 Chapters &middot; Free to Read
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Hero */}
        <div className="py-16 sm:py-24 text-center">
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
            Man Amongst the Clouds
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6">
            Part One
          </h1>
          <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light text-[#c9a84c] tracking-wide mb-8">
            The Still Water
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mx-auto mb-8" />
          <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg italic text-[#c9a84c]/70 max-w-lg mx-auto leading-relaxed mb-4">
            &ldquo;In the time before the taking, the world sang to itself, and
            men were wise enough to listen.&rdquo;
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#888] mt-8 max-w-md mx-auto leading-relaxed">
            by Justin Cronk
          </p>
        </div>

        {/* Introduction box */}
        <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <BookOpen className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-[family-name:var(--font-serif)] text-sm text-[#ccc] leading-relaxed mb-2">
                This is the complete first part of{" "}
                <em className="text-[#c9a84c]">Man Amongst the Clouds</em>{" "}
                &mdash; ten chapters, free to read. Just pick a chapter and
                start reading. If you feel like leaving feedback, there&apos;s a
                &ldquo;Leave feedback&rdquo; option at the end of each chapter
                &mdash; but it&apos;s completely optional. Your comments help
                shape the final book, but the story is here for you either way.
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#888] mb-3">
                No account needed. No signup. Just read.
              </p>
              <a
                href="/matc-part-one.epub"
                download
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-wide hover:bg-[#c9a84c]/10 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download EPUB
              </a>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="space-y-4 mb-20">
          {chapters.map((chapter) => {
            const isOpen = activeChapter === chapter.number;
            return (
              <div
                key={chapter.number}
                id={`chapter-${chapter.number}`}
                className="border border-[#222] transition-colors"
              >
                {/* Chapter toggle */}
                <button
                  onClick={() => toggle(chapter.number)}
                  aria-expanded={isOpen}
                  aria-controls={`chapter-content-${chapter.number}`}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-[#111] transition-colors text-left"
                >
                  <div>
                    <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">
                      {chapter.number === 0
                        ? "Prologue"
                        : `Chapter ${chapter.number}`}
                    </span>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg sm:text-xl text-[#ededed] mt-1">
                      {chapter.title}
                    </h3>
                    {chapter.pov && (
                      <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#8a8a8a] mt-1 tracking-wider">
                        {chapter.pov}
                      </p>
                    )}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#888] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#888] flex-shrink-0" />
                  )}
                </button>

                {/* Chapter body + comments */}
                {isOpen && (
                  <div
                    id={`chapter-content-${chapter.number}`}
                    role="region"
                    aria-label={
                      chapter.number === 0
                        ? "Prologue"
                        : `Chapter ${chapter.number}`
                    }
                  >
                    <div className="border-t border-[#222] px-6 sm:px-8 py-8 sm:py-10">
                      {chapterLoading[chapter.number] ? (
                        <div className="flex justify-center py-16">
                          <div className="w-6 h-6 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
                        </div>
                      ) : chapterHtml[chapter.number] ? (
                        <div
                          className="chapter-prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: chapterHtml[chapter.number],
                          }}
                        />
                      ) : (
                        <p className="text-center text-[#888] text-sm py-8">
                          Failed to load chapter. Please try again.
                        </p>
                      )}
                    </div>
                    {/* Collapsible feedback toggle */}
                    <div className="border-t border-[#222]">
                      <button
                        onClick={() =>
                          setShowFeedback((prev) => ({
                            ...prev,
                            [`chapter-${chapter.number}`]:
                              !prev[`chapter-${chapter.number}`],
                          }))
                        }
                        className="w-full px-6 sm:px-8 py-3 flex items-center gap-2 text-left hover:bg-[#0f0f0f] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#c9a84c]/50" />
                        <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#8a8a8a]">
                          {showFeedback[`chapter-${chapter.number}`]
                            ? "Hide feedback"
                            : "Leave feedback"}
                        </span>
                        {(comments[`chapter-${chapter.number}`]?.length ?? 0) >
                          0 && (
                          <span className="text-[10px] text-[#888]">
                            ({comments[`chapter-${chapter.number}`].length})
                          </span>
                        )}
                      </button>
                      {showFeedback[`chapter-${chapter.number}`] &&
                        renderCommentForm(
                          `chapter-${chapter.number}`,
                          chapter.number,
                        )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* General discussion */}
        <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/5 mb-16">
          <button
            onClick={() =>
              setShowFeedback((prev) => ({
                ...prev,
                general: !prev.general,
              }))
            }
            className="w-full p-6 sm:p-8 flex items-center justify-between text-left hover:bg-[#c9a84c]/10 transition-colors"
          >
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-lg text-[#ededed] mb-1">
                General Discussion
              </h3>
              <p className="font-[family-name:var(--font-serif)] text-sm text-[#aaa]">
                Overall thoughts on Part One, questions about the world, things
                that stayed with you.
              </p>
            </div>
            {showFeedback.general ? (
              <ChevronUp className="w-4 h-4 text-[#888] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#888] flex-shrink-0" />
            )}
          </button>
          {showFeedback.general && (
            <div className="px-0">{renderCommentForm("general", null)}</div>
          )}
        </div>

        {/* Part Two signup */}
        <div className="border border-[#222] p-6 sm:p-8 mb-16 text-center">
          <Mail className="w-5 h-5 text-[#c9a84c] mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-2">
            Part Two: The Waking
          </h3>
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] mb-6 max-w-md mx-auto leading-relaxed">
            Part Two is expected by May 2026. Get notified when it drops &mdash;
            same deal, free to read, your feedback welcome.
          </p>
          {signupStatus === "success" ? (
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#c9a84c]">
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
                className="flex-1 px-4 py-3 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-sm placeholder:text-[#888] focus:border-[#c9a84c] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={signupStatus === "submitting"}
                className="px-6 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:bg-[#e8c85a] transition-colors disabled:opacity-50"
              >
                {signupStatus === "submitting" ? "..." : "Notify Me"}
              </button>
            </form>
          )}
          <div className="mt-6 pt-6 border-t border-[#222]">
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#888] mb-4">
              Or lock it in now &mdash; get the EPUB sent to your email on
              release day:
            </p>
            <a
              href="/api/preorder"
              className="inline-block px-8 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
            >
              Pre-Order Part II &mdash; $2.99
            </a>
            <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#888] mt-3">
              Secure checkout via Stripe &bull; No account required
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#c9a84c]/20">
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 mb-3">
              Founder&rsquo;s Edition
            </p>
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] mb-1">
              Want the whole thing? All 5 parts digitally + a signed physical
              copy.
            </p>
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#888] mb-4">
              Full refund anytime, no questions asked. Targeting August 2026.
            </p>
            <a
              href="/api/founders-edition"
              className="inline-block px-8 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              Become a Founder &mdash; $39.99
            </a>
            <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#888] mt-3">
              Shipping address collected at checkout
            </p>
          </div>
        </div>

        {/* Subtle support section */}
        <div className="mb-20">
          <div className="border border-[#333]/50 p-6 sm:p-8">
            <button
              onClick={() => setShowSupport(!showSupport)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#c9a84c]/60" />
                <span className="font-[family-name:var(--font-serif)] text-sm text-[#999]">
                  {showSupport
                    ? "Thank you for considering."
                    : "Want to support the work?"}
                </span>
              </div>
              {showSupport ? (
                <ChevronUp className="w-4 h-4 text-[#8a8a8a]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#8a8a8a]" />
              )}
            </button>

            {showSupport && (
              <div className="mt-6 pt-6 border-t border-[#222]">
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#888] leading-relaxed mb-6">
                  Nine years in the making. If it meant something to you,
                  contributions help cover editing, cover art, and publishing.
                  Every dollar goes directly to the book. No middlemen.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[5, 10, 25, 50].map((amount) => (
                    <a
                      key={amount}
                      href={`/api/donate?amount=${amount}`}
                      className="py-3 border border-[#c9a84c]/20 text-[#c9a84c] text-center font-[family-name:var(--font-sans)] text-sm hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]/40 transition-colors"
                    >
                      ${amount}
                    </a>
                  ))}
                </div>
                <a
                  href="/api/donate?custom=true"
                  className="block w-full py-3 border border-[#333] text-[#999] text-center font-[family-name:var(--font-sans)] text-xs hover:bg-[#111] transition-colors"
                >
                  Custom Amount
                </a>
                <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#888] text-center mt-3">
                  Secure payment via Stripe &middot; No account required
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Share section */}
        <div className="border border-[#222] p-6 sm:p-8 mb-16 text-center">
          <Share2 className="w-5 h-5 text-[#c9a84c] mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-2">
            Share Part One
          </h3>
          <p className="font-[family-name:var(--font-serif)] text-sm text-[#999] mb-6 max-w-md mx-auto leading-relaxed">
            Know someone who&apos;d enjoy this? Send it their way.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-[#333] text-[#ccc] font-[family-name:var(--font-sans)] text-xs tracking-wide hover:bg-[#111] hover:border-[#555] transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Read%20Part%20One%20of%20Man%20Amongst%20the%20Clouds%20%E2%80%94%20free%2C%20ten%20chapters%2C%20no%20signup%20needed.&url=https%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-[#333] text-[#ccc] font-[family-name:var(--font-sans)] text-xs tracking-wide hover:bg-[#111] hover:border-[#555] transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" /> Twitter / X
            </a>
            <a
              href="mailto:?subject=Read%20this%20%E2%80%94%20Man%20Amongst%20the%20Clouds&body=I%20just%20read%20Part%20One%20of%20Man%20Amongst%20the%20Clouds%20by%20Justin%20Cronk%20%E2%80%94%20ten%20chapters%2C%20free%20to%20read%20online.%0A%0Ahttps%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              className="flex items-center gap-2 px-5 py-2.5 border border-[#333] text-[#ccc] font-[family-name:var(--font-sans)] text-xs tracking-wide hover:bg-[#111] hover:border-[#555] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            <a
              href="sms:?&body=Read%20Part%20One%20of%20Man%20Amongst%20the%20Clouds%20%E2%80%94%20free%2C%20ten%20chapters%3A%20https%3A%2F%2Fwww.manamongsttheclouds.com%2Fread%2Fpart-one"
              className="flex items-center gap-2 px-5 py-2.5 border border-[#333] text-[#ccc] font-[family-name:var(--font-sans)] text-xs tracking-wide hover:bg-[#111] hover:border-[#555] transition-colors"
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
              className="flex items-center gap-2 px-5 py-2.5 border border-[#333] text-[#ccc] font-[family-name:var(--font-sans)] text-xs tracking-wide hover:bg-[#111] hover:border-[#555] transition-colors"
            >
              <Link className="w-3.5 h-3.5" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1a1a1a] py-12 text-center">
          <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#888] mb-4">
            &ldquo;The world sang to itself, as it always had.&rdquo;
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#888] tracking-wider">
            &copy; 2026 Justin Cronk &middot; Stillfire Press &middot; All
            rights reserved
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 bg-[#c9a84c] text-[#0a0a0a] flex items-center justify-center hover:bg-[#e8c85a] transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
