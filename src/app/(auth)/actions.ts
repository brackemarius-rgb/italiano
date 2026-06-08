"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string } | null;

/** Login mit E-Mail + Passwort. */
export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "E-Mail oder Passwort ist nicht korrekt." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/** Registrierung mit Name, E-Mail + Passwort. */
export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Bitte alle Felder ausfüllen." };
  }
  if (password.length < 6) {
    return { error: "Das Passwort muss mindestens 6 Zeichen lang sein." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // Name landet in den User-Metadaten; in Session 2 legt ein DB-Trigger
    // daraus automatisch den profiles-Eintrag an.
    options: { data: { name } },
  });

  if (error) {
    return { error: "Registrierung fehlgeschlagen: " + error.message };
  }

  // Wenn E-Mail-Bestätigung in Supabase aktiviert ist, gibt es noch keine Session.
  if (!data.session) {
    redirect(
      "/login?message=" +
        encodeURIComponent(
          "Fast geschafft! Bitte bestätige deine E-Mail-Adresse über den Link, den wir dir geschickt haben.",
        ),
    );
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/** Logout. */
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
