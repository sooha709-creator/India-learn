import React, { useEffect, useMemo, useState } from "react";
import { useProgress } from "@/context/ProgressContext";
import { BADGES, computeBadges, currentLevel, quizStars, totalLearned, indiaJourneyPercent, worldJourneyPercent } from "@/utils/progressUtils";
import { COUNTRIES } from "@/data/worldData";
import { STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { Plane, Compass, Trash2, Lock } from "lucide-react";

export default function Passport() {
  const { progress, resetAll, unlockBadge, setJourney } = useProgress();
  const [confirm, setConfirm] = useState(false);

  const unlocked = useMemo(() => computeBadges(progress), [progress]);
  const unlockedKey = useMemo(() => [...unlocked].sort().join(","), [unlocked]);
  const learned = totalLearned(progress);
  const stars = quizStars(progress);
  const level = currentLevel(learned, stars);
  const indiaPct = indiaJourneyPercent(progress);
  const worldPct = worldJourneyPercent(progress, COUNTRIES.length);

  // Sync unlocked badges into stored progress (persist unlock dates)
  useEffect(() => {
    unlocked.forEach((id) => {
      if (!progress.badges[id]) unlockBadge(id);
    });
    setJourney("india", indiaPct);
    setJourney("world", worldPct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedKey, indiaPct, worldPct]);

  const doReset = () => { resetAll(); setConfirm(false); };

  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--navy)]" data-testid="passport-heading">
        My Explorer Passport 📖
      </h1>

      {/* Header */}
      <section className="mt-3 rounded-3xl border-2 border-[#F0E6CE] bg-gradient-to-br from-[var(--coral)]/15 via-white to-[var(--sky-soft)] p-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-2xl bg-[var(--sun)] flex items-center justify-center text-3xl" aria-hidden>🧭</div>
          <div className="flex-1 min-w-[180px]">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--coral)]">Explorer title</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--navy)]" data-testid="passport-level">{level.name}</h2>
            <p className="text-xs text-[var(--navy)]/70 mt-1">Keep learning to level up your adventure.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Stat label="Cards learned" value={learned} testid="stat-total" />
          <Stat label="Quiz stars" value={stars} testid="stat-quizstars" />
          <Stat label="Countries explored" value={progress.learnedCountries.length} testid="stat-countries" />
          <Stat label="States & UTs" value={progress.learnedStates.length + progress.learnedUTs.length} testid="stat-indiaregions" />
        </div>
      </section>

      {/* Journey */}
      <section className="mt-5 rounded-3xl border-2 border-[#F0E6CE] bg-white p-5">
        <h3 className="font-display font-bold text-xl text-[var(--navy)] flex items-center gap-2"><Compass size={20} /> Your Journey</h3>
        <JourneyRoute label="India route" percent={indiaPct} color="#FF7A59" icon="🇮🇳" testid="journey-india" />
        <JourneyRoute label="World route" percent={worldPct} color="#5EC6F2" icon="🌍" testid="journey-world" />
      </section>

      {/* Badges */}
      <section className="mt-5">
        <h3 className="font-display font-bold text-xl text-[var(--navy)] mb-3">Passport Stamps</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const isUnlocked = unlocked.has(b.id);
            const date = progress.badges[b.id]?.date;
            return (
              <div
                key={b.id}
                data-testid={`badge-${b.id}`}
                className={`rounded-3xl border-2 p-4 text-center transition ${
                  isUnlocked
                    ? "bg-gradient-to-br from-[var(--sun)]/40 to-white border-[var(--sun)]"
                    : "bg-[var(--muted)] border-[#E7DDBF] opacity-70"
                }`}
              >
                <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center text-2xl ${isUnlocked ? "bg-[var(--coral)] text-white stamp-glow" : "bg-white text-[var(--navy)]/40"}`} aria-hidden>
                  {isUnlocked ? "⭐" : <Lock size={20} />}
                </div>
                <h4 className="font-display font-bold text-sm mt-2 text-[var(--navy)]">{b.title}</h4>
                <p className="text-[11px] text-[var(--navy)]/70 mt-1">
                  {isUnlocked ? b.celebrate : b.hint}
                </p>
                {isUnlocked && date && (
                  <p className="text-[10px] mt-1 text-[var(--navy)]/50">Unlocked {new Date(date).toLocaleDateString()}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Reset */}
      <section className="mt-6 rounded-3xl border-2 border-[#F0E6CE] bg-white p-5">
        <h3 className="font-display font-bold text-lg text-[var(--navy)]">Start fresh?</h3>
        <p className="text-sm text-[var(--navy)]/70 mt-1">
          This will remove your saved learning progress, quiz scores, stamps, favourites, and practise history from this browser. Your learning content will remain available.
        </p>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} data-testid="reset-btn" className="mt-3 px-4 py-2.5 rounded-full bg-white border-2 border-[var(--coral)] text-[var(--coral)] font-bold text-sm flex items-center gap-2">
            <Trash2 size={16} /> Reset My Explorer Progress
          </button>
        ) : (
          <div className="mt-3 flex gap-2">
            <button onClick={doReset} data-testid="reset-confirm-btn" className="px-4 py-2.5 rounded-full bg-[var(--coral)] text-white font-bold text-sm">Yes, reset</button>
            <button onClick={() => setConfirm(false)} data-testid="reset-cancel-btn" className="px-4 py-2.5 rounded-full bg-white border-2 border-[#E7DDBF] font-bold text-sm">Cancel</button>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, testid }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-[#F0E6CE] p-3 text-center" data-testid={testid}>
      <div className="font-display font-bold text-2xl text-[var(--coral)]">{value}</div>
      <div className="text-[11px] font-semibold text-[var(--navy)]/70 mt-0.5">{label}</div>
    </div>
  );
}

function JourneyRoute({ label, percent, color, icon, testid }) {
  return (
    <div className="mt-4" data-testid={testid}>
      <div className="flex justify-between text-xs font-semibold text-[var(--navy)]"><span>{label}</span><span>{percent}%</span></div>
      <div className="relative mt-2 h-14 rounded-2xl bg-[var(--sky-soft)] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
          <path d="M2 15 Q 25 2, 50 12 T 98 6" stroke={color} strokeWidth="0.7" fill="none" className="dotted-path" />
        </svg>
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-700"
          style={{ left: `calc(${percent}% - 18px)` }}
        >
          <span className="text-2xl inline-block" aria-hidden>
            <Plane size={22} className="rotate-12" style={{ color }} />
          </span>
        </div>
        <span className="absolute right-2 top-1 text-lg" aria-hidden>{icon}</span>
      </div>
    </div>
  );
}
