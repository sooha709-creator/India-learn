import React, { useMemo, useState } from "react";
import { shuffle } from "@/utils/progressUtils";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

// question shape: { prompt, subprompt?, correct, choices: [] , explain }
export default function Quiz({ questions, quizKey, onExit }) {
  const { saveBestScore, unlockBadge, progress } = useProgress();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const qs = useMemo(() => questions, [questions]);
  const q = qs[idx];

  const submit = (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 < qs.length) {
      setIdx(idx + 1);
      setSelected(null);
    } else {
      const finalScore = score;
      saveBestScore(quizKey, finalScore);
      if (finalScore >= 4 && (quizKey.startsWith("india") || quizKey.startsWith("capital")))
        unlockBadge("capital_captain");
      if (quizKey.endsWith(":10") && finalScore === qs.length && qs.length === 10)
        unlockBadge("quiz_champion");
      setSaved(true);
      setDone(true);
    }
  };

  if (done) {
    const best = progress.bestScores[quizKey] || 0;
    return (
      <div className="rounded-3xl border-2 border-[#F0E6CE] bg-white p-6 sm:p-8 text-center max-w-md mx-auto" data-testid="quiz-result">
        <Sparkles className="mx-auto text-[var(--sun)]" size={40} />
        <h3 className="font-display text-2xl font-bold mt-2">Quiz Complete!</h3>
        <p className="text-4xl font-display font-bold mt-3 text-[var(--coral)]" data-testid="quiz-score">
          {score} / {qs.length}
        </p>
        <p className="mt-2 text-sm text-[var(--navy)]">
          {score === qs.length
            ? "A perfect score, Explorer! You are on fire."
            : score >= Math.ceil(qs.length * 0.6)
              ? "Great job! Every question makes you sharper."
              : "Nice try! Keep exploring, you're learning fast."}
        </p>
        <p className="mt-1 text-xs text-[var(--navy)]/70">Best so far: {Math.max(best, score)}</p>
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          <button
            onClick={onExit}
            data-testid="quiz-exit-btn"
            className="px-5 py-2.5 rounded-full bg-[var(--sky)] text-white font-bold"
          >
            Try Another Mission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-2 border-[#F0E6CE] bg-white p-5 sm:p-6 max-w-xl mx-auto" data-testid="quiz-panel">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[var(--navy)]/80">
        <span>Question {idx + 1} of {qs.length}</span>
        <span className="text-[var(--coral)]">Score: {score}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-[var(--sky-soft)] overflow-hidden">
        <div className="h-full bg-[var(--sky)] transition-all" style={{ width: `${((idx) / qs.length) * 100}%` }} />
      </div>

      <h3 className="font-display text-lg sm:text-xl font-bold mt-4 text-[var(--navy)]" data-testid="quiz-question">
        {q.prompt}
      </h3>
      {q.subprompt && <div className="text-4xl mt-2" aria-hidden>{q.subprompt}</div>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.choices.map((c, i) => {
          const isCorrect = selected !== null && c === q.correct;
          const isWrongPick = selected === c && c !== q.correct;
          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => submit(c)}
              data-testid={`quiz-choice-${i}`}
              className={`text-left px-4 py-3 rounded-2xl font-semibold border-2 transition flex items-center gap-2 ${
                isCorrect
                  ? "bg-[#E9F8DD] border-[var(--leaf)] text-[var(--navy)]"
                  : isWrongPick
                    ? "bg-[#FDECE7] border-[var(--coral)] text-[var(--navy)]"
                    : "bg-white border-[#E7DDBF] hover:bg-[var(--sky-soft)] text-[var(--navy)]"
              }`}
            >
              {isCorrect && <CheckCircle2 size={18} className="text-[var(--leaf)]" />}
              {isWrongPick && <XCircle size={18} className="text-[var(--coral)]" />}
              <span>{c}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`mt-4 p-3 rounded-2xl text-sm ${selected === q.correct ? "bg-[#E9F8DD]" : "bg-[#FDECE7]"}`} data-testid="quiz-feedback">
          {selected === q.correct ? (
            <p><span className="font-bold">Great job, Explorer!</span> {q.explain || ""}</p>
          ) : (
            <p><span className="font-bold">Nice try!</span> The correct answer is <strong>{q.correct}</strong>. You are learning with every question.</p>
          )}
          <button
            onClick={next}
            data-testid="quiz-next-btn"
            className="mt-3 px-4 py-2 rounded-full bg-[var(--coral)] text-white font-bold"
          >
            {idx + 1 < qs.length ? "Next Question" : "See Result"}
          </button>
        </div>
      )}
    </div>
  );
}
