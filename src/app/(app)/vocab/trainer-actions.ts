"use server";

import { revalidatePath } from "next/cache";
import { createEmptyCard, fsrs, State, type Grade } from "ts-fsrs";

import { createClient } from "@/lib/supabase/server";
import { deriveStatus } from "@/lib/data/status";

export type TrainerMode = "recognize" | "write";
export type TrainerDirection = "it_de" | "de_it";
export type TrainerFilter = "due" | "learned" | "difficult" | "new" | "random";

export type TrainerOptions = {
  mode: TrainerMode;
  direction: TrainerDirection;
  filter: TrainerFilter;
  lessons: number[]; // leer = alle
  count: number;
};

export type TrainerCard = {
  id: string;
  italian: string;
  german: string;
  ipa: string | null;
  article: string | null;
  word_type: string | null;
};

const PAGE = 1000;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Wählt anhand der Setup-Optionen die zu übenden Karten aus. */
export async function getTrainerCards(
  opts: TrainerOptions,
): Promise<TrainerCard[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // Vokabeln (optional nach Lektion gefiltert), paginiert laden
  const vocab: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = supabase
      .from("vocabulary")
      .select("id,italian,german,ipa,article,word_type,lesson_number")
      .order("lesson_number", { ascending: true })
      .range(from, from + PAGE - 1);
    if (opts.lessons.length > 0) q = q.in("lesson_number", opts.lessons);
    const { data, error } = await q;
    if (error) throw error;
    vocab.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }

  // Fortschritt des Nutzers laden
  const progress: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("user_vocabulary_progress")
      .select("vocabulary_id,due_date,state,reps,lapses,stability")
      .eq("user_id", user.id)
      .range(from, from + PAGE - 1);
    if (error) throw error;
    progress.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  const pmap = new Map(progress.map((p) => [p.vocabulary_id as string, p]));

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Filter anwenden
  let selected = vocab.filter((v) => {
    const p = pmap.get(v.id as string);
    const status = deriveStatus(p as never);
    switch (opts.filter) {
      case "due":
        return p?.due_date && new Date(p.due_date as string) <= todayEnd;
      case "learned":
        return status !== "neu";
      case "difficult":
        return status === "schwierig";
      case "new":
        return status === "neu";
      case "random":
      default:
        return true;
    }
  });

  // "Fällig" nach Fälligkeitsdatum (überfälligste zuerst), sonst mischen
  if (opts.filter === "due") {
    selected.sort(
      (a, b) =>
        new Date(pmap.get(a.id as string)?.due_date as string).getTime() -
        new Date(pmap.get(b.id as string)?.due_date as string).getTime(),
    );
  } else {
    selected = shuffle(selected);
  }

  return selected.slice(0, opts.count).map((v) => ({
    id: v.id as string,
    italian: v.italian as string,
    german: v.german as string,
    ipa: (v.ipa as string) ?? null,
    article: (v.article as string) ?? null,
    word_type: (v.word_type as string) ?? null,
  }));
}

/** Speichert eine Bewertung und berechnet den nächsten FSRS-Termin. */
export async function rateCard(vocabId: string, rating: 1 | 2 | 3 | 4) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht eingeloggt");

  const { data: existing } = await supabase
    .from("user_vocabulary_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("vocabulary_id", vocabId)
    .maybeSingle();

  const now = new Date();
  const f = fsrs();
  let card = createEmptyCard(now);
  if (existing) {
    card = {
      ...card,
      due: existing.due_date ? new Date(existing.due_date) : now,
      stability: existing.stability ?? card.stability,
      difficulty: existing.difficulty ?? card.difficulty,
      elapsed_days: existing.elapsed_days ?? 0,
      scheduled_days: existing.scheduled_days ?? 0,
      reps: existing.reps ?? 0,
      lapses: existing.lapses ?? 0,
      state: (existing.state as State) ?? State.New,
      last_review: existing.last_review
        ? new Date(existing.last_review)
        : undefined,
    };
  }

  const { card: next } = f.next(card, now, rating as Grade);

  const { error } = await supabase.from("user_vocabulary_progress").upsert(
    {
      user_id: user.id,
      vocabulary_id: vocabId,
      due_date: next.due.toISOString(),
      stability: next.stability,
      difficulty: next.difficulty,
      elapsed_days: next.elapsed_days,
      scheduled_days: next.scheduled_days,
      reps: next.reps,
      lapses: next.lapses,
      state: next.state,
      last_review: (next.last_review ?? now).toISOString(),
    },
    { onConflict: "user_id,vocabulary_id" },
  );
  if (error) throw error;
}

/** Protokolliert eine abgeschlossene Lern-Session (für Streak & Stats). */
export async function saveSession(studied: number, correct: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("study_sessions").insert({
    user_id: user.id,
    ended_at: new Date().toISOString(),
    session_type: "vocab",
    items_studied: studied,
    items_correct: correct,
  });

  revalidatePath("/dashboard");
  revalidatePath("/vocab");
}
