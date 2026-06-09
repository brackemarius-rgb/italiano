"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Repeat, Shuffle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const TENSE_ORDER = [
  "Präsens",
  "Passato prossimo",
  "Imperfetto",
  "Futuro semplice",
  "Futuro",
  "Condizionale",
  "Imperativo",
  "Gerundio",
];

// "andare – Präsens" -> { name: "andare", group: "Präsens" }
function splitTitle(title: string): { name: string; group: string } {
  const i = title.indexOf("–");
  if (i === -1) return { name: title, group: "Weitere" };
  return {
    name: title.slice(0, i).trim(),
    group: title.slice(i + 1).trim(),
  };
}

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

function buildCards(sets: DrillSet[]): Card[] {
  return shuffle(
    sets.flatMap((s) => s.items.map((it) => ({ ...it, ctx: s.title }))),
  );
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

  function start(sets: DrillSet[]) {
    if (sets.length === 0) return;
    setCards(buildCards(sets));
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
          onClick={() => start(DRILL_SETS)}
          className="flex w-full items-center justify-between rounded-2xl bg-ink px-5 py-4 text-bg transition-transform active:scale-[0.99]"
        >
          <span>
            <span className="block font-serif text-lg">Alle gemischt</span>
            <span className="text-sm text-bg/70">
              {DRILL_SETS.reduce((n, s) => n + s.items.length, 0)} Formen,
              zufällig
            </span>
          </span>
          <Shuffle className="size-5" />
        </button>

        {CATEGORIES.map((cat) => {
          const sets = DRILL_SETS.filter((s) => s.category === cat);
          if (sets.length === 0) return null;
          return (
            <section key={cat} className="mt-7">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {cat}
              </h3>
              {cat === "Verben" ? (
                <VerbGroups sets={sets} onStart={start} />
              ) : (
                <SetGrid sets={sets} onStart={(s) => start([s])} />
              )}
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
              (isCorrect ? "border-good text-good" : "border-bad text-bad"),
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

// Verben: nach Zeit gruppiert, aufklappbar
function VerbGroups({
  sets,
  onStart,
}: {
  sets: DrillSet[];
  onStart: (sets: DrillSet[]) => void;
}) {
  const groups = new Map<string, DrillSet[]>();
  for (const s of sets) {
    const { group } = splitTitle(s.title);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(s);
  }
  const ordered = [...groups.entries()].sort((a, b) => {
    const ia = TENSE_ORDER.indexOf(a[0]);
    const ib = TENSE_ORDER.indexOf(b[0]);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a[0].localeCompare(b[0]);
  });

  return (
    <Accordion type="multiple" className="space-y-2">
      {ordered.map(([group, groupSets]) => (
        <AccordionItem
          key={group}
          value={group}
          className="rounded-xl border border-line bg-card px-4"
        >
          <AccordionTrigger className="hover:no-underline">
            <span className="flex w-full items-center justify-between pr-2">
              <span className="font-medium text-ink">{group}</span>
              <span className="font-mono text-xs text-ink-faint">
                {groupSets.length} Verben
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <button
              onClick={() => onStart(groupSets)}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg"
            >
              <Repeat className="size-4" /> Alle {group} gemischt
            </button>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {groupSets.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onStart([s])}
                  className="rounded-lg border border-line px-3 py-2 text-left text-sm transition-colors hover:border-line-strong"
                >
                  <span className="font-serif italic text-ink">
                    {splitTitle(s.title).name}
                  </span>
                  {s.subtitle && (
                    <span className="block text-xs text-ink-faint">
                      {s.subtitle}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// Einfache Kategorien: Sets als Raster
function SetGrid({
  sets,
  onStart,
}: {
  sets: DrillSet[];
  onStart: (set: DrillSet) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {sets.map((s) => (
        <button
          key={s.id}
          onClick={() => onStart(s)}
          className="rounded-xl border border-line bg-card px-4 py-3.5 text-left transition-colors hover:border-line-strong"
        >
          <span className="block text-sm font-medium text-ink">{s.title}</span>
          {s.subtitle && (
            <span className="text-xs text-ink-faint">
              {s.subtitle} · {s.items.length} Formen
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
