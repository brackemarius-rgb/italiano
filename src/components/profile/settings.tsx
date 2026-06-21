"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/actions";
import {
  updateAccentTolerance,
  updateDailyGoal,
  updateName,
  updateShowIpa,
} from "@/app/(app)/profile/actions";

export function ProfileSettings({
  initialName,
  initialGoal,
  initialAccent,
  initialIpa,
}: {
  initialName: string;
  initialGoal: number;
  initialAccent: boolean;
  initialIpa: boolean;
}) {
  const [, startTransition] = useTransition();

  // Lernziel
  const [goal, setGoal] = useState(initialGoal);
  // Name
  const [name, setName] = useState(initialName);
  const [savingName, setSavingName] = useState(false);
  // Toggles
  const [accent, setAccent] = useState(initialAccent);
  const [ipa, setIpa] = useState(initialIpa);
  // Mockup
  const [reminder, setReminder] = useState(false);

  return (
    <div className="space-y-6">
      {/* Lernziel */}
      <Section title="Tägliches Lernziel">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-soft">Karten pro Tag</span>
          <span className="font-mono text-sm text-ink">{goal}</span>
        </div>
        <Slider
          className="mt-3"
          min={5}
          max={50}
          step={5}
          value={[goal]}
          onValueChange={(v) => setGoal(v[0])}
          onValueCommit={(v) =>
            startTransition(() => updateDailyGoal(v[0]))
          }
        />
      </Section>

      {/* Konto */}
      <Section title="Konto">
        <label className="text-sm text-ink-soft" htmlFor="name">
          Name
        </label>
        <div className="mt-2 flex gap-2">
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="outline"
            disabled={savingName || name.trim() === initialName || !name.trim()}
            onClick={() => {
              setSavingName(true);
              startTransition(async () => {
                await updateName(name);
                setSavingName(false);
              });
            }}
          >
            Speichern
          </Button>
        </div>
      </Section>

      {/* Lern-Einstellungen */}
      <Section title="Lernen">
        <Toggle
          label="Akzent-Toleranz"
          hint="caffe zählt wie caffè"
          checked={accent}
          onChange={(v) => {
            setAccent(v);
            startTransition(() => updateAccentTolerance(v));
          }}
        />
        <Divider />
        <Toggle
          label="Lautschrift (IPA) anzeigen"
          hint="z. B. [ˈkaffɛ] im Trainer"
          checked={ipa}
          onChange={(v) => {
            setIpa(v);
            startTransition(() => updateShowIpa(v));
          }}
        />
      </Section>

      {/* Mockups (Phase 2/3) */}
      <Section title="Weiteres">
        <Toggle
          label="Tägliche Erinnerung"
          hint="bald verfügbar"
          checked={reminder}
          onChange={setReminder}
          disabled
        />
        <Divider />
        <MockRow label="Daten exportieren" action="Bald" />
        <Divider />
        <MockRow label="Account löschen" action="Bald" danger />
      </Section>

      {/* Logout */}
      <form action={logout}>
        <Button type="submit" variant="outline" className="w-full">
          Abmelden
        </Button>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-card px-5 py-5">
      <h2 className="mb-4 font-serif text-lg text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Divider() {
  return <div className="my-3.5 h-px bg-line" />;
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className={cn("text-sm", disabled ? "text-ink-faint" : "text-ink")}>
          {label}
        </p>
        {hint && <p className="text-xs text-ink-faint">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full transition-colors disabled:opacity-50",
          checked ? "bg-brand-dk" : "bg-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-card transition-transform",
            checked ? "translate-x-[1.125rem]" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

function MockRow({
  label,
  action,
  danger,
}: {
  label: string;
  action: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn("text-sm", danger ? "text-bad" : "text-ink")}>
        {label}
      </span>
      <span className="rounded-full bg-subtle px-2 py-0.5 text-xs text-ink-faint">
        {action}
      </span>
    </div>
  );
}
