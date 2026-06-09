// Leitet aus dem FSRS-Fortschritt einen verständlichen Lernstatus ab.

export type LearnStatus = "neu" | "lernend" | "schwierig" | "beherrscht";

export type ProgressRow = {
  state: number | null; // FSRS: 0=New, 1=Learning, 2=Review, 3=Relearning
  reps: number | null;
  lapses: number | null;
  stability: number | null;
};

// Beherrscht = Vokabel hat die Lernphase verlassen (FSRS-Status "Review")
// UND wird ca. eine Woche sicher behalten (Stabilität >= 7 Tage).
const MASTERED_STABILITY_DAYS = 7;

export function deriveStatus(p?: ProgressRow | null): LearnStatus {
  if (!p || (p.reps ?? 0) === 0) return "neu";
  if ((p.lapses ?? 0) >= 2) return "schwierig";
  if (p.state === 2 && (p.stability ?? 0) >= MASTERED_STABILITY_DAYS)
    return "beherrscht";
  return "lernend";
}

export const STATUS_META: Record<
  LearnStatus,
  { label: string; dot: string }
> = {
  beherrscht: { label: "Beherrscht", dot: "bg-good" },
  lernend: { label: "Lernend", dot: "bg-warn" },
  schwierig: { label: "Schwierig", dot: "bg-bad" },
  neu: { label: "Neu", dot: "bg-ink-faint" },
};

export const STATUS_ORDER: LearnStatus[] = [
  "beherrscht",
  "lernend",
  "schwierig",
  "neu",
];
