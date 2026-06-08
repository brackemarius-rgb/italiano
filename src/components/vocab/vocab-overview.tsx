"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { STATUS_META, STATUS_ORDER, type LearnStatus } from "@/lib/data/status";
import type { LessonGroup } from "@/lib/data/vocab";

export function VocabOverview({ lessons }: { lessons: LessonGroup[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([]);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return lessons;
    return lessons
      .map((l) => ({
        ...l,
        items: l.items.filter(
          (it) =>
            it.italian.toLowerCase().includes(q) ||
            it.german.toLowerCase().includes(q),
        ),
      }))
      .filter((l) => l.items.length > 0);
  }, [lessons, q]);

  // Beim Suchen alle Treffer-Lektionen automatisch aufklappen
  const value = q ? filtered.map((l) => `l-${l.lesson}`) : open;

  return (
    <div>
      {/* Suche */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Vokabel suchen …"
          className="pl-9"
        />
      </div>

      {/* Status-Legende */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {STATUS_ORDER.map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${STATUS_META[s].dot}`} />
            <span className="text-xs text-ink-soft">{STATUS_META[s].label}</span>
          </div>
        ))}
      </div>

      {/* Lektionen */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink-soft">
          Keine Vokabel gefunden für „{query}".
        </p>
      ) : (
        <Accordion
          type="multiple"
          value={value}
          onValueChange={setOpen}
          className="mt-3"
        >
          {filtered.map((l) => (
            <AccordionItem key={l.lesson} value={`l-${l.lesson}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex w-full items-center justify-between pr-2">
                  <span className="font-medium text-ink">
                    Lektion {l.lesson}
                  </span>
                  <span className="font-mono text-xs text-ink-faint">
                    {l.learned}/{l.total}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                  {l.items.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center gap-3 border-b border-line py-2.5"
                    >
                      <span
                        className={`size-2 shrink-0 rounded-full ${STATUS_META[it.status as LearnStatus].dot}`}
                        title={STATUS_META[it.status as LearnStatus].label}
                      />
                      <span className="font-serif italic text-ink">
                        {it.italian}
                      </span>
                      <span className="ml-auto text-right text-sm text-ink-soft">
                        {it.german}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
