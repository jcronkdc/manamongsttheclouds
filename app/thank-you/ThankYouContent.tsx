"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouContent() {
  const params = useSearchParams();
  const isDonation = params.get("donated") === "true";

  const heading = isDonation
    ? "Thank you for your generosity."
    : "The Song begins.";

  const subtitle = isDonation
    ? "Your support helps bring this story to the world."
    : "Thank you for being here at the beginning.";

  return (
    <div className="max-w-xl text-center" data-testid="thank-you-content">
      <p className="text-[#c9a84c] tracking-[0.35em] uppercase text-xs mb-8 font-[family-name:var(--font-sans)]">
        Thank you
      </p>
      <h1
        className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-light tracking-wide leading-tight mb-6"
        data-testid="thank-you-heading"
      >
        {heading}
      </h1>
      <p className="font-[family-name:var(--font-serif)] text-lg text-[#8a8a8a] italic mb-12 max-w-md mx-auto leading-relaxed">
        {subtitle}
      </p>

      <div className="border border-[#c9a84c]/20 p-8 sm:p-10 mb-12">
        <p className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-3">
          Check your email.
        </p>

        {isDonation ? (
          <div>
            <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-relaxed mb-2">
              Your donation helps fund editing, cover art, and publishing. Every
              dollar goes directly into bringing this story to life.
            </p>
          </div>
        ) : (
          <div>
            <p className="font-[family-name:var(--font-serif)] text-base text-[#b0a89e] leading-relaxed mb-2">
              Your copy of <em>Part I: The Still Water</em> has been sent to the
              email address you used at checkout.
            </p>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#8a8a8a] leading-relaxed">
              The download link expires in 7 days. If you don&rsquo;t see the
              email, check your spam folder or contact{" "}
              <a
                href="mailto:hello@stillfirepress.com"
                className="text-[#c9a84c] hover:text-[#e8c85a] transition-colors"
              >
                hello@stillfirepress.com
              </a>
            </p>
          </div>
        )}
      </div>

      <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.02] p-6 sm:p-8 mb-12">
        <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] mb-4 leading-relaxed">
          The full novel is available now on Amazon Kindle &mdash; all five
          parts, 48 chapters, 146,000 words.
        </p>
        <a
          href="https://www.amazon.com/dp/B0GSSPN6LN"
          className="inline-block px-8 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
        >
          Get it on Kindle
        </a>
        <p className="font-[family-name:var(--font-serif)] text-xs text-[#888] mt-3">
          Paperback &amp; hardcover coming soon
        </p>
      </div>

      <div className="border-t border-[#222] pt-8 space-y-4">
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="https://stillfirepress.com/read/matc"
            className="text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#e8c85a] transition-colors"
          >
            Read Part One Free
          </Link>
          <Link
            href="/"
            className="text-[#8a8a8a] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#ededed] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#777] mt-16">
        &ldquo;The world sang to itself. And in the space between the notes,
        where silence lived, a man breathed &mdash; and the air
        remembered.&rdquo;
      </p>
    </div>
  );
}
