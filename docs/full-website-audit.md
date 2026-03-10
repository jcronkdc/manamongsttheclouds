# Full Website Audit — Man Amongst the Clouds

**Date:** March 10, 2026  
**Stack:** Next.js 16.1.6, React 19, Tailwind CSS 4, Supabase, Stripe, Resend, Vercel  
**Auditor:** Cascade  

---

## Executive Summary

The website is well-built for a literary book launch — clean design, solid SEO foundations, functional Stripe payment flows, and a polished reading experience. The codebase is organized, type-safe, and deploys cleanly to Vercel.

Below is a categorized audit covering **38 findings** across security, bugs, performance, SEO, accessibility, code quality, and dead code.

---

## 1. CRITICAL — Security Issues

### 1.1 Comments API has no rate limiting
**File:** `app/api/comments/route.ts`  
**Risk:** The POST endpoint has no rate limiting, CAPTCHA, or IP throttling. A bot could flood the `reader_comments` table with thousands of entries in seconds.  
**Fix:** Add rate limiting via Vercel Edge Middleware or an in-memory token bucket. At minimum, add a simple honeypot field or timestamp-based check.

### 1.2 Signup API has no rate limiting
**File:** `app/api/signup/route.ts`  
**Risk:** Same as above — the email signup endpoint is open to abuse. An attacker could stuff the `email_signups` table or use it to validate email addresses.  
**Fix:** Same approach — rate limit, honeypot, or CAPTCHA.

### 1.3 Supabase client uses anon key on server-side routes
**File:** `app/lib/supabase.ts`  
**Risk:** The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used for all server-side operations (comments insert, signup insert, founders_orders insert, preorders insert). This key is exposed in the browser bundle. If Supabase RLS policies are not properly configured, any client could directly write to these tables.  
**Fix:** Create a separate **service-role** Supabase client (non-public env var `SUPABASE_SERVICE_ROLE_KEY`) for server-side API routes. Keep the anon-key client only if you need client-side Supabase access.

### 1.4 Webhook route lacks idempotency check
**File:** `app/api/webhook/route.ts`  
**Risk:** If Stripe retries a webhook (which it will on timeouts), the same `checkout.session.completed` event could trigger duplicate database inserts and duplicate emails. The `founders_orders` and `preorders` inserts don't check for existing `stripe_session_id`.  
**Fix:** Add a `UNIQUE` constraint on `stripe_session_id` in the database tables, or check for existing records before inserting. Use the Stripe event ID for idempotency.

### 1.5 Donate API amount validation allows negative edge case
**File:** `app/api/donate/route.ts:22-25`  
**Risk:** `parseInt(amountParam || "10", 10)` will return `NaN` for non-numeric strings. `NaN < 1` is `false` and `NaN > 999` is also `false`, so it passes validation and creates a Stripe session with `NaN * 100` cents.  
**Fix:** Add explicit `isNaN()` check after parseInt.

---

## 2. HIGH — Bugs & Functional Issues

### 2.1 Excerpt "Keep Reading" links to Stripe Payment Link, not free reader
**File:** `app/components/Excerpt.tsx:69`  
The CTA says "Keep Reading — $2.99" and links to `https://buy.stripe.com/00wfZa2iicjlfzl3387AI0g`. But Part One is free to read at `/read/part-one`. This is **misleading** — the excerpt IS from Part One, which is free. Users clicking this will pay $2.99 for content they can read for free.  
**Fix:** Either change the CTA to link to `/read/part-one` (with a "Read Free" label), or make it clear that the $2.99 is for the EPUB download, not for continuing to read.

### 2.2 Duplicate `verifyToken` function
**Files:** `app/api/book/[token]/route.ts` and `app/api/download/[token]/route.ts`  
The exact same `verifyToken()` function is copy-pasted in both files (lines 8-38 in each).  
**Fix:** Extract to a shared utility, e.g., `app/lib/verify-token.ts`.

### 2.3 Synchronous file I/O in API routes
**Files:** `app/api/book/[token]/route.ts:57`, `app/api/download/[token]/route.ts:81`  
`fs.readFileSync` blocks the Node.js event loop during file reads. The EPUB is ~296KB, which is manageable, but this could cause issues under concurrent requests.  
**Fix:** Use `fs.promises.readFile` (async) instead.

