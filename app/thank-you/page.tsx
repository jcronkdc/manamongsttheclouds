import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center px-6">
      <Suspense
        fallback={
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#8a8a8a]">
            Loading&hellip;
          </p>
        }
      >
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
