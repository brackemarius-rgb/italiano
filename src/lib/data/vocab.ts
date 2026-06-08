import { createClient } from "@/lib/supabase/server";
import { deriveStatus, type LearnStatus, type ProgressRow } from "./status";

export type VocabItem = {
  id: string;
  italian: string;
  german: string;
  ipa: string | null;
  word_type: string | null;
  article: string | null;
  lesson_number: number | null;
  status: LearnStatus;
};

export type LessonGroup = {
  lesson: number;
  total: number;
  learned: number;
  mastered: number;
  items: VocabItem[];
};

const PAGE = 1000;

/** Holt alle Vokabeln (paginiert, da PostgREST max. 1000/Anfrage liefert). */
async function fetchAllVocab(
  supabase: Awaited<ReturnType<typeof createClient>>,
) {
  const rows: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("vocabulary")
      .select("id,italian,german,ipa,word_type,article,lesson_number")
      .order("lesson_number", { ascending: true })
      .order("italian", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return rows;
}

async function fetchAllProgress(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const rows: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("user_vocabulary_progress")
      .select("vocabulary_id,state,reps,lapses,stability")
      .eq("user_id", userId)
      .range(from, from + PAGE - 1);
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return rows;
}

/** Alle Vokabeln mit abgeleitetem Lernstatus des aktuellen Nutzers. */
export async function getVocabularyWithProgress(): Promise<VocabItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const [vocab, progress] = await Promise.all([
    fetchAllVocab(supabase),
    fetchAllProgress(supabase, user.id),
  ]);

  const pmap = new Map<string, ProgressRow>(
    progress.map((p) => [
      p.vocabulary_id as string,
      p as unknown as ProgressRow,
    ]),
  );

  return vocab.map((v) => ({
    id: v.id as string,
    italian: v.italian as string,
    german: v.german as string,
    ipa: (v.ipa as string) ?? null,
    word_type: (v.word_type as string) ?? null,
    article: (v.article as string) ?? null,
    lesson_number: (v.lesson_number as number) ?? null,
    status: deriveStatus(pmap.get(v.id as string)),
  }));
}

/** Gruppiert Vokabeln nach Lektion inkl. Fortschritts-Aggregaten. */
export function groupByLesson(items: VocabItem[]): LessonGroup[] {
  const map = new Map<number, VocabItem[]>();
  for (const it of items) {
    const l = it.lesson_number ?? 0;
    if (!map.has(l)) map.set(l, []);
    map.get(l)!.push(it);
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([lesson, group]) => ({
      lesson,
      total: group.length,
      learned: group.filter((i) => i.status !== "neu").length,
      mastered: group.filter((i) => i.status === "beherrscht").length,
      items: group,
    }));
}
