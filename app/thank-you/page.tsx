import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

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
