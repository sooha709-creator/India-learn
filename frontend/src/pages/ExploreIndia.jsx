import React, { useMemo, useState } from "react";
import { STATES, UNION_TERRITORIES, REGIONS } from "@/data/indiaData";
import { NATIONAL_SYMBOLS } from "@/data/nationalSymbolsData";
import { useProgress } from "@/context/ProgressContext";
import { quizStars } from "@/utils/progressUtils";
import { buildIndiaQuiz } from "@/utils/quizBuilders";
import IndiaMap from "@/components/IndiaMap";
import DetailPanel from "@/components/DetailPanel";
import Quiz from "@/components/Quiz";
import { Search, MapPin, Sparkles } from "lucide-react";

const ALL_INDIA = [
  ...STATES.map((state) => ({ ...state, kind: "state" })),
  ...UNION_TERRITORIES.map((ut) => ({ ...ut, kind: "ut" })),
];

const ENCOURAGEMENTS = [
  "Every new fact makes you a stronger explorer.",
  "Ready for your next discovery?",
  "Small steps can take you around the world.",
];

export default function ExploreIndia() {
  const { progress, toggleSymbol, markMapOpened } = useProgress();
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("A-Z");
  const [tab, setTab] = useState("map");
  const [quiz, setQuiz] = useState(null);

  const selected = selectedId
    ? ALL_INDIA.find((item) => item.id === selectedId)
    : null;

  const openSelect = (id) => {
    setSelectedId(id);
    markMapOpened(id);
  };

  const filtered = useMemo(() => {
    let list = [...ALL_INDIA];

    if (filter === "States") {
      list = list.filter((item) => item.kind === "state");
    } else if (filter === "Union Territories") {
      list = list.filter((item) => item.kind === "ut");
    } else if (REGIONS.includes(filter)) {
      list = list.filter((item) => item.region === filter);
    } else if (filter === "Learned") {
      list = list.filter(
        (item) =>
          progress.learnedStates.includes(item.id) ||
          progress.learnedUTs.includes(item.id)
      );
    } else if (filter === "Still Practising") {
      list = list.filter(
        (item) =>
          !progress.learnedStates.includes(item.id) &&
          !progress.learnedUTs.includes(item.id)
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.capital.toLowerCase().includes(query)
      );
    }

    if (sort === "A-Z") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Region") {
      list.sort((a, b) => (a.region || "Z").localeCompare(b.region || "Z"));
    } else if (sort === "Capital A-Z") {
      list.sort((a, b) => a.capital.localeCompare(b.capital));
    }

    return list;
  }, [filter, search, sort, progress]);

  const cardsLearned =
    progress.learnedStates.length +
    progress.learnedUTs.length +
    progress.learnedSymbols.length;

  const worldLearned = progress.learnedCountries.length;
  const stars = quizStars(progress);

  return (
    <div>
      <section className="rounded-3xl bg-gradient-to-br from-[var(--sky-soft)] via-white to-[var(--cream)] border border-[#F0E6CE] p-5 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--coral)]">
          MiniAtlas Quest
        </p>

        <h1
          className="font-display text-3xl sm:text-5xl font-bold mt-1 text-[var(--navy)]"
          data-testid="welcome-heading"
        >
          Hello, Explorer!{" "}
          <span className="block sm:inline">
            Where would you like to travel today?
          </span>
        </h1>

        <p className="mt-2 text-sm text-[var(--navy)]/70">
          {ENCOURAGEMENTS[cardsLearned % ENCOURAGEMENTS.length]}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <ProgressCard
            icon="🇮🇳"
            label="India cards learned"
            value={cardsLearned}
            testid="stat-india"
          />
          <ProgressCard
            icon="🌍"
            label="World cards learned"
            value={worldLearned}
            testid="stat-world"
          />
          <ProgressCard
            icon="⭐"
            label="Quiz stars collected"
            value={stars}
            testid="stat-stars"
          />
        </div>
      </section>

      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar" role="tablist">
        {[
          { id: "map", label: "States & UTs Map" },
          { id: "list", label: "Explorer Grid" },
          { id: "symbols", label: "National Symbols" },
          { id: "quiz", label: "India Quiz" },
        ].map((item) => (
          <button
            key={item.id}
            data-testid={`india-tab-${item.id}`}
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap border-2 transition ${
              tab === item.id
                ? "bg-[var(--coral)] text-white border-[var(--coral)]"
                : "bg-white border-[#E7DDBF] text-[var(--navy)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "map" && (
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
            <IndiaMap selectedId={selectedId} onSelect={openSelect} />

            <div className="rounded-3xl bg-white border-2 border-[#F0E6CE] p-4">
              <h3 className="font-display font-bold text-lg text-[var(--navy)] flex items-center gap-2">
                <MapPin size={18} />
                All States & UTs
              </h3>

              <p className="text-xs text-[var(--navy)]/60 mb-3">
                Same regions as the map. Tap any chip to open its card.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {ALL_INDIA.map((item) => {
                  const learned =
                    progress.learnedStates.includes(item.id) ||
                    progress.learnedUTs.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => openSelect(item.id)}
                      data-testid={`chip-${item.id}`}
                      className={`text-xs px-2.5 py-1.5 rounded-full border-2 font-semibold transition ${
                        learned
                          ? "bg-[#E9F8DD] border-[var(--leaf)] text-[var(--navy)]"
                          : "bg-[var(--sky-soft)] border-[#BFE2F4] text-[var(--navy)] hover:bg-[var(--sun)]/50"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === "list" && (
          <div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative flex-1 min-w-[220px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--navy)]/50"
                  size={16}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search a state, Union Territory, or capital"
                  data-testid="india-search"
                  className="w-full pl-9 pr-3 py-2.5 rounded-full border-2 border-[#E7DDBF] bg-white text-sm"
                />
              </div>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                data-testid="india-sort"
                className="px-3 py-2.5 rounded-full border-2 border-[#E7DDBF] bg-white text-sm font-semibold"
              >
                <option>A-Z</option>
                <option>Region</option>
                <option>Capital A-Z</option>
              </select>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "All",
                "States",
                "Union Territories",
                ...REGIONS,
                "Learned",
                "Still Practising",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  data-testid={`india-filter-${item.replace(/\s+/g, "-")}`}
                  className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold ${
                    filter === item
                      ? "bg-[var(--coral)] text-white border-[var(--coral)]"
                      : "bg-white border-[#E7DDBF] text-[var(--navy)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((item) => {
                const learned =
                  progress.learnedStates.includes(item.id) ||
                  progress.learnedUTs.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => openSelect(item.id)}
                    data-testid={`india-card-${item.id}`}
                    className="text-left rounded-2xl border-2 border-[#F0E6CE] bg-white hover:bg-[var(--sky-soft)] transition p-3"
                  >
                    <div className="mb-2 h-5 flex justify-end">
                      {learned && (
                        <span className="rounded-full border-2 border-[var(--coral)] px-2 py-0.5 text-[10px] font-bold leading-none text-[var(--coral)]">
                          Learned
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] font-bold uppercase text-[var(--coral)] tracking-wider">
                      {item.kind === "ut" ? "UT" : item.region}
                    </p>

                    <p className="font-display font-bold text-sm sm:text-base text-[var(--navy)] mt-1 leading-tight">
                      {item.name}
                    </p>

                    <p className="text-xs text-[var(--navy)]/70 mt-1">
                      <b>Capital:</b> {item.capital}
                    </p>
                  </button>
                );
              })}

              {filtered.length === 0 && (
                <p className="col-span-full text-center text-sm text-[var(--navy)]/60 py-8">
                  No matches. Try another search.
                </p>
              )}
            </div>
          </div>
        )}

        {tab === "symbols" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NATIONAL_SYMBOLS.map((symbol) => {
              const learned = progress.learnedSymbols.includes(symbol.id);

              return (
                <div
                  key={symbol.id}
                  data-testid={`symbol-card-${symbol.id}`}
                  className="rounded-3xl border-2 border-[#F0E6CE] bg-white p-4 relative"
                >
                  {learned && (
                    <span className="absolute top-3 right-3 stamp text-[10px]">
                      Learned
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="text-4xl" aria-hidden>
                      {symbol.icon}
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase text-[var(--coral)] tracking-wider">
                        {symbol.name}
                      </p>

                      <h3 className="font-display font-bold text-lg text-[var(--navy)]">
                        {symbol.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-[var(--navy)]/80">
                    {symbol.explanation}
                  </p>

                  <p className="mt-2 text-xs p-2 rounded-xl bg-[var(--sky-soft)]">
                    <b className="text-[var(--coral)]">Fact:</b> {symbol.fact}
                  </p>

                  <button
                    onClick={() => toggleSymbol(symbol.id)}
                    data-testid={`symbol-learn-${symbol.id}`}
                    className={`mt-3 w-full py-2 rounded-full font-bold text-sm ${
                      learned
                        ? "bg-[var(--leaf)] text-white"
                        : "bg-[var(--sun)] text-[var(--navy)]"
                    }`}
                  >
                    {learned ? "Learned ✓ (tap to undo)" : "Mark as Learned"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === "quiz" &&
          (!quiz ? (
            <div className="max-w-lg mx-auto text-center rounded-3xl border-2 border-[#F0E6CE] bg-white p-6">
              <Sparkles className="mx-auto text-[var(--sun)]" size={36} />

              <h3 className="font-display text-2xl font-bold mt-2 text-[var(--navy)]">
                India Quiz
              </h3>

              <p className="text-sm text-[var(--navy)]/70 mt-1">
                Pick your challenge, Explorer.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button
                  data-testid="india-quiz-5"
                  onClick={() =>
                    setQuiz({ qs: buildIndiaQuiz(5), key: "india:5" })
                  }
                  className="px-5 py-3 rounded-full bg-[var(--sky)] text-white font-bold"
                >
                  Quick India Quiz (5)
                </button>

                <button
                  data-testid="india-quiz-10"
                  onClick={() =>
                    setQuiz({ qs: buildIndiaQuiz(10), key: "india:10" })
                  }
                  className="px-5 py-3 rounded-full bg-[var(--coral)] text-white font-bold"
                >
                  India Challenge (10)
                </button>
              </div>

              <div className="mt-4 text-xs text-[var(--navy)]/60">
                Best India (5): <b>{progress.bestScores["india:5"] || 0}</b> ·
                Best India (10):{" "}
                <b>{progress.bestScores["india:10"] || 0}</b>
              </div>
            </div>
          ) : (
            <Quiz
              questions={quiz.qs}
              quizKey={quiz.key}
              onExit={() => setQuiz(null)}
            />
          ))}
      </div>

      {selected && (
        <DetailPanel
          item={selected}
          kind={selected.kind}
          onClose={() => setSelectedId(null)}
          onPractice={() => {
            setSelectedId(null);
            setTab("quiz");
            setQuiz({ qs: buildIndiaQuiz(5), key: "india:5" });
          }}
        />
      )}
    </div>
  );
}

function ProgressCard({ icon, label, value, testid }) {
  return (
    <div
      className="rounded-2xl bg-white border-2 border-[#F0E6CE] p-3 sm:p-4 text-center"
      data-testid={testid}
    >
      <div className="text-2xl sm:text-3xl" aria-hidden>
        {icon}
      </div>

      <div className="font-display font-bold text-2xl sm:text-3xl text-[var(--coral)] leading-none mt-1">
        {value}
      </div>

      <div className="text-[10px] sm:text-xs font-semibold text-[var(--navy)]/70 mt-1 leading-tight">
        {label}
      </div>
    </div>
  );
}
