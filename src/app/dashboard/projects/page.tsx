import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/client/ProjectCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FolderKanban, ArrowLeft, Plus } from "lucide-react";
import type { Project } from "@/types/database";

export default async function ClientProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let projects: Project[] = [];

  if (user) {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    projects = (data as Project[]) || [];
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs text-[#8c827a] hover:text-[#3a302a] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            My <span className="italic text-[#c2652a]">Projects</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850] font-sans">
            All digital builds, platforms, and applications assigned to your organization.
          </p>
        </div>

        <div>
          <span className="px-4 py-1.5 rounded-full bg-[#f2ece4] border border-[#d8d0c8] text-xs font-mono text-[#605850]">
            Total: {projects.length} Project{projects.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white/70 border border-dashed border-[#d8d0c8] text-center space-y-3 max-w-md mx-auto">
          <FolderKanban className="w-10 h-10 text-[#c2652a]/60 mx-auto" />
          <h3 className="text-lg font-serif text-[#3a302a]">No Projects Found</h3>
          <p className="text-xs text-[#605850] leading-relaxed">
            You currently have no active or completed projects assigned. If you have an inquiry under review, the Nexora studio team will assign it here upon initiation.
          </p>
        </div>
      )}
    </div>
  );
}
