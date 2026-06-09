import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getExerciseCount, getGrammarTopic } from "@/lib/data/grammar";

export default async function GrammarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { slug } = await params;
  const topic = await getGrammarTopic(slug);
  if (!topic) notFound();

  const exerciseCount = await getExerciseCount(slug);

  return (
    <main className="px-5 pt-8 lg:px-8">
      <Link
        href="/grammar"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" /> Grammatik
      </Link>

      <div className="mx-auto mt-6 max-w-3xl">
        {topic.category && (
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
            {topic.category}
          </p>
        )}
        <h1 className="mt-1 font-serif text-3xl text-ink">{topic.title}</h1>

        {/* Markdown-Inhalt inkl. Tabellen */}
        <div
          className="prose prose-stone mt-8 max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-ink prose-h1:hidden prose-strong:text-ink prose-a:text-brand prose-em:font-serif prose-em:text-brand prose-table:text-sm prose-th:text-ink prose-li:marker:text-ink-faint"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {topic.content_md ?? ""}
          </ReactMarkdown>
        </div>

        {/* Häufige Fehler */}
        {topic.common_mistakes && topic.common_mistakes.length > 0 && (
          <div className="mt-10 rounded-2xl border border-warn/30 bg-warn/5 px-5 py-5">
            <h2 className="font-serif text-lg text-ink">Häufige Fehler</h2>
            <ul className="mt-3 space-y-2">
              {topic.common_mistakes.map((m, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA: Übungen starten (falls vorhanden) */}
        {exerciseCount > 0 ? (
          <div className="mt-10 rounded-2xl bg-brand-dk px-6 py-6 text-bg">
            <p className="font-serif text-lg">Bereit zum Üben?</p>
            <p className="mt-1 text-sm text-bg/70">
              {exerciseCount} Übungen zu diesem Thema.
            </p>
            <Button variant="outline" className="mt-4 border-bg/30 bg-transparent text-bg hover:bg-bg/10 hover:text-bg" asChild>
              <Link href={`/grammar?tab=trainer&topic=${topic.slug}`}>
                Übungen starten
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line-strong px-5 py-6 text-center">
            <p className="text-sm text-ink-soft">
              Übungen zu diesem Thema folgen im Grammatik-Trainer.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
