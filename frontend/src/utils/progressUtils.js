import { STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { NATIONAL_SYMBOLS } from "@/data/nationalSymbolsData";

export const BADGES = [
  { id: "first_discovery", title: "First Discovery", hint: "Learn your very first card.", celebrate: "You've taken your first step, Explorer!" },
  { id: "india_explorer", title: "India Explorer", hint: "Learn 10 India cards.", celebrate: "Ten Indian regions in your passport!" },
  { id: "capital_captain", title: "Capital Captain", hint: "Score 4/5+ in an India or Capital Quiz.", celebrate: "You're mastering the capitals!" },
  { id: "ut_trekker", title: "Union Territory Trekker", hint: "Learn every Union Territory card.", celebrate: "You've trekked through every UT!" },
  { id: "symbols_star", title: "National Symbols Star", hint: "Learn every National Symbol card.", celebrate: "You know India's proud symbols!" },
  { id: "world_traveller", title: "World Traveller", hint: "Learn 25 world country cards.", celebrate: "Twenty-five countries in your journey!" },
  { id: "global_navigator", title: "Global Navigator", hint: "Learn 75 world country cards.", celebrate: "You truly know your way around the globe!" },
  { id: "quiz_champion", title: "Quiz Champion", hint: "Score 10/10 in any 10-question quiz.", celebrate: "A perfect score - amazing work!" },
  { id: "map_adventurer", title: "Map Adventurer", hint: "Open cards from 10+ different Indian regions.", celebrate: "You've explored the length and breadth of India!" },
];

export const LEVELS = [
  { name: "Curious Traveller", min: 0 },
  { name: "India Explorer", min: 8 },
  { name: "Capital Captain", min: 20 },
  { name: "World Wanderer", min: 40 },
  { name: "Atlas Adventurer", min: 80 },
  { name: "Map Master", min: 140 },
];

export function computeBadges(progress) {
  const learnedTotal =
    progress.learnedStates.length +
    progress.learnedUTs.length +
    progress.learnedSymbols.length +
    progress.learnedCountries.length;

  const unlocked = new Set();
  if (learnedTotal >= 1) unlocked.add("first_discovery");
  if (progress.learnedStates.length + progress.learnedUTs.length >= 10) unlocked.add("india_explorer");
  if (progress.learnedUTs.length >= UNION_TERRITORIES.length) unlocked.add("ut_trekker");
  if (progress.learnedSymbols.length >= NATIONAL_SYMBOLS.length) unlocked.add("symbols_star");
  if (progress.learnedCountries.length >= 25) unlocked.add("world_traveller");
  if (progress.learnedCountries.length >= 75) unlocked.add("global_navigator");
  if (progress.mapOpened.length >= 10) unlocked.add("map_adventurer");

  // Quiz-based
  Object.entries(progress.bestScores || {}).forEach(([key, val]) => {
    if ((key.startsWith("india") || key.startsWith("capital")) && val >= 4) unlocked.add("capital_captain");
    if (key.endsWith(":10") && val === 10) unlocked.add("quiz_champion");
  });

  return unlocked;
}

export function currentLevel(learnedTotal, quizStars) {
  const score = learnedTotal + quizStars * 2;
  let cur = LEVELS[0];
  for (const l of LEVELS) if (score >= l.min) cur = l;
  return cur;
}

export function quizStars(progress) {
  return Object.values(progress.bestScores || {}).reduce((a, b) => a + b, 0);
}

export function totalLearned(progress) {
  return (
    progress.learnedStates.length +
    progress.learnedUTs.length +
    progress.learnedSymbols.length +
    progress.learnedCountries.length
  );
}

// helper to shuffle
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

// STATES + UTs count for computing journey values
export function indiaJourneyPercent(progress) {
  const total = STATES.length + UNION_TERRITORIES.length + NATIONAL_SYMBOLS.length;
  const learned = progress.learnedStates.length + progress.learnedUTs.length + progress.learnedSymbols.length;
  return Math.min(100, Math.round((learned / total) * 100));
}
export function worldJourneyPercent(progress, total) {
  return Math.min(100, Math.round((progress.learnedCountries.length / total) * 100));
}
