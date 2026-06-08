/**
 * Importiert die Grammatik-Übungen in Supabase.
 *
 * Quellen:
 *   content/exercises/         (Basis-Set)          -> id-Key: "<slug>#<i>"
 *   content/exercises-extra/   (Erweiterungen)      -> id-Key: "<slug>#extra#<i>"
 *
 * Ausführen:  npm run seed:exercises
 *
 * Idempotent: deterministische IDs -> erneuter Import aktualisiert,
 * erzeugt keine Duplikate und erhält den Lernfortschritt.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

process.loadEnvFile(join(process.cwd(), ".env.local"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SECRET_KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SECRET_KEY müssen in .env.local stehen.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SECRET_KEY, {
  db: { schema: "italiano" },
  auth: { persistSession: false },
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, "..", "content");

const SOURCES = [
  { dir: "exercises", keyPrefix: "" },
  { dir: "exercises-extra", keyPrefix: "extra#" },
  { dir: "exercises-extra2", keyPrefix: "extra2#" },
];

function deterministicUuid(key: string): string {
  const h = createHash("sha1").update(key).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

async function topicIdForSlug(slug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("grammar_topics")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}

async function main() {
  let imported = 0;

  for (const src of SOURCES) {
    const dirPath = join(CONTENT, src.dir);
    if (!existsSync(dirPath)) continue;
    const files = readdirSync(dirPath).filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const slug = file.replace(/\.json$/, "");
      const topicId = await topicIdForSlug(slug);
      if (!topicId) {
        console.warn(`⚠️  Kein Thema für "${slug}" (${src.dir}) – übersprungen.`);
        continue;
      }

      const exercises = JSON.parse(
        readFileSync(join(dirPath, file), "utf8"),
      ) as Record<string, unknown>[];

      const rows = exercises.map((ex, i) => ({
        id: deterministicUuid(`${slug}#${src.keyPrefix}${i}`),
        type: ex.type,
        prompt_de: ex.prompt_de ?? null,
        content: ex.content ?? {},
        correct_answer: ex.correct_answer ?? null,
        acceptable_alternatives: (ex.acceptable_alternatives as string[]) ?? [],
        explanation_de: ex.explanation_de ?? null,
        linked_grammar_topic_id: topicId,
        difficulty_level: (ex.difficulty_level as string) ?? "A1",
        is_approved: true,
      }));

      const { error } = await supabase
        .from("exercises")
        .upsert(rows, { onConflict: "id" });
      if (error) throw error;

      imported += rows.length;
      console.log(`📝 ${src.dir}/${slug}: ${rows.length} Übungen`);
    }
  }

  const { count } = await supabase
    .from("exercises")
    .select("*", { count: "exact", head: true });
  console.log(`\n✅ Fertig. Übungen in der Datenbank gesamt: ${count} (verarbeitet: ${imported}).`);
}

main().catch((err) => {
  console.error("\n❌ Import fehlgeschlagen:", err.message ?? err);
  process.exit(1);
});
