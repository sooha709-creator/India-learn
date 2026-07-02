import React from "react";
import { MAP_REGIONS, STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { useProgress } from "@/context/ProgressContext";

const ALL = [...STATES, ...UNION_TERRITORIES];

export default function IndiaMap({ selectedId, onSelect }) {
  const { progress } = useProgress();
  const learned = new Set([...progress.learnedStates, ...progress.learnedUTs]);

  return (
    <div className="rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[var(--sky-soft)] to-[var(--cream)] border border-[#E7DDBF]">
      <p className="text-xs sm:text-sm font-semibold text-[var(--navy)] mb-2 flex items-center gap-2">
        <span aria-hidden>🗺️</span> Tap any region to open its card
      </p>
      <svg
        viewBox="0 0 100 110"
        className="w-full h-auto max-h-[520px]"
        role="img"
        aria-label="Simplified clickable map of India"
        data-testid="india-map-svg"
      >
        {MAP_REGIONS.map((r) => {
          const info = ALL.find((s) => s.id === r.id);
          if (!info) return null;
          const isSelected = selectedId === r.id;
          const isLearned = learned.has(r.id);
          return (
            <g key={r.id}>
              <path
                d={r.d}
                className={`map-region ${isLearned ? "learned" : ""} ${isSelected ? "selected" : ""}`}
                onClick={() => onSelect(r.id)}
                role="button"
                tabIndex={0}
                aria-label={`${info.name}. ${isLearned ? "Learned." : ""}`}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(r.id)}
                data-testid={`map-region-${r.id}`}
              >
                <title>{info.name}</title>
              </path>
              <text x={r.cx} y={r.cy} textAnchor="middle" className="map-label">
                {r.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Island insets */}
      <div className="mt-3 flex flex-wrap gap-2">
        {["AN", "LD"].map((id) => {
          const info = ALL.find((s) => s.id === id);
          const isLearned = learned.has(id);
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              data-testid={`map-inset-${id}`}
              className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold transition ${
                selectedId === id
                  ? "bg-[var(--coral)] text-white border-[var(--coral)]"
                  : isLearned
                    ? "bg-[#C4EAB2] border-[#7BC96F] text-[var(--navy)]"
                    : "bg-white border-[#7FBFE0] text-[var(--navy)] hover:bg-[var(--sun)]/40"
              }`}
            >
              🏝️ {info?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
