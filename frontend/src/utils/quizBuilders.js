import { STATES, UNION_TERRITORIES } from "@/data/indiaData";
import { NATIONAL_SYMBOLS } from "@/data/nationalSymbolsData";
import { QUIZ_COUNTRIES } from "@/data/worldData";
import { shuffle, pick } from "@/utils/progressUtils";

function uniqueChoices(correct, pool) {
  const set = new Set([correct]);
  const shuffled = shuffle(pool);

  for (const item of shuffled) {
    if (set.size >= 4) break;
    if (item !== correct) set.add(item);
  }

  return shuffle([...set]);
}

export function buildIndiaQuiz(n = 5) {
  const stateEntries = STATES.map((state) => ({
    place: state.name,
    capital: state.capital,
    region: state.region,
  }));

  const utEntries = UNION_TERRITORIES.filter(
    (ut) => !ut.capitalNote
  ).map((ut) => ({
    place: ut.name,
    capital: ut.capital,
  }));

  const combined = shuffle([...stateEntries, ...utEntries]);
  const questions = [];
  const seen = new Set();

  const stateCapitalPool = STATES.map((state) => state.capital);
  const stateNamePool = STATES.map((state) => state.name);
  const utCapitalPool = UNION_TERRITORIES.map((ut) => ut.capital);

  for (const entry of combined) {
    if (questions.length >= n) break;

    const type = Math.random() < 0.5 ? "place2cap" : "cap2place";
    let question;

    if (type === "place2cap") {
      const pool = entry.region ? stateCapitalPool : utCapitalPool;

      question = {
        prompt: `What is the capital of ${entry.place}?`,
        correct: entry.capital,
        choices: uniqueChoices(entry.capital, pool),
        explain: `${entry.place}'s capital is ${entry.capital}.`,
      };
    } else {
      question = {
        prompt: `${entry.capital} is the capital of which place?`,
        correct: entry.place,
        choices: uniqueChoices(
          entry.place,
          entry.region
            ? stateNamePool
            : stateNamePool.concat(UNION_TERRITORIES.map((ut) => ut.name))
        ),
        explain: `${entry.capital} is the capital of ${entry.place}.`,
      };
    }

    if (!seen.has(question.prompt)) {
      seen.add(question.prompt);
      questions.push(question);
    }
  }

  if (questions.length < n) {
    const symbol = pick(NATIONAL_SYMBOLS, 1)[0];

    questions.push({
      prompt: `Which of these is India's ${symbol.name
        .replace("National ", "")
        .toLowerCase()}?`,
      correct: symbol.title,
      choices: uniqueChoices(
        symbol.title,
        NATIONAL_SYMBOLS.map((item) => item.title)
      ),
      explain: `India's ${symbol.name} is the ${symbol.title}.`,
    });
  }

  return questions.slice(0, n);
}

export function buildCapitalQuiz(n = 5) {
  const items = shuffle([
    ...STATES.map((state) => ({
      place: state.name,
      capital: state.capital,
      kind: "state",
    })),
    ...QUIZ_COUNTRIES.map((country) => ({
      place: country.name,
      capital: country.capital,
      kind: "country",
    })),
  ]);

  const capitalPool = items.map((item) => item.capital);
  const questions = [];

  for (const entry of items) {
    if (questions.length >= n) break;

    questions.push({
      prompt: `What is the capital of ${entry.place}?`,
      correct: entry.capital,
      choices: uniqueChoices(entry.capital, capitalPool),
      explain: `${entry.place}'s capital is ${entry.capital}.`,
    });
  }

  return questions;
}

export function buildCountryCapitalQuestion(country) {
  const capitalPool = QUIZ_COUNTRIES.map((item) => item.capital);

  return {
    prompt: `What is the capital of ${country.name}?`,
    correct: country.capital,
    choices: uniqueChoices(country.capital, capitalPool),
    explain: `${country.name}'s capital is ${country.capital}.`,
  };
}

export function buildFlagQuiz(n = 5) {
  const items = pick(QUIZ_COUNTRIES, n);
  const namePool = QUIZ_COUNTRIES.map((country) => country.name);

  return items.map((country) => ({
    prompt: "Which country does this flag belong to?",
    subprompt: country.flag,
    correct: country.name,
    choices: uniqueChoices(country.name, namePool),
    explain: `That flag belongs to ${country.name}.`,
  }));
}

export function buildWorldQuiz(n = 5) {
  const questions = [];
  const items = shuffle(QUIZ_COUNTRIES);
  const capitalPool = QUIZ_COUNTRIES.map((country) => country.capital);
  const namePool = QUIZ_COUNTRIES.map((country) => country.name);
  const continentPool = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  for (const country of items) {
    if (questions.length >= n) break;

    const roll = Math.random();

    if (roll < 0.5) {
      questions.push({
        prompt: `What is the capital of ${country.name}?`,
        correct: country.capital,
        choices: uniqueChoices(country.capital, capitalPool),
        explain: `${country.name}'s capital is ${country.capital}.`,
      });
    } else if (roll < 0.8) {
      questions.push({
        prompt: `${country.capital} is the capital of which country?`,
        correct: country.name,
        choices: uniqueChoices(country.name, namePool),
        explain: `${country.capital} is the capital of ${country.name}.`,
      });
    } else {
      questions.push({
        prompt: `Which continent is ${country.name} in?`,
        correct: country.continent,
        choices: uniqueChoices(country.continent, continentPool),
        explain: `${country.name} is in ${country.continent}.`,
      });
    }
  }

  return questions;
}
