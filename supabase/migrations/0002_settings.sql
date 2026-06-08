-- =====================================================================
-- Session 6 – Profil-Einstellungen
-- Fügt zwei Einstellungs-Spalten zur profiles-Tabelle hinzu.
-- Idempotent (add column if not exists).
-- =====================================================================

alter table italiano.profiles
  add column if not exists accent_tolerance boolean not null default true,
  add column if not exists show_ipa boolean not null default true;

-- PostgREST die geänderte Tabelle neu einlesen lassen
notify pgrst, 'reload schema';
