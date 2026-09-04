import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
let env = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const email = process.argv[2] || "admin@nexorastudio.com";
const password = process.argv[3] || "NexoraAdmin2026!";
const name = process.argv[4] || "Nexora Studio Admin";

async function main() {
  console.log(`Checking admin user: ${email}...`);

  // Check if user already exists in auth
  const { data: usersData } = await supabase.auth.admin.listUsers();
  const existingUser = usersData?.users?.find((u) => u.email === email);

  let userId;

  if (existingUser) {
    console.log(`User ${email} already exists (ID: ${existingUser.id}). Updating password and promoting to admin...`);
    userId = existingUser.id;
    await supabase.auth.admin.updateUserById(userId, {
      password,
      user_metadata: { name, role: "admin" },
      email_confirm: true,
    });
  } else {
    console.log(`Creating new user ${email}...`);
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "admin" },
    });

    if (createError) {
      console.error("Error creating user:", createError.message);
      process.exit(1);
    }
    userId = newUser.user.id;
    console.log(`User created with ID: ${userId}`);
  }

  // Ensure public.profiles has role = 'admin'
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        name,
        email,
        role: "admin",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

  if (profileError) {
    console.error("Error setting admin role in profiles table:", profileError.message);
    console.log("Ensure you have run the schema migration in supabase/migrations/001_initial_schema.sql");
  } else {
    console.log("\n==================================================");
    console.log("SUCCESS! Admin account ready:");
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log("Role:     admin");
    console.log("Sign in at: http://localhost:3000/login");
    console.log("Admin URL:  http://localhost:3000/admin");
    console.log("==================================================\n");
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
