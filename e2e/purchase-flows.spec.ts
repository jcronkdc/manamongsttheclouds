import { test, expect } from "@playwright/test";

test.describe("Homepage — Purchase CTAs & Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  /* ------------------------------------------------------------------ */
  /*  Hero section                                                       */
  /* ------------------------------------------------------------------ */

  test("hero has 'Read Part One Free' as primary CTA", async ({ page }) => {
    const cta = page.locator('a[href="/read/part-one"]', {
      hasText: "Read Part One Free",
    });
    await expect(cta).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Navigation                                                         */
  /* ------------------------------------------------------------------ */

  test("nav includes 'Read Free' link", async ({ page }) => {
    await expect(
      page.locator('nav a[href="/read/part-one"]', { hasText: "Read Free" }),
    ).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  ReadSection — Free reading card                                    */
  /* ------------------------------------------------------------------ */

  test("ReadSection has free reading card", async ({ page }) => {
    const section = page.locator("#read");
    await expect(section.locator("text=Free for everyone")).toBeVisible();
    await expect(section.locator("text=Read Part One Online")).toBeVisible();
    await expect(
      section.locator("text=No account. No signup. No paywall."),
    ).toBeVisible();
    const startReading = section.locator('a[href="/read/part-one"]');
    await expect(startReading).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  ReadSection — Founder's Edition                                    */
  /* ------------------------------------------------------------------ */

  test("ReadSection has Founder's Edition card with correct details", async ({
    page,
  }) => {
    const section = page.locator("#read");
    await expect(section.locator("text=Founder\u2019s Edition")).toBeVisible();
    await expect(section.locator("text=The Complete Experience")).toBeVisible();
    await expect(
      section.locator("text=All 5 parts (EPUB) as they release"),
    ).toBeVisible();
    await expect(
      section.locator("text=Signed physical copy").first(),
    ).toBeVisible();
    await expect(
      section.locator("text=Full refund anytime, no questions asked").first(),
    ).toBeVisible();
    await expect(section.locator("text=$39.99")).toBeVisible();

    const founderBtn = section.locator('a[href="/api/founders-edition"]', {
      hasText: "Become a Founder",
    });
    await expect(founderBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  ReadSection — Part II pre-order                                    */
  /* ------------------------------------------------------------------ */

  test("ReadSection has Part II pre-order card", async ({ page }) => {
    const section = page.locator("#read");
    await expect(section.locator("text=Just want Part II?")).toBeVisible();
    const preorderBtn = section.locator('a[href="/api/preorder"]');
    await expect(preorderBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  ReadSection — Part structure pills                                 */
  /* ------------------------------------------------------------------ */

  test("Part II pill shows 'Pre-Order' label", async ({ page }) => {
    const section = page.locator("#read");
    await expect(section.locator("text=The Waking")).toBeVisible();
    // The small pre-order badge inside the Part II pill
    const pills = section.locator("text=Pre-Order");
    await expect(pills.first()).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  SignupSection — purchase CTAs                                      */
  /* ------------------------------------------------------------------ */

  test("SignupSection has Founder's Edition and Part II pre-order CTAs", async ({
    page,
  }) => {
    const section = page.locator("#signup");
    await expect(
      section.locator('a[href="/api/founders-edition"]', {
        hasText: "Become a Founder",
      }),
    ).toBeVisible();
    await expect(
      section.locator('a[href="/api/preorder"]', {
        hasText: /Pre-Order Part II/,
      }),
    ).toBeVisible();
  });
});

test.describe("Part One Reader — Purchase CTAs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/read/part-one");
  });

  test("Part Two signup section has pre-order CTA", async ({ page }) => {
    await expect(
      page.locator('a[href="/api/preorder"]', {
        hasText: /Pre-Order Part II/,
      }),
    ).toBeVisible();
  });

  test("Part Two signup section has Founder's Edition CTA", async ({
    page,
  }) => {
    await expect(
      page.locator('a[href="/api/founders-edition"]', {
        hasText: /Become a Founder/,
      }),
    ).toBeVisible();
  });
});

test.describe("API Routes — Checkout Redirects", () => {
  /* ------------------------------------------------------------------ */
  /*  Pre-order API                                                      */
  /* ------------------------------------------------------------------ */

  test("GET /api/preorder redirects to Stripe or fallback", async ({
    request,
  }) => {
    const res = await request.get("/api/preorder", {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(303);
    const location = res.headers()["location"];
    expect(
      location?.includes("checkout.stripe.com") || location?.includes("/"),
    ).toBeTruthy();
  });

  /* ------------------------------------------------------------------ */
  /*  Founder's Edition API                                              */
  /* ------------------------------------------------------------------ */

  test("GET /api/founders-edition redirects to Stripe or fallback", async ({
    request,
  }) => {
    const res = await request.get("/api/founders-edition", {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(303);
    const location = res.headers()["location"];
    expect(
      location?.includes("checkout.stripe.com") || location?.includes("/"),
    ).toBeTruthy();
  });
});

test.describe("Thank You Page — Variants", () => {
  /* ------------------------------------------------------------------ */
  /*  Default (Part I purchase)                                          */
  /* ------------------------------------------------------------------ */

  test("default thank-you page shows Part I download messaging", async ({
    page,
  }) => {
    await page.goto("/thank-you");
    await expect(
      page.locator('[data-testid="thank-you-heading"]'),
    ).toContainText("The Song begins");
    await expect(page.locator("text=Check your email")).toBeVisible();
    await expect(page.locator("text=Part I: The Still Water")).toBeVisible();
    // Should show Founder's Edition upsell
    await expect(page.locator('a[href="/api/founders-edition"]')).toBeVisible();
    // Should show links
    await expect(
      page.locator('a[href="/read/part-one"]', {
        hasText: "Read Part One Free",
      }),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/"]', { hasText: "Back to Home" }),
    ).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Pre-order (Part II)                                                */
  /* ------------------------------------------------------------------ */

  test("pre-order thank-you page shows confirmation messaging", async ({
    page,
  }) => {
    await page.goto("/thank-you?preorder=part-two");
    await expect(
      page.locator('[data-testid="thank-you-heading"]'),
    ).toContainText("Part II is yours");
    await expect(page.locator("text=Part II: The Waking")).toBeVisible();
    await expect(
      page.locator("text=No action needed on your end"),
    ).toBeVisible();
    // Should still show Founder's Edition upsell
    await expect(page.locator('a[href="/api/founders-edition"]')).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Founder's Edition                                                  */
  /* ------------------------------------------------------------------ */

  test("founders thank-you page shows Founder's Edition messaging", async ({
    page,
  }) => {
    await page.goto("/thank-you?founders=true");
    await expect(
      page.locator('[data-testid="thank-you-heading"]'),
    ).toContainText("You\u2019re a Founder");
    await expect(page.locator("text=Check your email")).toBeVisible();
    await expect(
      page.locator("text=Each part will be emailed to you"),
    ).toBeVisible();
    await expect(page.locator("text=signed physical copy")).toBeVisible();
    await expect(page.locator("text=full refund")).toBeVisible();
    // Should NOT show Founder's Edition upsell (they already bought it)
    await expect(
      page.locator('a[href="/api/founders-edition"]'),
    ).not.toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Donation                                                           */
  /* ------------------------------------------------------------------ */

  test("donation thank-you page shows donation messaging", async ({ page }) => {
    await page.goto("/thank-you?donated=true");
    await expect(
      page.locator('[data-testid="thank-you-heading"]'),
    ).toContainText("Thank you for your generosity");
    await expect(
      page.locator("text=helps fund editing, cover art"),
    ).toBeVisible();
    // Should still show Founder's Edition upsell
    await expect(page.locator('a[href="/api/founders-edition"]')).toBeVisible();
  });
});
