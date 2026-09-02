import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Lesson } from "@/types";
import { Button } from "./ui";

interface QuizProps {
  lesson: Lesson;
  onComplete: (correct: number, total: number) => void;
}

export function Quiz({ lesson, onComplete }: QuizProps) {
  return <QuizInner key={lesson.id} lesson={lesson} onComplete={onComplete} />;
}

function QuizInner({ lesson, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex: number, option: string) => {
    if (answers[qIndex] || submitted) return;
    const next = { ...answers, [qIndex]: option };
    setAnswers(next);
    if (Object.keys(next).length === lesson.quiz.length) {
      const correct = lesson.quiz.filter((q, i) => next[i] === q.answer).length;
      setSubmitted(true);
      onComplete(correct, lesson.quiz.length);
    }
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const correct = submitted
    ? lesson.quiz.filter((q, i) => answers[i] === q.answer).length
    : 0;

  return (
    <div className="space-y-3">
      {lesson.quiz.map((q, qi) => {
        const chosen = answers[qi];
        return (
          <div key={qi} className="rounded-lg border border-border bg-bg-alt p-4">
            <div className="mb-3 font-semibold">
              {qi + 1}. {q.q}
            </div>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => {
                let extra = "";
                if (chosen) {
                  if (opt === q.answer) extra = "!border-success bg-success/20 !text-emerald-300";
                  else if (opt === chosen) extra = "!border-error bg-error/20 !text-red-300";
                }
                return (
                  <button
                    key={opt}
                    disabled={!!chosen}
                    onClick={() => handleAnswer(qi, opt)}
                    className={[
                      "rounded-lg border px-3.5 py-2 text-sm font-medium transition-all",
                      chosen
                        ? "border-slate-700/40 text-slate-400"
                        : "border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10",
                      extra,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {submitted && (
        <div className="flex items-center justify-between rounded-lg border border-slate-700/40 bg-bg-alt px-4 py-3">
          <span className="text-sm">
            Score:{" "}
            <b className={correct === lesson.quiz.length ? "text-emerald-400" : "text-amber-300"}>
              {correct}/{lesson.quiz.length}
            </b>
            {correct === lesson.quiz.length && " 🎉"}
          </span>
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={retry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}

