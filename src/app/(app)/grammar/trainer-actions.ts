"use server";

import { revalidatePath } from "next/cache";
import { createEmptyCard, fsrs, State, type Grade } from "ts-fsrs";

import { createClient } from "@/lib/supabase/server";

export type GrammarType = "cloze" | "multiple_choice" | "free_write" | "reorder";

export type GrammarExercise = {
  id: string;
  type: GrammarType;
  prompt_de: string | null;
  content: Record<string, unknown>;
  correct_answer: string | null;
  acceptable_alternatives: string[] | null;
  explanation_de: string | null;
  topicSlug: string | null;
  topicTitle: string | null;
};

export type GrammarTrainerOptions = {
  topics: string[]; // slugs, leer = alle
  types: GrammarType[]; // leer = alle
  count: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getGrammarExercises(
  opts: GrammarTrainerOptions,
): Promise<GrammarExercise[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("exercises")
    .select(
      "id,type,prompt_de,content,correct_answer,acceptable_alternatives,explanation_de,grammar_topics(slug,title)",
    )
    .eq("is_approved", true);
  if (error) throw error;

  let rows: GrammarExercise[] = (data ?? []).map((r) => {
    const topic = r.grammar_topics as unknown as
      | { slug: string; title: string }
      | null;
    return {
      id: r.id as string,
      type: r.type as GrammarType,
      prompt_de: (r.prompt_de as string) ?? null,
      content: (r.content as Record<string, unknown>) ?? {},
      correct_answer: (r.correct_answer as string) ?? null,
      acceptable_alternatives: (r.acceptable_alternatives as string[]) ?? [],
      explanation_de: (r.explanation_de as string) ?? null,
      topicSlug: topic?.slug ?? null,
      topicTitle: topic?.title ?? null,
    };
  });

  if (opts.topics.length > 0)
    rows = rows.filter((r) => r.topicSlug && opts.topics.includes(r.topicSlug));
  if (opts.types.length > 0)
    rows = rows.filter((r) => opts.types.includes(r.type));

  return shuffle(rows).slice(0, opts.count);
}

/** Speichert das Ergebnis einer Übung und berechnet den nächsten FSRS-Termin. */
export async function rateGrammar(exerciseId: string, correct: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht eingeloggt");

  const { data: existing } = await supabase
    .from("user_grammar_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("exercise_id", exerciseId)
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

  // Richtig -> "Gut" (3), falsch -> "Nochmal" (1)
  const rating = (correct ? 3 : 1) as Grade;
  const { card: next } = f.next(card, now, rating);

  const { error } = await supabase.from("user_grammar_progress").upsert(
    {
      user_id: user.id,
      exercise_id: exerciseId,
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
    { onConflict: "user_id,exercise_id" },
  );
  if (error) throw error;
}

export async function saveGrammarSession(studied: number, correct: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("study_sessions").insert({
    user_id: user.id,
    ended_at: new Date().toISOString(),
    session_type: "grammar",
    items_studied: studied,
    items_correct: correct,
  });

  revalidatePath("/dashboard");
}
