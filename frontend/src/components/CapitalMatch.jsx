import React, { useEffect, useState } from "react";
import { STATES } from "@/data/indiaData";
import { QUIZ_COUNTRIES } from "@/data/worldData";
import { shuffle, pick } from "@/utils/progressUtils";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle2, RotateCcw } from "lucide-react";

export default function CapitalMatch() {
  const [mode, setMode] = useState("india");
  const [round, setRound] = useState(0);
  const [items, setItems] = useState([]);
  const [selPlace, setSelPlace] = useState(null);
  const [matches, setMatches] = useState({});
  const [wrong, setWrong] = useState(null);
  const { incrementMatch, progress } = useProgress();

  const newRound = () => {
    const pool = mode === "india" ? STATES.map((s) => ({ place: s.name, capital: s.capital })) : QUIZ_COUNTRIES.map((c) => ({ place: c.name, capital: c.capital }));
    setItems(pick(pool, 4));
    setSelPlace(null);
    setMatches({});
    setWrong(null);
  };

  useEffect(newRound, [mode, round]);

  const capitals = shuffle(items.map((i) => i.capital));

  const onPickPlace = (p) => {
    if (matches[p]) return;
    setSelPlace(p);
    setWrong(null);
  };
  const onPickCapital = (cap) => {
    if (!selPlace) return;
    const correct = items.find((i) => i.place === selPlace)?.capital === cap;
    if (correct) {
      const next = { ...matches, [selPlace]: cap };
      setMatches(next);
      setSelPlace(null);
      if (Object.keys(next).length === items.length) {
        incrementMatch();
        setTimeout(() => setRound((r) => r + 1), 900);
      }
    } else {
      setWrong({ place: selPlace, cap });
      setTimeout(() => setWrong(null), 700);
    }
  };

  return (
    <div className="max-w-xl mx-auto" data-testid="match-panel">
      <div className="flex items-center gap-2 justify-between mb-3">
        <div className="flex bg-[var(--sky-soft)] rounded-full p-1 text-xs font-bold">
          <button data-testid="match-india-btn" onClick={() => setMode("india")} className={`px-3 py-1.5 rounded-full ${mode === "india" ? "bg-white shadow" : ""}`}>India</button>
          <button data-testid="match-world-btn" onClick={() => setMode("world")} className={`px-3 py-1.5 rounded-full ${mode === "world" ? "bg-white shadow" : ""}`}>World</button>
        </div>
        <span className="text-xs font-semibold text-[var(--navy)]/70">Rounds completed: <b data-testid="match-rounds">{progress.matchRounds}</b></span>
        <button data-testid="match-shuffle-btn" onClick={newRound} className="text-xs font-bold text-[var(--coral)] flex items-center gap-1"><RotateCcw size={14} />Shuffle</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--navy)]/70">Places</p>
          {items.map((it) => {
            const matched = !!matches[it.place];
            const isSel = selPlace === it.place;
            return (
              <button
                key={it.place}
                onClick={() => onPickPlace(it.place)}
                data-testid={`match-place-${it.place}`}
                disabled={matched}
                className={`w-full text-left px-3 py-3 rounded-2xl border-2 font-semibold text-sm transition ${
                  matched
                    ? "bg-[#E9F8DD] border-[var(--leaf)] text-[var(--navy)]"
                    : isSel
                      ? "bg-[var(--sun)] border-[var(--coral)]"
                      : "bg-white border-[#E7DDBF] hover:bg-[var(--sky-soft)]"
                }`}
              >
                {matched && <CheckCircle2 size={14} className="inline mr-1 text-[var(--leaf)]" />} {it.place}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--navy)]/70">Capitals</p>
          {capitals.map((cap) => {
            const isUsed = Object.values(matches).includes(cap);
            const isWrong = wrong && wrong.cap === cap;
            return (
              <button
                key={cap}
                onClick={() => onPickCapital(cap)}
                data-testid={`match-cap-${cap}`}
                disabled={isUsed}
                className={`w-full text-left px-3 py-3 rounded-2xl border-2 font-semibold text-sm transition ${
                  isUsed
                    ? "bg-[#E9F8DD] border-[var(--leaf)] text-[var(--navy)]"
                    : isWrong
                      ? "bg-[#FDECE7] border-[var(--coral)]"
                      : "bg-white border-[#E7DDBF] hover:bg-[var(--sky-soft)]"
                }`}
              >
                {cap}
              </button>
            );
          })}
        </div>
      </div>
      {Object.keys(matches).length === items.length && items.length > 0 && (
        <p className="mt-4 text-center font-bold text-[var(--leaf)]" data-testid="match-complete-msg">All matched! New round coming up…</p>
      )}
    </div>
  );
}
