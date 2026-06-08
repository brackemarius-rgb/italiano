"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trainer } from "@/components/trainer/trainer";
import type { LessonGroup } from "@/lib/data/vocab";
import { VocabOverview } from "./vocab-overview";

export function VocabTabs({
  lessons,
  defaultTab = "overview",
  accentTolerance = true,
  showIpa = true,
}: {
  lessons: LessonGroup[];
  defaultTab?: string;
  accentTolerance?: boolean;
  showIpa?: boolean;
}) {
  const lessonNumbers = lessons.map((l) => l.lesson);

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

      <TabsContent value="overview" className="mt-5">
        <VocabOverview lessons={lessons} />
      </TabsContent>

      <TabsContent value="trainer" className="mt-5">
        <div className="mx-auto max-w-xl">
          <Trainer
            availableLessons={lessonNumbers}
            accentTolerance={accentTolerance}
            showIpa={showIpa}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
