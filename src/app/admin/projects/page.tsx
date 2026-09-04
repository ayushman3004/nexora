import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FolderKanban } from "lucide-react";
import type { Project, Profile } from "@/types/database";

export default async function AdminProjectsPage() {
  const adminClient = createAdminClient();

  const [{ data: projects }, { data: clients }] = await Promise.all([
    adminClient
      .from("projects")
      .select("*, profiles(name, company)")
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
          <SectionBadge icon={FolderKanban} variant="primary">
            ENGINEERING WORKSPACES
          </SectionBadge>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            Active <span className="italic text-[#c2652a]">Projects</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850]">
            Manage all client engineering builds, milestone progression, live preview URLs, and publication states.
          </p>
        </div>
      </div>

      <ProjectTable
        projects={
          (projects as unknown as (Project & {
            profiles?: { name: string; company: string | null };
          })[]) || []
        }
        clients={(clients as Profile[]) || []}
      />
    </div>
  );
}
