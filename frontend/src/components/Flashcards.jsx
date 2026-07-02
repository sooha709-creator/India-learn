import React, { useMemo, useState } from "react";
import { STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { NATIONAL_SYMBOLS } from "@/data/nationalSymbolsData";
import { QUIZ_COUNTRIES } from "@/data/worldData";
import { shuffle, pick } from "@/utils/progressUtils";
import { useProgress } from "@/context/ProgressContext";
import { RotateCcw, CheckCircle2 } from "lucide-react";

const DECKS = {
  states: { label: "Indian States & Capitals", build: () => STATES.map((s) => ({ key: `state:${s.id}`, front: s.name, back: s.capital })) },
  uts: { label: "Union Territories", build: () => UNION_TERRITORIES.map((u) => ({ key: `ut:${u.id}`, front: u.name, back: (u.capitals||[u.capital]).join(" / ") })) },
  symbols: { label: "Indian National Symbols", build: () => NATIONAL_SYMBOLS.map((s) => ({ key: `sym:${s.id}`, front: s.name, back: `${s.title} ${s.icon}` })) },
  world: { label: "World Countries & Capitals", build: () => pick(QUIZ_COUNTRIES, 60).map((c) => ({ key: `country:${c.code}`, front: `${c.flag} ${c.name}`, back: c.capital })) },
};

export default function Flashcards() {
  const [deckId, setDeckId] = useState("states");
  const [direction, setDirection] = useState("front"); // "front" or "back"
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const { recordFlash, progress } = useProgress();

  const cards = useMemo(() => {
    const raw = DECKS[deckId].build();
    // Prioritise practice pool
    const poolSet = new Set(progress.practicePool);
    const priority = raw.filter((c) => poolSet.has(c.key));
    const rest = raw.filter((c) => !poolSet.has(c.key));
    return shuffle(priority).concat(shuffle(rest));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  const card = cards[idx % cards.length];
  const isSymbol = deckId === "symbols";
  const isReverse = direction === "back" && !isSymbol;
  const symbolReverse = isSymbol && direction === "back";

  const questionText = symbolReverse
    ? card.back
    : isReverse
      ? card.back
      : card.front;
  const answerText = symbolReverse
    ? card.front
    : isReverse
      ? card.front
      : card.back;

  const onAction = (knew) => {
    recordFlash(card.key, knew);
    setFlipped(false);
    setIdx((i) => (i + 1) % cards.length);
  };

  return (
    <div className="max-w-xl mx-auto" data-testid="flashcards-panel">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <label className="text-xs sm:text-sm font-semibold text-[var(--navy)]/80">Deck:</label>
        <select
          value={deckId}
          onChange={(e) => { setDeckId(e.target.value); setIdx(0); setFlipped(false); }}
          data-testid="flash-deck-select"
          className="px-3 py-2 rounded-full border-2 border-[#E7DDBF] bg-white text-sm font-semibold"
        >
          {Object.entries(DECKS).map(([id, d]) => <option key={id} value={id}>{d.label}</option>)}
        </select>
        <div className="ml-auto flex bg-[var(--sky-soft)] rounded-full p-1 text-xs font-bold">
          <button
            onClick={() => { setDirection("front"); setFlipped(false); }}
            data-testid="flash-dir-front"
            className={`px-3 py-1.5 rounded-full ${direction === "front" ? "bg-white shadow" : ""}`}
          >
            {isSymbol ? "Symbol → Meaning" : "Place → Capital"}
          </button>
          <button
            onClick={() => { setDirection("back"); setFlipped(false); }}
            data-testid="flash-dir-back"
            className={`px-3 py-1.5 rounded-full ${direction === "back" ? "bg-white shadow" : ""}`}
          >
            {isSymbol ? "Meaning → Symbol" : "Capital → Place"}
          </button>
        </div>
      </div>

      <div className="flip-card">
        <div className={`flip-inner rounded-3xl min-h-[220px] ${flipped ? "flipped" : ""}`}>
          <div className="flip-face absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--sun)]/50 to-[var(--cream)] border-2 border-[#E7DDBF] flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xs font-bold text-[var(--navy)]/70 uppercase tracking-wider">Question</p>
            <p className="font-display text-2xl sm:text-3xl font-bold mt-2 text-[var(--navy)]" data-testid="flash-front">{questionText}</p>
            <button
              onClick={() => setFlipped(true)}
              data-testid="flash-reveal-btn"
              className="mt-5 px-5 py-2.5 rounded-full bg-[var(--coral)] text-white font-bold text-sm"
            >
              Reveal Answer
            </button>
          </div>
          <div className="flip-face flip-back absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--sky-soft)] to-white border-2 border-[#E7DDBF] flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xs font-bold text-[var(--navy)]/70 uppercase tracking-wider">Answer</p>
            <p className="font-display text-2xl sm:text-3xl font-bold mt-2 text-[var(--navy)]" data-testid="flash-back">{answerText}</p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <button onClick={() => onAction(true)} data-testid="flash-knew-btn" className="px-4 py-2.5 rounded-full bg-[var(--leaf)] text-white font-bold text-sm flex items-center gap-1">
                <CheckCircle2 size={16} /> I Knew It
              </button>
              <button onClick={() => onAction(false)} data-testid="flash-again-btn" className="px-4 py-2.5 rounded-full bg-[var(--sun)] text-[var(--navy)] font-bold text-sm flex items-center gap-1">
                <RotateCcw size={16} /> Practise Again
              </button>
              <button onClick={() => { setFlipped(false); setIdx((i)=> (i+1)%cards.length); }} data-testid="flash-next-btn" className="px-4 py-2.5 rounded-full bg-[var(--sky)] text-white font-bold text-sm">
                Next Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-center text-[var(--navy)]/60">
        Card {idx + 1} · {cards.length} in this deck
      </p>
    </div>
  );
}
