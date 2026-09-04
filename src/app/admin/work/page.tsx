import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { WorkPublisher } from "@/components/admin/WorkPublisher";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Globe } from "lucide-react";
import type { Project } from "@/types/database";

export default async function AdminWorkCMSPage() {
  const adminClient = createAdminClient();

  const { data: projects } = await adminClient
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <SectionBadge icon={Globe} variant="primary">
            PORTFOLIO CMS
          </SectionBadge>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            Work Showcase <span className="italic text-[#c2652a]">Publishing</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850]">
            Manage, edit, and toggle live publishing of engineering case studies on the public Nexora /work page.
          </p>
        </div>
      </div>

      <WorkPublisher projects={(projects as Project[]) || []} />
    </div>
  );
}
