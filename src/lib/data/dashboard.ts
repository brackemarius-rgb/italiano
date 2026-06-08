import { createClient } from "@/lib/supabase/server";
import { getVocabularyWithProgress, groupByLesson, type LessonGroup } from "./vocab";

export type DashboardData = {
  name: string;
  dailyGoal: number;
  streak: number;
  dueToday: number;
  totalVocab: number;
  learnedVocab: number;
  masteredVocab: number;
  grammarTotal: number;
  lessons: LessonGroup[];
};

/** Berechnet die Lern-Streak (aufeinanderfolgende Tage mit Aktivität). */
function computeStreak(dates: string[]): number {
  const days = new Set(dates.map((d) => d.slice(0, 10))); // YYYY-MM-DD
  if (days.size === 0) return 0;

  const today = new Date();
  const cursor = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  // Wenn heute noch keine Aktivität war, zählt eine Streak ab gestern.
  if (!days.has(iso(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);

  let streak = 0;
  while (days.has(iso(cursor))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export async function getDashboardData(): Promise<DashboardData | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [items, profileRes, dueRes, grammarRes, sessionsRes] =
    await Promise.all([
      getVocabularyWithProgress(),
      supabase.from("profiles").select("name,daily_goal").eq("id", user.id).single(),
      supabase
        .from("user_vocabulary_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .lte("due_date", todayEnd.toISOString()),
      supabase.from("grammar_topics").select("*", { count: "exact", head: true }),
      supabase
        .from("study_sessions")
        .select("started_at")
        .eq("user_id", user.id)
        .order("started_at", { ascending: false })
        .limit(400),
    ]);

  const lessons = groupByLesson(items);
  const name =
    (profileRes.data?.name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email ??
    "";

  return {
    name,
    dailyGoal: (profileRes.data?.daily_goal as number) ?? 20,
    streak: computeStreak(
      (sessionsRes.data ?? []).map((s) => s.started_at as string),
    ),
    dueToday: dueRes.count ?? 0,
    totalVocab: items.length,
    learnedVocab: items.filter((i) => i.status !== "neu").length,
    masteredVocab: items.filter((i) => i.status === "beherrscht").length,
    grammarTotal: grammarRes.count ?? 0,
    lessons,
  };
}
