import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "TODO: Supabase URL",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "TODO: Supabase key"
);
