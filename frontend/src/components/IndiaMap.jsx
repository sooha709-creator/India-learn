import React, { useState } from "react";
import mapData from "@/data/indiaMapPaths.json";
import { STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { useProgress } from "@/context/ProgressContext";

const ALL = [...STATES, ...UNION_TERRITORIES];
const byId = (id) => ALL.find((s) => s.id === id);

export default function IndiaMap({ selectedId, onSelect }) {
  const { progress } = useProgress();
  const learned = new Set([...progress.learnedStates, ...progress.learnedUTs]);
  const [hoverId, setHoverId] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const regions = mapData.regions; // mainland 34
  const insets = mapData.insets; // AN, LD

  const containerRef = React.useRef(null);
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const hoverInfo = hoverId ? byId(hoverId) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[var(--sky-soft)] to-[var(--cream)] border border-[#E7DDBF]"
    >
      <p className="text-xs sm:text-sm font-semibold text-[var(--navy)] mb-2 flex items-center gap-2">
        <span aria-hidden>🗺️</span> Tap any state or Union Territory to open its card
      </p>

      <svg
        viewBox={mapData.viewBox}
        className="w-full h-auto max-h-[560px]"
        role="img"
        aria-label="Interactive map of India showing all 28 states and 8 Union Territories"
        data-testid="india-map-svg"
      >
        {Object.entries(regions).map(([id, r]) => {
          const info = byId(id);
          if (!info) return null;
          const isSelected = selectedId === id;
          const isLearned = learned.has(id);
          const isHover = hoverId === id;
          return (
            <path
              key={id}
              d={r.path}
              className={`map-region ${isLearned ? "learned" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(id)}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId((h) => (h === id ? null : h))}
              onFocus={() => setHoverId(id)}
              onBlur={() => setHoverId((h) => (h === id ? null : h))}
              role="button"
              tabIndex={0}
              aria-label={`${info.name}. Capital ${info.capital}. ${isLearned ? "Learned." : ""} Tap to explore.`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(id)}
              data-testid={`map-region-${id}`}
              style={{
                strokeWidth: isSelected ? 0.6 : isHover ? 0.5 : 0.35,
              }}
            >
              <title>{info.name}</title>
            </path>
          );
        })}
      </svg>

      {/* Island insets - rendered as their own small SVGs, both clickable */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["AN", "LD"].map((id) => {
          const info = byId(id);
          const inset = insets[id];
          const isSelected = selectedId === id;
          const isLearned = learned.has(id);
          if (!info || !inset) return null;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId((h) => (h === id ? null : h))}
              data-testid={`map-inset-${id}`}
              aria-label={`${info.name}. Capital ${info.capital}. Tap to explore.`}
              className={`flex items-center gap-2 p-2 rounded-2xl border-2 text-left transition ${
                isSelected
                  ? "bg-[#FFE0D0] border-[var(--coral)]"
                  : isLearned
                    ? "bg-[#E9F8DD] border-[var(--leaf)]"
                    : "bg-white border-[#BFE2F4] hover:bg-[var(--sun)]/30"
              }`}
            >
              <svg viewBox="0 0 26 26" width="34" height="34" aria-hidden>
                <path
                  d={inset.path}
                  fill={isSelected ? "#FFB08A" : isLearned ? "#C4EAB2" : "#E9F6FD"}
                  stroke="#1F3B57"
                  strokeWidth="0.3"
                />
              </svg>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase text-[var(--coral)] tracking-wider">Island UT</p>
                <p className="text-xs font-bold text-[var(--navy)] leading-tight truncate">{info.name}</p>
                <p className="text-[10px] text-[var(--navy)]/70">Capital: {info.capital}</p>
              </div>
            </button>
          );
        })}
      </div>

      {hoverInfo && (
        <div
          className="pointer-events-none absolute z-10 bg-[var(--navy)] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg"
          style={{
            left: Math.min(Math.max(mouse.x + 12, 0), (containerRef.current?.clientWidth || 0) - 200),
            top: Math.max(mouse.y - 34, 4),
          }}
          data-testid="map-tooltip"
        >
          {hoverInfo.name} · <span className="opacity-70">Tap to explore</span>
        </div>
      )}
    </div>
  );
}
