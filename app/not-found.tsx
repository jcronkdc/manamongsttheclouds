import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 mb-6">
          Stillfire Press
        </p>
        <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide text-[#ededed] mb-4">
          Page not found.
        </h1>
        <p className="font-[family-name:var(--font-serif)] text-base text-[#8a8a8a] mb-8 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has been
          moved. The Song is elsewhere.
        </p>
        <Link
          href="/"
          className="inline-block px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
