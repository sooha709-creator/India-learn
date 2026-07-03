import React, { useEffect, useMemo, useState } from "react";
import { COUNTRIES, CONTINENTS } from "@/data/worldData";
import { useProgress } from "@/context/ProgressContext";
import { pick } from "@/utils/progressUtils";
import DetailPanel from "@/components/DetailPanel";
import { Search, RefreshCw } from "lucide-react";

const PAGE_SIZE = 24;

function FlagImage({ country, large = false }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
      alt={`${country.name} flag`}
      width={large ? 56 : 40}
      height={large ? 42 : 30}
      loading="lazy"
      className={
        large
          ? "w-14 h-[42px] rounded-md border border-slate-200 object-cover shadow-sm"
          : "w-10 h-[30px] rounded border border-slate-200 object-cover"
      }
    />
  );
}

export default function WorldExplorer() {
  const { progress } = useProgress();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("A-Z");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selectedCode, setSelectedCode] = useState(null);
  const [stopCode, setStopCode] = useState(null);

  useEffect(() => {
    setStopCode(pick(COUNTRIES, 1)[0].code);
  }, []);

  const nextStop = () => {
    let code;

    do {
      code = pick(COUNTRIES, 1)[0].code;
    } while (code === stopCode && COUNTRIES.length > 1);

    setStopCode(code);
  };

  const filtered = useMemo(() => {
    let list = [...COUNTRIES];

    if (CONTINENTS.includes(filter)) {
      list = list.filter((country) => country.continent === filter);
    } else if (filter === "Learned") {
      list = list.filter((country) =>
        progress.learnedCountries.includes(country.code)
      );
    } else if (filter === "Still Practising") {
      list = list.filter(
        (country) => !progress.learnedCountries.includes(country.code)
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      list = list.filter(
        (country) =>
          country.name.toLowerCase().includes(query) ||
          country.capital.toLowerCase().includes(query) ||
          country.continent.toLowerCase().includes(query)
      );
    }

    if (sort === "A-Z") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Capital A-Z") {
      list.sort((a, b) => a.capital.localeCompare(b.capital));
    } else if (sort === "Continent") {
      list.sort(
        (a, b) =>
          a.continent.localeCompare(b.continent) ||
          a.name.localeCompare(b.name)
      );
    }

    return list;
  }, [filter, search, sort, progress]);

  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [filter, search, sort]);

  const shown = filtered.slice(0, limit);
  const stopCountry = COUNTRIES.find((country) => country.code === stopCode);
  const selected = selectedCode
    ? COUNTRIES.find((country) => country.code === selectedCode)
    : null;

  return (
    <div>
      <h1
        className="font-display text-3xl sm:text-4xl font-bold text-[var(--navy)]"
        data-testid="world-heading"
      >
        World Explorer 🌍
      </h1>

      <p className="text-sm text-[var(--navy)]/70">
        Meet all 193 UN member countries. Learn a little every day.
      </p>

      {stopCountry && (
        <section
          className="mt-4 rounded-3xl border-2 border-[#F0E6CE] bg-gradient-to-br from-[var(--sun)]/30 via-white to-[var(--sky-soft)] p-4 sm:p-5"
          data-testid="world-stop"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--coral)]">
            Today&apos;s World Stop
          </p>

          <div className="mt-1 flex items-center gap-3 flex-wrap">
            <FlagImage country={stopCountry} large />

            <div className="flex-1 min-w-[160px]">
              <h2 className="font-display text-2xl font-bold text-[var(--navy)]">
                {stopCountry.name}
              </h2>

              <p className="text-sm">
                <b>Capital:</b>{" "}
                {(stopCountry.capitals || [stopCountry.capital]).join(" / ")} ·{" "}
                <b>Continent:</b> {stopCountry.continent}
              </p>

              <p className="text-sm text-[var(--navy)]/80 mt-1">
                {stopCountry.fact}
              </p>
            </div>

            <button
              onClick={nextStop}
              data-testid="world-next-stop-btn"
              className="px-4 py-2.5 rounded-full bg-[var(--coral)] text-white font-bold text-sm flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Show Another Country
            </button>
          </div>
        </section>
      )}

      <div className="mt-5 flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--navy)]/50"
            size={16}
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a country, capital, or continent"
            data-testid="world-search"
            className="w-full pl-9 pr-3 py-2.5 rounded-full border-2 border-[#E7DDBF] bg-white text-sm"
          />
        </div>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          data-testid="world-sort"
          className="px-3 py-2.5 rounded-full border-2 border-[#E7DDBF] bg-white text-sm font-semibold"
        >
          <option>A-Z</option>
          <option>Capital A-Z</option>
          <option>Continent</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {["All", ...CONTINENTS, "Learned", "Still Practising"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            data-testid={`world-filter-${item.replace(/\s+/g, "-")}`}
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
        {shown.map((country) => {
          const learned = progress.learnedCountries.includes(country.code);

          return (
            <button
              key={country.code}
              onClick={() => setSelectedCode(country.code)}
              data-testid={`world-card-${country.code}`}
              className="text-left rounded-2xl border-2 border-[#F0E6CE] bg-white hover:bg-[var(--sky-soft)] transition p-3"
            >
              {learned && (
                <div className="mb-2 flex justify-end">
                  <span className="rounded-full border-2 border-[var(--coral)] px-2 py-0.5 text-[10px] font-bold leading-none text-[var(--coral)]">
                    Learned
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FlagImage country={country} />

                <span className="text-[10px] font-bold uppercase text-[var(--coral)] tracking-wider">
                  {country.continent}
                </span>
              </div>

              <p className="font-display font-bold text-sm sm:text-base text-[var(--navy)] mt-1 leading-tight">
                {country.name}
              </p>

              <p className="text-xs text-[var(--navy)]/70 mt-0.5">
                <b>Capital:</b> {country.capital}
              </p>
            </button>
          );
        })}

        {shown.length === 0 && (
          <p className="col-span-full text-center text-sm text-[var(--navy)]/60 py-8">
            No countries match your search.
          </p>
        )}
      </div>

      {limit < filtered.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setLimit((currentLimit) => currentLimit + PAGE_SIZE)}
            data-testid="world-load-more"
            className="px-5 py-2.5 rounded-full bg-[var(--sky)] text-white font-bold text-sm"
          >
            Load More ({filtered.length - limit} left)
          </button>
        </div>
      )}

      <p className="mt-2 text-center text-xs text-[var(--navy)]/60">
        Showing {shown.length} of {filtered.length}
      </p>

      {selected && (
        <DetailPanel
          item={selected}
          kind="country"
          onClose={() => setSelectedCode(null)}
          onPractice={() => setSelectedCode(null)}
        />
      )}
    </div>
  );
}
