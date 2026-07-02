import React from "react";
import { X, Heart, Award, GraduationCap } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

// Shared detail panel for State / UT / Country
export default function DetailPanel({ item, kind, onClose, onPractice }) {
  const { progress, toggleState, toggleUT, toggleCountry, toggleFavourite } = useProgress();
  if (!item) return null;

  const idKey =
    kind === "state" ? `state:${item.id}` :
    kind === "ut" ? `ut:${item.id}` :
    `country:${item.code}`;

  const isLearned =
    kind === "state" ? progress.learnedStates.includes(item.id) :
    kind === "ut" ? progress.learnedUTs.includes(item.id) :
    progress.learnedCountries.includes(item.code);

  const isFav = progress.favourites.includes(idKey);

  const toggle = () => {
    if (kind === "state") toggleState(item.id);
    else if (kind === "ut") toggleUT(item.id);
    else toggleCountry(item.code);
  };

  const capitals = item.capitals || [item.capital];

  return (
    <div className="fixed inset-0 z-50 bg-[var(--navy)]/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-6" onClick={onClose} data-testid="detail-overlay">
      <div
        className="w-full max-w-lg bg-[var(--paper)] rounded-3xl border-2 border-[#E7DDBF] shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
      >
        <div className="relative p-5 sm:p-6 bg-gradient-to-br from-[var(--sky-soft)] via-white to-[var(--cream)]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white border border-[#E7DDBF] flex items-center justify-center hover:bg-[var(--sun)]/60"
            aria-label="Close"
            data-testid="detail-close"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-4xl" aria-hidden>
              {kind === "country" ? item.flag : kind === "ut" ? "🏛️" : "📍"}
            </span>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--navy)]" data-testid="detail-name">
                {item.name}
              </h3>
              {isLearned && <span className="stamp text-xs mt-1 inline-block">Learned</span>}
            </div>
          </div>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-bold text-[var(--navy)] w-24">Capital</dt>
              <dd data-testid="detail-capital">{capitals.join(" / ")}</dd>
            </div>
            {item.region && (
              <div className="flex gap-2">
                <dt className="font-bold text-[var(--navy)] w-24">Region</dt>
                <dd>{item.region}</dd>
              </div>
            )}
            {item.continent && (
              <div className="flex gap-2">
                <dt className="font-bold text-[var(--navy)] w-24">Continent</dt>
                <dd>{item.continent}</dd>
              </div>
            )}
            {item.knownFor && (
              <div className="flex gap-2">
                <dt className="font-bold text-[var(--navy)] w-24">Known for</dt>
                <dd>{item.knownFor}</dd>
              </div>
            )}
          </dl>

          <p className="mt-3 p-3 rounded-2xl bg-white/70 border border-[#F0E6CE] text-sm">
            <span className="font-bold text-[var(--coral)]">Fun fact: </span>
            {item.fact}
          </p>

          {item.capitalNote && (
            <p className="mt-2 text-xs italic text-[var(--navy)]/80" data-testid="capital-note">
              Capital note: {item.capitalNote}
            </p>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-wrap gap-2 border-t border-[#F0E6CE] bg-white">
          <button
            onClick={toggle}
            data-testid="mark-learned-btn"
            className={`flex-1 min-w-[150px] px-4 py-3 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 ${
              isLearned
                ? "bg-[var(--leaf)] text-white"
                : "bg-[var(--sun)] text-[var(--navy)] hover:brightness-105"
            }`}
          >
            <Award size={18} />
            {isLearned ? "Learned ✓ (tap to undo)" : "Mark as Learned"}
          </button>
          <button
            onClick={onPractice}
            data-testid="practice-capital-btn"
            className="flex-1 min-w-[150px] px-4 py-3 rounded-2xl font-bold text-sm bg-[var(--sky)] text-white hover:brightness-105 flex items-center justify-center gap-2"
          >
            <GraduationCap size={18} /> Practice This Capital
          </button>
          <button
            onClick={() => toggleFavourite(idKey)}
            aria-label="Favourite"
            data-testid="favourite-btn"
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
              isFav ? "bg-[var(--coral)] text-white border-[var(--coral)]" : "bg-white border-[#E7DDBF] text-[var(--coral)]"
            }`}
          >
            <Heart size={18} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
