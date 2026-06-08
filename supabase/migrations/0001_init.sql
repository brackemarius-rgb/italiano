-- =====================================================================
-- Italiano – Datenbank-Setup (Session 2)
-- Alles liegt im Schema "italiano", sauber getrennt von der Fitness-App.
-- Dieses Skript ist idempotent: Es kann mehrfach ausgeführt werden.
-- =====================================================================

-- 1) Eigenes Schema -----------------------------------------------------
create schema if not exists italiano;

-- Zugriffsrechte für die Supabase-Rollen (RLS regelt danach den Zeilen-Zugriff)
grant usage on schema italiano to anon, authenticated, service_role;

alter default privileges for role postgres in schema italiano
  grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema italiano
  grant all on sequences to anon, authenticated, service_role;
alter default privileges for role postgres in schema italiano
  grant all on routines to anon, authenticated, service_role;

-- =====================================================================
-- 2) Tabellen
-- =====================================================================

-- Quellen (woher der Inhalt stammt) -----------------------------------
create table if not exists italiano.sources (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title          text not null,
  type           text not null default 'book',
  language_level text,
  created_at     timestamptz not null default now()
);

-- Profile (1:1 zu auth.users) -----------------------------------------
create table if not exists italiano.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text,
  email      text,
  role       text not null default 'learner' check (role in ('admin','learner')),
  daily_goal int  not null default 20,
  created_at timestamptz not null default now()
);

-- Vokabeln ------------------------------------------------------------
create table if not exists italiano.vocabulary (
  id               uuid primary key default gen_random_uuid(),
  italian          text not null,
  german           text not null,
  ipa              text,
  word_type        text,
  gender           text check (gender in ('m','f','m_f')),
  article          text,
  plural_form      text,
  lesson_number    int,
  topic_tags       text[],
  source_id        uuid references italiano.sources(id) on delete set null,
  visibility       text not null default 'central' check (visibility in ('central','shared','private')),
  added_by_user_id uuid references italiano.profiles(id) on delete set null,
  difficulty_level text,
  audio_url        text,
  notes            text,
  created_at       timestamptz not null default now()
);
-- Eindeutigkeit für idempotenten Import (Wort + Lektion + Quelle)
create unique index if not exists vocabulary_unique_item
  on italiano.vocabulary (source_id, lesson_number, italian);
create index if not exists vocabulary_lesson_idx
  on italiano.vocabulary (lesson_number);

-- Grammatik-Themen ----------------------------------------------------
create table if not exists italiano.grammar_topics (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  level            text,
  category         text,
  content_md       text,
  prerequisites    text[],
  related_topics   text[],
  related_lessons  int[],
  common_mistakes  text[],
  exercise_targets text[],
  source_id        uuid references italiano.sources(id) on delete set null,
  created_at       timestamptz not null default now()
);

-- Übungen (für den Grammatik-Trainer) ---------------------------------
create table if not exists italiano.exercises (
  id                      uuid primary key default gen_random_uuid(),
  type                    text not null check (type in ('cloze','multiple_choice','free_write','reorder')),
  prompt_de               text,
  content                 jsonb,
  correct_answer          text,
  acceptable_alternatives text[],
  explanation_de          text,
  linked_vocabulary_ids   uuid[],
  linked_grammar_topic_id uuid references italiano.grammar_topics(id) on delete set null,
  difficulty_level        text,
  is_approved             boolean not null default false,
  created_by_user_id      uuid references italiano.profiles(id) on delete set null,
  created_at              timestamptz not null default now()
);

-- FSRS-Fortschritt pro Nutzer & Vokabel -------------------------------
create table if not exists italiano.user_vocabulary_progress (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references italiano.profiles(id) on delete cascade,
  vocabulary_id  uuid not null references italiano.vocabulary(id) on delete cascade,
  due_date       timestamptz,
  stability      double precision,
  difficulty     double precision,
  elapsed_days   int,
  scheduled_days int,
  reps           int not null default 0,
  lapses         int not null default 0,
  state          int not null default 0,
  last_review    timestamptz,
  unique (user_id, vocabulary_id)
);
create index if not exists uvp_due_idx
  on italiano.user_vocabulary_progress (user_id, due_date);

-- FSRS-Fortschritt pro Nutzer & Übung ---------------------------------
create table if not exists italiano.user_grammar_progress (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references italiano.profiles(id) on delete cascade,
  exercise_id    uuid not null references italiano.exercises(id) on delete cascade,
  due_date       timestamptz,
  stability      double precision,
  difficulty     double precision,
  elapsed_days   int,
  scheduled_days int,
  reps           int not null default 0,
  lapses         int not null default 0,
  state          int not null default 0,
  last_review    timestamptz,
  error_patterns jsonb,
  unique (user_id, exercise_id)
);
create index if not exists ugp_due_idx
  on italiano.user_grammar_progress (user_id, due_date);

-- Lern-Sessions -------------------------------------------------------
create table if not exists italiano.study_sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references italiano.profiles(id) on delete cascade,
  started_at    timestamptz not null default now(),
  ended_at      timestamptz,
  session_type  text check (session_type in ('vocab','grammar')),
  items_studied int not null default 0,
  items_correct int not null default 0
);
create index if not exists sessions_user_idx
  on italiano.study_sessions (user_id, started_at);

