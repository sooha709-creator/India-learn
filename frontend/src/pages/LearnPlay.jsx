import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Flashcards from "@/components/Flashcards";
import Quiz from "@/components/Quiz";
import CapitalMatch from "@/components/CapitalMatch";
import {
  buildIndiaQuiz,
  buildCapitalQuiz,
  buildFlagQuiz,
  buildWorldQuiz,
  buildCountryCapitalQuestion,
} from "@/utils/quizBuilders";
import { COUNTRIES } from "@/data/worldData";
import { useProgress } from "@/context/ProgressContext";
import { Layers, Trophy, Puzzle } from "lucide-react";

const MISSIONS = [
  { id: "india", label: "India Mission", build: buildIndiaQuiz, emoji: "🇮🇳" },
  {
    id: "capital",
    label: "Capital Challenge",
    build: buildCapitalQuiz,
    emoji: "🏛️",
  },
  { id: "flag", label: "Flag Finder", build: buildFlagQuiz, emoji: "🚩" },
  { id: "world", label: "World Mission", build: buildWorldQuiz, emoji: "🌍" },
];

export default function LearnPlay() {
  const [mode, setMode] = useState("flash");
  const [quiz, setQuiz] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { progress } = useProgress();

  const practiceCountryCode = searchParams.get("practiceCountry");

  useEffect(() => {
    if (!practiceCountryCode) return;

    const country = COUNTRIES.find(
      (item) => item.code === practiceCountryCode
    );

    if (country) {
      setMode("quiz");
      setQuiz({
        qs: [buildCountryCapitalQuestion(country)],
        key: `practice:${country.code}`,
      });
    }

    setSearchParams({}, { replace: true });
  }, [practiceCountryCode, setSearchParams]);

  return (
    <div>
      <h1
        className="font-display text-3xl sm:text-4xl font-bold text-[var(--navy)]"
        data-testid="play-heading"
      >
        Learn &amp; Play 🎮
      </h1>

      <p className="text-sm text-[var(--navy)]/70">
        Three fun ways to practise. Pick one!
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 max-w-md">
        {[
          { id: "flash", label: "Flashcards", icon: Layers },
          { id: "quiz", label: "Quiz Adventure", icon: Trophy },
          { id: "match", label: "Capital Match", icon: Puzzle },
        ].map((item) => (
          <button
            key={item.id}
            data-testid={`play-mode-${item.id}`}
            onClick={() => {
              setMode(item.id);
              setQuiz(null);
            }}
            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 font-semibold text-xs sm:text-sm transition ${
              mode === item.id
                ? "bg-[var(--coral)] text-white border-[var(--coral)]"
                : "bg-white border-[#E7DDBF] text-[var(--navy)]"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {mode === "flash" && <Flashcards />}

        {mode === "match" && <CapitalMatch />}

        {mode === "quiz" &&
          (!quiz ? (
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-[var(--navy)]/70 mb-3">
                Pick a mission and a length:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MISSIONS.map((mission) => (
                  <div
                    key={mission.id}
                    className="rounded-3xl border-2 border-[#F0E6CE] bg-white p-4"
                    data-testid={`mission-${mission.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" aria-hidden>
                        {mission.emoji}
                      </span>

                      <h3 className="font-display font-bold text-lg text-[var(--navy)]">
                        {mission.label}
                      </h3>
                    </div>

                    <p className="text-xs text-[var(--navy)]/70 mt-1">
                      Best (5):{" "}
                      <b>{progress.bestScores[`${mission.id}:5`] || 0}</b>
                      {" · "}
                      Best (10):{" "}
                      <b>{progress.bestScores[`${mission.id}:10`] || 0}</b>
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        data-testid={`mission-${mission.id}-5`}
                        onClick={() =>
                          setQuiz({
                            qs: mission.build(5),
                            key: `${mission.id}:5`,
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-full bg-[var(--sky)] text-white font-bold text-sm"
                      >
                        5 Questions
                      </button>

                      <button
                        data-testid={`mission-${mission.id}-10`}
                        onClick={() =>
                          setQuiz({
                            qs: mission.build(10),
                            key: `${mission.id}:10`,
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-full bg-[var(--coral)] text-white font-bold text-sm"
                      >
                        10 Questions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Quiz
                questions={quiz.qs}
                quizKey={quiz.key}
                onExit={() => setQuiz(null)}
              />

              <div className="mt-3 text-center">
                <button
                  onClick={() =>
                    setQuiz({
                      qs: quiz.qs.map((question) => question),
                      key: quiz.key,
                    })
                  }
                  data-testid="play-again-btn"
                  className="px-4 py-2 rounded-full bg-white border-2 border-[#E7DDBF] font-bold text-sm"
                >
                  Play Again
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
