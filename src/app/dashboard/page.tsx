import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/client/ProjectCard";
import { ProjectUpdateList } from "@/components/client/ProjectUpdateList";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  FolderKanban,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Layers,
  Star,
} from "lucide-react";
import type { Project, ProjectUpdate, Profile } from "@/types/database";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;
  let projects: Project[] = [];
  let recentUpdates: ProjectUpdate[] = [];

  if (user) {
    const { data: prof } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = prof as Profile | null;

    // Fetch projects assigned to this client
    const { data: projs } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    projects = (projs as Project[]) || [];

    // Fetch latest updates across these projects
    if (projects.length > 0) {
      const projectIds = projects.map((p) => p.id);
      const { data: updates } = await supabase
        .from("project_updates")
        .select("*")
        .in("project_id", projectIds)
        .order("created_at", { ascending: false })
        .limit(5);
      recentUpdates = (updates as ProjectUpdate[]) || [];
    }
  }

  const activeProjects = projects.filter(
    (p) => p.status !== "COMPLETED" && p.status !== "CANCELLED"
  );
  const completedProjects = projects.filter((p) => p.status === "COMPLETED");

  return (
    <div className="space-y-10">
      {/* 1. Welcome & Highlights Banner */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#d8d0c8]/70 shadow-warm-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <SectionBadge icon={Sparkles} variant="primary">
            CLIENT PORTAL OVERVIEW
          </SectionBadge>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#3a302a] tracking-tight">
            Welcome back,{" "}
            <span className="italic text-[#c2652a]">
              {profile?.name || "Partner"}
            </span>
          </h1>
          <p className="text-sm text-[#605850] font-sans leading-relaxed">
            Monitor real-time development sprints, track milestone deliverables,
            and review engineering changelogs directly with the Nexora studio.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <Link
            href="/dashboard/reviews"
            className="px-5 py-2.5 rounded-full bg-[#faf5ee] hover:bg-[#f2ece4] border border-[#d8d0c8] text-xs font-semibold text-[#3a302a] transition-all flex items-center gap-2"
          >
            <Star className="w-4 h-4 text-[#c2652a]" />
            <span>Leave Review</span>
          </Link>
          <Link
            href="/dashboard/projects"
            className="px-5 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2"
          >
            <span>All Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white/70 border border-[#d8d0c8]/60 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c827a]">
              Active Builds
            </span>
            <FolderKanban className="w-4 h-4 text-[#c2652a]" />
          </div>
          <p className="text-3xl sm:text-4xl font-serif text-[#3a302a] mt-3 font-medium">
            {activeProjects.length}
          </p>
          <span className="text-[11px] text-[#605850] mt-1 block font-sans">
            In development or review
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 border border-[#d8d0c8]/60 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c827a]">
              Delivered & Completed
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
          </div>
          <p className="text-3xl sm:text-4xl font-serif text-[#3a302a] mt-3 font-medium">
            {completedProjects.length}
          </p>
          <span className="text-[11px] text-[#605850] mt-1 block font-sans">
            Shipped to production
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 border border-[#d8d0c8]/60 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c827a]">
              Total Projects
            </span>
            <Layers className="w-4 h-4 text-[#c2652a]" />
          </div>
          <p className="text-3xl sm:text-4xl font-serif text-[#3a302a] mt-3 font-medium">
            {projects.length}
          </p>
          <span className="text-[11px] text-[#605850] mt-1 block font-sans">
            Assigned to your organization
          </span>
        </div>
      </div>

      {/* 3. Main Grid: Active Projects + Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Projects */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif text-[#3a302a]">
                Active <span className="italic text-[#c2652a]">Projects</span>
              </h2>
              <p className="text-xs text-[#605850] mt-0.5">
                Current engineering architectures and web builds
              </p>
            </div>
            {projects.length > 0 && (
              <Link
                href="/dashboard/projects"
                className="text-xs text-[#c2652a] hover:underline font-semibold"
              >
                View all →
              </Link>
            )}
          </div>

          {activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="p-8 rounded-3xl bg-white/60 border border-[#d8d0c8]/60 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#c2652a] mx-auto" />
              <h3 className="text-lg font-serif text-[#3a302a]">
                All Projects Completed
              </h3>
              <p className="text-xs text-[#605850] max-w-sm mx-auto">
                All assigned builds have been successfully shipped. View them under
                the Projects tab.
              </p>
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white/60 border border-dashed border-[#d8d0c8] text-center space-y-3">
              <FolderKanban className="w-10 h-10 text-[#c2652a]/60 mx-auto" />
              <h3 className="text-lg font-serif text-[#3a302a]">
                No Projects Assigned Yet
              </h3>
              <p className="text-xs text-[#605850] max-w-md mx-auto leading-relaxed">
                If you recently submitted an inquiry or initiated a project brief,
                the Nexora team is reviewing your requirements. Once accepted, your
                project timeline and deliverables will appear right here.
              </p>
              <div className="pt-2">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c2652a] text-white text-xs font-semibold shadow-warm-sm hover:bg-[#a8521e] transition-all"
                >
                  <span>Submit Project Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Engineering Changelog / Updates */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-2xl font-serif text-[#3a302a]">
              Milestone <span className="italic text-[#c2652a]">Changelog</span>
            </h2>
            <p className="text-xs text-[#605850] mt-0.5">
              Recent status messages from the Nexora engineering team
            </p>
          </div>

          <ProjectUpdateList updates={recentUpdates} />
        </div>
      </div>
    </div>
  );
}
