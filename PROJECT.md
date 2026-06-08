# Italiano – Italienisch-Lernplattform

> Persönliche Web-App zum Italienischlernen, gebaut für mich (Marius) und meinen Vater.
> Wir nehmen beide an einem Italienisch-Kurs teil und lernen aus dem Lehrwerk **Espresso 1** (A1).

---

## 1. Ziel des Projekts

Eine **personalisierte Italienisch-Lernplattform**, die:

- Auf allen Geräten läuft (Desktop, iPad, iPhone) – als Web-App
- Pro Person einen eigenen Login hat mit individuellem Lernfortschritt
- Lerninhalte zentral bereitstellt (Vokabeln, Grammatik aus Espresso 1)
- **Spaced Repetition** verwendet (FSRS-Algorithmus), damit Vokabeln zur richtigen Zeit wiederholt werden
- Sowohl **Vokabel- als auch Grammatik-Training** bietet
- Später: Eigene Vokabeln hinzufügen, KI-generierte Übungen, Lernpartner-Feature

Was es **nicht** sein soll:
- Kein Duolingo-Klon mit Cartoon-Maskottchen und XP-Punkten
- Kein Online-Sprachkurs (wir haben einen echten Kurs)
- Kein generisches Sprach-Tool – sondern speziell auf **unser Lehrwerk** zugeschnitten

---

## 2. Bisheriger Stand (was schon fertig ist)

### 2.1 Lerninhalt – komplett extrahiert

**Vokabular** im Ordner `content/vocabulary/`:
- 20 JSON-Dateien (`lezione-01.json` bis `lezione-20.json`)
- Insgesamt **1.658 Vokabeln** mit Italienisch, IPA, Deutsch, Wortart, Genus, Artikel, Themen-Tags

**Grammatik** im Ordner `content/grammar/`:
- 50 Markdown-Dateien mit YAML-Frontmatter
- Fein gesplittete Themen (z. B. "Bestimmter Artikel", "Passato prossimo Bildung", "Passato prossimo essere vs. avere" jeweils einzeln)
- Inhalt: Erklärung, Tabellen, Beispiele aus den Lektionen, häufige Fehler

**Schema-Dokumentation** in `content/README.md`.

### 2.2 Design – als HTML-Prototyp festgehalten

Im Ordner `design/` liegt `prototyp.html` (V4) – ein voll durchklickbarer Design-Prototyp mit allen Screens, Interaktionen und der gewünschten Ästhetik:

- **Dunkles Cremeweiß** (`#faf7f2`) als Hintergrund
- **Warmes Schwarz** statt reinem Schwarz für Text und primäre Buttons
- **Italienisches Rot** (`#b8332f`) als einziger Akzent, sparsam eingesetzt
- **Fraunces** (Serif, Italic) für italienische Wörter und Headlines
- **Inter** (Sans) für UI-Text
- Mobile-first, max. 480px Breite, auf Desktop zentriert
- Editorial/Magazin-Stil, kein App-Pop, ruhig und fokussiert

### 2.3 Design-Entscheidungen, die schon getroffen sind

- **Bottom-Nav** mit vier Bereichen: Heute / Vokabeln / Grammatik / Profil
- **Vokabeln** und **Grammatik** haben jeweils zwei Tabs oben (Trainer + Übersicht bzw. Übersicht + Trainer)
- **Vokabeltrainer** in zwei Modi:
  - **Erkennen** (italienisch → deutsch, mit "Antwort zeigen"-Button)
  - **Schreiben** (deutsch → italienisch, mit Buchstaben-Slots als Längen-Hinweis)
- **Grammatik-Trainer** mit vier Übungstypen: Lückentexte, Multiple Choice, Sätze schreiben, Sätze ordnen
- **FSRS-Ratings** nach jeder Karte: Again / Hard / Good / Easy
- **Memory-System sichtbar** durch farbige Status-Punkte in der Vokabel-Übersicht (beherrscht/lernend/schwierig/neu)

---

## 3. Tech-Stack (vorgegeben)

| Bereich              | Technologie                              |
| -------------------- | ---------------------------------------- |
| Frontend             | Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend / DB         | Supabase (Postgres + Auth + Row-Level-Security) |
| Hosting              | Vercel (deployment via GitHub)           |
| Spaced Repetition    | FSRS-Algorithmus (`ts-fsrs` von npm)     |
| Mobile               | Responsive Web-App, später PWA-installierbar |
| Fonts                | Fraunces + Inter (Google Fonts)          |
| Code-Host            | GitHub                                   |

