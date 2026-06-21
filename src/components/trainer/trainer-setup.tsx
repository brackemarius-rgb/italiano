"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type {
  TrainerDirection,
  TrainerFilter,
  TrainerMode,
  TrainerOptions,
} from "@/app/(app)/vocab/trainer-actions";

const MODES: { value: TrainerMode; label: string; hint: string }[] = [
  { value: "recognize", label: "Erkennen", hint: "Antwort aufdecken" },
  { value: "write", label: "Schreiben", hint: "Wort eintippen" },
];

const DIRECTIONS: { value: TrainerDirection; label: string; hint: string }[] = [
  { value: "it_de", label: "IT → DE", hint: "Italienisch vorgegeben" },
  { value: "de_it", label: "DE → IT", hint: "Deutsch vorgegeben" },
];

const FILTERS: { value: TrainerFilter; label: string }[] = [
  { value: "random", label: "Zufällig" },
  { value: "due", label: "Heute fällig" },
  { value: "new", label: "Neue" },
  { value: "learned", label: "Gelernte" },
  { value: "difficult", label: "Schwierige" },
];

export function TrainerSetup({
  availableLessons,
  onStart,
}: {
  availableLessons: number[];
  onStart: (opts: TrainerOptions) => void;
}) {
  const [mode, setMode] = useState<TrainerMode>("recognize");
  const [direction, setDirection] = useState<TrainerDirection>("it_de");
  const [filter, setFilter] = useState<TrainerFilter>("random");
  const [lessons, setLessons] = useState<Set<number>>(new Set());
  const [count, setCount] = useState(20);

  function toggleLesson(n: number) {
    setLessons((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  return (
    <div className="space-y-8">
      {/* Modus */}
      <section>
        <h3 className="mb-3 text-sm font-medium text-ink">Modus</h3>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                mode === m.value
                  ? "border-brand-dk bg-brand-dk text-bg"
                  : "border-line bg-card text-ink hover:border-line-strong",
              )}
            >
              <span className="block text-sm font-semibold">{m.label}</span>
              <span
                className={cn(
                  "mt-0.5 block text-xs",
                  mode === m.value ? "text-bg/70" : "text-ink-faint",
                )}
              >
                {m.hint}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Richtung */}
      <section>
        <h3 className="mb-3 text-sm font-medium text-ink">Richtung</h3>
        <div className="grid grid-cols-2 gap-2">
          {DIRECTIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => setDirection(d.value)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                direction === d.value
                  ? "border-brand-dk bg-brand-dk text-bg"
                  : "border-line bg-card text-ink hover:border-line-strong",
              )}
            >
              <span className="block text-sm font-semibold">{d.label}</span>
              <span
                className={cn(
                  "mt-0.5 block text-xs",
                  direction === d.value ? "text-bg/70" : "text-ink-faint",
                )}
              >
                {d.hint}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section>
        <h3 className="mb-3 text-sm font-medium text-ink">Auswahl</h3>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Chip
              key={f.value}
              active={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Chip>
          ))}
        </div>
      </section>

      {/* Lektionen */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-ink">Lektionen</h3>
          {lessons.size > 0 && (
            <button
              onClick={() => setLessons(new Set())}
              className="text-xs text-ink-soft hover:text-ink"
            >
              Alle ({availableLessons.length})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableLessons.map((n) => (
            <Chip key={n} active={lessons.has(n)} onClick={() => toggleLesson(n)}>
              {n}
            </Chip>
          ))}
        </div>
        {lessons.size === 0 && (
          <p className="mt-2 text-xs text-ink-faint">
            Keine Auswahl = alle Lektionen
          </p>
        )}
      </section>

      {/* Anzahl */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-ink">Anzahl Karten</h3>
          <span className="font-mono text-sm text-ink">{count}</span>
        </div>
        <Slider
          min={5}
          max={100}
          step={5}
          value={[count]}
          onValueChange={(v) => setCount(v[0])}
        />
      </section>

      <Button
        size="lg"
        className="w-full"
        onClick={() =>
          onStart({ mode, direction, filter, lessons: [...lessons], count })
        }
      >
        Training starten
      </Button>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "min-w-9 rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-brand-dk bg-brand-dk text-bg"
          : "border-line bg-card text-ink-soft hover:border-line-strong",
      )}
    >
      {children}
    </button>
  );
}
