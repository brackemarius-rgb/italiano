"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

async function updateProfile(fields: Record<string, unknown>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht eingeloggt");
  const { error } = await supabase
    .from("profiles")
    .update(fields)
    .eq("id", user.id);
  if (error) throw error;
}

export async function updateName(name: string) {
  await updateProfile({ name: name.trim() });
  revalidatePath("/profile");
}

export async function updateDailyGoal(goal: number) {
  await updateProfile({ daily_goal: goal });
  revalidatePath("/profile");
  revalidatePath("/dashboard");
}

export async function updateAccentTolerance(value: boolean) {
  await updateProfile({ accent_tolerance: value });
  revalidatePath("/profile");
  revalidatePath("/vocab");
}

export async function updateShowIpa(value: boolean) {
  await updateProfile({ show_ipa: value });
  revalidatePath("/profile");
  revalidatePath("/vocab");
}
