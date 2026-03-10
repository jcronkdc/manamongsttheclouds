import { test, expect } from "@playwright/test";

test.describe("Part One: The Still Water — Interactive Reading Experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/read/part-one");
  });

  /* ------------------------------------------------------------------ */
  /*  Page load & hero                                                   */
  /* ------------------------------------------------------------------ */

  test("page loads with hero, title, and epigraph", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Part One");
    await expect(page.locator("h2").first()).toContainText("The Still Water");
    await expect(
      page.locator("text=In the time before the taking"),
    ).toBeVisible();
    await expect(page.locator("text=by Justin Cronk")).toBeVisible();
  });

  test("introduction box explains crowdsourced editing", async ({ page }) => {
    await expect(page.locator("text=completely optional")).toBeVisible();
    await expect(
      page.locator("text=No account needed. No signup. Just read."),
    ).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Chapter accordion                                                  */
  /* ------------------------------------------------------------------ */

  test("all 10 chapters are listed", async ({ page }) => {
    for (let i = 1; i <= 10; i++) {
      await expect(page.locator(`#chapter-${i}`)).toBeVisible();
    }
  });

  test("chapter 1 is expanded by default with prose content", async ({
    page,
  }) => {
    const ch1 = page.locator("#chapter-1");
    await expect(ch1.locator(".chapter-prose")).toBeVisible();
    // First line of chapter 1
    await expect(
      ch1.locator("text=Aelo tasted smoke in his sleep"),
    ).toBeVisible();
  });

  test("chapter 2 is collapsed by default", async ({ page }) => {
    const ch2 = page.locator("#chapter-2");
    await expect(ch2.locator(".chapter-prose")).not.toBeVisible();
  });

  test("clicking a collapsed chapter expands it", async ({ page }) => {
    const ch2 = page.locator("#chapter-2");
    await ch2.locator("button").click();
    await expect(ch2.locator(".chapter-prose")).toBeVisible();
    // First line of chapter 2
    await expect(ch2.locator("text=Blue. That much he knew")).toBeVisible();
  });

  test("clicking an expanded chapter collapses it", async ({ page }) => {
    const ch1 = page.locator("#chapter-1");
    // Ch1 is open by default
    await expect(ch1.locator(".chapter-prose")).toBeVisible();
    await ch1.locator("button").first().click();
    await expect(ch1.locator(".chapter-prose")).not.toBeVisible();
  });

  test("chapter titles and POV characters are correct", async ({ page }) => {
    const expected = [
      { num: 1, title: "The Herbs", pov: "Aelo" },
      { num: 2, title: "The Collection", pov: "The Knife" },
      { num: 3, title: "The Blue Sun", pov: "Aelo" },
      { num: 4, title: "The Running", pov: "Aelo" },
      { num: 5, title: "The Merchant", pov: "Sereth" },
      { num: 6, title: "The History", pov: "Jalo" },
      { num: 7, title: "The Growing", pov: "Aelo" },
      { num: 8, title: "The Patrol", pov: "The Knife" },
      { num: 9, title: "The Flood", pov: "Aelo" },
      { num: 10, title: "The Report", pov: "The Knife" },
    ];
    for (const ch of expected) {
      const el = page.locator(`#chapter-${ch.num}`);
      await expect(el.locator("h3")).toContainText(ch.title);
      await expect(el.locator("button").first()).toContainText(ch.pov);
    }
  });

  /* ------------------------------------------------------------------ */
  /*  Comments — per-chapter                                             */
  /* ------------------------------------------------------------------ */

  test("chapter 1 has a 'Leave feedback' toggle that reveals comment form", async ({
    page,
  }) => {
    const ch1 = page.locator("#chapter-1");
    // Comment form is hidden by default
    await expect(ch1.locator("text=Chapter 1 Feedback")).not.toBeVisible();
    // Toggle exists
    await expect(ch1.getByText("Leave feedback")).toBeVisible();
    // Click to expand
    await ch1.getByText("Leave feedback").click();
    await expect(ch1.locator("text=Chapter 1 Feedback")).toBeVisible();
    await expect(ch1.locator("text=I liked this")).toBeVisible();
    await expect(ch1.locator("text=Confusing")).toBeVisible();
    await expect(ch1.locator("text=Suggestion")).toBeVisible();
    await expect(ch1.locator("text=General")).toBeVisible();
    await expect(
      ch1.locator('input[placeholder="Your name (optional)"]'),
    ).toBeVisible();
    await expect(ch1.locator('input[placeholder*="comment"]')).toBeVisible();
  });

  test("submit a comment on chapter 1 and see it appear", async ({ page }) => {
    const ch1 = page.locator("#chapter-1");
    const uniqueName = `E2E-${Date.now()}`;

    // Open feedback panel first
    await ch1.getByText("Leave feedback").click();

    // Select "I liked this" sentiment
    await ch1.locator("button", { hasText: "I liked this" }).click();

    // Fill name and body
    await ch1
      .locator('input[placeholder="Your name (optional)"]')
      .fill(uniqueName);
    await ch1
      .locator('input[placeholder*="comment"]')
      .fill("E2E test comment — this line hooked me.");

    // Submit
    await ch1.locator("button:has(svg.lucide-send)").click();

    // Wait for success message
    await expect(ch1.locator("text=Thanks for your feedback")).toBeVisible({
      timeout: 5000,
    });

    // After the success message fades, the comment should be visible
    await page.waitForTimeout(3500);
    await expect(ch1.getByText(uniqueName).first()).toBeVisible();
    await expect(
      ch1.getByText("E2E test comment — this line hooked me.").first(),
    ).toBeVisible();
  });

  test("send button is disabled when comment body is empty", async ({
    page,
  }) => {
    const ch1 = page.locator("#chapter-1");
    // Open feedback panel first
    await ch1.getByText("Leave feedback").click();
    const sendBtn = ch1.locator("button:has(svg.lucide-send)");
    await expect(sendBtn).toBeDisabled();
  });

  /* ------------------------------------------------------------------ */
  /*  Comments — general discussion                                      */
  /* ------------------------------------------------------------------ */

  test("general discussion is collapsible with comment form", async ({
    page,
  }) => {
    await expect(
      page.locator("h3", { hasText: "General Discussion" }),
    ).toBeVisible();
    await expect(
      page.locator("text=Overall thoughts on Part One"),
    ).toBeVisible();
    // Comment form hidden by default
    await expect(
      page.locator("h4", { hasText: "General Discussion" }),
    ).not.toBeVisible();
    // Click to expand
    await page.locator("h3", { hasText: "General Discussion" }).click();
    await expect(
      page.locator("h4", { hasText: "General Discussion" }),
    ).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Part Two signup                                                    */
  /* ------------------------------------------------------------------ */

  test("Part Two signup form is visible", async ({ page }) => {
    await expect(page.locator("text=Part Two: The Waking")).toBeVisible();
    await expect(
      page.locator("text=Part Two is expected by May 2026"),
    ).toBeVisible();
    await expect(
      page.locator('input[placeholder="your@email.com"]'),
    ).toBeVisible();
    await expect(
      page.locator("button", { hasText: "Notify Me" }),
    ).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Donation section                                                   */
  /* ------------------------------------------------------------------ */

  test("donation section is collapsed by default", async ({ page }) => {
    await expect(page.locator("text=Want to support the work?")).toBeVisible();
    // The $5 button should NOT be visible yet
    await expect(
      page.locator('a[href="/api/donate?amount=5"]'),
    ).not.toBeVisible();
  });

  test("clicking support expands donation options", async ({ page }) => {
    await page.locator("text=Want to support the work?").click();

    await expect(page.locator("text=Nine years in the making")).toBeVisible();
    await expect(page.locator('a[href="/api/donate?amount=5"]')).toBeVisible();
    await expect(page.locator('a[href="/api/donate?amount=10"]')).toBeVisible();
    await expect(page.locator('a[href="/api/donate?amount=25"]')).toBeVisible();
    await expect(page.locator('a[href="/api/donate?amount=50"]')).toBeVisible();
    await expect(
      page.locator('a[href="/api/donate?custom=true"]'),
    ).toBeVisible();
    await expect(page.locator("text=Secure payment via Stripe")).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  Navigation & UI                                                    */
  /* ------------------------------------------------------------------ */

  test("sticky header shows title and chapter count", async ({ page }) => {
    await expect(
      page.locator("header").getByText("Part One: The Still Water"),
    ).toBeVisible();
    await expect(page.locator("header").getByText("10 Chapters")).toBeVisible();
  });

  test("MATC logo links to homepage", async ({ page }) => {
    const link = page.locator('header a[href="/"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText("MATC");
  });

  test("footer shows copyright", async ({ page }) => {
    await expect(page.locator("text=2026 Justin Cronk")).toBeVisible();
  });

  test("scroll-to-top button appears after scrolling", async ({ page }) => {
    const btn = page.locator('button[aria-label="Scroll to top"]');
    // Not visible at top
    await expect(btn).not.toBeVisible();
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(btn).toBeVisible({ timeout: 2000 });
  });

  /* ------------------------------------------------------------------ */
  /*  Share section                                                      */
  /* ------------------------------------------------------------------ */

  test("share section shows all share buttons", async ({ page }) => {
    await expect(page.locator("text=Share Part One")).toBeVisible();
    await expect(page.locator("text=Facebook")).toBeVisible();
    await expect(page.locator("text=Twitter / X")).toBeVisible();
    await expect(page.locator("text=Email")).toBeVisible();
    await expect(page.locator("text=Text")).toBeVisible();
    await expect(page.locator("text=Copy Link")).toBeVisible();
  });

  /* ------------------------------------------------------------------ */
  /*  OG image                                                           */
  /* ------------------------------------------------------------------ */

  test("OpenGraph image endpoint returns a PNG", async ({ request }) => {
    const res = await request.get("/read/part-one/opengraph-image");
    expect(res.status()).toBe(200);
    const contentType = res.headers()["content-type"];
    expect(contentType).toContain("image/png");
  });

  /* ------------------------------------------------------------------ */
  /*  Comments API — direct                                              */
  /* ------------------------------------------------------------------ */

  test("GET /api/comments returns 400 without key", async ({ request }) => {
    const res = await request.get("/api/comments");
    expect(res.status()).toBe(400);
  });

  test("GET /api/comments returns 400 for invalid key", async ({ request }) => {
    const res = await request.get("/api/comments?key=hacker-injection");
    expect(res.status()).toBe(400);
  });

  test("GET /api/comments returns 200 for valid key", async ({ request }) => {
    const res = await request.get("/api/comments?key=chapter-1");
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("comments");
    expect(Array.isArray(data.comments)).toBe(true);
  });

  test("POST /api/comments rejects empty body", async ({ request }) => {
    const res = await request.post("/api/comments", {
      data: { key: "chapter-1", chapter: 1, body: "" },
    });
    expect(res.status()).toBe(400);
  });

  test("POST /api/comments accepts valid comment", async ({ request }) => {
    const res = await request.post("/api/comments", {
      data: {
        key: "chapter-2",
        chapter: 2,
        name: "API-E2E-Test",
        body: "Testing via direct API call.",
        sentiment: "suggestion",
      },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  /* ------------------------------------------------------------------ */
  /*  Donate API                                                         */
  /* ------------------------------------------------------------------ */

  test("GET /api/donate redirects to Stripe or fails gracefully", async ({
    request,
  }) => {
    const res = await request.get("/api/donate?amount=5", {
      maxRedirects: 0,
    });
    // 303 → Stripe checkout (production), 303 → fallback redirect (missing key)
    expect(res.status()).toBe(303);
    const location = res.headers()["location"];
    // Either Stripe checkout or fallback to /read/part-one
    expect(
      location?.includes("checkout.stripe.com") ||
        location?.includes("/read/part-one"),
    ).toBeTruthy();
  });
});
