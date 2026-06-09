"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Repeat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DRILL_SETS_BASE, type DrillSet } from "@/lib/data/drills";
import { DRILL_SETS_GENERATED } from "@/lib/data/drills.generated";

// Generierte Sets bevorzugen; sonst die handgepflegte Basis. Nach id dedupliziert.
const DRILL_SETS: DrillSet[] = (() => {
  const source = DRILL_SETS_GENERATED.length
    ? DRILL_SETS_GENERATED
    : DRILL_SETS_BASE;
  const seen = new Set<string>();
  return source.filter((s) => (seen.has(s.id) ? false : seen.add(s.id)));
})();

// Kategorien in bevorzugter Reihenfolge, Rest alphabetisch dahinter.
const CATEGORY_ORDER = [
  "Pronomen",
  "Verben",
  "Artikel",
  "Substantive",
  "Adjektive",
  "Zahlen",
];
const CATEGORIES = [...new Set(DRILL_SETS.map((s) => s.category))].sort(
  (a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  },
);

type Card = { prompt: string; answer: string; alt?: string[]; ctx: string };
type Phase = "select" | "drill" | "done";

function norm(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ");
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function buildCards(set: DrillSet | "all"): Card[] {
  if (set === "all") {
    return shuffle(
      DRILL_SETS.flatMap((s) =>
        s.items.map((it) => ({ ...it, ctx: s.title })),
      ),
    );
  }
  return shuffle(set.items.map((it) => ({ ...it, ctx: set.title })));
}

export function Drills() {
  const [phase, setPhase] = useState<Phase>("select");
  const [cards, setCards] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === "drill" && !checked) inputRef.current?.focus();
  }, [phase, index, checked]);

  function start(set: DrillSet | "all") {
    setCards(buildCards(set));
    setIndex(0);
    setTyped("");
    setChecked(false);
    setCorrectCount(0);
    setPhase("drill");
  }

  const card = cards[index];
  const isCorrect =
    !!card &&
    (norm(typed) === norm(card.answer) ||
      (card.alt ?? []).some((a) => norm(typed) === norm(a)));

  function handleEnter() {
    if (!checked) {
      if (typed.trim() === "") return;
      if (isCorrect) setCorrectCount((c) => c + 1);
      setChecked(true);
    } else {
      next();
    }
  }

  function next() {
    if (index + 1 >= cards.length) {
      setPhase("done");
    } else {
      setIndex(index + 1);
      setTyped("");
      setChecked(false);
    }
  }

  // ---------- Auswahl ----------
  if (phase === "select") {
    return (
      <div>
        <button
          onClick={() => start("all")}
          className="flex w-full items-center justify-between rounded-2xl bg-ink px-5 py-4 text-bg transition-transform active:scale-[0.99]"
        >
          <span>
            <span className="block font-serif text-lg">Alle gemischt</span>
            <span className="text-sm text-bg/70">
              {DRILL_SETS.reduce((n, s) => n + s.items.length, 0)} Formen,
              zufällig
            </span>
          </span>
          <Repeat className="size-5" />
        </button>

        {CATEGORIES.map((cat) => {
          const sets = DRILL_SETS.filter((s) => s.category === cat);
          if (sets.length === 0) return null;
          return (
            <section key={cat} className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {cat}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {sets.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => start(s)}
                    className="rounded-xl border border-line bg-card px-4 py-3.5 text-left transition-colors hover:border-line-strong"
                  >
                    <span className="block text-sm font-medium text-ink">
                      {s.title}
                    </span>
                    <span className="text-xs text-ink-faint">
                      {s.subtitle} · {s.items.length} Formen
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // ---------- Fertig ----------
  if (phase === "done") {
    const pct = cards.length
      ? Math.round((correctCount / cards.length) * 100)
      : 0;
    return (
      <div className="rounded-2xl border border-line bg-card px-6 py-12 text-center">
        <p className="font-serif text-3xl italic text-ink">
          {pct >= 80 ? "Perfetto!" : pct >= 50 ? "Weiter so!" : "Dranbleiben!"}
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          {correctCount}/{cards.length} richtig ({pct}%)
        </p>
        <div className="mt-8 space-y-2">
          <Button
            className="w-full"
            onClick={() => {
              setCards((c) => shuffle(c));
              setIndex(0);
              setTyped("");
              setChecked(false);
              setCorrectCount(0);
              setPhase("drill");
            }}
          >
            Nochmal
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setPhase("select")}
          >
            Andere Übung
          </Button>
        </div>
      </div>
    );
  }

  // ---------- Drill ----------
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPhase("select")}
          aria-label="Zurück"
          className="flex size-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ink transition-all"
            style={{ width: `${(index / cards.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-ink-faint">
          {index + 1}/{cards.length}
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-card px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-wide text-ink-faint">
          {card.ctx}
        </p>
        <p className="mt-3 text-3xl text-ink">{card.prompt}</p>

        <Input
          ref={inputRef}
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleEnter();
            }
          }}
          disabled={checked}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          placeholder="Italienisch …"
          className={cn(
            "mt-7 text-center font-serif text-lg",
            checked &&
              (isCorrect
                ? "border-good text-good"
                : "border-brand text-brand"),
          )}
        />

        {checked && (
          <div className="mt-4 text-sm">
            {isCorrect ? (
              <p className="font-medium text-good">Richtig! 🎉</p>
            ) : (
              <p className="text-ink-soft">
                Lösung:{" "}
                <span className="font-serif italic text-brand">
                  {card.answer}
                </span>
              </p>
            )}
          </div>
        )}

        <Button className="mt-6 w-full" onClick={handleEnter}>
          {checked ? "Weiter" : "Prüfen"}
        </Button>
      </div>
    </div>
  );
}