---

## 4. Datenmodell

Bitte diese Tabellen in Supabase anlegen (mit Row-Level-Security).

### `profiles`
Eigene Profile-Tabelle, die mit `auth.users` (Supabase Auth) verknüpft ist.
- `id` (uuid, FK → auth.users)
- `name` (text)
- `email` (text)
- `role` (text, 'admin' | 'learner', default 'learner')
- `daily_goal` (int, default 20)
- `created_at` (timestamptz)

### `sources`
Woher der Lerninhalt stammt.
- `id` (uuid PK)
- `slug` (text unique) – z.B. 'espresso-1'
- `title` (text) – z.B. 'Espresso 1'
- `type` (text, 'book' | 'course' | 'user_added' | 'claude_generated')
- `language_level` (text, A1/A2/B1...)
- `created_at` (timestamptz)

### `vocabulary`
Die eigentlichen Vokabeln. Drei-Stufen-Sichtbarkeit:
- `id` (uuid PK)
- `italian` (text, required)
- `german` (text, required)
- `ipa` (text)
- `word_type` (text) – noun, verb, adjective, etc.
- `gender` (text, 'm' | 'f' | 'm_f')
- `article` (text) – il, la, lo, l', etc.
- `plural_form` (text)
- `lesson_number` (int)
- `topic_tags` (text[])
- `source_id` (uuid FK → sources)
- `visibility` (text, 'central' | 'shared' | 'private', default 'central')
- `added_by_user_id` (uuid FK → profiles, nullable)
- `difficulty_level` (text, A1/A2)
- `audio_url` (text, nullable)
- `notes` (text)
- `created_at` (timestamptz)

### `grammar_topics`
- `id` (uuid PK)
- `slug` (text unique) – z.B. 'articolo-determinativo'
- `title` (text)
- `level` (text, A1/A2)
- `category` (text) – Artikel, Verben/Zeiten, Pronomen, etc.
- `content_md` (text) – das ganze Markdown aus den .md-Dateien
- `prerequisites` (text[]) – slugs anderer Themen
- `related_topics` (text[])
- `related_lessons` (int[])
- `common_mistakes` (text[])
- `exercise_targets` (text[])
- `source_id` (uuid FK → sources)
- `created_at` (timestamptz)

### `exercises`
Übungen für den Grammatik-Trainer.
- `id` (uuid PK)
- `type` (text, 'cloze' | 'multiple_choice' | 'free_write' | 'reorder')
- `prompt_de` (text)
- `content` (jsonb) – flexibel je nach Typ
- `correct_answer` (text)
- `acceptable_alternatives` (text[])
- `explanation_de` (text)
- `linked_vocabulary_ids` (uuid[])
- `linked_grammar_topic_id` (uuid FK → grammar_topics)
- `difficulty_level` (text)
- `is_approved` (boolean, default false)
- `created_by_user_id` (uuid FK → profiles, nullable)
- `created_at` (timestamptz)

### `user_vocabulary_progress`
FSRS-State pro User pro Vokabel.
- `id` (uuid PK)
- `user_id` (uuid FK → profiles)
- `vocabulary_id` (uuid FK → vocabulary)
- `due_date` (timestamptz)
- `stability` (float)
- `difficulty` (float)
- `elapsed_days` (int)
- `scheduled_days` (int)
- `reps` (int)
- `lapses` (int)
- `state` (int, FSRS state: 0=New, 1=Learning, 2=Review, 3=Relearning)
- `last_review` (timestamptz)
- UNIQUE(user_id, vocabulary_id)

### `user_grammar_progress`
Analog für Grammatik-Übungen.
- `id` (uuid PK)
- `user_id` (uuid FK → profiles)
- `exercise_id` (uuid FK → exercises)
- (gleiche FSRS-Felder wie oben)
- `error_patterns` (jsonb) – für KI-Übungsgenerierung später
- UNIQUE(user_id, exercise_id)

