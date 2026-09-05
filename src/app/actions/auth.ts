"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export interface AuthActionResult {
  success?: boolean;
  error?: string;
  redirectTo?: string;
}

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/dashboard";

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Check role to route properly
  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "admin") {
      return { success: true, redirectTo: "/admin" };
    }
  }

  return { success: true, redirectTo };
}

export async function registerAction(formData: FormData): Promise<AuthActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  // 1. Create user directly with email_confirm: true (Direct auth flow, no email sending)
  const adminClient = createAdminClient();
  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name,
      company: company || null,
      role: "client",
    },
  });

  if (createError) {
    const msg = createError.message.toLowerCase();
    if (msg.includes("already") || msg.includes("exists")) {
      return { error: "An account with this email already exists. Please sign in." };
    }
    return { error: createError.message };
  }

  // 2. Ensure profile record is saved in public.profiles
  if (newUser?.user) {
    await adminClient.from("profiles").upsert({
      id: newUser.user.id,
      name,
      email,
      company: company || null,
      role: "client",
      updated_at: new Date().toISOString(),
    });
  }

  // 3. Automatically log in the user immediately
  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return { success: true, redirectTo: "/login" };
  }

  return { success: true, redirectTo: "/dashboard" };
}

export async function resendVerificationAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  if (!email) {
    return { error: "Please enter your email address." };
  }

  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=/auth/verified`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    error: "Verification email re-dispatched! Please check your inbox and spam folder.",
  };
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/dashboard/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    error: "Password reset link sent! Check your email inbox.",
  };
}
