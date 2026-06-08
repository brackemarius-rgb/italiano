/**
 * Seed-Skript: importiert den Lerninhalt aus content/ in Supabase (Schema "italiano").
 *
 * Ausführen:  npm run seed
 *
 * Braucht in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SECRET_KEY=sb_secret_...   (umgeht RLS für den Bulk-Import)
 *
 * Idempotent: Mehrfaches Ausführen aktualisiert vorhandene Einträge (kein Duplikat).
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";

// .env.local laden (Node 20.12+)
process.loadEnvFile(join(process.cwd(), ".env.local"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SECRET_KEY) {
  console.error(
    "\n❌ Fehlende Umgebungsvariablen.\n" +
      "   Bitte in .env.local eintragen:\n" +
      "   NEXT_PUBLIC_SUPABASE_URL=...\n" +
      "   SUPABASE_SECRET_KEY=sb_secret_...\n",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SECRET_KEY, {
  db: { schema: "italiano" },
  auth: { persistSession: false },
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, "..", "content");
const VALID_GENDER = ["m", "f", "m_f"];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Führt zwei Werte zusammen und entfernt Doubletten (für Wörter mit mehreren
// Bedeutungen, z. B. "ci" -> "dorthin, hin / uns").
function mergeText(
  a: string | null,
  b: string | null,
  sep: string,
): string | null {
  const parts = [a, b]
    .filter(Boolean)
    .flatMap((s) => String(s).split(sep).map((x) => x.trim()))
    .filter(Boolean);
  const uniq = [...new Set(parts)];
  return uniq.length ? uniq.join(sep) : null;
}

async function main() {
  // ---- 1) Quelle (Espresso 1) -------------------------------------------
  const firstVocab = JSON.parse(
    readFileSync(join(CONTENT, "vocabulary", "lezione-01.json"), "utf8"),
  );
  const src = firstVocab.source;

  const { data: source, error: srcErr } = await supabase
    .from("sources")
    .upsert(
      {
        slug: src.id,
        title: src.title,
        type: src.type,
        language_level: src.language_level,
      },
      { onConflict: "slug" },
    )
    .select()
    .single();

  if (srcErr || !source) throw srcErr ?? new Error("Quelle konnte nicht angelegt werden");
  console.log(`📚 Quelle: ${source.title} (${source.slug})`);

  // ---- 2) Vokabeln -------------------------------------------------------
  const vocabFiles = readdirSync(join(CONTENT, "vocabulary"))
    .filter((f) => f.endsWith(".json"))
    .sort();

  const vocabByKey = new Map<string, Record<string, unknown>>();
  for (const file of vocabFiles) {
    const data = JSON.parse(
      readFileSync(join(CONTENT, "vocabulary", file), "utf8"),
    );
    const lesson = data.lesson_number as number;
    for (const item of data.items as Record<string, unknown>[]) {
      const italian = String(item.italian).trim();
      const row = {
        italian,
        german: String(item.german ?? "").trim(),
        ipa: (item.ipa as string) ?? null,
        word_type: (item.word_type as string) ?? null,
        gender: VALID_GENDER.includes(item.gender as string)
          ? (item.gender as string)
          : null,
        article: (item.article as string) ?? null,
        plural_form: (item.number as string) ?? null,
        lesson_number: lesson,
        topic_tags: (item.topic_tags as string[]) ?? null,
        source_id: source.id,
        visibility: "central",
        difficulty_level: src.language_level,
        notes: (item.notes as string) ?? null,
      };
      // Schlüssel = Lektion + Wort. Bei Mehrfach-Bedeutung zusammenführen,
      // statt eine Bedeutung zu verlieren.
      const key = `${lesson}::${italian}`;
      const existing = vocabByKey.get(key);
      if (existing) {
        existing.german = mergeText(
          existing.german as string,
          row.german,
          " / ",
        );
        existing.notes = mergeText(existing.notes as string, row.notes, "; ");
        existing.word_type = mergeText(
          existing.word_type as string,
          row.word_type,
          "/",
        );
        const tags = new Set([
          ...((existing.topic_tags as string[]) ?? []),
          ...((row.topic_tags as string[]) ?? []),
        ]);
        existing.topic_tags = tags.size ? [...tags] : null;
      } else {
        vocabByKey.set(key, row);
      }
    }
  }
  const vocabRows = [...vocabByKey.values()];

  let vocabDone = 0;
  for (const batch of chunk(vocabRows, 500)) {
    const { error } = await supabase
      .from("vocabulary")
      .upsert(batch, { onConflict: "source_id,lesson_number,italian" });
    if (error) throw error;
    vocabDone += batch.length;
    console.log(`   … ${vocabDone}/${vocabRows.length} Vokabeln`);
  }
  console.log(`📝 Vokabeln importiert: ${vocabRows.length}`);

  // ---- 3) Grammatik ------------------------------------------------------
  const grammarFiles = readdirSync(join(CONTENT, "grammar"))
    .filter((f) => f.endsWith(".md"))
    .sort();

  const grammarBySlug = new Map<string, Record<string, unknown>>();
  for (const file of grammarFiles) {
    const raw = readFileSync(join(CONTENT, "grammar", file), "utf8");
    const { data: fm, content } = matter(raw);
    const slug = (fm.id as string) ?? file.replace(/\.md$/, "");
    grammarBySlug.set(slug, {
      slug,
      title: (fm.title as string) ?? slug,
      level: (fm.level as string) ?? null,
      category: (fm.category as string) ?? null,
      content_md: content.trim(),
      prerequisites: (fm.prerequisites as string[]) ?? null,
      related_topics: (fm.related_topics as string[]) ?? null,
      related_lessons: (fm.related_lessons as number[]) ?? null,
      common_mistakes: (fm.common_mistakes as string[]) ?? null,
      exercise_targets: (fm.exercise_targets as string[]) ?? null,
      source_id: source.id,
    });
  }
  const grammarRows = [...grammarBySlug.values()];

  const { error: gErr } = await supabase
    .from("grammar_topics")
    .upsert(grammarRows, { onConflict: "slug" });
  if (gErr) throw gErr;
  console.log(`📖 Grammatik-Themen importiert: ${grammarRows.length}`);

  // ---- 4) Validierung ----------------------------------------------------
  const { count: vCount } = await supabase
    .from("vocabulary")
    .select("*", { count: "exact", head: true });
  const { count: gCount } = await supabase
    .from("grammar_topics")
    .select("*", { count: "exact", head: true });

  console.log(
    `\n✅ Fertig. In der Datenbank: ${vCount} Vokabeln, ${gCount} Grammatik-Themen.`,
  );
}

main().catch((err) => {
  console.error("\n❌ Seed fehlgeschlagen:", err.message ?? err);
  process.exit(1);
});