### `study_sessions`
Sessions zum späteren Auswerten.
- `id` (uuid PK)
- `user_id` (uuid FK → profiles)
- `started_at` (timestamptz)
- `ended_at` (timestamptz)
- `session_type` (text, 'vocab' | 'grammar')
- `items_studied` (int)
- `items_correct` (int)

### Row-Level-Security – Faustregeln

- Jeder User sieht nur seinen eigenen Progress und seine eigenen Sessions
- `vocabulary` mit `visibility='central'` für alle lesbar
- `vocabulary` mit `visibility='private'` nur für `added_by_user_id`
- `vocabulary` mit `visibility='shared'` für alle Users im System lesbar
- Nur `role='admin'` darf `vocabulary` mit `visibility='central'` schreiben

---

## 5. Phase-1-Scope (was JETZT gebaut wird)

**Halt dich strikt daran.** Alle weiteren Features kommen in eigenen Phasen.

### Must-have V1

1. **Auth**
   - Login + Signup über Supabase Auth (Email + Passwort)
   - Profile-Eintrag wird beim Signup automatisch angelegt
   - Logout
   - Nicht-eingeloggte User landen immer auf der Login-Seite

2. **Content-Importer** (`scripts/seed.ts`)
   - Liest alle JSONs aus `content/vocabulary/` und alle MDs aus `content/grammar/`
   - Importiert sie in Supabase (`vocabulary` und `grammar_topics`)
   - Idempotent (kann mehrfach laufen, ohne Duplikate zu erzeugen – upsert auf slug bzw. it+lesson)

3. **Dashboard ("Heute")**
   - Begrüßung mit Nutzername und Streak
   - "Heute fällig: X Vokabeln" als prominente Karte
   - Quick-Stats (gelernte Vokabeln, gelernte Grammatik-Themen)
   - Liste der zuletzt aktiven Lektionen mit Fortschritt

4. **Vokabel-Bereich** mit zwei Tabs:

   **Tab "Trainer":**
   - Setup-Screen: Modus (Erkennen / Schreiben), Filter (heute fällig / gelernte / schwierige / neue / zufällig), Lektionsauswahl (Chips 1–20, mehrfach auswählbar), Anzahl Karten (Slider 5–100)
   - Trainer-Screen: Karte zeigen, Mode-abhängige UI (Reveal-Button bzw. Eingabefeld mit Buchstaben-Slots als Längen-Hinweis)
   - FSRS-Bewertung mit 4 Buttons (Again/Hard/Good/Easy), Werte werden in `user_vocabulary_progress` aktualisiert
   - Buchstaben-Hinweise im Schreibmodus: Buchstabe-pro-Slot, Apostrophe/Leerzeichen sichtbar
   - Akzent-Toleranz (per Setting an/aus): `caffe` ≈ `caffè`
   - "Hinweis"-Button enthüllt nächsten fehlenden Buchstaben
   - "Ich weiß es nicht"-Button zeigt komplette Lösung
   - Nach jeder Karte: nächste oder "Fertig"-Screen mit Stats

   **Tab "Übersicht":**
   - Alle Vokabeln nach Lektionen gruppiert
   - Aufklappbare Lektions-Sektionen
   - Tabelle Italienisch / Deutsch / Status-Punkt (farbig nach Lernfortschritt)
   - Such-Eingabe oben

5. **Grammatik-Bereich** mit zwei Tabs:

   **Tab "Übersicht":**
   - Themen gruppiert nach Kategorie (Aussprache, Artikel, Substantiv, Adjektiv, Pronomen, Verben/Zeiten, Präpositionen, Satzbau, Wortschatz)
   - Klick auf Thema → Detailseite mit Erklärung, Tabellen, Beispielen, häufigen Fehlern (Markdown rendern, inkl. Tabellen)
   - Detailseite hat unten eine CTA-Karte "Übungen starten" – springt in den Trainer mit diesem Thema vorausgewählt

   **Tab "Trainer":**
   - Setup-Screen: Themen-Chips (alle gemischt oder einzelne wählen), Übungstypen-Auswahl (Lückentexte, Multiple Choice, Sätze schreiben, Sätze ordnen), Filter (bunt gemischt / schwache Themen / neue Übungen), Anzahl Aufgaben
   - Trainer rendert pro Aufgabe den passenden UI-Typ
   - Sofortiges Feedback nach jeder Antwort mit Erklärung
   - Progress-Pips oben (grün/rot pro Aufgabe)
   - Am Ende: Stats-Screen

