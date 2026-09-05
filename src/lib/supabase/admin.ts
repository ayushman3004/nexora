import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://placeholder-project.supabase.co";

  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "placeholder-service-key";

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "[Supabase Admin] Warning: SUPABASE_SERVICE_ROLE_KEY is not set in environment variables. Admin operations will fail."
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

