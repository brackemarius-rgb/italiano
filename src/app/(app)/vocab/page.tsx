import { redirect } from "next/navigation";

import { VocabTabs } from "@/components/vocab/vocab-tabs";
import { createClient } from "@/lib/supabase/server";
import { getVocabularyWithProgress, groupByLesson } from "@/lib/data/vocab";

export default async function VocabPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { tab } = await searchParams;
  const [{ data: profile }, items] = await Promise.all([
    supabase
      .from("profiles")
      .select("accent_tolerance,show_ipa")
      .eq("id", user.id)
      .single(),
    getVocabularyWithProgress(),
  ]);
  const lessons = groupByLesson(items);

  return (
    <main className="px-5 pt-12 lg:px-8">
      <p className="text-sm text-ink-soft">Vokabeln</p>
      <h1 className="mt-1 font-serif text-3xl text-ink">Wortschatz</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {items.length} Wörter aus {lessons.length} Lektionen
      </p>

      <VocabTabs
        lessons={lessons}
        defaultTab={tab === "trainer" ? "trainer" : "overview"}
        accentTolerance={(profile?.accent_tolerance as boolean) ?? true}
        showIpa={(profile?.show_ipa as boolean) ?? true}
      />
    </main>
  );
}
