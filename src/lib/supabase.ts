import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Server-side only - use in API routes after Turnstile verification
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
