"use client";

import dynamic from "next/dynamic";

const WorldGlobe = dynamic(() => import("./WorldGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#050508] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin mx-auto mb-4" />
        <p className="font-[family-name:var(--font-serif)] text-sm text-[#555] tracking-wider">
          The world is remembering...
        </p>
      </div>
    </div>
  ),
});

export default function WorldMapClient() {
  return <WorldGlobe />;
}
