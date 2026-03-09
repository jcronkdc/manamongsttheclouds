export default function SFPFooter() {
  return (
    <footer className="py-16 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-[family-name:var(--font-serif)] text-2xl font-light tracking-wide mb-2">
          Stillfire Press
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-[#c9a84c] to-[#b34a2a] mx-auto mb-6" />
        <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#555] mb-8 max-w-md mx-auto">
          Literary fantasy that burns slow and stays with you.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <a
            href="#matc"
            className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#555] hover:text-[#c9a84c] transition-colors"
          >
            Man Amongst the Clouds
          </a>
          <a
            href="#atf"
            className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#555] hover:text-[#b34a2a] transition-colors"
          >
            Ash to Fury
          </a>
          <a
            href="#authors"
            className="font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase text-[#555] hover:text-[#ededed] transition-colors"
          >
            Authors
          </a>
        </div>
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#333]">
          &copy; 2026 Stillfire Press. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
