import { reviews, aggregateRating } from "@/app/lib/reviews-data";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-[#c9a84c] text-sm tracking-wider" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "text-[#c9a84c]" : "text-[#333]"}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          Reader Reviews
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide text-center leading-tight mb-4">
          What Readers Are Saying
        </h2>

        {/* Aggregate rating */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Stars count={Math.round(aggregateRating.ratingValue)} />
          <span className="font-[family-name:var(--font-sans)] text-sm text-[#b0a89e]">
            {aggregateRating.ratingValue.toFixed(1)} out of 5
          </span>
        </div>
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#666] text-center mb-12">
          {aggregateRating.reviewCount} verified Amazon reviews
        </p>

        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12" />

        {/* Reviews */}
        <div className="space-y-8">
          {reviews.map((review, i) => (
            <article
              key={i}
              className="border border-[#c9a84c]/10 bg-[#0a0a0a] p-6 sm:p-8 transition-all duration-300 hover:border-[#c9a84c]/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Stars count={review.rating} />
                  {review.verified && (
                    <span className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.15em] uppercase text-[#c9a84c]/40 border border-[#c9a84c]/15 px-2 py-0.5">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>

              <blockquote className="font-[family-name:var(--font-serif)] text-sm sm:text-base text-[#d4d0c8] leading-[1.85] mb-4">
                &ldquo;{review.body}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-sans)] text-xs text-[#888]">
                    {review.author}
                  </span>
                  <span className="text-[#333]">&bull;</span>
                  <span className="font-[family-name:var(--font-sans)] text-xs text-[#555]">
                    {review.format}
                  </span>
                  <span className="text-[#333]">&bull;</span>
                  <span className="font-[family-name:var(--font-sans)] text-xs text-[#555]">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {review.helpfulCount && review.helpfulCount > 0 && (
                  <span className="font-[family-name:var(--font-sans)] text-[10px] text-[#555]">
                    {review.helpfulCount} found helpful
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA to Amazon */}
        <div className="text-center mt-12">
          <a
            href="https://www.amazon.com/dp/B0GSSPN6LN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
          >
            Read More Reviews on Amazon
          </a>
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] text-[#555] mt-4">
            Available on{" "}
            <a
              href="https://www.amazon.com/dp/B0GSSPN6LN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              Kindle
            </a>
            {" "}&bull;{" "}
            <a
              href="https://www.amazon.com/dp/B0GT5PJKJX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              Hardcover
            </a>
            {" "}&bull;{" "}
            <a
              href="https://www.amazon.com/dp/B0GT1GFXRT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              Paperback
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
