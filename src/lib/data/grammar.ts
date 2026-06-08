import { createClient } from "@/lib/supabase/server";
import type { GrammarType } from "@/app/(app)/grammar/trainer-actions";

export type GrammarListItem = {
  slug: string;
  title: string;
  category: string | null;
  level: string | null;
};

export type GrammarTopic = GrammarListItem & {
  content_md: string | null;
  common_mistakes: string[] | null;
  related_lessons: number[] | null;
};

const CATEGORY_ORDER = [
  "Phonetik",
  "Rechtschreibung",
  "Artikel",
  "Substantiv",
  "Adjektiv",
  "Adverb",
  "Pronomen",
  "Verben/Zeiten",
  "Präpositionen",
  "Satzbau",
  "Wortschatz/Referenz",
];

export type GrammarCategory = {
  category: string;
  topics: GrammarListItem[];
};

/** Alle Grammatik-Themen, nach Kategorie gruppiert und sinnvoll sortiert. */
export async function getGrammarByCategory(): Promise<GrammarCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("grammar_topics")
    .select("slug,title,category,level")
    .order("title", { ascending: true });

  const groups = new Map<string, GrammarListItem[]>();
  for (const t of (data ?? []) as GrammarListItem[]) {
    const c = t.category ?? "Sonstiges";
    if (!groups.has(c)) groups.set(c, []);
    groups.get(c)!.push(t);
  }

  const rank = (c: string) => {
    const i = CATEGORY_ORDER.indexOf(c);
    return i === -1 ? 999 : i;
  };

  return [...groups.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
    .map(([category, topics]) => ({ category, topics }));
}

export type GrammarTrainerMeta = {
  topics: { slug: string; title: string; count: number }[];
  types: GrammarType[];
};

/** Welche Themen & Übungstypen haben überhaupt (freigegebene) Übungen? */
export async function getGrammarTrainerMeta(): Promise<GrammarTrainerMeta> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exercises")
    .select("type,grammar_topics(slug,title)")
    .eq("is_approved", true);

  const topicMap = new Map<string, { slug: string; title: string; count: number }>();
  const types = new Set<GrammarType>();
  for (const r of data ?? []) {
    types.add(r.type as GrammarType);
    const t = r.grammar_topics as unknown as
      | { slug: string; title: string }
      | null;
    if (t) {
      const e = topicMap.get(t.slug) ?? { slug: t.slug, title: t.title, count: 0 };
      e.count++;
      topicMap.set(t.slug, e);
    }
  }
  return {
    topics: [...topicMap.values()].sort((a, b) => a.title.localeCompare(b.title)),
    types: [...types],
  };
}

/** Anzahl freigegebener Übungen zu einem Thema (für die CTA auf der Detailseite). */
export async function getExerciseCount(slug: string): Promise<number> {
  const supabase = await createClient();
  const topic = await supabase
    .from("grammar_topics")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!topic.data) return 0;
  const { count } = await supabase
    .from("exercises")
    .select("*", { count: "exact", head: true })
    .eq("linked_grammar_topic_id", topic.data.id)
    .eq("is_approved", true);
  return count ?? 0;
}

export async function getGrammarTopic(
  slug: string,
): Promise<GrammarTopic | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("grammar_topics")
    .select("slug,title,category,level,content_md,common_mistakes,related_lessons")
    .eq("slug", slug)
    .maybeSingle();
  return (data as GrammarTopic) ?? null;
}
