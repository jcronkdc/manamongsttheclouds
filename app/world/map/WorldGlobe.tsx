"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { regions, type RegionData } from "./world-data";

/* ────────────────────────────────────────────
   POSITIONS — percent-based layout for the radial map
   Murkr at center, seven regions arranged around it
   ──────────────────────────────────────────── */

const POSITIONS: Record<string, { x: number; y: number }> = {
  clouds: { x: 50, y: 8 },
  ming: { x: 14, y: 26 },
  sea: { x: 86, y: 26 },
  canopy: { x: 8, y: 58 },
  murkr: { x: 50, y: 44 },
  volcano: { x: 92, y: 58 },
  core: { x: 20, y: 84 },
  desert: { x: 80, y: 84 },
};

const REMEMBERING_PAIRS: [string, string][] = [
  ["clouds", "ming"],
  ["ming", "canopy"],
  ["canopy", "core"],
  ["core", "desert"],
  ["desert", "volcano"],
  ["volcano", "sea"],
  ["sea", "clouds"],
];

/* ────────────────────────────────────────────
   ELEMENT ICONS — unique SVG per element
   ──────────────────────────────────────────── */

function ElementIcon({ id, size = 28 }: { id: string; size?: number }) {
  const s = size;
  const props = {
    width: s,
    height: s,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "clouds":
      return (
        <svg {...props}>
          <path d="M8 22c-2.2 0-4-1.8-4-4 0-1.8 1.2-3.4 3-3.9C7 11.3 9.2 9 12 9c2.2 0 4 1.2 5 3 .3 0 .7-.1 1-.1 2.8 0 5 2.2 5 5s-2.2 5-5 5H8z" />
          <path d="M10 26l2-4M16 26l2-4M22 26l2-4" opacity="0.4" />
        </svg>
      );
    case "ming":
      return (
        <svg {...props}>
          <circle cx="16" cy="14" r="6" />
          <path d="M10 14c0-3.3 2.7-6 6-6" opacity="0.4" />
          <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          <circle cx="16" cy="14" r="2" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "canopy":
      return (
        <svg {...props}>
          <path d="M16 4v24" />
          <path d="M16 8c-6 2-8 6-8 10" />
          <path d="M16 8c6 2 8 6 8 10" />
          <path d="M16 14c-4 1.5-6 4-6 7" opacity="0.5" />
          <path d="M16 14c4 1.5 6 4 6 7" opacity="0.5" />
          <path d="M12 28h8" opacity="0.3" />
        </svg>
      );
    case "core":
      return (
        <svg {...props}>
          <polygon points="16,4 28,28 4,28" />
          <polygon points="16,12 22,24 10,24" opacity="0.3" />
          <line x1="16" y1="18" x2="16" y2="24" opacity="0.5" />
        </svg>
      );
    case "desert":
      return (
        <svg {...props}>
          <path d="M2 24c4-2 6-6 10-6s6 4 10 6 6-2 8-4" />
          <circle cx="24" cy="8" r="4" opacity="0.4" />
          <path d="M4 28h24" opacity="0.2" />
        </svg>
      );
    case "volcano":
      return (
        <svg {...props}>
          <polygon points="16,2 28,28 4,28" />
          <path d="M12 10l4-8 4 8" fill="currentColor" opacity="0.2" />
          <path d="M10 20l2-4M16 18l2-6M20 20l2-4" opacity="0.4" />
        </svg>
      );
    case "sea":
      return (
        <svg {...props}>
          <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" />
          <path d="M2 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" opacity="0.5" />
          <path d="M2 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" opacity="0.3" />
        </svg>
      );
    case "murkr":
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="5" opacity="0.4" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.6" />
          <path d="M6 16h4M22 16h4M16 6v4M16 22v4" opacity="0.2" />
        </svg>
      );
    default:
      return null;
  }
}

/* ────────────────────────────────────────────
   DETERMINISTIC STAR FIELD
   ──────────────────────────────────────────── */

