import { redirect } from "next/navigation";
import { Flame, Users } from "lucide-react";

import { Heatmap, WeeklyChart } from "@/components/profile/activity-charts";
import { ProfileSettings } from "@/components/profile/settings";
import { getProfilePageData } from "@/lib/data/profile";

function formatMinutes(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export default async function ProfilePage() {
  const data = await getProfilePageData();
  if (!data) redirect("/login");

  return (
    <main className="mx-auto max-w-xl px-5 pt-12 lg:px-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-soft">Profil</p>
          <h1 className="mt-1 font-serif text-3xl text-ink">{data.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">{data.email}</p>
        </div>
        {data.streak > 0 && (
          <div className="mt-1 flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-sm">
            <Flame className="size-4 text-brand" />
            <span className="font-mono font-medium text-ink">{data.streak}</span>
            <span className="text-ink-soft">{data.streak === 1 ? "Tag" : "Tage"}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={`${data.learnedVocab}`} label="Vokabeln" />
        <Stat value={`${data.masteredVocab}`} label="Beherrscht" />
        <Stat value={`${data.grammarPracticed}`} label="Grammatik" />
        <Stat value={formatMinutes(data.learnMinutes)} label="Lernzeit" />
      </div>

      {/* Diagramme */}
      <div className="mt-5 space-y-5">
        <WeeklyChart data={data.weekly} />
        <Heatmap weeks={data.heatmap.weeks} max={data.heatmap.max} />
      </div>

      {/* Lernpartner (Mockup) */}
      <div className="mt-5 rounded-2xl border border-line bg-card px-5 py-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-ink-soft" />
          <h2 className="font-serif text-lg text-ink">Lernpartner</h2>
          <span className="rounded-full bg-subtle px-2 py-0.5 text-[11px] font-medium text-ink-faint">
            BETA
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          Bald könnt ihr gemeinsam lernen, euren Fortschritt vergleichen und euch
          gegenseitig motivieren.
        </p>
      </div>

      {/* Einstellungen */}
      <div className="mt-8">
        <ProfileSettings
          initialName={data.name}
          initialGoal={data.dailyGoal}
          initialAccent={data.accentTolerance}
          initialIpa={data.showIpa}
        />
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-3 py-4 text-center">
      <p className="font-serif text-2xl text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{label}</p>
    </div>
  );
}