6. **Profil-Bereich**
   - Header-Karte mit Name, E-Mail, Streak
   - Stats: Vokabeln, Beherrscht, Grammatik, Lernzeit
   - Wochen-Balkendiagramm (Vokabeln pro Wochentag)
   - Aktivitäts-Heatmap (12 Wochen, GitHub-Style)
   - Tägliches Lernziel (Slider, speichert in `profiles.daily_goal`)
   - Lernpartner-Karte (BETA, Mockup) – aktuell noch ohne echte Funktion, nur Platzhalter
   - Settings: Name/E-Mail/Passwort, tägliche Erinnerung, Akzent-Toleranz, IPA-Anzeige, Datenexport (Mockup), Logout, Account löschen

### Bewusst NICHT in Phase 1

- KI-generierte Übungen (Phase 2)
- Eigene Vokabeln hinzufügen (Phase 2)
- Echtes Lernpartner-Feature (Phase 2 oder 3)
- Audio / Aussprache (Phase 3)
- Push-Notifications für Reminder (Phase 3)
- Dark Mode (später)

---

## 6. Design-Richtlinien (Pflicht)

### Visuell

- **Mobile-first**: Layout funktioniert primär auf iPhone, weitet sich elegant auf größere Bildschirme
- **Max-Width 480px** auf mobile, 560px auf Desktop, dann zentriert mit dezentem Schatten
- **CSS-Variablen** für Farben verwenden (siehe `design/prototyp.html` Header), nicht Tailwind-Defaults überfahren

### Farbpalette (aus dem Prototyp)

```
--bg:           #faf7f2  (Cremeweiß)
--bg-card:      #ffffff
--ink:          #1a1614  (Warmes Schwarz)
--ink-soft:     #6b635c
--ink-faint:    #a39b94
--line:         #ebe5dd
--line-strong:  #d8d0c5
--accent:       #b8332f  (Italienisches Rot)
--good:         #4a7c59  (Olivgrün)
--warn:         #c47d2a  (Senf)
--bad:          #b8332f  (= Akzent)
```

### Typografie

- **Inter** für UI, Body-Text, Buttons (400, 500, 600, 700)
- **Fraunces** (Serif) für Headlines, italienische Wörter (immer italic), Zahlen in Stats
- **JetBrains Mono** für technische Werte (Zahlen-Counts, IPA in Meta-Infos)
- Italienische Wörter im Text immer in `<em>` mit Fraunces-Italic und Accent-Color

### Komponenten

- Große Tap-Targets (mind. 44×44px)
- Klare Hierarchie, viel Weißraum
- Animationen subtil (max. 300ms, easing)
- Buttons primär: schwarzer Hintergrund, weißer Text
- Buttons sekundär: weißer Hintergrund, Border

### Sprache

- **Komplette UI auf Deutsch** (wir lernen Italienisch, aber die Bedienung ist Deutsch)
- Italienische Headlines und Akzente in italic, z.B. "Buongiorno, Marius", "Bravissimo!"
- Höflicher, ruhiger Ton – kein "Du schaffst das!"-Marketing

---

## 7. Verzeichnisstruktur (Vorschlag)

```
italian-app/
├── content/                   # Lerninhalt (committed)
│   ├── vocabulary/
│   │   ├── lezione-01.json
│   │   └── ...
│   ├── grammar/
│   │   ├── articolo-determinativo.md
│   │   └── ...
│   └── README.md
├── design/
│   └── prototyp.html          # Visuelle Referenz
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (app)/             # protected routes
│   │   │   ├── dashboard/
│   │   │   ├── vocab/
│   │   │   ├── grammar/
│   │   │   └── profile/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── trainer/
│   │   ├── vocab/
│   │   ├── grammar/
│   │   └── profile/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── fsrs/
│   │   └── content/
│   └── types/
├── scripts/
│   └── seed.ts                # Importer für content/
├── supabase/
│   └── migrations/            # SQL migrations
├── public/
├── .env.local                 # NICHT committen
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── PROJECT.md                 # diese Datei
```

---

## 8. Nutzerkontext (wichtig für Claude Code)

