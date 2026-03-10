"use client";

import dynamic from "next/dynamic";

const EpubReader = dynamic(
  () => import("@/app/components/EpubReader"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.35em] uppercase mb-4">
            Stillfire Press
          </p>
          <p className="text-[#888] text-sm animate-pulse">Loading reader...</p>
        </div>
      </div>
    ),
  }
);

export default function ReadPageClient({ token }: { token: string }) {
  const bookUrl = `/api/book/${token}`;
  return <EpubReader url={bookUrl} token={token} />;
}
