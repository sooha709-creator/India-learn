import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const KEY = "miniatlas_quest_v1";

const defaultProgress = {
  learnedStates: [],       // state IDs
  learnedUTs: [],          // UT IDs
  learnedSymbols: [],      // symbol IDs
  learnedCountries: [],    // country codes
  favourites: [],          // "state:AP", "country:JP"
  flashFamiliarity: {},    // key -> { knew: n, again: n }
  practicePool: [],        // keys
  bestScores: {},          // quizKey -> best score
  matchRounds: 0,
  mapOpened: [],           // state IDs opened via map
  badges: {},              // id -> { date }
  journey: { india: 0, world: 0 },
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return { ...defaultProgress };
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleInArray = (arrName, id) =>
    setProgress((p) => {
      const has = p[arrName].includes(id);
      return { ...p, [arrName]: has ? p[arrName].filter((x) => x !== id) : [...p[arrName], id] };
    });

  const api = {
    progress,
    toggleState: (id) => toggleInArray("learnedStates", id),
    toggleUT: (id) => toggleInArray("learnedUTs", id),
    toggleSymbol: (id) => toggleInArray("learnedSymbols", id),
    toggleCountry: (code) => toggleInArray("learnedCountries", code),
    toggleFavourite: (key) => toggleInArray("favourites", key),
    markMapOpened: (id) =>
      setProgress((p) => (p.mapOpened.includes(id) ? p : { ...p, mapOpened: [...p.mapOpened, id] })),
    recordFlash: (key, knew) =>
      setProgress((p) => {
        const cur = p.flashFamiliarity[key] || { knew: 0, again: 0 };
        const next = knew ? { ...cur, knew: cur.knew + 1 } : { ...cur, again: cur.again + 1 };
        const inPool = p.practicePool.includes(key);
        let pool = p.practicePool;
        if (!knew && !inPool) pool = [...pool, key];
        if (knew && inPool) pool = pool.filter((k) => k !== key);
        return { ...p, flashFamiliarity: { ...p.flashFamiliarity, [key]: next }, practicePool: pool };
      }),
    saveBestScore: (quizKey, score) =>
      setProgress((p) => {
        const prev = p.bestScores[quizKey] || 0;
        return score > prev ? { ...p, bestScores: { ...p.bestScores, [quizKey]: score } } : p;
      }),
    incrementMatch: () => setProgress((p) => ({ ...p, matchRounds: p.matchRounds + 1 })),
    unlockBadge: (id) =>
      setProgress((p) =>
        p.badges[id] ? p : { ...p, badges: { ...p.badges, [id]: { date: new Date().toISOString() } } }
      ),
    setJourney: (kind, val) =>
      setProgress((p) => {
        const nv = Math.max(p.journey[kind], val);
        return nv === p.journey[kind] ? p : { ...p, journey: { ...p.journey, [kind]: nv } };
      }),
    resetAll: () => {
      localStorage.removeItem(KEY);
      setProgress({ ...defaultProgress });
    },
  };

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress outside provider");
  return ctx;
};
