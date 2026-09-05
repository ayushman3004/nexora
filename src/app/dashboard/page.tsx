import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectCard } from "@/components/client/ProjectCard";
import { ProjectUpdateList } from "@/components/client/ProjectUpdateList";
import { ProjectApplicationsList } from "@/components/client/ProjectApplicationsList";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  FolderKanban,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Layers,
  Star,
  Shield,
  Inbox,
  FileText,
} from "lucide-react";
import type { Project, ProjectUpdate, Profile, ProjectRequest } from "@/types/database";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;
  let projects: Project[] = [];
  let recentUpdates: ProjectUpdate[] = [];
  let projectRequests: ProjectRequest[] = [];

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

    // Fetch submitted inquiries & applications for this user
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
      console.error("Failed to load project requests for client dashboard:", err);
    }

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
      {/* Admin Notice Banner (Only shown if signed in as Admin) */}
      {profile?.role === "admin" && (
        <div className="bg-[#3a302a] text-white rounded-3xl p-6 sm:p-7 shadow-warm-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#52463e]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#c2652a] text-white flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#f0a878] font-semibold">
                  Admin Studio Privileges
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif text-white font-medium mt-0.5">
                Viewing Client Portal as Administrator
              </h2>
              <p className="text-xs text-[#d8d0c8] font-sans mt-0.5 max-w-xl">
                You are currently viewing the client dashboard. Live project requests, client inquiries, and studio controls are managed in the Admin Console.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/admin/requests"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Inbox className="w-3.5 h-3.5 text-[#f0a878]" />
              <span>Review Requests</span>
            </Link>
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-1.5"
            >
              <span>Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

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
            and review engineering changelogs directly with the GROVIX studio.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
            In development or sprint review
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 border border-[#d8d0c8]/60 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c827a]">
              Submitted Inquiries
            </span>
            <FileText className="w-4 h-4 text-[#c2652a]" />
          </div>
          <p className="text-3xl sm:text-4xl font-serif text-[#3a302a] mt-3 font-medium">
            {projectRequests.length}
          </p>
          <span className="text-[11px] text-[#605850] mt-1 block font-sans">
            Applications under review
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

      {/* 3. Main Grid: Active Projects / Inquiries + Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Projects & Submitted Inquiries */}
        <div className="lg:col-span-7 space-y-8">
          {/* Active Projects Section */}
          <div className="space-y-4">
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
              <div className="p-8 rounded-3xl bg-white/60 border border-dashed border-[#d8d0c8] text-center space-y-3">
                <FolderKanban className="w-9 h-9 text-[#c2652a]/60 mx-auto" />
                <h3 className="text-base font-serif text-[#3a302a]">
                  No Live Builds in Progress
                </h3>
                <p className="text-xs text-[#605850] max-w-md mx-auto leading-relaxed">
                  {projectRequests.length > 0
                    ? "Your submitted project inquiries are shown below. Once scoped and accepted by our studio leads, your interactive build workspace will be activated here."
                    : "If you recently submitted an inquiry or initiated a project brief, the GROVIX team is reviewing your requirements. Once accepted, your project timeline and deliverables will appear right here."}
                </p>
                {projectRequests.length === 0 && (
                  <div className="pt-2">
                    <Link
                      href="/start-project"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c2652a] text-white text-xs font-semibold shadow-warm-sm hover:bg-[#a8521e] transition-all"
                    >
                      <span>Submit Project Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submitted Inquiries & Applications Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif text-[#3a302a]">
                  Submitted <span className="italic text-[#c2652a]">Inquiries & Applications</span>
                </h2>
                <p className="text-xs text-[#605850] mt-0.5">
                  Project briefs submitted to GROVIX Studio for review, scoping, and acceptance
                </p>
              </div>
              <Link
                href="/start-project"
                className="text-xs text-[#c2652a] hover:underline font-semibold"
              >
                + New Inquiry
              </Link>
            </div>

            <ProjectApplicationsList requests={projectRequests} />
          </div>
        </div>

        {/* Right Column: Engineering Changelog / Updates */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-2xl font-serif text-[#3a302a]">
              Milestone <span className="italic text-[#c2652a]">Changelog</span>
            </h2>
            <p className="text-xs text-[#605850] mt-0.5">
              Recent status messages from the GROVIX engineering team
            </p>
          </div>

          <ProjectUpdateList updates={recentUpdates} />

          {/* Studio Inception Guide */}
          <div className="p-6 rounded-3xl bg-white/70 border border-[#d8d0c8]/70 shadow-warm-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c2652a]">
              <Sparkles className="w-4 h-4" />
              <span>Project Inception Flow</span>
            </div>
            <div className="space-y-3 text-xs text-[#605850]">
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#f2ece4] text-[#3a302a] font-mono text-[11px] flex items-center justify-center shrink-0">
                  1
                </span>
                <p>
                  <strong className="text-[#3a302a]">Scope & Evaluation:</strong> Studio leads review your inquiry, timeline, and tech stack requirements.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#f2ece4] text-[#3a302a] font-mono text-[11px] flex items-center justify-center shrink-0">
                  2
                </span>
                <p>
                  <strong className="text-[#3a302a]">Architecture & Proposal:</strong> We prepare sprint milestones and deliver an estimate.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#f2ece4] text-[#3a302a] font-mono text-[11px] flex items-center justify-center shrink-0">
                  3
                </span>
                <p>
                  <strong className="text-[#3a302a]">Active Sprint Kickoff:</strong> Upon acceptance, your project workspace becomes live with real-time updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
