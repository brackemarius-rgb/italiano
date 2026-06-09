import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Flame } from "lucide-react";

import { getDashboardData } from "@/lib/data/dashboard";

export default async function DashboardPage() {
  const data = await getDashboardData();
  if (!data) redirect("/login");

  const {
    name,
    streak,
    dueToday,
    totalVocab,
    learnedVocab,
    masteredVocab,
    grammarTotal,
    lessons,
  } = data;

  const firstName = name.split(" ")[0];
  const isNew = learnedVocab === 0;

  return (
    <main className="px-5 pt-12 lg:px-8">
      {/* Begrüßung */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-soft">Heute</p>
          <h1 className="mt-1 font-serif text-3xl text-ink">
            Buongiorno, <em>{firstName}</em>
          </h1>
        </div>
        {streak > 0 && (
          <div className="mt-1 flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-sm">
            <Flame className="size-4 text-brand" />
            <span className="font-mono font-medium text-ink">{streak}</span>
            <span className="text-ink-soft">
              {streak === 1 ? "Tag" : "Tage"}
            </span>
          </div>
        )}
      </div>

      {/* Heute fällig + Quick-Stats */}
      <div className="mt-7 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-4">
        <Link
          href="/vocab?tab=trainer"
          className="block rounded-2xl bg-brand-dk px-6 py-7 text-bg transition-transform active:scale-[0.99] lg:col-span-2 lg:flex lg:flex-col lg:justify-center"
        >
        {isNew ? (
          <>
            <p className="text-sm text-bg/70">Bereit loszulegen?</p>
            <p className="mt-2 font-serif text-2xl">
              Starte deine erste Lektion
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
              Vokabeln ansehen <ArrowRight className="size-4" />
            </span>
          </>
        ) : (
          <>
            <p className="text-sm text-bg/70">Heute fällig</p>
            <p className="mt-1 font-serif text-5xl">{dueToday}</p>
            <p className="mt-1 text-sm text-bg/70">
              {dueToday === 1 ? "Vokabel" : "Vokabeln"} zum Wiederholen
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
              {dueToday > 0 ? "Jetzt üben" : "Mehr lernen"}{" "}
              <ArrowRight className="size-4" />
            </span>
          </>
        )}
      </Link>

        {/* Quick-Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3 lg:mt-0 lg:grid-cols-1 lg:gap-3">
          <Stat value={`${learnedVocab}`} sub={`/ ${totalVocab}`} label="Gelernt" />
          <Stat value={`${masteredVocab}`} label="Beherrscht" />
          <Stat value="0" sub={`/ ${grammarTotal}`} label="Grammatik" />
        </div>
      </div>

      {/* Lektionen */}
      <div className="mt-9">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl text-ink">Deine Lektionen</h2>
          <Link href="/vocab" className="text-sm text-ink-soft hover:text-ink">
            Alle ansehen
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {lessons.map((l) => (
            <Link
              key={l.lesson}
              href="/vocab"
              className="block rounded-xl border border-line bg-card px-4 py-3.5 transition-colors hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Lektion {l.lesson}
                </span>
                <span className="font-mono text-xs text-ink-faint">
                  {l.learned}/{l.total}
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-good transition-all"
                  style={{
                    width: `${l.total ? (l.learned / l.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function Stat({
  value,
  sub,
  label,
}: {
  value: string;
  sub?: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-card px-3 py-4 text-center">
      <p className="font-serif text-2xl text-ink">
        {value}
        {sub && <span className="text-base text-ink-faint"> {sub}</span>}
      </p>
      <p className="mt-1 text-xs text-ink-soft">{label}</p>
    </div>
  );
}