### 2.4 `opengraph-image.tsx` referenced but path may not match metadata
**File:** `app/read/part-one/page.tsx:16`  
The metadata references `"/read/part-one/opengraph-image"` but there is no `opengraph-image.tsx` file in the `app/read/part-one/` directory. This will 404.  
**Fix:** Either create `app/read/part-one/opengraph-image.tsx` or point the OG image to the root-level one.

### 2.5 `chapter` field shows "0" for Prologue feedback header
**File:** `app/read/part-one/PartOneReader.tsx:184`  
The comment form header uses `chapter ? \`Chapter ${chapter}\` Feedback : "General Discussion"`. For the Prologue (chapter=0), `0` is falsy, so it shows "General Discussion" instead of "Prologue Feedback".  
**Fix:** Use `chapter !== null` instead of the truthiness check.

### 2.6 `ReadSection` stats inconsistency
**File:** `app/components/ReadSection.tsx:61-63`  
Shows "11 Chapters" but there are 10 chapters + 1 prologue. The stat grid shows `{ num: "11", label: "Chapters" }` and separately `{ num: "1", label: "Prologue" }`. This implies 12 total items when there are 11. Consider labeling it "10 Chapters" alongside "1 Prologue", or "11 Chapters (incl. Prologue)".

---

## 3. MEDIUM — Performance Issues

### 3.1 All 11 chapter HTML payloads are serialized into the client bundle
**File:** `app/read/part-one/page.tsx:86-103`  
The server component reads all 11 markdown files, converts them to HTML, and passes the full HTML content as props to the client component `PartOneReader`. This means ~200KB+ of raw HTML is embedded in the initial page payload. Only one chapter is visible at a time.  
**Fix:** Consider lazy-loading chapter content via API routes or using React Server Components with streaming. At minimum, only send the first chapter on initial load.

### 3.2 No `next/image` optimization on cover image
**File:** `app/components/ReadSection.tsx:23-30`  
The cover image uses `next/image` correctly (good), but with `priority` set — which is fine for above-the-fold. However, the image is 66KB JPEG with no `sizes` prop, so Next.js may generate overly large srcsets.  
**Fix:** Add a `sizes` prop, e.g., `sizes="280px"`.

### 3.3 Unused default Next.js SVGs in `/public`
**Files:** `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`  
These are the default Next.js starter files and are not referenced anywhere in the codebase.  
**Fix:** Delete them to reduce deploy size and avoid confusion.

### 3.4 `next.config.ts` is empty
**File:** `next.config.ts`  
No custom configuration at all. Missing potential optimizations:  
- No security headers configured
- No image domain allowlist
- No `poweredByHeader: false`  
**Fix:** Add security headers and disable the `X-Powered-By` header at minimum.

---

## 4. MEDIUM — SEO Issues

### 4.1 Google Search Console verification is TODO
**File:** `app/layout.tsx:104-105`  
The `google-site-verification` meta tag is commented out with a TODO. Without this, you can't monitor search performance or submit sitemaps in Google Search Console.  
**Fix:** Register the site and add the verification code.

### 4.2 PolygonScan link points to homepage, not the actual transaction
**File:** `app/components/ProofSection.tsx:37-38`  
The "View on PolygonScan" button links to `https://polygonscan.com` (the homepage) instead of the actual transaction URL. This undermines the credibility of the blockchain proof claim.  
**Fix:** Link to the specific transaction hash on PolygonScan.

### 4.3 OG image references `/og-image.png` (static) but actual OG image is dynamically generated
**File:** `app/layout.tsx:79`  
The metadata references `/og-image.png` as a static file, but the actual OG image is generated by `app/opengraph-image.tsx`. Next.js auto-routes the generated image as `/opengraph-image`, not `/og-image.png`. The static file `/og-image.png` doesn't exist in `/public`.  
**Fix:** Either remove the hardcoded `images` array from the `openGraph` metadata (Next.js will auto-discover the `opengraph-image.tsx` file), or generate a static `/og-image.png` and keep the reference.

