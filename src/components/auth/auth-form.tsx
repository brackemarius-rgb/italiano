"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup, type AuthState } from "@/app/(auth)/actions";

type Mode = "login" | "signup";

export function AuthForm({
  mode,
  initialMessage,
}: {
  mode: Mode;
  initialMessage?: string;
}) {
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    null,
  );

  return (
    <div className="w-full">
      {/* Wortmarke */}
      <div className="mb-10 text-center">
        <p className="font-serif text-4xl italic tracking-tight text-ink">
          Italiano
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          {mode === "login"
            ? "Willkommen zurück."
            : "Lerne Italienisch mit Espresso 1."}
        </p>
      </div>

      {/* Hinweis aus der URL (z. B. nach Registrierung) */}
      {initialMessage && (
        <p className="mb-6 rounded-lg border border-good/30 bg-good/5 px-4 py-3 text-sm text-good">
          {initialMessage}
        </p>
      )}

      <form action={formAction} className="space-y-5">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Marius"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="du@beispiel.de"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Passwort</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Fehlermeldung */}
        {state?.error && (
          <p className="rounded-lg border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand">
            {state.error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending
            ? "Einen Moment …"
            : mode === "login"
              ? "Anmelden"
              : "Konto erstellen"}
        </Button>
      </form>

      {/* Wechsel zwischen Login / Signup */}
      <p className="mt-8 text-center text-sm text-ink-soft">
        {mode === "login" ? (
          <>
            Noch kein Konto?{" "}
            <Link
              href="/signup"
              className="font-medium text-ink underline underline-offset-4 hover:text-brand"
            >
              Registrieren
            </Link>
          </>
        ) : (
          <>
            Schon ein Konto?{" "}
            <Link
              href="/login"
              className="font-medium text-ink underline underline-offset-4 hover:text-brand"
            >
              Anmelden
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
