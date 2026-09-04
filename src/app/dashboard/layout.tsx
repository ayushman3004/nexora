import React from "react";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/client/DashboardHeader";
import type { Profile } from "@/types/database";

export const metadata = {
  title: "Client Portal — Nexora Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data as Profile | null;
  }

  return (
    <div className="min-h-screen bg-[#faf5ee] flex flex-col">
      <DashboardHeader profile={profile} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