### 4.4 Sitemap has static `lastModified` dates
**File:** `app/sitemap.ts`  
All entries are hardcoded to `2026-03-09`. As content changes, the sitemap won't reflect actual modification dates.  
**Fix:** Either update manually on each deploy or derive from git commit timestamps.

### 4.5 Missing `<meta name="viewport">` on inline HTML pages
**Files:** `app/api/download/[token]/route.ts:55-62` (error page)  
The error HTML response (`status: 410`) doesn't include a viewport meta tag, making it render poorly on mobile.  
**Fix:** Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to the error HTML template.

---

## 5. MEDIUM — Accessibility Issues

### 5.1 No skip-to-content link
**File:** `app/layout.tsx`  
The root layout has no skip navigation link for keyboard/screen reader users.  
**Fix:** Add a visually-hidden "Skip to content" link at the top of `<body>`.

### 5.2 Mobile hamburger spans have no visible dimensions for screen readers
**File:** `app/components/Nav.tsx:67-75`  
The three `<span>` elements that form the hamburger icon have `h-px` (1px height) and no width specified, relying on flexbox. While the parent `<button>` has an `aria-label` (good), the visual representation could be more robust.  

### 5.3 Comment sentiment buttons lack `aria-label` or `aria-pressed`
**File:** `app/read/part-one/PartOneReader.tsx:242-253`  
The sentiment pill buttons (❤️ I liked this, ❓ Confusing, etc.) don't indicate their pressed state to screen readers.  
**Fix:** Add `aria-pressed={commentSentiment === s.value}` to each button.

### 5.4 Chapter accordion has no ARIA attributes
**File:** `app/read/part-one/PartOneReader.tsx:377-401`  
The chapter toggle buttons don't use `aria-expanded`, `aria-controls`, or proper landmark roles.  
**Fix:** Add `aria-expanded={isOpen}` to the toggle button and `role="region"` + `id` to the content panel.

### 5.5 Color contrast on muted text
Throughout the site, many text elements use very low contrast colors (e.g., `text-[#444]`, `text-[#333]`, `text-[#555]`) against the `#0a0a0a` background. These fail WCAG AA contrast requirements (4.5:1 for normal text).  
**Fix:** Audit all text colors and ensure minimum 4.5:1 contrast ratio. `#555` on `#0a0a0a` is only ~2.3:1.

---

## 6. LOW — Code Quality & Maintenance

### 6.1 Six unused components (dead code)
These components are **not imported anywhere** in the current routing:
- `app/components/AuthorBios.tsx` (151 lines)
- `app/components/BooksSection.tsx` (20 lines)
- `app/components/CarterBook.tsx` (60 lines)
- `app/components/JustinBook.tsx` (244 lines)
- `app/components/SFPHero.tsx` (42 lines)
- `app/components/SFPFooter.tsx` (39 lines)

These appear to be remnants of a Stillfire Press parent site design. They duplicate content that already exists in active components (magic system grid, characters, author bio, etc.).  
**Fix:** Remove or move to a separate `_archive` folder if you want to keep them for reference.

### 6.2 `EpubReader.tsx` is 776 lines — consider splitting
**File:** `app/components/EpubReader.tsx`  
This is the largest component. The theme definitions, preference helpers, and settings panel could each be extracted into separate modules for maintainability.

### 6.3 Duplicate Stripe client instantiation pattern
**Files:** `app/api/donate/route.ts`, `app/api/founders-edition/route.ts`, `app/api/preorder/route.ts`, `app/api/webhook/route.ts`  
Each file has its own `getStripe()` factory function. This should be a shared utility.  
**Fix:** Create `app/lib/stripe.ts` with a shared `getStripe()` export.

### 6.4 CSS theme variable mismatch
**File:** `app/globals.css:12-13`  
```css
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
```
These reference Geist fonts, but the app actually loads `Inter` and `Cormorant Garamond` (see `layout.tsx:5-15`). The `--font-sans` should reference `var(--font-inter)` or just be removed since the app uses `--font-sans` and `--font-serif` from the font loader variables.  
**Fix:** Update to match the actually loaded fonts, or remove the conflicting overrides.

