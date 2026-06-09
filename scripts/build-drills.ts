/**
 * Liest alle content/drills/*.json und schreibt sie gebündelt nach
 * src/lib/data/drills.generated.ts (wird in die App importiert).
 *
 * Ausführen:  npm run build:drills
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "..", "content", "drills");
const OUT = join(__dirname, "..", "src", "lib", "data", "drills.generated.ts");

type DrillSet = { id: string; [k: string]: unknown };

const sets: DrillSet[] = [];
const seen = new Set<string>();

if (existsSync(DIR)) {
  for (const f of readdirSync(DIR).filter((x) => x.endsWith(".json")).sort()) {
    const arr = JSON.parse(readFileSync(join(DIR, f), "utf8")) as DrillSet[];
    for (const s of arr) {
      if (!s?.id || seen.has(s.id)) continue;
      seen.add(s.id);
      sets.push(s);
    }
  }
}

const header =
  'import type { DrillSet } from "./drills";\n\n' +
  "// AUTOMATISCH ERZEUGT von scripts/build-drills.ts aus content/drills/*.json.\n" +
  "// Nicht von Hand bearbeiten.\n" +
  "export const DRILL_SETS_GENERATED: DrillSet[] = ";

writeFileSync(OUT, header + JSON.stringify(sets, null, 2) + ";\n", "utf8");
console.log(`✅ drills.generated.ts: ${sets.length} Drill-Sets geschrieben.`);