function useStars(count: number) {
  return useMemo(() => {
    const mulberry32 = (a: number) => {
      return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };
    const rng = mulberry32(42);
    return Array.from({ length: count }, () => ({
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 1.8 + 0.3,
      delay: rng() * 5,
      duration: 3 + rng() * 4,
      opacity: rng() * 0.4 + 0.1,
    }));
  }, [count]);
}

/* ────────────────────────────────────────────
   MEMORY PARTICLES — floating motes near regions
   ──────────────────────────────────────────── */

function MemoryParticles({
  regionId,
  color,
  active,
}: {
  regionId: string;
  color: string;
  active: boolean;
}) {
  const particles = useMemo(() => {
    const pos = POSITIONS[regionId];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      offsetX: Math.sin(i * 2.4) * 3 + Math.cos(i * 1.7) * 2,
      offsetY: Math.cos(i * 1.9) * 3 + Math.sin(i * 2.1) * 2,
      size: 1.5 + (i % 3) * 0.8,
      delay: i * 0.4,
      duration: 4 + (i % 4) * 1.5,
      cx: pos.x,
      cy: pos.y,
    }));
  }, [regionId]);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `calc(${p.cx}% + ${p.offsetX}vw)`,
            top: `calc(${p.cy}% + ${p.offsetY}vh)`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: active ? 0.6 : 0.15,
            animation: `map-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            transition: "opacity 0.8s ease",
            filter: active
              ? `blur(0px) drop-shadow(0 0 3px ${color})`
              : "blur(0.5px)",
          }}
        />
      ))}
    </>
  );
}

/* ────────────────────────────────────────────
   SVG CONNECTION NETWORK
   ──────────────────────────────────────────── */

function ConnectionNetwork({
  selectedId,
  hoveredId,
}: {
  selectedId: string | null;
  hoveredId: string | null;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <filter id="glow-gold">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Murkr connections — dark tendrils */}
      {regions
        .filter((r) => r.id !== "murkr")
        .map((r) => {
          const pM = POSITIONS.murkr;
          const pR = POSITIONS[r.id];
          const active =
            selectedId === "murkr" ||
            selectedId === r.id ||
            hoveredId === "murkr" ||
            hoveredId === r.id;
          const mx = (pM.x + pR.x) / 2 + (pM.y - pR.y) * 0.08;
          const my = (pM.y + pR.y) / 2 + (pR.x - pM.x) * 0.08;
          return (
            <path
              key={`murkr-${r.id}`}
              d={`M ${pM.x} ${pM.y} Q ${mx} ${my} ${pR.x} ${pR.y}`}
              stroke={active ? "#4a2838" : "#1a1218"}
              strokeWidth={active ? 1 : 0.5}
              fill="none"
              opacity={active ? 0.5 : 0.12}
              style={{ transition: "all 0.6s ease" }}
            />
          );
        })}

      {/* Remembering walls — golden arcs */}
      {REMEMBERING_PAIRS.map(([a, b]) => {
        const pA = POSITIONS[a];
        const pB = POSITIONS[b];
        const active =
          selectedId === a ||
          selectedId === b ||
          hoveredId === a ||
          hoveredId === b;
        const mx = (pA.x + pB.x) / 2 + (pA.y - pB.y) * 0.15;
        const my = (pA.y + pB.y) / 2 + (pB.x - pA.x) * 0.15;
        return (
          <g key={`${a}-${b}`}>
            {active && (
              <path
                d={`M ${pA.x} ${pA.y} Q ${mx} ${my} ${pB.x} ${pB.y}`}
                stroke="#c9a84c"
                strokeWidth={2.5}
                fill="none"
                opacity={0.12}
                filter="url(#glow-gold)"
              />
            )}
            <path
              d={`M ${pA.x} ${pA.y} Q ${mx} ${my} ${pB.x} ${pB.y}`}
              stroke={active ? "#c9a84c" : "#3a2e18"}
              strokeWidth={active ? 1.2 : 0.6}
              fill="none"
              opacity={active ? 0.7 : 0.2}
              strokeDasharray={active ? "6 3" : "4 6"}
              style={{ transition: "all 0.6s ease" }}
            >
              {active && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-18"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>
        );
      })}
    </svg>
  );
}

/* ────────────────────────────────────────────
   REGION NODE — the interactive map markers
   ──────────────────────────────────────────── */

function RegionNode({
  region,
  isSelected,
  isHovered,
  onClick,
  onHover,
  onLeave,
}: {
  region: RegionData;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const pos = POSITIONS[region.id];
  const isMurkr = region.id === "murkr";
  const active = isSelected || isHovered;
  const nodeSize = isMurkr ? 44 : 56;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="absolute group"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isSelected ? 10 : isHovered ? 5 : 2,
      }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: nodeSize * 3.5,
          height: nodeSize * 3.5,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${region.color}${active ? "25" : "0a"} 0%, transparent 70%)`,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Pulsing ring */}
      {active && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: nodeSize * 2,
            height: nodeSize * 2,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid ${region.color}`,
            opacity: 0.2,
            animation: "map-pulse-ring 2s ease-out infinite",
          }}
        />
      )}

      {/* Main node */}
      <div
        className="relative flex items-center justify-center rounded-full backdrop-blur-sm"
        style={{
          width: nodeSize,
          height: nodeSize,
          background: active
            ? `radial-gradient(circle at 35% 35%, ${region.color}30, ${region.emissive}50)`
            : `radial-gradient(circle at 35% 35%, ${region.color}15, ${region.emissive}25)`,
          border: `1px solid ${region.color}${active ? "50" : "20"}`,
          boxShadow: active
            ? `0 0 20px ${region.color}30, 0 0 60px ${region.color}15, inset 0 0 20px ${region.color}10`
            : `0 0 8px ${region.color}10`,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: active ? "scale(1.15)" : "scale(1)",
          margin: "0 auto",
          color: region.color,
        }}
      >
        <ElementIcon id={region.id} size={active ? 24 : 20} />
      </div>

      {/* Label */}
      <div
        className="mt-2.5 text-center whitespace-nowrap pointer-events-none px-3 py-1.5 rounded-lg"
        style={{
          transition: "all 0.4s ease",
          background: "rgba(5,5,8,0.7)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div
          className="font-serif font-semibold tracking-[0.12em] leading-none"
          style={{
            fontSize: active ? 16 : 14,
            color: isMurkr
              ? "#8a7888"
              : active
                ? region.color
                : `${region.color}dd`,
            textShadow: `0 0 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.95), 0 0 40px ${region.color}20`,
            transition: "all 0.4s ease",
          }}
        >
          {region.name}
        </div>
        <div
          className="font-serif italic mt-1"
          style={{
            fontSize: 11,
            color: isMurkr ? "#5a4858" : `${region.color}99`,
            textShadow: "0 0 14px rgba(0,0,0,0.95)",
            letterSpacing: "0.08em",
          }}
        >
          {region.nativeName}
        </div>
        {active && !isMurkr && (
          <div
            className="font-sans uppercase mt-1"
            style={{
              fontSize: 10,
              color: `${region.color}70`,
              letterSpacing: "0.2em",
              animation: "map-fade-in 0.3s ease",
            }}
          >
            {region.element}
          </div>
        )}
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────
   INFO PANEL — elegant centered modal
   ──────────────────────────────────────────── */

function InfoPanel({
  region,
  onClose,
}: {
  region: RegionData;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "people" | "distances">(
    "overview",
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: "map-fade-in 0.3s ease" }}
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-hidden sm:rounded-xl"
        style={{
          background: "linear-gradient(180deg, #0d0d10 0%, #0a0a0e 100%)",
          border: "1px solid rgba(201, 168, 76, 0.08)",
          boxShadow: `0 0 80px ${region.color}08, 0 25px 60px rgba(0,0,0,0.5)`,
          animation: "map-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${region.color}40, transparent)`,
          }}
        />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#444] hover:text-[#aaa] transition-colors rounded-full hover:bg-white/5"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `${region.color}15`,
                border: `1px solid ${region.color}20`,
                color: region.color,
              }}
            >
              <ElementIcon id={region.id} size={22} />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-foreground">
                {region.name}
              </h2>
              <p
                className="font-serif text-xs italic"
                style={{ color: `${region.color}90` }}
              >
                {region.nativeName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
              style={{
                color: region.color,
                background: `${region.color}12`,
                border: `1px solid ${region.color}15`,
              }}
            >
              {region.element}
            </span>
            <span
              className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
              style={{
                color: `${region.color}80`,
                background: `${region.color}08`,
              }}
            >
              {region.magic}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex px-6 gap-1"
          style={{ borderBottom: "1px solid #161618" }}
        >
          {(["overview", "people", "distances"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative py-2.5 px-3 text-[10px] tracking-[0.15em] uppercase font-sans transition-colors"
              style={{ color: tab === t ? region.color : "#555" }}
            >
              {t}
              {tab === t && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: region.color,
                    animation: "map-tab-line 0.3s ease",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div
          className="overflow-y-auto px-6 py-5 space-y-5"
          style={{ maxHeight: "calc(80vh - 180px)" }}
        >
          {tab === "overview" && (
            <>
              <InfoBlock label="The Land" color={region.color}>
                {region.description}
              </InfoBlock>
              <InfoBlock label="Landscape" color={region.color}>
                {region.landscape}
              </InfoBlock>
              <InfoBlock label="Under Varas" color={region.color}>
                {region.underVaras}
              </InfoBlock>
              {region.keyLocations.length > 0 && (
                <div>
                  <h3
                    className="text-[9px] tracking-[0.25em] uppercase mb-2.5 font-sans"
                    style={{ color: `${region.color}60` }}
                  >
                    Key Locations
                  </h3>
                  <div className="space-y-1.5">
                    {region.keyLocations.map((loc) => (
                      <div key={loc} className="flex items-start gap-2.5">
                        <div
                          className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: `${region.color}50` }}
                        />
                        <span className="font-serif text-[13px] leading-relaxed text-[#999]">
                          {loc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "people" && (
            <>
              <InfoBlock label="The People" color={region.color}>
                {region.people}
              </InfoBlock>
              <InfoBlock label="Culture" color={region.color}>
                {region.culture}
              </InfoBlock>
              <InfoBlock label="Mentor" color={region.color}>
                <span className="italic" style={{ color: `${region.color}90` }}>
                  {region.mentor}
                </span>
              </InfoBlock>
              {region.creatures.length > 0 && (
                <div>
                  <h3
                    className="text-[9px] tracking-[0.25em] uppercase mb-2.5 font-sans"
                    style={{ color: `${region.color}60` }}
                  >
                    Creatures
                  </h3>
                  <div className="space-y-1.5">
                    {region.creatures.map((c) => (
                      <div key={c} className="flex items-start gap-2.5">
                        <div
                          className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: `${region.color}50` }}
                        />
                        <span className="font-serif text-[13px] leading-relaxed text-[#999]">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "distances" && (
            <>
              <div className="space-y-2.5">
                {region.distances.map((d) => (
                  <div
                    key={d.to}
                    className="p-3 rounded-lg"
                    style={{
                      background: "#0e0e12",
                      border: "1px solid #18181c",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-[13px] text-[#ccc]">
                        {d.to}
                      </span>
                      <span
                        className="font-sans text-[10px] tracking-wider"
                        style={{ color: region.color }}
                      >
                        {d.leagues} leagues
                      </span>
                    </div>
                    <p className="font-serif text-[11px] text-[#666] italic">
                      {d.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-serif text-[11px] text-[#444] italic text-center pt-2">
                The world remembers distance differently — these are
                approximations based on traveler accounts.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        className="text-[9px] tracking-[0.25em] uppercase mb-2 font-sans"
        style={{ color: `${color}60` }}
      >
        {label}
      </h3>
      <p className="font-serif text-[13px] leading-[1.75] text-[#999]">
        {children}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────
   REGION SELECTOR — bottom navigator bar
   ──────────────────────────────────────────── */

function RegionSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div
      className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 sm:gap-1 rounded-full px-1.5 sm:px-3 py-1.5"
      style={{
        background: "rgba(10,10,14,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid #1a1a1e",
      }}
    >
      {regions.map((r) => {
        const active = selectedId === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onSelect(active ? null : r.id)}
            className="group flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300"
            style={{ background: active ? `${r.color}15` : "transparent" }}
            title={r.name}
          >
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: r.color,
                boxShadow: active ? `0 0 8px ${r.color}80` : "none",
                transform: active ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className="hidden sm:block font-sans text-[8px] tracking-[0.15em] uppercase transition-colors duration-300"
              style={{ color: active ? r.color : "#444" }}
            >
              {r.id === "murkr" ? "Murkr" : r.nativeName}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   CSS KEYFRAMES (injected via style tag)
   ──────────────────────────────────────────── */

const MAP_STYLES = `
@keyframes map-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(4px, -6px); }
  50% { transform: translate(-3px, -10px); }
  75% { transform: translate(5px, -4px); }
}

@keyframes map-pulse-ring {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

@keyframes map-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes map-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes map-tab-line {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes map-twinkle {
  0%, 100% { opacity: var(--star-opacity); }
  50% { opacity: 0.02; }
}

@keyframes map-murkr-pulse {
  0%, 100% { opacity: 0.08; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.05); }
}
`;

/* ────────────────────────────────────────────
   MAIN EXPORT
   ──────────────────────────────────────────── */

export default function WorldGlobe() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectedRegion = regions.find((r) => r.id === selectedId) || null;
  const stars = useStars(120);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const handleHover = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleUnhover = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "#050508" }}
      onClick={() => setSelectedId(null)}
    >
      {/* Injected keyframe styles */}
      <style dangerouslySetInnerHTML={{ __html: MAP_STYLES }} />

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: "#fff",
              opacity: star.opacity,
              ["--star-opacity" as string]: star.opacity,
              animation: `map-twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Central Murkr darkness glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "40vmin",
          height: "40vmin",
          left: `${POSITIONS.murkr.x}%`,
          top: `${POSITIONS.murkr.y}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(42,22,38,0.5) 0%, rgba(20,10,18,0.2) 40%, transparent 70%)",
          animation: "map-murkr-pulse 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* Outer world glow ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "90vmin",
          height: "90vmin",
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(201,168,76,0.04)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "70vmin",
          height: "70vmin",
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(201,168,76,0.03)",
          borderRadius: "50%",
        }}
      />

      {/* SVG Connection network */}
      <ConnectionNetwork selectedId={selectedId} hoveredId={hoveredId} />

      {/* Memory particles for each region */}
      {regions.map((r) => (
        <MemoryParticles
          key={`particles-${r.id}`}
          regionId={r.id}
          color={r.color}
          active={selectedId === r.id || hoveredId === r.id}
        />
      ))}

      {/* Region nodes */}
      {regions.map((r) => (
        <RegionNode
          key={r.id}
          region={r}
          isSelected={selectedId === r.id}
          isHovered={hoveredId === r.id}
          onClick={() => handleSelect(selectedId === r.id ? null : r.id)}
          onHover={() => handleHover(r.id)}
          onLeave={handleUnhover}
        />
      ))}

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6 pointer-events-none flex justify-between items-start">
        <div>
          <a
            href="/world"
            className="pointer-events-auto font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 hover:text-gold transition-colors inline-block"
          >
            &larr; World Guide
          </a>
          <h1 className="font-serif text-lg sm:text-2xl font-light tracking-wider text-foreground/80 mt-2">
            The World Remembers
          </h1>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#555] mt-1">
            Click a region to explore
          </p>
        </div>
        <div className="hidden sm:block max-w-[240px] text-right mt-1">
          <p className="font-serif italic text-[12px] leading-relaxed text-[#c9a84c]/40">
            &ldquo;I wisely started with a map, and made the story fit.&rdquo;
          </p>
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#555]/60 mt-1">
            J.R.R. Tolkien
          </p>
        </div>
      </div>

      {/* Region selector bar */}
      <RegionSelector selectedId={selectedId} onSelect={handleSelect} />

      {/* Info panel */}
      {selectedRegion && (
        <InfoPanel
          key={selectedRegion.id}
          region={selectedRegion}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
