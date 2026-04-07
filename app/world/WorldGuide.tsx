"use client";

import { useState, useMemo } from "react";
import {
  entries,
  categories,
  type Category,
  type WorldEntry,
} from "@/app/lib/world-data";

export default function WorldGuide() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = entries;

    // Filter out the duplicate "Aelo" in terms category when showing all or characters
    // Keep it only when viewing terms specifically
    if (activeCategory !== "terms") {
      result = result.filter(
        (e) => !(e.name === "Aelo" && e.category === "terms"),
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((e) => e.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          (e.subtitle && e.subtitle.toLowerCase().includes(q)) ||
          (e.detail && e.detail.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: entries.length };
    for (const cat of categories) {
      map[cat.key] = entries.filter((e) => e.category === cat.key).length;
    }
    return map;
  }, []);

  const toggle = (key: string) => {
    setExpandedEntry(expandedEntry === key ? null : key);
  };

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-20">
      {/* Search */}
      <div className="relative mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the world…"
          className="w-full bg-[#111] border border-[#c9a84c]/15 rounded-none px-5 py-4 font-[family-name:var(--font-serif)] text-base text-[#ededed] placeholder-[#555] focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#ededed] transition-colors text-sm"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        <TabButton
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          count={counts.all}
        >
          All
        </TabButton>
        {categories.map((cat) => (
          <TabButton
            key={cat.key}
            active={activeCategory === cat.key}
            onClick={() => setActiveCategory(cat.key)}
            count={counts[cat.key]}
          >
            {cat.label}
          </TabButton>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-[family-name:var(--font-serif)] text-lg text-[#555]">
            No entries found.
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] mt-2">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="space-y-px bg-[#c9a84c]/[0.06]">
          {filtered.map((entry, i) => {
            const key = `${entry.category}-${entry.name}-${i}`;
            const isOpen = expandedEntry === key;
            return (
              <EntryCard
                key={key}
                entry={entry}
                isOpen={isOpen}
                onToggle={() => toggle(key)}
              />
            );
          })}
        </div>
      )}

      {/* Count */}
      <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#444] text-center mt-8">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        {search && ` matching \u201c${search}\u201d`}
      </p>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 ${
        active
          ? "border-[#c9a84c]/50 text-[#c9a84c] bg-[#c9a84c]/[0.06]"
          : "border-[#222] text-[#666] hover:text-[#999] hover:border-[#333]"
      }`}
    >
      {children}
      <span className="ml-1.5 text-[9px] opacity-50">{count}</span>
    </button>
  );
}

function EntryCard({
  entry,
  isOpen,
  onToggle,
}: {
  entry: WorldEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const categoryLabel =
    categories.find((c) => c.key === entry.category)?.label ?? entry.category;
  const hasDetail = !!(entry.detail || entry.meta);

  return (
    <article className="bg-[#0a0a0a] group">
      <button
        onClick={hasDetail ? onToggle : undefined}
        className={`w-full text-left px-6 py-5 sm:px-8 sm:py-6 transition-all duration-300 ${
          hasDetail ? "cursor-pointer hover:bg-[#0d0d0d]" : "cursor-default"
        }`}
        aria-expanded={hasDetail ? isOpen : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <h3 className="font-[family-name:var(--font-serif)] text-lg sm:text-xl text-[#ededed] group-hover:text-[#c9a84c] transition-colors duration-300">
                {entry.name}
              </h3>
              {entry.subtitle && (
                <span className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.15em] uppercase text-[#c9a84c]/40 hidden sm:inline">
                  {entry.subtitle}
                </span>
              )}
            </div>
            {entry.subtitle && (
              <p className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.15em] uppercase text-[#c9a84c]/40 mb-1.5 sm:hidden">
                {entry.subtitle}
              </p>
            )}
            <p className="font-[family-name:var(--font-serif)] text-sm text-[#b0a89e] leading-relaxed">
              {entry.summary}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-1">
            <span className="font-[family-name:var(--font-sans)] text-[8px] tracking-[0.2em] uppercase text-[#444] hidden md:inline">
              {categoryLabel}
            </span>
            {hasDetail && (
              <span
                className={`text-[#c9a84c]/30 text-xs transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                &#9662;
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      {isOpen && hasDetail && (
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 border-t border-[#c9a84c]/[0.06]">
          <div className="pt-5">
            {entry.detail && (
              <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] leading-[1.85]">
                {entry.detail}
              </p>
            )}
            {entry.meta && (
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {Object.entries(entry.meta).map(([k, v]) => (
                  <p
                    key={k}
                    className="font-[family-name:var(--font-sans)] text-xs text-[#a09888]"
                  >
                    <span className="text-[#c9a84c]/50 capitalize">{k}:</span>{" "}
                    <span
                      className={k === "cost" ? "text-[#ededed] italic" : ""}
                    >
                      {v}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
