"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type {
  GrammarTrainerOptions,
  GrammarType,
} from "@/app/(app)/grammar/trainer-actions";

const TYPE_LABELS: Record<GrammarType, string> = {
  cloze: "Lückentext",
  multiple_choice: "Multiple Choice",
  free_write: "Satz schreiben",
  reorder: "Satz ordnen",
};

export function GrammarSetup({
  topics,
  types,
  initialTopic,
  onStart,
}: {
  topics: { slug: string; title: string; count: number }[];
  types: GrammarType[];
  initialTopic?: string;
  onStart: (opts: GrammarTrainerOptions) => void;
}) {
  const [selTopics, setSelTopics] = useState<Set<string>>(
    initialTopic ? new Set([initialTopic]) : new Set(),
  );
  const [selTypes, setSelTypes] = useState<Set<GrammarType>>(new Set());
  const [count, setCount] = useState(10);

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    return next;
  }

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center">
        <p className="font-serif text-xl text-ink">Noch keine Übungen</p>
        <p className="mt-2 max-w-[32ch] text-sm text-ink-soft">
          Für den Pilotstart gibt es Übungen zu ausgewählten Themen. Weitere
          folgen.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Themen */}
      <section>
        <h3 className="mb-3 text-sm font-medium text-ink">Themen</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <Chip
              key={t.slug}
              active={selTopics.has(t.slug)}
              onClick={() => setSelTopics(toggle(selTopics, t.slug))}
            >
              {t.title}
            </Chip>
          ))}
        </div>
        {selTopics.size === 0 && (
          <p className="mt-2 text-xs text-ink-faint">
            Keine Auswahl = alle Themen
          </p>
        )}
      </section>

      {/* Übungstypen */}
      <section>
        <h3 className="mb-3 text-sm font-medium text-ink">Übungstypen</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((ty) => (
            <Chip
              key={ty}
              active={selTypes.has(ty)}
              onClick={() => setSelTypes(toggle(selTypes, ty))}
            >
              {TYPE_LABELS[ty]}
            </Chip>
          ))}
        </div>
        {selTypes.size === 0 && (
          <p className="mt-2 text-xs text-ink-faint">
            Keine Auswahl = alle Typen
          </p>
        )}
      </section>

      {/* Anzahl */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-ink">Anzahl Aufgaben</h3>
          <span className="font-mono text-sm text-ink">{count}</span>
        </div>
        <Slider
          min={5}
          max={30}
          step={5}
          value={[count]}
          onValueChange={(v) => setCount(v[0])}
        />
      </section>

      <Button
        size="lg"
        className="w-full"
        onClick={() =>
          onStart({
            topics: [...selTopics],
            types: [...selTypes],
            count,
          })
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
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-ink bg-ink text-bg"
          : "border-line bg-card text-ink-soft hover:border-line-strong",
      )}
    >
      {children}
    </button>
  );
}
