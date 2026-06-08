"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrainerCard } from "./trainer-card";
import { TrainerSetup } from "./trainer-setup";
import {
  getTrainerCards,
  rateCard,
  saveSession,
  type TrainerCard as Card,
  type TrainerDirection,
  type TrainerMode,
  type TrainerOptions,
} from "@/app/(app)/vocab/trainer-actions";

type Phase = "setup" | "loading" | "training" | "done" | "empty";

export function Trainer({
  availableLessons,
  accentTolerance = true,
  showIpa = true,
}: {
  availableLessons: number[];
  accentTolerance?: boolean;
  showIpa?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<TrainerMode>("recognize");
  const [direction, setDirection] = useState<TrainerDirection>("it_de");
  const [cards, setCards] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  async function start(opts: TrainerOptions) {
    setPhase("loading");
    setMode(opts.mode);
    setDirection(opts.direction);
    const c = await getTrainerCards(opts);
    if (c.length === 0) {
      setPhase("empty");
      return;
    }
    setCards(c);
    setIndex(0);
    setResults([]);
    setPhase("training");
  }

  async function handleRate(rating: 1 | 2 | 3 | 4, correct: boolean) {
    const card = cards[index];
    await rateCard(card.id, rating);
    const newResults = [...results, correct];
    setResults(newResults);
    if (index + 1 >= cards.length) {
      await saveSession(cards.length, newResults.filter(Boolean).length);
      setPhase("done");
    } else {
      setIndex(index + 1);
    }
  }

  function reset() {
    setPhase("setup");
    setCards([]);
    setIndex(0);
    setResults([]);
  }

  if (phase === "setup") {
    return <TrainerSetup availableLessons={availableLessons} onStart={start} />;
  }

  if (phase === "loading") {
    return (
      <p className="py-24 text-center text-sm text-ink-soft">
        Karten werden geladen …
      </p>
    );
  }

  if (phase === "empty") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center">
        <p className="font-serif text-xl text-ink">Keine Karten gefunden</p>
        <p className="mt-2 max-w-[30ch] text-sm text-ink-soft">
          Für diese Auswahl gibt es gerade nichts. Probier einen anderen Filter
          oder andere Lektionen.
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
          <DoneStat value={`${results.length}`} label="Karten" />
          <DoneStat value={`${correct}`} label="Richtig" />
          <DoneStat value={`${pct}%`} label="Quote" />
        </div>

        <div className="mt-8 space-y-2">
          <Button className="w-full" onClick={reset}>
            Noch eine Runde
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard">Zum Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // training
  const card = cards[index];
  const progress = (index / cards.length) * 100;

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          aria-label="Training beenden"
          className="flex size-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ink transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs text-ink-faint">
          {index + 1}/{cards.length}
        </span>
      </div>

      <div className="mt-5">
        <TrainerCard
          key={card.id}
          card={card}
          mode={mode}
          direction={direction}
          accentTolerance={accentTolerance}
          showIpa={showIpa}
          onRate={handleRate}
        />
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
