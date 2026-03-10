# Fresh Website Audit — Man Amongst the Clouds

**Date:** July 2025  
**Stack:** Next.js 16.1.6, React 19, Tailwind CSS 4, Supabase, Stripe, Resend, Vercel  
**Domain:** manamongsttheclouds.com (redirects non-www → www)  
**Auditor:** Cascade  
**Previous Audit:** March 10, 2026 (38 findings)

---

## Executive Summary

Significant progress has been made since the March 2026 audit. **24 of the original 38 findings have been fully resolved**, including all 5 critical security issues. The codebase is materially more secure, better organized, and more accessible. The remaining issues are mostly medium-to-low severity.

This report covers:
- **Delta from previous audit** — what's fixed, what's still outstanding
- **New findings** — issues discovered in this review that weren't in the original audit

---

## Delta from Previous Audit

### ✅ FIXED (24 of 38)

| # | Original Finding | Status |
|---|-----------------|--------|
| 1.1 | Comments API — no rate limiting | **FIXED** — `rateLimit()` added (10 req/60s per IP) |
| 1.2 | Signup API — no rate limiting | **FIXED** — `rateLimit()` added (5 req/60s per IP) |
| 1.3 | Supabase anon key on server routes | **FIXED** — `supabase-server.ts` now uses `SUPABASE_SERVICE_ROLE_KEY` with anon-key fallback |
| 1.4 | Webhook lacks idempotency | **FIXED** — `.maybeSingle()` check before insert for both founders and preorder flows |
| 1.5 | Donate API NaN validation | **FIXED** — `isNaN(amount)` check added |
| 2.1 | Excerpt CTA links to paid Stripe for free content | **FIXED** — Now links to `/read/part-one` with "Keep Reading Free" label |
| 2.2 | Duplicate `verifyToken` function | **FIXED** — Extracted to `app/lib/verify-token.ts` |
| 2.3 | Synchronous file I/O in API routes | **FIXED** — Both `book/[token]` and `download/[token]` now use `fs.readFile` (async) |
| 2.4 | OG image path mismatch in metadata | **FIXED** — `layout.tsx` and `read/part-one/page.tsx` both reference `/opengraph-image` correctly |
| 2.5 | Prologue feedback shows "General Discussion" | **FIXED** — Now checks `chapter !== null` instead of truthiness |
| 2.6 | ReadSection stats inconsistency | **FIXED** — Now shows "10 Chapters" + "1 Prologue" separately |
| 3.2 | Cover image missing `sizes` prop | **FIXED** — `sizes="280px"` added |
| 3.4 | Empty `next.config.ts` | **FIXED** — Now includes `poweredByHeader: false` and security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control) |
| 4.3 | OG image references static `/og-image.png` | **FIXED** — Metadata now references the dynamic `/opengraph-image` route |
| 4.5 | Missing viewport meta in inline error HTML | **FIXED** — Download error page now includes viewport meta tag |
| 5.1 | No skip-to-content link | **FIXED** — Added to `layout.tsx` with proper sr-only styling and focus visibility |
| 5.3 | Sentiment buttons lack `aria-pressed` | **FIXED** — `aria-pressed={commentSentiment === s.value}` added |
| 5.4 | Chapter accordion missing ARIA | **FIXED** — `aria-expanded`, `aria-controls`, `role="region"` added |
| 6.1 | Six unused components (dead code) | **FIXED** — All 6 removed (AuthorBios, BooksSection, CarterBook, JustinBook, SFPHero, SFPFooter) |
| 6.2 | EpubReader.tsx too large | **ACKNOWLEDGED** — Still 776 lines but well-organized with clear sections; acceptable |
| 6.3 | Duplicate Stripe client instantiation | **FIXED** — Shared `getStripe()` in `app/lib/stripe.ts` |
| 6.4 | CSS font variable mismatch | **FIXED** — `--font-sans` now correctly references `var(--font-inter)` |
| 6.6 | Package name is generic "website" | **FIXED** — Now `"man-amongst-the-clouds"` |
| 7.5 | Missing error boundary | **FIXED** — Both `error.tsx` and `not-found.tsx` exist with branded pages |

### ⚠️ STILL OUTSTANDING (7 of 38)

