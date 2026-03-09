"use client";

import { useState, type FormEvent } from "react";

export default function SignupSection() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "man-amongst-the-clouds" }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="signup" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
          Stay Close
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight mb-6">
          The Song isn&rsquo;t finished.
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-8" />
        <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#c4beb4] mb-10 leading-relaxed">
          Get notified when new parts release, behind-the-scenes content drops,
          and the complete novel launches. From Stillfire Press &mdash; an
          independent publishing house that believes stories should cost the
          writer something.
        </p>

        {status === "success" ? (
          <div
            className="border border-[#c9a84c]/30 p-8"
            style={{ animation: "fadeInUp 0.6s ease-out" }}
          >
            <p className="font-[family-name:var(--font-serif)] text-xl text-[#ededed] mb-2">
              You&rsquo;re on the list.
            </p>
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4]">
              When the next part is ready, you&rsquo;ll be the first to know.
            </p>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "submitting"}
                className="flex-1 px-4 py-4 bg-[#111] border border-[#333] text-[#ededed] font-[family-name:var(--font-sans)] text-sm placeholder:text-[#555] focus:border-[#c9a84c] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {status === "submitting" ? "Sending..." : "Notify Me"}
              </button>
            </form>

            {status === "error" && (
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#c9a84c] mt-4">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="font-[family-name:var(--font-sans)] text-xs text-[#777] mt-4">
              No spam. Just books worth the wait. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
