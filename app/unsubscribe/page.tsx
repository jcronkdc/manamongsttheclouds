import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Unsubscribed",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <>
      <Nav />
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-10" />
          <h1 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide mb-6">
            You&rsquo;ve been unsubscribed.
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-base text-[#999] leading-relaxed mb-8">
            You won&rsquo;t receive any more emails from us. If this was a
            mistake, you can always sign up again from the homepage.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
