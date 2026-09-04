import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { RequestTable } from "@/components/admin/RequestTable";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Inbox } from "lucide-react";
import type { ProjectRequest, Profile } from "@/types/database";

export default async function AdminRequestsPage() {
  const adminClient = createAdminClient();

  const [{ data: requests }, { data: clients }] = await Promise.all([
    adminClient
      .from("project_requests")
      .select("*")
      .order("created_at", { ascending: false }),
    adminClient
      .from("profiles")
      .select("*")
      .eq("role", "client")
      .order("name", { ascending: true }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <SectionBadge icon={Inbox} variant="primary">
            INCOMING LEADS & INQUIRIES
          </SectionBadge>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            Project <span className="italic text-[#c2652a]">Requests</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850]">
            Review incoming client project briefs, triage scopes, assign client accounts, and initialize live projects.
          </p>
        </div>
      </div>

      <RequestTable
        requests={(requests as ProjectRequest[]) || []}
        clients={(clients as Profile[]) || []}
      />
    </div>
  );
}
