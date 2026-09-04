import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://placeholder-project.supabase.co";

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