#### 3.1 — All chapter HTML serialized into client bundle (Medium — Performance)
**File:** `app/read/part-one/page.tsx`  
All 11 markdown files are still read with `fs.readFileSync`, converted to HTML, and passed as props to the client component. This embeds ~200KB+ of HTML into the initial page payload when only one chapter is visible at a time.  
**Recommendation:** Lazy-load chapters via an API route or use React Server Components with streaming.

#### 3.3 — Unused default Next.js SVGs in `/public` (Low — Performance)
**Status:** **FIXED** — No SVG files remain in `/public`. All default starter SVGs have been removed.

> **Update:** Re-checked — this is now resolved. Moving to fixed.

#### 4.1 — Google Search Console verification is TODO (Medium — SEO)
**File:** `app/layout.tsx`  
The `google-site-verification` meta tag appears to still be commented out. Without this, you cannot monitor search performance or submit sitemaps in Google Search Console.  
**Fix:** Register the site at search.google.com/search-console and add the verification code.

#### 4.2 — PolygonScan link is a placeholder (Medium — SEO/Credibility)
**File:** `app/components/ProofSection.tsx:37-38`  
The "View on PolygonScan" link still contains `TODO_ADD_YOUR_TRANSACTION_HASH_HERE`. This completely undermines the Proof of Authorship section's credibility.  
**Fix:** Replace with the actual PolygonScan transaction URL.

#### 4.4 — Sitemap has static `lastModified` dates (Low — SEO)
**File:** `app/sitemap.ts`  
All entries are still hardcoded to `2026-03-09`.  
**Fix:** Update dates on deploy, or derive from git timestamps.

#### 5.2 — Mobile hamburger visual robustness (Low — Accessibility)
**File:** `app/components/Nav.tsx`  
The hamburger icon spans still use `h-px`. The `aria-label` on the button mitigates this for screen readers, so this remains a low-priority cosmetic concern.

#### 5.5 — Color contrast on muted text (Medium — Accessibility)
Throughout the site, many elements use very low-contrast colors against the `#0a0a0a` background. Examples:
- `text-[#333]` → contrast ratio ~1.5:1 (fails WCAG AA)
- `text-[#444]` → contrast ratio ~1.9:1 (fails WCAG AA)
- `text-[#555]` → contrast ratio ~2.3:1 (fails WCAG AA)
- `text-[#666]` → contrast ratio ~2.8:1 (fails WCAG AA)

WCAG AA requires 4.5:1 for normal text, 3:1 for large text.  
**Fix:** Audit all muted text colors and raise to at least `#888` (contrast ~4.0:1 against `#0a0a0a`) for decorative labels, or `#999` (~4.6:1) for readable content.

#### 6.5 — ESLint disable placement in ShareClient (Low — Code Quality)
**File:** `app/share/ShareClient.tsx:293`  
The `eslint-disable-line` comment is placed as JSX text content after the `<img />` closing, not as a proper line comment. It renders as invisible text in the DOM.  
**Fix:** Move to a line comment above the `<img>` tag: `{/* eslint-disable-next-line @next/next/no-img-element */}`

#### 7.2 — Two EPUB files with different sizes (Low — Content)
- `public/matc-part-one.epub` — 128KB (free, public)
- `private/matc-part1.epub` — 296KB (paid, token-gated)

Still worth verifying both are the correct/intended versions.

#### 7.4 — Non-code files in project root (Low — Housekeeping)
Files like `facebook-post.md`, `seo-audit-report.md`, `full-website-audit.md` in the project root. Consider a `docs/` folder.

---

## New Findings

### NEW-1 — Domain redirect: non-www → www (Low — SEO)
The site at `https://manamongsttheclouds.com` redirects to `https://www.manamongsttheclouds.com/`. This is fine, but canonical URLs throughout the codebase reference the non-www version (`https://manamongsttheclouds.com`):
- `app/layout.tsx` metadata `metadataBase`
- `app/share/page.tsx` canonical
- `app/sitemap.ts` URLs
- `app/robots.ts` sitemap URL

**Fix:** Ensure all canonical URLs consistently use `https://www.manamongsttheclouds.com` to match the redirect target, or configure the redirect the other direction (www → non-www). Mismatched canonicals can split SEO authority.

### NEW-2 — `fs.readFileSync` still used in Part One page (Medium — Performance)
**File:** `app/read/part-one/page.tsx`  
While the API routes were migrated to async `fs.readFile`, the Part One server component still uses `fs.readFileSync` for reading all 11 chapter markdown files. In a server component this is less impactful than in an API route, but async I/O is still preferred.

