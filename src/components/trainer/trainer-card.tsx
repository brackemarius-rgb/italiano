"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type {
  TrainerCard as Card,
  TrainerDirection,
  TrainerMode,
} from "@/app/(app)/vocab/trainer-actions";

const SEPARATORS = new Set([" ", "'", "’", "-"]);
const isSep = (c: string) => SEPARATORS.has(c);

function normalize(s: string, accentTolerant: boolean): string {
  let r = s.toLowerCase().trim();
  if (accentTolerant) r = r.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return r;
}
const onlyLetters = (s: string) => [...s].filter((c) => !isSep(c)).join("");

const RATINGS: { value: 1 | 2 | 3 | 4; label: string; cls: string }[] = [
  { value: 1, label: "Nochmal", cls: "border-bad text-bad hover:bg-bad/5" },
  { value: 2, label: "Schwer", cls: "border-warn text-warn hover:bg-warn/5" },
  { value: 3, label: "Gut", cls: "border-good text-good hover:bg-good/5" },
  { value: 4, label: "Einfach", cls: "border-ink text-ink hover:bg-subtle" },
];

export function TrainerCard({
  card,
  mode,
  direction,
  accentTolerance,
  showIpa = true,
  onRate,
}: {
  card: Card;
  mode: TrainerMode;
  direction: TrainerDirection;
  accentTolerance: boolean;
  showIpa?: boolean;
  onRate: (rating: 1 | 2 | 3 | 4, correct: boolean) => void | Promise<void>;
}) {
  const [revealed, setRevealed] = useState(false); // Erkennen
  const [typed, setTyped] = useState(""); // Schreiben (nur Buchstaben)
  const [checked, setChecked] = useState(false); // Schreiben geprüft
  const [gaveUp, setGaveUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const promptIsItalian = direction === "it_de";
  // Der Artikel ist bei Substantiven bereits in `italian` enthalten (z. B.
  // "il telegramma") – daher NICHT erneut davorsetzen.
  const italianDisplay = card.italian;

  // Im Schreibmodus wird die jeweils ANDERE Sprache getippt.
  const target = promptIsItalian ? card.german : card.italian;
  const targetIsItalian = !promptIsItalian;
  const targetLetters = onlyLetters(target);

  const isCorrect =
    !gaveUp &&
    normalize(typed, accentTolerance) ===
      normalize(targetLetters, accentTolerance);
  const answered = mode === "recognize" ? revealed : checked;

  useEffect(() => {
    if (mode === "write") inputRef.current?.focus();
  }, [card.id, mode]);

  async function rate(r: 1 | 2 | 3 | 4) {
    if (busy) return;
    setBusy(true);
    const correct = mode === "write" ? isCorrect : r >= 3;
    await onRate(r, correct);
  }

  function revealNextLetter() {
    const t = normalize(typed, accentTolerance);
    const g = normalize(targetLetters, accentTolerance);
    let i = 0;
    while (i < t.length && i < g.length && t[i] === g[i]) i++;
    setTyped(targetLetters.slice(0, i + 1));
    inputRef.current?.focus();
  }

  // Wiederverwendbare Wort-Darstellung (Italienisch = Fraunces-Kursiv + IPA)
  const ItalianBlock = ({ size }: { size: "lg" | "sm" }) => (
    <>
      <p
        className={cn(
          "text-center font-serif italic text-ink",
          size === "lg" ? "text-4xl" : "text-2xl",
        )}
      >
        {italianDisplay}
      </p>
      {showIpa && card.ipa && (
        <p className="mt-2 text-center font-mono text-sm text-ink-faint">
          [{card.ipa}]
        </p>
      )}
    </>
  );
  const GermanBlock = ({ size }: { size: "lg" | "sm" }) => (
    <p
      className={cn(
        "text-center text-ink",
        size === "lg" ? "text-3xl" : "text-2xl",
      )}
    >
      {card.german}
    </p>
  );

  // ---------- Erkennen ----------
  if (mode === "recognize") {
    return (
      <div className="rounded-2xl border border-line bg-card px-6 py-10">
        <p className="text-center text-xs uppercase tracking-wide text-ink-faint">
          {card.word_type ?? "Vokabel"}
        </p>
        <div className="mt-3">
          {promptIsItalian ? (
            <ItalianBlock size="lg" />
          ) : (
            <GermanBlock size="lg" />
          )}
        </div>

        {!revealed ? (
          <Button
            size="lg"
            variant="outline"
            className="mt-8 w-full"
            onClick={() => setRevealed(true)}
          >
            Antwort zeigen
          </Button>
        ) : (
          <>
            <div className="mt-6 border-t border-line pt-6">
              {promptIsItalian ? (
                <GermanBlock size="sm" />
              ) : (
                <ItalianBlock size="sm" />
              )}
            </div>
            <RatingRow onRate={rate} busy={busy} />
          </>
        )}
      </div>
    );
  }

  // ---------- Schreiben ----------
  const stream = checked || gaveUp ? targetLetters : typed;
  let letterIdx = 0;

  return (
    <div className="rounded-2xl border border-line bg-card px-6 py-10">
      <p className="text-center text-xs uppercase tracking-wide text-ink-faint">
        {promptIsItalian ? "Wie heißt das auf Deutsch?" : "Wie heißt das auf Italienisch?"}
      </p>
      <div className="mt-3">
        {promptIsItalian ? <ItalianBlock size="sm" /> : <GermanBlock size="sm" />}
      </div>

      {/* Buchstaben-Slots (Apostrophe/Leerzeichen sichtbar) */}
      <div className="mt-8 flex flex-wrap items-end justify-center gap-1.5">
        {[...target].map((ch, idx) => {
          if (isSep(ch)) {
            return ch === " " ? (
              <span key={idx} className="w-3" />
            ) : (
              <span
                key={idx}
                className="flex w-4 items-end justify-center pb-1.5 font-serif text-xl text-ink-faint"
              >
                {ch}
              </span>
            );
          }
          const filled = stream[letterIdx] ?? "";
          letterIdx++;
          return (
            <span
              key={idx}
              className={cn(
                "flex h-11 w-7 items-center justify-center rounded-md border text-lg",
                targetIsItalian ? "font-serif" : "",
                answered
                  ? isCorrect
                    ? "border-good bg-good/5 text-good"
                    : "border-bad bg-bad/5 text-ink"
                  : "border-line-strong text-ink",
              )}
            >
              {filled}
            </span>
          );
        })}
      </div>

      {!answered ? (
        <>
          <Input
            ref={inputRef}
            value={typed}
            onChange={(e) => setTyped(onlyLetters(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setChecked(true);
              }
            }}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            placeholder="Tippe das Wort …"
            className="mt-6 text-center"
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={revealNextLetter}>
              Hinweis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setGaveUp(true);
                setChecked(true);
              }}
            >
              Weiß ich nicht
            </Button>
            <Button size="sm" onClick={() => setChecked(true)}>
              Prüfen
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 text-center">
            {isCorrect ? (
              <p className="text-sm font-medium text-good">Richtig! 🎉</p>
            ) : (
              <p className="text-sm text-ink-soft">
                Lösung:{" "}
                {targetIsItalian ? (
                  <span className="font-serif italic text-brand">
                    {italianDisplay}
                  </span>
                ) : (
                  <span className="font-medium text-brand">{card.german}</span>
                )}
              </p>
            )}
          </div>
          <RatingRow onRate={rate} busy={busy} />
        </>
      )}
    </div>
  );
}

function RatingRow({
  onRate,
  busy,
}: {
  onRate: (r: 1 | 2 | 3 | 4) => void;
  busy: boolean;
}) {
  return (
    <div className="mt-7 grid grid-cols-4 gap-2">
      {RATINGS.map((r) => (
        <Button
          key={r.value}
          variant="outline"
          disabled={busy}
          onClick={() => onRate(r.value)}
          className={cn("h-auto flex-col py-2.5", r.cls)}
        >
          <span className="text-sm font-semibold">{r.label}</span>
        </Button>
      ))}
    </div>
  );
}
