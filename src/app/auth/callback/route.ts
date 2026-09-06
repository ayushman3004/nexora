import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error_description") || searchParams.get("error");
  
  // Default to /dashboard for OAuth logins unless explicit next parameter provided
  let next = searchParams.get("next") || "/dashboard";

  // Prevent open redirect vulnerabilities
  if (!next.startsWith("/") || next.startsWith("//")) {
    next = "/dashboard";
  }

  // Handle explicit OAuth errors from provider
  if (errorParam) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorParam)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const user = data.user;

      // 1. Sync or ensure profile in public.profiles
      try {
        const adminClient = createAdminClient();
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Client";
        const avatarUrl =
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null;

        const { data: existingProfile } = await adminClient
          .from("profiles")
          .select("id, role")
          .eq("id", user.id)
          .single();

        if (!existingProfile) {
          await adminClient.from("profiles").insert({
            id: user.id,
            name: fullName,
            email: user.email!,
            role: "client",
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          });
        }

        // 2. Link any project requests previously submitted under this email
        if (user.email) {
          await adminClient
            .from("project_requests")
            .update({ client_id: user.id })
            .ilike("email", user.email.trim())
            .is("client_id", null);
        }

        // 3. If admin, route to /admin unless specific non-default next was provided
        if (
          existingProfile?.role === "admin" &&
          (!searchParams.get("next") || searchParams.get("next") === "/dashboard")
        ) {
          next = "/admin";
        }
      } catch (profileErr) {
        console.warn("Could not sync profile/inquiries in auth callback:", profileErr);
      }

      // Respect x-forwarded-host in production environments behind proxies/Cloudflare
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv || !forwardedHost) {
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
    }
  }

  // Return user to login with helpful error
  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent(
      "Authentication link or code expired. Please try signing in again."
    )}`
  );
}
