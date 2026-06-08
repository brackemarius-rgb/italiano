# Italian Learning Content – Espresso 1

Strukturierter Inhalt aus dem Lehrwerk **Espresso 1** (A1) für die Italian-Learning-App.

## Struktur

```
content/
├── vocabulary/        # 20 JSON-Files, ein File pro Lektion
│   ├── lezione-01.json
│   ├── …
│   └── lezione-20.json
└── grammar/           # 50 Markdown-Files, ein File pro Grammatikthema
    ├── articolo-determinativo.md
    ├── presente-regolare.md
    ├── …
    └── verbi-irregolari-tabella.md
```

## Vokabular-Schema (JSON)

```jsonc
{
  "schema_version": "1.0",
  "source": {
    "id": "espresso-1",
    "title": "Espresso 1",
    "type": "book",
    "language_level": "A1"
  },
  "lesson_number": 1,
  "lesson_title": "Ciao, come stai?",
  "lesson_topics": ["Begrüßung", "Vorstellen"],
  "items": [
    {
      "italian": "il papà",
      "ipa": "il papa",
      "german": "Papa",
      "word_type": "noun",
      "gender": "m",
      "article": "il",
      "topic_tags": ["Familie"],
      "section_marker": 1,
      "notes": "…"
    }
  ]
}
```

**Felder:**
- `italian` (Pflicht) – italienisches Wort/Phrase
- `ipa` – Lautschrift (vereinfacht, wie im Buch)
- `german` (Pflicht) – deutsche Übersetzung
- `word_type` (Pflicht) – einer von: noun, verb, adjective, adverb, pronoun, article, preposition, conjunction, interrogative, demonstrative, indefinite, interjection, phrase, proper_noun
- `gender` – m | f | m_f (bei Substantiven/Eigennamen)
- `article` – il, la, lo, l', i, le, gli (zugehöriger best. Artikel)
- `number` – plural (nur bei Wörtern, die immer Plural sind, z. B. spaghetti)
- `topic_tags` – Liste von Themen-Tags zur späteren Filterung
- `section_marker` – Nummer des Abschnitts im Buch (zur Buchstruktur-Zuordnung)
- `notes` – Hinweise, Besonderheiten

## Grammatik-Schema (Markdown mit YAML-Frontmatter)

```yaml
---
id: <kebab-case-id>
title: <deutscher Titel>
level: A1 | A2
category: Artikel | Substantiv | Adjektiv | Pronomen | Verben/Zeiten | Präpositionen | Satzbau | Wortschatz/Referenz
prerequisites: [<topic ids>]
related_topics: [<topic ids>]
related_lessons: [<lesson numbers>]
source: "Espresso 1, …"
common_mistakes: [<typische Fehler>]
exercise_targets: [<exercise type ids>]
---

# Inhalt: Erklärung, Tabellen, Beispiele, häufige Fehler
```

## Volumen

- **20 Lektionen** Vokabular: ca. 1.500 Vokabeln
- **50 Grammatikthemen**: vom Alphabet bis zur kompletten Verbtabelle

## Quelle

Espresso 1 (A1 Italienisch). Inhalte für persönlichen Lerngebrauch extrahiert.

## Nächste Schritte

1. Diese Files in das Repo der App einchecken (`/content`)
2. Beim DB-Setup: Inhalte einmalig in Supabase importieren (Seed-Skript)
3. Über UI/API als Trainings-Material verfügbar machen
