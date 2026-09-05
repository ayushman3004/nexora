import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { Profile } from "@/types/database";

export const metadata = {
  title: "Admin Studio Console — GROVIX",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  // Count pending requests and reviews for sidebar badges
  const { count: pendingRequestsCount } = await supabase
    .from("project_requests")
    .select("*", { count: "exact", head: true })
    .in("status", ["SUBMITTED", "UNDER_REVIEW"]);

  const { count: pendingReviewsCount } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("status", "PENDING");

  return (
    <div className="min-h-screen bg-[#faf5ee] flex">
      {/* Sidebar - hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar
          pendingRequestsCount={pendingRequestsCount || 0}
          pendingReviewsCount={pendingReviewsCount || 0}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          profile={profile as Profile}
          pendingRequestsCount={pendingRequestsCount || 0}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