-- =====================================================================
-- 3) Hilfsfunktionen
-- =====================================================================

-- Prüft, ob der aktuelle Nutzer Admin ist (SECURITY DEFINER vermeidet
-- RLS-Rekursion beim Lesen der profiles-Tabelle).
create or replace function italiano.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from italiano.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;
grant execute on function italiano.is_admin() to authenticated;

-- Legt beim Anlegen eines neuen auth-Users automatisch ein Profil an.
create or replace function italiano.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into italiano.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function italiano.handle_new_user();

-- =====================================================================
-- 4) Row-Level-Security + Policies
-- =====================================================================

alter table italiano.sources                   enable row level security;
alter table italiano.profiles                  enable row level security;
alter table italiano.vocabulary                enable row level security;
alter table italiano.grammar_topics            enable row level security;
alter table italiano.exercises                 enable row level security;
alter table italiano.user_vocabulary_progress  enable row level security;
alter table italiano.user_grammar_progress     enable row level security;
alter table italiano.study_sessions            enable row level security;

-- sources: für alle eingeloggten lesbar; Schreiben nur Service-Rolle (Seed)
drop policy if exists sources_select on italiano.sources;
create policy sources_select on italiano.sources
  for select to authenticated using (true);

-- profiles: jeder sieht/ändert nur sein eigenes Profil
drop policy if exists profiles_select_own on italiano.profiles;
create policy profiles_select_own on italiano.profiles
  for select to authenticated using (id = auth.uid());
drop policy if exists profiles_update_own on italiano.profiles;
create policy profiles_update_own on italiano.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- vocabulary: zentrale/geteilte lesbar; private nur Eigentümer.
-- Schreiben: eigene private/geteilte oder Admin (zentrale).
drop policy if exists vocabulary_select on italiano.vocabulary;
create policy vocabulary_select on italiano.vocabulary
  for select to authenticated
  using (visibility in ('central','shared') or added_by_user_id = auth.uid());
drop policy if exists vocabulary_insert on italiano.vocabulary;
create policy vocabulary_insert on italiano.vocabulary
  for insert to authenticated
  with check (
    italiano.is_admin()
    or (added_by_user_id = auth.uid() and visibility in ('private','shared'))
  );
drop policy if exists vocabulary_update on italiano.vocabulary;
create policy vocabulary_update on italiano.vocabulary
  for update to authenticated
  using (italiano.is_admin() or added_by_user_id = auth.uid())
  with check (italiano.is_admin() or added_by_user_id = auth.uid());
drop policy if exists vocabulary_delete on italiano.vocabulary;
create policy vocabulary_delete on italiano.vocabulary
  for delete to authenticated
  using (italiano.is_admin() or added_by_user_id = auth.uid());

-- grammar_topics: für alle lesbar; Schreiben nur Admin
drop policy if exists grammar_select on italiano.grammar_topics;
create policy grammar_select on italiano.grammar_topics
  for select to authenticated using (true);
drop policy if exists grammar_write on italiano.grammar_topics;
create policy grammar_write on italiano.grammar_topics
  for all to authenticated
  using (italiano.is_admin()) with check (italiano.is_admin());

-- exercises: freigegebene + eigene + Admin lesbar; Schreiben eigene/Admin
drop policy if exists exercises_select on italiano.exercises;
create policy exercises_select on italiano.exercises
  for select to authenticated
  using (is_approved or created_by_user_id = auth.uid() or italiano.is_admin());
drop policy if exists exercises_write on italiano.exercises;
create policy exercises_write on italiano.exercises
  for all to authenticated
  using (italiano.is_admin() or created_by_user_id = auth.uid())
  with check (italiano.is_admin() or created_by_user_id = auth.uid());

-- Fortschritt & Sessions: jeder nur seine eigenen Zeilen
drop policy if exists uvp_own on italiano.user_vocabulary_progress;
create policy uvp_own on italiano.user_vocabulary_progress
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists ugp_own on italiano.user_grammar_progress;
create policy ugp_own on italiano.user_grammar_progress
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists sessions_own on italiano.study_sessions;
create policy sessions_own on italiano.study_sessions
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- =====================================================================
-- 5) Bestehende Nutzer nachtragen (du + Papa + Mama wurden vor dem
--    Trigger angelegt). Marius wird Admin.
-- =====================================================================
insert into italiano.profiles (id, name, email, role)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'name', u.email),
  u.email,
  case when u.email = 'brackemarius@gmail.com' then 'admin' else 'learner' end
from auth.users u
on conflict (id) do nothing;

-- =====================================================================
-- 6) Explizite Rechte (falls Tabellen schon vorher existierten)
-- =====================================================================
grant all on all tables    in schema italiano to anon, authenticated, service_role;
grant all on all sequences in schema italiano to anon, authenticated, service_role;
grant all on all routines  in schema italiano to anon, authenticated, service_role;

-- PostgREST das neue Schema/Tabellen neu einlesen lassen
notify pgrst, 'reload schema';
