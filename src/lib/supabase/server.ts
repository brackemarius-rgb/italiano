import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-Client für den Server (Server Components, Server Actions, Route Handler).
 * In Next.js 16 ist `cookies()` asynchron – daher await.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Unsere Tabellen liegen im Schema "italiano" (nicht "public")
      db: { schema: "italiano" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aufruf aus einer Server Component: Cookies können hier nicht
            // gesetzt werden. Das ist ok – der proxy.ts aktualisiert die Session.
          }
        },
      },
    },
  );
}
