# SEO Audit Report — Man Amongst the Clouds

**Site:** https://manamongsttheclouds.com  
**Framework:** Next.js 16.1.6 (App Router) on Vercel  
**Date:** March 10, 2026  

---

## Overall Score: B+

The site has a strong metadata foundation, structured data, and solid keyword strategy. The issues below range from quick wins to moderate-effort fixes that could meaningfully improve search visibility.

---

## 🟢 What's Working Well

### Metadata (layout.tsx)
- **Title tag** is excellent — includes book title, genre label, and author name
- **Meta description** is rich with keywords, comp titles, and word count (322 chars — slightly long but acceptable for Google's expanded snippets)
- **Keywords array** is comprehensive (35 keywords) covering genre, comp authors, magic system, and unique differentiators like "blockchain verified novel"
- **`metadataBase`** is set correctly to `https://manamongsttheclouds.com`
- **Title template** (`%s | Man Amongst the Clouds`) is properly configured for sub-pages

### Open Graph & Twitter Cards
- OG tags include title, description, site name, locale, type, and a 1200×630 image
- Twitter card is `summary_large_image` with distinct, shorter copy — good practice
- Dynamic OG image generation via `opengraph-image.tsx` at both root and `/read/part-one` — very well done

### Structured Data (JSON-LD)
- **Book schema** with author, publisher, offers, genre, and `sameAs` links
- **WebSite schema** with `ReadAction` potentialAction
- Both injected in `<head>` via `dangerouslySetInnerHTML` — correct approach

### Technical SEO
- **`robots.ts`** properly configured — allows all, disallows `/download/`, references sitemap
- **`sitemap.ts`** exists with correct base URL
- **Canonical URL** set in metadata AND in a `<link>` tag
- **`lang="en"`** on `<html>` element
- **Google Fonts** loaded via `next/font/google` — optimal for performance (self-hosted, no CLS)
- **Clean URL structure**: `/`, `/read/part-one`, `/share`, `/thank-you`

### Content & On-Page
- Rich, keyword-laden prose throughout all sections
- Excellent heading hierarchy on the homepage (h1 → h2 → h3)
- Good use of `<section>` elements with `id` attributes for anchor linking
- `<article>` tags used for character cards
- Mobile-responsive navigation with `aria-label` on the hamburger button

---

## 🔴 Critical Issues

### 1. Google Site Verification Placeholder
**File:** `app/layout.tsx:105`  
```
"google-site-verification": "REPLACE_WITH_GOOGLE_VERIFICATION_CODE"
```
**Impact:** Google Search Console won't verify your site. You cannot submit sitemaps, monitor indexing, or see search performance data.  
**Fix:** Register at [Google Search Console](https://search.google.com/search-console), get your verification code, and replace the placeholder.

### 2. Empty ISBN in Book Schema
**File:** `app/layout.tsx:119`  
```
isbn: "",
```
**Impact:** Google's Book rich result requires a valid ISBN. An empty string may cause schema validation warnings and prevent rich snippets.  
**Fix:** Add the ISBN if you have one, or remove the `isbn` field entirely if self-published without one.

### 3. `aggregateRating: undefined` in JSON-LD
**File:** `app/layout.tsx:145`  
```
aggregateRating: undefined,
```
**Impact:** `JSON.stringify` will strip `undefined`, so this is harmless *now*, but it's a code smell. If this ever becomes `null` or `{}`, it would produce invalid schema.  
**Fix:** Remove the line entirely.

### 4. `/read/part-one` Missing from Sitemap
**File:** `app/sitemap.ts`  
This is your highest-value content page (free reader + 10 chapters of indexable text) and it's **not in the sitemap**.  
**Fix:** Add it:
```ts
{
  url: `${base}/read/part-one`,
  lastModified: new Date("2026-03-09"),
  changeFrequency: "weekly",
  priority: 0.9,
},
```

### 5. `/share` Page is Entirely Client-Rendered (`"use client"`)
**File:** `app/share/page.tsx:1`  
The entire page is a client component with no server metadata export. This means:
- No `<title>` or `<meta description>` specific to `/share`
- No OG tags for the share page
- Google will see minimal content (just the JS bundle)

**Fix:** Extract metadata into a server-side wrapper:
```tsx
// app/share/layout.tsx or refactor page.tsx
export const metadata: Metadata = {
  title: "Share a Passage",
  description: "Generate beautiful quote cards from Man Amongst the Clouds and share them on social media.",
};
```

### 6. `/thank-you` Page Has No Metadata
**File:** `app/thank-you/page.tsx`  
No `metadata` export. While this page is post-purchase and less SEO-critical, it should still have:
- A `title` (for browser tabs and bookmarks)
- `robots: { index: false }` to prevent thin-content indexing

---

## 🟡 Moderate Issues

### 7. Duplicate Canonical Tag
**File:** `app/layout.tsx:69` and `app/layout.tsx:182`  
The canonical URL is declared twice:
- In the `metadata` object via `alternates: { canonical: url }`
- As a manual `<link rel="canonical" href={url} />` in the `<head>`

Next.js's metadata API already generates the canonical link tag. The manual one is redundant and sets the canonical to the homepage URL on **every** page (including `/share`, `/read/part-one`, etc.), which tells Google all pages are duplicates of the homepage.  
**Fix:** Remove line 182 (`<link rel="canonical" href={url} />`). Let the metadata API handle it per-page.

### 8. No Per-Page Canonical on Sub-Pages
Related to above — `/read/part-one` and `/share` don't declare their own canonical URLs. Once you remove the hardcoded canonical from layout, add per-page canonicals:
```tsx
// In each page's metadata export
alternates: { canonical: "https://manamongsttheclouds.com/read/part-one" },
```

### 9. No `<img>` / `next/image` Usage — Zero Images on the Site
The entire site has **no images** in the rendered HTML (except the client-side canvas-generated share card). The cover image (`cover-part-one.jpg`) is only used inside the OG image generator.  
**Impact:** No image search traffic. No visual content for Google to index. Missing engagement signals.  
**Fix:** Add the book cover to the homepage (Hero or ReadSection) using `next/image` with proper `alt` text:
```tsx
import Image from "next/image";
<Image
  src="/cover-part-one.jpg"
  alt="Man Amongst the Clouds Part One: The Still Water — book cover"
  width={320}
  height={414}
  priority
/>
```

### 10. `ProofSection` Missing `id="proof"`
**File:** `app/components/ProofSection.tsx:3`  
The Nav links to `#proof` but the section doesn't have `id="proof"`:
```tsx
<section className="py-20 sm:py-24 px-5 sm:px-6 bg-[#0f0f0f]">
```
**Fix:** Add `id="proof"` to the section element. (This is a UX bug but also an SEO issue — broken anchor links reduce internal link equity.)

### 11. External Links Missing `rel="noopener"` Consistency
Most external links correctly use `rel="noopener noreferrer"`, but the Stripe checkout links (`buy.stripe.com`) in `Hero.tsx:78-83` and `Excerpt.tsx:69` use regular `<a>` tags without `target="_blank"` / `rel` attributes inconsistently. Standardize for security and SEO signal clarity.

---

## 🔵 Opportunities

### 12. Add a Blog or News Section
A `/blog` or `/updates` route with posts about the writing process, world-building, character deep-dives, and release updates would:
- Generate long-tail keyword traffic
- Provide fresh content signals to Google
- Create internal linking opportunities
- Feed social media sharing

### 13. Add `FAQPage` Schema
You have implicit FAQ content (what is the book about, how does the magic system work, when does the full novel release). Wrapping this in `FAQPage` JSON-LD can earn rich snippets in search results.

### 14. Add `BreadcrumbList` Schema for `/read/part-one`
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manamongsttheclouds.com" },
    { "@type": "ListItem", "position": 2, "name": "Read Part One", "item": "https://manamongsttheclouds.com/read/part-one" }
  ]
}
```

### 15. Performance: Add `loading="lazy"` / Priority Hints
When you add images (recommendation #9), use `priority` on above-the-fold images and `loading="lazy"` on below-the-fold ones.

### 16. Consider `<meta name="author">` Tag
While you have `authors` in the metadata object, explicitly adding a visible author attribution in structured form helps with E-E-A-T signals.

### 17. Social Profile Links in Author Schema
The `sameAs` array in the Book schema references Stillfire Press and Facebook, but consider adding:
- A personal author website/bio page
- Goodreads author page (when available)
- Any other social profiles

### 18. `/read/[token]` Route — Add `noindex`
This dynamic route for authenticated readers should have `robots: { index: false }` to prevent token-based URLs from being indexed.

---

## Priority Action List

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 1 | Google Search Console verification | 5 min | **Critical** |
| 4 | Add `/read/part-one` to sitemap | 2 min | **High** |
| 7 | Remove duplicate hardcoded canonical | 1 min | **High** |
| 5 | Add metadata to `/share` page | 10 min | **High** |
| 9 | Add book cover image to homepage | 15 min | **High** |
| 10 | Add `id="proof"` to ProofSection | 1 min | **Medium** |
| 2 | Fix empty ISBN / remove field | 1 min | **Medium** |
| 3 | Remove `aggregateRating: undefined` | 1 min | **Low** |
| 6 | Add metadata + noindex to `/thank-you` | 5 min | **Medium** |
| 8 | Add per-page canonicals | 10 min | **Medium** |
| 18 | Add noindex to `/read/[token]` | 2 min | **Medium** |
| 12 | Blog/updates section | Hours | **High (long-term)** |

---

*Generated by SEO audit of the codebase. Validate structured data at https://search.google.com/test/rich-results after deploying fixes.*
