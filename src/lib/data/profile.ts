import { createClient } from "@/lib/supabase/server";

export type HeatCell = { date: string; count: number } | null;

export type ProfilePageData = {
  name: string;
  email: string;
  role: string;
  dailyGoal: number;
  accentTolerance: boolean;
  showIpa: boolean;
  streak: number;
  learnedVocab: number;
  masteredVocab: number;
  grammarPracticed: number;
  learnMinutes: number;
  weekly: { label: string; value: number }[];
  heatmap: { weeks: HeatCell[][]; max: number };
};

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Montag (0=Mo … 6=So)
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

export async function getProfilePageData(): Promise<ProfilePageData | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [profileRes, learnedRes, masteredRes, grammarRes, sessionsRes] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("name,email,role,daily_goal,accent_tolerance,show_ipa")
        .eq("id", user.id)
        .single(),
      supabase
        .from("user_vocabulary_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gt("reps", 0),
      supabase
        .from("user_vocabulary_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("state", 2)
        .gte("stability", 7)
        .lt("lapses", 2),
      supabase
        .from("user_grammar_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gt("reps", 0),
      supabase
        .from("study_sessions")
        .select("started_at,items_studied")
        .eq("user_id", user.id)
        .order("started_at", { ascending: false })
        .limit(1000),
    ]);

  const profile = profileRes.data;
  const sessions = sessionsRes.data ?? [];

  // Aktivität pro Tag aggregieren
  const byDay = new Map<string, number>();
  let totalItems = 0;
  for (const s of sessions) {
    const key = dayKey(new Date(s.started_at as string));
    const items = (s.items_studied as number) ?? 0;
    byDay.set(key, (byDay.get(key) ?? 0) + items);
    totalItems += items;
  }

  // Streak: aufeinanderfolgende Tage mit Aktivität
  const today = new Date();
  let streak = 0;
  const cursor = new Date(today);
  if (!byDay.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (byDay.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Wochen-Diagramm: letzte 7 Tage
  const weekly: { label: string; value: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    weekly.push({ label: WEEKDAYS[mondayIndex(d)], value: byDay.get(dayKey(d)) ?? 0 });
  }

  // Heatmap: 12 Wochen, an Montag ausgerichtet
  const NUM_WEEKS = 12;
  const startMonday = new Date(today);
  startMonday.setDate(startMonday.getDate() - mondayIndex(today) - (NUM_WEEKS - 1) * 7);
  const weeks: HeatCell[][] = [];
  let max = 0;
  for (let w = 0; w < NUM_WEEKS; w++) {
    const week: HeatCell[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startMonday);
      date.setDate(date.getDate() + w * 7 + d);
      if (date > today) {
        week.push(null);
      } else {
        const count = byDay.get(dayKey(date)) ?? 0;
        max = Math.max(max, count);
        week.push({ date: dayKey(date), count });
      }
    }
    weeks.push(week);
  }

  return {
    name: (profile?.name as string) ?? user.email ?? "",
    email: (profile?.email as string) ?? user.email ?? "",
    role: (profile?.role as string) ?? "learner",
    dailyGoal: (profile?.daily_goal as number) ?? 20,
    accentTolerance: (profile?.accent_tolerance as boolean) ?? true,
    showIpa: (profile?.show_ipa as boolean) ?? true,
    streak,
    learnedVocab: learnedRes.count ?? 0,
    masteredVocab: masteredRes.count ?? 0,
    grammarPracticed: grammarRes.count ?? 0,
    learnMinutes: Math.round((totalItems * 7) / 60), // grobe Schätzung: ~7 Sek./Karte
    weekly,
    heatmap: { weeks, max },
  };
}
