// Paradigmen-Drills: feste Tabellen (Pronomen, Konjugationen, Endungen) zum
// stupiden, beliebig oft wiederholbaren Selbst-Tippen. Komplett statisch – kein
// KI/Server nötig.

export type DrillItem = { prompt: string; answer: string; alt?: string[] };

export type DrillSet = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  items: DrillItem[];
};

// Handgepflegte Basis-Sets (Fallback, falls keine generierten vorhanden sind).
export const DRILL_SETS_BASE: DrillSet[] = [
  // ---------- Pronomen ----------
  {
    id: "pronomi-soggetto",
    title: "Subjektpronomen",
    subtitle: "ich, du, er …",
    category: "Pronomen",
    items: [
      { prompt: "ich", answer: "io" },
      { prompt: "du", answer: "tu" },
      { prompt: "er", answer: "lui" },
      { prompt: "sie (Singular)", answer: "lei" },
      { prompt: "wir", answer: "noi" },
      { prompt: "ihr", answer: "voi" },
      { prompt: "sie (Plural)", answer: "loro" },
    ],
  },
  {
    id: "pronomi-oggetto-diretto",
    title: "Direkte Objektpronomen",
    subtitle: "mich, dich, ihn …",
    category: "Pronomen",
    items: [
      { prompt: "mich", answer: "mi" },
      { prompt: "dich", answer: "ti" },
      { prompt: "ihn / es", answer: "lo" },
      { prompt: "sie (Sg., feminin)", answer: "la" },
      { prompt: "uns", answer: "ci" },
      { prompt: "euch", answer: "vi" },
      { prompt: "sie (Pl., maskulin)", answer: "li" },
      { prompt: "sie (Pl., feminin)", answer: "le" },
    ],
  },
  {
    id: "pronomi-oggetto-indiretto",
    title: "Indirekte Objektpronomen",
    subtitle: "mir, dir, ihm …",
    category: "Pronomen",
    items: [
      { prompt: "mir", answer: "mi" },
      { prompt: "dir", answer: "ti" },
      { prompt: "ihm", answer: "gli" },
      { prompt: "ihr", answer: "le" },
      { prompt: "uns", answer: "ci" },
      { prompt: "euch", answer: "vi" },
      { prompt: "ihnen", answer: "gli", alt: ["loro"] },
    ],
  },
  // ---------- Verben (Präsens) ----------
  {
    id: "essere-presente",
    title: "essere – Präsens",
    subtitle: "sein",
    category: "Verben",
    items: [
      { prompt: "io", answer: "sono" },
      { prompt: "tu", answer: "sei" },
      { prompt: "lui / lei", answer: "è", alt: ["e"] },
      { prompt: "noi", answer: "siamo" },
      { prompt: "voi", answer: "siete" },
      { prompt: "loro", answer: "sono" },
    ],
  },
  {
    id: "avere-presente",
    title: "avere – Präsens",
    subtitle: "haben",
    category: "Verben",
    items: [
      { prompt: "io", answer: "ho" },
      { prompt: "tu", answer: "hai" },
      { prompt: "lui / lei", answer: "ha" },
      { prompt: "noi", answer: "abbiamo" },
      { prompt: "voi", answer: "avete" },
      { prompt: "loro", answer: "hanno" },
    ],
  },
  {
    id: "presente-are",
    title: "Präsens -are (parlare)",
    subtitle: "sprechen",
    category: "Verben",
    items: [
      { prompt: "io", answer: "parlo" },
      { prompt: "tu", answer: "parli" },
      { prompt: "lui / lei", answer: "parla" },
      { prompt: "noi", answer: "parliamo" },
      { prompt: "voi", answer: "parlate" },
      { prompt: "loro", answer: "parlano" },
    ],
  },
  {
    id: "presente-ere",
    title: "Präsens -ere (prendere)",
    subtitle: "nehmen",
    category: "Verben",
    items: [
      { prompt: "io", answer: "prendo" },
      { prompt: "tu", answer: "prendi" },
      { prompt: "lui / lei", answer: "prende" },
      { prompt: "noi", answer: "prendiamo" },
      { prompt: "voi", answer: "prendete" },
      { prompt: "loro", answer: "prendono" },
    ],
  },
  {
    id: "presente-ire",
    title: "Präsens -ire (dormire)",
    subtitle: "schlafen",
    category: "Verben",
    items: [
      { prompt: "io", answer: "dormo" },
      { prompt: "tu", answer: "dormi" },
      { prompt: "lui / lei", answer: "dorme" },
      { prompt: "noi", answer: "dormiamo" },
      { prompt: "voi", answer: "dormite" },
      { prompt: "loro", answer: "dormono" },
    ],
  },
  {
    id: "presente-ire-isc",
    title: "Präsens -ire (capire, -isc-)",
    subtitle: "verstehen",
    category: "Verben",
    items: [
      { prompt: "io", answer: "capisco" },
      { prompt: "tu", answer: "capisci" },
      { prompt: "lui / lei", answer: "capisce" },
      { prompt: "noi", answer: "capiamo" },
      { prompt: "voi", answer: "capite" },
      { prompt: "loro", answer: "capiscono" },
    ],
  },
];
