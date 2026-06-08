import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase-Client für den Browser (Client Components).
 * Nutzt nur den öffentlichen Anon-/Publishable-Key.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // Unsere Tabellen liegen im Schema "italiano" (nicht "public")
    { db: { schema: "italiano" } },
  );
}
