import { redirect } from "next/navigation";

import { GrammarTabs } from "@/components/grammar/grammar-tabs";
import { createClient } from "@/lib/supabase/server";
import { getGrammarByCategory, getGrammarTrainerMeta } from "@/lib/data/grammar";

export default async function GrammarPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; topic?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { tab, topic } = await searchParams;
  const [categories, meta] = await Promise.all([
    getGrammarByCategory(),
    getGrammarTrainerMeta(),
  ]);
  const total = categories.reduce((n, c) => n + c.topics.length, 0);

  return (
    <main className="px-5 pt-12 lg:px-8">
      <p className="text-sm text-ink-soft">Grammatik</p>
      <h1 className="mt-1 font-serif text-3xl text-ink">
        <em>Grammatica</em>
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        {total} Themen in {categories.length} Kategorien
      </p>

      <GrammarTabs
        categories={categories}
        trainerTopics={meta.topics}
        trainerTypes={meta.types}
        initialTopic={topic}
        defaultTab={tab === "trainer" || topic ? "trainer" : "overview"}
      />
    </main>
  );
}