### 6.5 `eslint-disable` comment for `no-img-element` in ShareClient
**File:** `app/share/ShareClient.tsx:293`  
The `<img>` tag is used for a dynamically generated data URL (canvas export), so `next/image` can't be used here. The eslint disable is correct but the comment is placed as JSX text after the `/>` close.  
**Fix:** Move the eslint-disable to a line comment above the `<img>` tag.

### 6.6 `package.json` name is generic
**File:** `package.json:2`  
`"name": "website"` — not descriptive. Consider `"name": "man-amongst-the-clouds"` for clarity in logs and error reports.

---

## 7. LOW — Miscellaneous

### 7.1 `.DS_Store` files are committed / present
**Files:** Root `.DS_Store`, `app/.DS_Store`, `public/.DS_Store`  
These are macOS artifacts. While `.gitignore` covers `.DS_Store`, they exist in the working directory.  
**Fix:** Already gitignored — no action needed unless they snuck into git history.

### 7.2 Two EPUB files exist with different sizes
- `public/matc-part-one.epub` — 128KB (free download, served publicly)
- `private/matc-part1.epub` — 296KB (paid download, served via token-gated API)

The public one is significantly smaller (less than half). Ensure both are the correct/intended versions of Part One.

### 7.3 Playwright tests reference port 3001
**File:** `playwright.config.ts:8`  
Tests use `baseURL: "http://localhost:3001"` which differs from the default dev port (3000). This is fine but worth documenting.

### 7.4 `facebook-post.md` and `seo-audit-report.md` at root level
Non-code files in the project root. Consider moving to a `docs/` or `marketing/` folder.

### 7.5 Missing error boundary
No global `error.tsx` or `not-found.tsx` in the `app/` directory. Users hitting a broken page or invalid URL will see the default Next.js error page.  
**Fix:** Add `app/error.tsx` and `app/not-found.tsx` with branded error pages.

---

## 8. Recommendations Summary (Priority Order)

| # | Finding | Severity | Effort |
|---|---------|----------|--------|
| 1 | Add rate limiting to comments + signup APIs | Critical | Medium |
| 2 | Use service-role Supabase key for server routes | Critical | Low |
| 3 | Add webhook idempotency check | Critical | Low |
| 4 | Fix donate API NaN validation | Critical | Trivial |
| 5 | Fix Excerpt CTA (links to paid for free content) | High | Trivial |
| 6 | Fix OG image reference mismatch | High | Low |
| 7 | Add missing opengraph-image for /read/part-one | High | Low |
| 8 | Fix Prologue feedback header (falsy 0) | High | Trivial |
| 9 | Add security headers in next.config.ts | Medium | Low |
| 10 | Add error.tsx and not-found.tsx | Medium | Low |
| 11 | Fix PolygonScan link to actual transaction | Medium | Trivial |
| 12 | Register Google Search Console | Medium | Low |
| 13 | Add ARIA attributes to chapter accordion | Medium | Low |
| 14 | Fix CSS font variable mismatch | Medium | Trivial |
| 15 | Extract shared verifyToken utility | Low | Low |
| 16 | Extract shared Stripe client | Low | Low |
| 17 | Remove 6 unused components | Low | Trivial |
| 18 | Delete unused public SVGs | Low | Trivial |
| 19 | Add viewport meta to inline error HTML | Low | Trivial |
| 20 | Add skip-to-content link | Low | Trivial |

---

## What's Working Well

- **SEO metadata** is thorough — title templates, descriptions, keywords, JSON-LD structured data (Book + WebSite), canonical URLs, Twitter cards, OG tags, robots.txt, sitemap.xml
- **Stripe integration** is well-structured — separate routes for each product type, proper webhook signature verification, branded HTML emails via Resend
- **Token-gated download system** is solid — HMAC-signed tokens with expiry, graceful error pages
- **EPUB reader** is feature-rich — dark/sepia/light themes, font size control, line spacing, column width, reading position persistence, keyboard navigation, auto-hiding header
- **Design** is consistent and polished — the gold-and-dark theme is maintained across all pages
- **Content structure** is clean — markdown chapters, server-side rendering, proper separation of concerns
- **TypeScript strict mode** is enabled
- **E2E tests** exist via Playwright
- **Tailwind CSS v4** with PostCSS is properly configured
