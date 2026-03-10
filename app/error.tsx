"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
          Stillfire Press
        </p>
        <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide text-[#ededed] mb-4">
          Something went wrong.
        </h1>
        <p className="font-[family-name:var(--font-serif)] text-base text-[#8a8a8a] mb-8 leading-relaxed">
          The page encountered an unexpected error. Please try again, or return
          to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
