import { STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { NATIONAL_SYMBOLS } from "@/data/nationalSymbolsData";
import { QUIZ_COUNTRIES } from "@/data/worldData";
import { shuffle, pick } from "@/utils/progressUtils";

function uniqueChoices(correct, pool) {
  const set = new Set([correct]);
  const shuffled = shuffle(pool);
  for (const p of shuffled) {
    if (set.size >= 4) break;
    if (p !== correct) set.add(p);
  }
  return shuffle([...set]);
}

// ----- India quiz -----
export function buildIndiaQuiz(n = 5) {
  const stateEntries = STATES.map((s) => ({ place: s.name, capital: s.capital, region: s.region }));
  const utEntries = UNION_TERRITORIES.filter((u) => !u.capitalNote).map((u) => ({ place: u.name, capital: u.capital }));
  const combined = shuffle([...stateEntries, ...utEntries]);
  const questions = [];
  const seen = new Set();

  const stateCapitalPool = STATES.map((s) => s.capital);
  const stateNamePool = STATES.map((s) => s.name);
  const utCapitalPool = UNION_TERRITORIES.map((u) => u.capital);

  for (const e of combined) {
    if (questions.length >= n) break;
    const kind = Math.random() < 0.5 ? "place2cap" : "cap2place";
    let q;
    if (kind === "place2cap") {
      const pool = e.region ? stateCapitalPool : utCapitalPool;
      q = {
        prompt: `What is the capital of ${e.place}?`,
        correct: e.capital,
        choices: uniqueChoices(e.capital, pool),
        explain: `${e.place}'s capital is ${e.capital}.`,
      };
    } else {
      q = {
        prompt: `${e.capital} is the capital of which place?`,
        correct: e.place,
        choices: uniqueChoices(e.place, e.region ? stateNamePool : stateNamePool.concat(UNION_TERRITORIES.map(u=>u.name))),
        explain: `${e.capital} is the capital of ${e.place}.`,
      };
    }
    const key = q.prompt;
    if (!seen.has(key)) {
      seen.add(key);
      questions.push(q);
    }
  }

  // Sprinkle 1 symbol question if space
  if (questions.length < n) {
    const s = pick(NATIONAL_SYMBOLS, 1)[0];
    questions.push({
      prompt: `Which of these is India's ${s.name.replace("National ", "").toLowerCase()}?`,
      correct: s.title,
      choices: uniqueChoices(s.title, NATIONAL_SYMBOLS.map((x) => x.title)),
      explain: `India's ${s.name} is the ${s.title}.`,
    });
  }
  return questions.slice(0, n);
}

// ----- Capital Challenge (mix India + world) -----
export function buildCapitalQuiz(n = 5) {
  const worldPool = QUIZ_COUNTRIES;
  const questions = [];
  const items = shuffle([
    ...STATES.map((s) => ({ place: s.name, capital: s.capital, kind: "state" })),
    ...worldPool.map((c) => ({ place: c.name, capital: c.capital, kind: "country" })),
  ]);
  const capitalPool = items.map((i) => i.capital);
  const placePool = items.map((i) => i.place);
  for (const e of items) {
    if (questions.length >= n) break;
    questions.push({
      prompt: `What is the capital of ${e.place}?`,
      correct: e.capital,
      choices: uniqueChoices(e.capital, capitalPool),
      explain: `${e.place}'s capital is ${e.capital}.`,
    });
  }
  return questions;
}

// ----- Flag Finder -----
export function buildFlagQuiz(n = 5) {
  const items = pick(QUIZ_COUNTRIES, n);
  const namePool = QUIZ_COUNTRIES.map((c) => c.name);
  return items.map((c) => ({
    prompt: "Which country does this flag belong to?",
    subprompt: c.flag,
    correct: c.name,
    choices: uniqueChoices(c.name, namePool),
    explain: `That flag belongs to ${c.name}.`,
  }));
}

// ----- World Mission -----
export function buildWorldQuiz(n = 5) {
  const questions = [];
  const items = shuffle(QUIZ_COUNTRIES);
  const capPool = QUIZ_COUNTRIES.map((c) => c.capital);
  const namePool = QUIZ_COUNTRIES.map((c) => c.name);
  const contPool = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
  for (const c of items) {
    if (questions.length >= n) break;
    const roll = Math.random();
    if (roll < 0.5) {
      questions.push({
        prompt: `What is the capital of ${c.name}?`,
        correct: c.capital,
        choices: uniqueChoices(c.capital, capPool),
        explain: `${c.name}'s capital is ${c.capital}.`,
      });
    } else if (roll < 0.8) {
      questions.push({
        prompt: `${c.capital} is the capital of which country?`,
        correct: c.name,
        choices: uniqueChoices(c.name, namePool),
        explain: `${c.capital} is the capital of ${c.name}.`,
      });
    } else {
      questions.push({
        prompt: `Which continent is ${c.name} in?`,
        correct: c.continent,
        choices: uniqueChoices(c.continent, contPool),
        explain: `${c.name} is in ${c.continent}.`,
      });
    }
  }
  return questions;
}