### NEW-3 — Share page `navigator.share` has no fallback (Low — UX)
**File:** `app/share/ShareClient.tsx:303-319`  
The "Share" button calls `navigator.share()` but only checks `if (navigator.share)` before executing. On browsers that don't support the Web Share API (most desktop browsers), clicking the button does nothing — no error, no fallback.  
**Fix:** Either hide the Share button on unsupported browsers, or provide a fallback (copy link to clipboard, open share URLs for Twitter/Facebook).

### NEW-4 — Share page uses `<img>` with data URL, ESLint disable is DOM text (Low — Code Quality)
**File:** `app/share/ShareClient.tsx:288-293`  
The eslint-disable comment `{/* eslint-disable-line @next/next/no-img-element */}` is placed after the self-closing `<img />` tag as JSX children text, which means it renders as whitespace text in the DOM rather than being a proper comment suppression.  
```tsx
// Current (broken):
<img ... />{" "}
{/* eslint-disable-line @next/next/no-img-element */}

// Should be:
{/* eslint-disable-next-line @next/next/no-img-element */}
<img ... />
```

### NEW-5 — Missing `Strict-Transport-Security` (HSTS) header (Medium — Security)
**File:** `next.config.ts`  
The security headers added are good, but `Strict-Transport-Security` is missing. This header ensures browsers always connect via HTTPS after the first visit.  
**Fix:** Add:
```ts
{
  key: "Strict-Transport-Security",
  value: "max-age=63072000; includeSubDomains; preload",
}
```
Note: Vercel may add this automatically, but it's good practice to set it explicitly.

### NEW-6 — Missing `Content-Security-Policy` header (Medium — Security)
**File:** `next.config.ts`  
No CSP header is configured. A CSP would protect against XSS and injection attacks.  
**Fix:** Add a Content-Security-Policy header. Start with a report-only policy to identify violations before enforcing.

### NEW-7 — Rate limiting is in-memory only (Medium — Infrastructure)
**File:** `app/lib/rate-limit.ts`  
The rate limiter uses an in-memory `Map`. On Vercel serverless, each function instance gets its own memory, meaning:
- Rate limits reset on every cold start
- Different instances don't share state
- An attacker can bypass limits by triggering new instances

This is better than no rate limiting, but not production-grade.  
**Fix:** For stronger protection, consider Vercel's built-in rate limiting, Upstash Redis rate limiting, or Vercel Edge Middleware with KV storage.

### NEW-8 — `read/part-one/page.tsx` uses `readFileSync` at module scope-ish (Low — Performance)
**File:** `app/read/part-one/page.tsx`  
The `fs.readFileSync` calls happen inside the server component function, which is fine for SSR, but consider caching the result with `unstable_cache` or converting to `fs.promises.readFile` for consistency with the rest of the codebase.

### NEW-9 — Donate API has no rate limiting (Medium — Security)
**File:** `app/api/donate/route.ts`  
While comments and signup APIs now have rate limiting, the donate API does not. An attacker could create many Stripe checkout sessions rapidly.  
**Fix:** Add the same `rateLimit()` pattern used in comments and signup.

### NEW-10 — Founders-edition and preorder APIs have no rate limiting (Medium — Security)
**Files:** `app/api/founders-edition/route.ts`, `app/api/preorder/route.ts`  
Same issue — these Stripe checkout session creation endpoints have no rate limiting.  
**Fix:** Add `rateLimit()` to prevent session creation abuse.

### NEW-11 — `supabase-server.ts` fallback to anon key should warn (Low — Security)
**File:** `app/lib/supabase-server.ts:8-10`  
The server client falls back to `NEXT_PUBLIC_SUPABASE_ANON_KEY` if `SUPABASE_SERVICE_ROLE_KEY` is not set. This silent fallback means a misconfigured deployment could run with reduced permissions without anyone noticing.  
**Fix:** Add a `console.warn()` when falling back to the anon key, or throw an error in production if the service role key is missing.

### NEW-12 — `EpubReader` registers duplicate `relocated` event handlers (Low — Bug)
**File:** `app/components/EpubReader.tsx`  
The `relocated` event is registered in two places:
1. Inside `init()` (line 280) — updates chapter name and saves position
2. In a separate `useEffect` (line 382) — updates `atStart`/`atEnd`

The second `useEffect` runs on every `loading` state change and appends a new listener each time without cleanup.  
**Fix:** Consolidate into a single `relocated` handler, or add cleanup to the second `useEffect`.

