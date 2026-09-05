import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectCard } from "@/components/client/ProjectCard";
import { ProjectApplicationsList } from "@/components/client/ProjectApplicationsList";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FolderKanban, ArrowLeft, Plus, FileText, ArrowRight } from "lucide-react";
import type { Project, ProjectRequest } from "@/types/database";

export default async function ClientProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let projects: Project[] = [];
  let projectRequests: ProjectRequest[] = [];

  if (user) {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    projects = (data as Project[]) || [];

    try {
      const adminClient = createAdminClient();
      let query = adminClient.from("project_requests").select("*");
      if (user.email) {
        query = query.or(`client_id.eq.${user.id},email.ilike.${user.email}`);
      } else {
        query = query.eq("client_id", user.id);
      }
      const { data: reqs } = await query.order("created_at", { ascending: false });
      projectRequests = (reqs as ProjectRequest[]) || [];
    } catch (err) {
      console.error("Failed to load project requests for projects page:", err);
    }
  }

  return (
    <div className="space-y-10">
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

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="px-4 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Inquiry</span>
          </Link>
          <span className="px-4 py-2 rounded-full bg-[#f2ece4] border border-[#d8d0c8] text-xs font-mono text-[#605850]">
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
        <div className="p-10 rounded-3xl bg-white/70 border border-dashed border-[#d8d0c8] text-center space-y-3 max-w-lg mx-auto">
          <FolderKanban className="w-10 h-10 text-[#c2652a]/60 mx-auto" />
          <h3 className="text-lg font-serif text-[#3a302a]">No Live Projects Yet</h3>
          <p className="text-xs text-[#605850] leading-relaxed">
            {projectRequests.length > 0
              ? "You currently have no active project builds initialized. Your submitted inquiries are being reviewed by the GROVIX team below:"
              : "You currently have no active or completed projects assigned. Once your project inquiry is accepted, it will appear here."}
          </p>
        </div>
      )}

      {/* Submitted Inquiries Section */}
      {projectRequests.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#d8d0c8]/60">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif text-[#3a302a]">
                Project <span className="italic text-[#c2652a]">Inquiries Under Review</span>
              </h2>
              <p className="text-xs text-[#605850] mt-0.5">
                Briefs and specifications currently in triage with the studio
              </p>
            </div>
            <span className="text-xs font-mono text-[#8c827a]">
              {projectRequests.length} inquiry{projectRequests.length === 1 ? "" : "s"}
            </span>
          </div>

          <ProjectApplicationsList requests={projectRequests} />
        </div>
      )}
    </div>
  );
}
