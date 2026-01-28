import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

let supabaseClient: SupabaseClient<Database> | null = null;

function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error("Supabase credentials not configured");
    }

    supabaseClient = createClient<Database>(url, key);
  }
  return supabaseClient;
}

// Server-side only - use in API routes after Turnstile verification
// Uses lazy initialization to avoid build-time errors
export const supabase = {
  from: <T extends keyof Database["public"]["Tables"]>(table: T) => {
    return getSupabaseClient().from(table);
  },
};
