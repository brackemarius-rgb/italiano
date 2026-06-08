"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GrammarCategory } from "@/lib/data/grammar";
import type { GrammarType } from "@/app/(app)/grammar/trainer-actions";
import { GrammarTrainer } from "./grammar-trainer";

export function GrammarTabs({
  categories,
  trainerTopics,
  trainerTypes,
  initialTopic,
  defaultTab = "overview",
}: {
  categories: GrammarCategory[];
  trainerTopics: { slug: string; title: string; count: number }[];
  trainerTypes: GrammarType[];
  initialTopic?: string;
  defaultTab?: string;
}) {
  return (
    <Tabs defaultValue={defaultTab} className="mt-5 w-full">
      <TabsList className="w-full">
        <TabsTrigger value="overview" className="flex-1">
          Übersicht
        </TabsTrigger>
        <TabsTrigger value="trainer" className="flex-1">
          Trainer
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <div className="space-y-8">
          {categories.map((cat) => (
            <section key={cat.category}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {cat.category}
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cat.topics.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/grammar/${t.slug}`}
                    className="flex items-center justify-between rounded-xl border border-line bg-card px-4 py-3.5 transition-colors hover:border-line-strong"
                  >
                    <span className="text-sm font-medium text-ink">
                      {t.title}
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-ink-faint" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="trainer" className="mt-6">
        <div className="mx-auto max-w-xl">
          <GrammarTrainer
            topics={trainerTopics}
            types={trainerTypes}
            initialTopic={initialTopic}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