- **Ich (Marius)** habe sehr wenig Erfahrung mit Code, Terminal, git, Node.js
- Ich verstehe Architektur und Produktentscheidungen, aber **nicht** die täglichen Dev-Werkzeuge
- Bitte: ausführlich erklären, Schritt für Schritt, Rückfragen stellen
- Behandle mich wie einen **Product Manager**, nicht wie einen Developer
- Wenn du etwas tust: kurz sagen *was* und *warum*, nicht nur Code dumpen
- Bei Setup-Schritten (Supabase, Env-Variablen, Migrations): **Genau sagen, wo ich was klicken/kopieren muss**

---

## 9. Vorgehen für die nächsten Sessions

### Session 1 – Setup & Auth
1. Next.js-Projekt initialisieren
2. Tailwind + shadcn/ui + CSS-Variablen aus dem Prototyp einrichten
3. Supabase-Projekt anlegen (Marius im Browser), URL + Keys in `.env.local`
4. Supabase Auth aufsetzen (Email/Password)
5. Login + Signup-Seiten bauen (nach Design aus Prototyp)
6. Protected Routes / Middleware für eingeloggten Bereich

### Session 2 – Datenbank & Content-Import
1. Migrations für alle Tabellen schreiben
2. Row-Level-Security-Policies definieren
3. Seed-Script bauen, das `content/` einliest und in DB importiert
4. Migrations + Seed laufen lassen
5. Validieren: alle ~1.658 Vokabeln und 50 Grammatik-Themen in DB

### Session 3 – Dashboard & Vokabel-Übersicht
1. App-Layout mit Bottom-Nav
2. Dashboard-Seite mit Daten aus DB
3. Vokabel-Übersicht (Lektionen, Tabellen, Suche)
4. Status-Punkte basierend auf `user_vocabulary_progress`

### Session 4 – Vokabel-Trainer
1. Setup-Screen mit allen Filtern
2. FSRS-Integration (`ts-fsrs`)
3. Erkennen-Modus
4. Schreiben-Modus mit Buchstaben-Slots
5. Rating-Update → DB
6. Done-Screen

### Session 5 – Grammatik
1. Grammatik-Übersicht mit Kategorien
2. Detailseite mit Markdown-Rendering (Tabellen!)
3. Übungen-Datenmodell konkret machen (erste 50–100 Übungen manuell oder generiert?)
4. Grammatik-Trainer mit den vier Übungstypen

### Session 6 – Profil & Polish
1. Profil-Screen mit Stats
2. Heatmap und Wochen-Diagramm aus echten Daten
3. Settings (Lernziel, Akzent-Toleranz, IPA an/aus)
4. Logout
5. Letzte Design-Politur

### Session 7 – Deployment
1. GitHub-Repo anlegen, Code pushen
2. Vercel-Account verknüpfen, Env-Variablen setzen
3. Deploy
4. Tests auf iPhone/iPad
5. "Zum Home-Bildschirm hinzufügen" testen

---

## 10. Wichtige Designentscheidungen, die ich getroffen habe

| Entscheidung | Warum |
| ------------ | ----- |
| **Vokabel-Schema ohne `example_sentence`, `audio_url`, `frequency_rank`** | Minimaler Start, kann später ergänzt werden |
| **Fein gesplittete Grammatikthemen** (50 statt 20) | Gezielteres Üben pro Konzept |
| **FSRS statt SM-2** | Modernerer Algorithmus, besser kalibriert |
| **Eigene Profile-Tabelle neben auth.users** | Sauberer für Daten wie `daily_goal`, `name`, `role` |
| **3-Stufen-Sichtbarkeit für Vokabeln** (central/shared/private) | Vorbereitet für Phase 2 (eigene Vokabeln) |
| **Mobile-first, max. 480px** | Optimiert für Handy, da hauptsächliches Gerät |
| **Akzent-Toleranz beim Tippen als Setting** | Anfänger fokussiert sich auf Wörter, nicht Tastatur-Akrobatik |
| **Lernpartner zunächst nur als Mockup** | Komplexität vermeiden, später entscheiden |

---

## 11. Wichtige Datei-Links

- **Lerninhalt:** `content/` (vocabulary/ + grammar/ + README.md)
- **Design-Referenz:** `design/prototyp.html` – bitte zuerst öffnen und durchklicken
- **Diese Doku:** `PROJECT.md`

---

**Stand der Doku:** Mai 2025 · gepflegt durch Marius
