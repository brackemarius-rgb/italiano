"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { GrammarExercise as Exercise } from "@/app/(app)/grammar/trainer-actions";

function norm(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matches(candidate: string, ex: Exercise): boolean {
  const valid = [ex.correct_answer ?? "", ...(ex.acceptable_alternatives ?? [])]
    .filter(Boolean)
    .map(norm);
  return valid.includes(norm(candidate));
}

export function GrammarExercise({
  exercise,
  onNext,
}: {
  exercise: Exercise;
  onNext: (correct: boolean) => void;
}) {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>(() =>
    exercise.type === "reorder"
      ? shuffleTokens((exercise.content.tokens as string[]) ?? [])
      : [],
  );
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  function check(candidate: string) {
    const ok = matches(candidate, exercise);
    setCorrect(ok);
    setChecked(true);
  }

  const sentence = (exercise.content.sentence as string) ?? "";

  return (
    <div className="rounded-2xl border border-line bg-card px-6 py-8">
      {exercise.topicTitle && (
        <p className="text-xs uppercase tracking-wide text-ink-faint">
          {exercise.topicTitle}
        </p>
      )}
      <p className="mt-2 text-ink">{exercise.prompt_de}</p>

      {/* --- Eingabebereich je nach Typ --- */}
      <div className="mt-6">
        {exercise.type === "cloze" && (
          <ClozeInput
            sentence={sentence}
            value={text}
            onChange={setText}
            onEnter={() => !checked && text && check(text)}
            disabled={checked}
          />
        )}

        {exercise.type === "multiple_choice" && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {((exercise.content.options as string[]) ?? []).map((opt) => {
              const isAnswer = norm(opt) === norm(exercise.correct_answer ?? "");
              const isPicked = selected === opt;
              return (
                <button
                  key={opt}
                  disabled={checked}
                  onClick={() => {
                    setSelected(opt);
                    check(opt);
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left font-serif text-lg italic transition-colors",
                    !checked && "border-line bg-card hover:border-line-strong",
                    checked && isAnswer && "border-good bg-good/5 text-good",
                    checked &&
                      isPicked &&
                      !isAnswer &&
                      "border-bad bg-bad/5 text-bad",
                    checked && !isAnswer && !isPicked && "border-line opacity-50",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {exercise.type === "free_write" && (
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !checked && text) {
                e.preventDefault();
                check(text);
              }
            }}
            disabled={checked}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Italienischer Satz …"
            className="text-center"
          />
        )}

        {exercise.type === "reorder" && (
          <div>
            <div className="flex min-h-[3rem] flex-wrap items-center gap-2 rounded-xl border border-line-strong bg-bg px-3 py-2">
              {chosen.length === 0 && (
                <span className="text-sm text-ink-faint">
                  Wörter unten antippen …
                </span>
              )}
              {chosen.map((w, i) => (
                <button
                  key={`${w}-${i}`}
                  disabled={checked}
                  onClick={() => {
                    setChosen(chosen.filter((_, idx) => idx !== i));
                    setPool([...pool, w]);
                  }}
                  className="rounded-lg bg-ink px-3 py-1.5 font-serif italic text-bg"
                >
                  {w}
                </button>
              ))}
            </div>
            {pool.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {pool.map((w, i) => (
                  <button
                    key={`${w}-${i}`}
                    disabled={checked}
                    onClick={() => {
                      setChosen([...chosen, w]);
                      setPool(pool.filter((_, idx) => idx !== i));
                    }}
                    className="rounded-lg border border-line bg-card px-3 py-1.5 font-serif italic text-ink hover:border-line-strong"
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- Aktion / Feedback --- */}
      {!checked ? (
        exercise.type !== "multiple_choice" && (
          <Button
            className="mt-6 w-full"
            disabled={
              exercise.type === "reorder" ? pool.length > 0 : text.trim() === ""
            }
            onClick={() =>
              check(exercise.type === "reorder" ? chosen.join(" ") : text)
            }
          >
            Prüfen
          </Button>
        )
      ) : (
        <div className="mt-6">
          <div
            className={cn(
              "rounded-xl px-4 py-3 text-sm",
              correct
                ? "bg-good/5 text-good"
                : "bg-bad/5 text-ink-soft",
            )}
          >
            {correct ? (
              <p className="font-medium text-good">Richtig! 🎉</p>
            ) : (
              <p>
                Richtige Antwort:{" "}
                <span className="font-serif italic text-brand">
                  {exercise.correct_answer}
                </span>
              </p>
            )}
            {exercise.explanation_de && (
              <p className="mt-2 text-ink-soft">{exercise.explanation_de}</p>
            )}
          </div>
          <Button className="mt-4 w-full" onClick={() => onNext(correct)}>
            Weiter
          </Button>
        </div>
      )}
    </div>
  );
}

function ClozeInput({
  sentence,
  value,
  onChange,
  onEnter,
  disabled,
}: {
  sentence: string;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  disabled: boolean;
}) {
  const [before, after] = sentence.split("___");
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-center font-serif text-xl italic text-ink">
      <span>{before}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
          }
        }}
        disabled={disabled}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="w-28 rounded-md border-b-2 border-line-strong bg-transparent px-1 py-0.5 text-center font-serif italic text-brand outline-none focus:border-ink"
      />
      <span>{after}</span>
    </p>
  );
}

function shuffleTokens(tokens: string[]): string[] {
  const a = [...tokens];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Falls zufällig die korrekte Reihenfolge entsteht, einmal rotieren
  if (a.length > 1 && a.join(" ") === tokens.join(" ")) a.push(a.shift()!);
  return a;
}
