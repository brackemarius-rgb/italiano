"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GrammarExercise } from "./grammar-exercise";
import { GrammarSetup } from "./grammar-setup";
import {
  getGrammarExercises,
  rateGrammar,
  saveGrammarSession,
  type GrammarExercise as Exercise,
  type GrammarTrainerOptions,
  type GrammarType,
} from "@/app/(app)/grammar/trainer-actions";

type Phase = "setup" | "loading" | "training" | "done" | "empty";

export function GrammarTrainer({
  topics,
  types,
  initialTopic,
}: {
  topics: { slug: string; title: string; count: number }[];
  types: GrammarType[];
  initialTopic?: string;
}) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  async function start(opts: GrammarTrainerOptions) {
    setPhase("loading");
    const ex = await getGrammarExercises(opts);
    if (ex.length === 0) {
      setPhase("empty");
      return;
    }
    setExercises(ex);
    setIndex(0);
    setResults([]);
    setPhase("training");
  }

  async function handleNext(correct: boolean) {
    const ex = exercises[index];
    await rateGrammar(ex.id, correct);
    const newResults = [...results, correct];
    setResults(newResults);
    if (index + 1 >= exercises.length) {
      await saveGrammarSession(
        exercises.length,
        newResults.filter(Boolean).length,
      );
      setPhase("done");
    } else {
      setIndex(index + 1);
    }
  }

  function reset() {
    setPhase("setup");
    setExercises([]);
    setIndex(0);
    setResults([]);
  }

  if (phase === "setup") {
    return (
      <GrammarSetup
        topics={topics}
        types={types}
        initialTopic={initialTopic}
        onStart={start}
      />
    );
  }

  if (phase === "loading") {
    return (
      <p className="py-24 text-center text-sm text-ink-soft">
        Aufgaben werden geladen …
      </p>
    );
  }

  if (phase === "empty") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center">
        <p className="font-serif text-xl text-ink">Keine Aufgaben gefunden</p>
        <p className="mt-2 max-w-[30ch] text-sm text-ink-soft">
          Für diese Auswahl gibt es gerade nichts. Probier andere Themen oder
          Typen.
        </p>
        <Button variant="outline" className="mt-6" onClick={reset}>
          Zurück zum Setup
        </Button>
      </div>
    );
  }

  if (phase === "done") {
    const correct = results.filter(Boolean).length;
    const pct = results.length
      ? Math.round((correct / results.length) * 100)
      : 0;
    return (
      <div className="rounded-2xl border border-line bg-card px-6 py-12 text-center">
        <p className="font-serif text-3xl italic text-ink">
          {pct >= 80 ? "Bravissimo!" : pct >= 50 ? "Ben fatto!" : "Continua così!"}
        </p>
        <p className="mt-2 text-sm text-ink-soft">Session abgeschlossen</p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <DoneStat value={`${results.length}`} label="Aufgaben" />
          <DoneStat value={`${correct}`} label="Richtig" />
          <DoneStat value={`${pct}%`} label="Quote" />
        </div>
        <div className="mt-8 space-y-2">
          <Button className="w-full" onClick={reset}>
            Noch eine Runde
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/grammar">Zur Übersicht</Link>
          </Button>
        </div>
      </div>
    );
  }

  // training
  const ex = exercises[index];
  return (
    <div>
      {/* Fortschritts-Pips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {exercises.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < results.length
                ? results[i]
                  ? "bg-good"
                  : "bg-bad"
                : i === index
                  ? "bg-ink"
                  : "bg-line",
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-right font-mono text-xs text-ink-faint">
        {index + 1}/{exercises.length}
      </p>

      <div className="mt-3">
        <GrammarExercise key={ex.id} exercise={ex} onNext={handleNext} />
      </div>
    </div>
  );
}

function DoneStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line px-3 py-4">
      <p className="font-serif text-2xl text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{label}</p>
    </div>
  );
}