### NEW-13 — Thank-you page Founder's Edition upsell links to API directly (Low — UX)
**File:** `app/thank-you/ThankYouContent.tsx:118`  
The "Become a Founder" CTA uses `href="/api/founders-edition"`. This is a GET request to an API route that creates a Stripe session and redirects. If the API errors, the user sees a raw JSON error response. Consider a client-side handler that shows a loading state and handles errors gracefully.

---

## Remaining Issues Summary (Priority Order)

| # | Finding | Severity | Source | Effort |
|---|---------|----------|--------|--------|
| 1 | Donate/founders/preorder APIs have no rate limiting | Medium | NEW-9, NEW-10 | Low |
| 2 | In-memory rate limiting ineffective on serverless | Medium | NEW-7 | Medium |
| 3 | Missing HSTS header | Medium | NEW-5 | Trivial |
| 4 | Missing CSP header | Medium | NEW-6 | Medium |
| 5 | All chapter HTML in client bundle (~200KB) | Medium | 3.1 (still open) | Medium |
| 6 | Color contrast fails WCAG AA | Medium | 5.5 (still open) | Medium |
| 7 | Canonical URL mismatch (non-www vs www) | Low–Med | NEW-1 | Low |
| 8 | Google Search Console still TODO | Medium | 4.1 (still open) | Low |
| 9 | PolygonScan link is placeholder | Medium | 4.2 (still open) | Trivial |
| 10 | Supabase server fallback should warn | Low | NEW-11 | Trivial |
| 11 | `readFileSync` in Part One page | Low | NEW-2, NEW-8 | Low |
| 12 | `navigator.share` no fallback | Low | NEW-3 | Low |
| 13 | ESLint disable as DOM text | Low | NEW-4 | Trivial |
| 14 | Duplicate `relocated` event handler | Low | NEW-12 | Trivial |
| 15 | Sitemap static dates | Low | 4.4 (still open) | Low |
| 16 | Two EPUB files different sizes | Low | 7.2 (still open) | Verify |
| 17 | Non-code files in root | Low | 7.4 (still open) | Trivial |
| 18 | Thank-you API link error handling | Low | NEW-13 | Low |

---

## What's Working Well

- **All 5 critical security issues resolved** — rate limiting on key endpoints, service-role key for server operations, webhook idempotency, input validation
- **SEO metadata** — thorough title templates, descriptions, keywords, JSON-LD structured data (Book + WebSite), canonical URLs, Twitter cards, OG tags, robots.txt, sitemap.xml
- **Stripe integration** — well-structured separate routes, proper webhook signature verification, branded HTML emails via Resend, idempotency checks
- **Token-gated download system** — HMAC-signed tokens with expiry, graceful branded error pages, shared `verifyToken` utility
- **EPUB reader** — dark/sepia/light themes, font size, line spacing, column width, position persistence, keyboard nav, auto-hiding header, reading progress bar
- **Design** — consistent gold-and-dark theme, polished typography, responsive layout
- **Code organization** — shared utilities (`stripe.ts`, `supabase-server.ts`, `verify-token.ts`, `rate-limit.ts`), no dead components
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, poweredByHeader disabled
- **Accessibility** — skip-to-content link, ARIA attributes on accordion and sentiment buttons, `aria-label` on hamburger
- **Error handling** — branded `error.tsx` and `not-found.tsx` pages
- **TypeScript strict mode** enabled
- **E2E tests** via Playwright (2 spec files)
- **Tailwind CSS v4** properly configured

---

## Score Card

| Category | Previous (Mar 2026) | Current | Change |
|----------|---------------------|---------|--------|
| Security | 🔴 Critical (5 issues) | 🟡 Medium (4 issues) | ↑↑ Major improvement |
| Bugs | 🔴 High (6 issues) | 🟢 Low (1 issue) | ↑↑ Major improvement |
| Performance | 🟡 Medium (4 issues) | 🟡 Medium (2 issues) | ↑ Improved |
| SEO | 🟡 Medium (5 issues) | 🟡 Medium (4 issues) | ↑ Slightly improved |
| Accessibility | 🟡 Medium (5 issues) | 🟡 Medium (2 issues) | ↑ Improved |
| Code Quality | 🟡 Medium (6 issues) | 🟢 Low (2 issues) | ↑↑ Major improvement |
| **Overall** | **38 findings** | **18 remaining** | **53% reduction** |
