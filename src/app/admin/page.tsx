import React from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  Users,
  Inbox,
  FolderKanban,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Calendar,
  Globe,
} from "lucide-react";
import type { Project, ProjectRequest } from "@/types/database";

export default async function AdminDashboardOverviewPage() {
  const adminClient = createAdminClient();

  // 1. Fetch counts in parallel
  const [
    { count: totalClients },
    { count: pendingRequests },
    { count: activeProjects },
    { count: completedProjects },
    { count: pendingReviews },
    { data: recentRequests },
    { data: recentProjects },
  ] = await Promise.all([
    adminClient.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
    adminClient.from("project_requests").select("*", { count: "exact", head: true }).in("status", ["SUBMITTED", "UNDER_REVIEW"]),
    adminClient.from("projects").select("*", { count: "exact", head: true }).neq("status", "COMPLETED"),
    adminClient.from("projects").select("*", { count: "exact", head: true }).eq("status", "COMPLETED"),
    adminClient.from("reviews").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    adminClient.from("project_requests").select("*").order("created_at", { ascending: false }).limit(5),
    adminClient.from("projects").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    {
      label: "Total Clients",
      value: totalClients || 0,
      icon: Users,
      href: "/admin/clients",
      desc: "Registered client accounts",
    },
    {
      label: "Pending Inquiries",
      value: pendingRequests || 0,
      icon: Inbox,
      href: "/admin/requests",
      desc: "Awaiting triage & acceptance",
      highlight: (pendingRequests || 0) > 0,
    },
    {
      label: "Active Projects",
      value: activeProjects || 0,
      icon: FolderKanban,
      href: "/admin/projects",
      desc: "In design & development",
    },
    {
      label: "Shipped Projects",
      value: completedProjects || 0,
      icon: CheckCircle2,
      href: "/admin/projects",
      desc: "Production deployments",
    },
    {
      label: "Pending Reviews",
      value: pendingReviews || 0,
      icon: Star,
      href: "/admin/reviews",
      desc: "Awaiting public moderation",
      highlight: (pendingReviews || 0) > 0,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <SectionBadge icon={Sparkles} variant="primary">
            GROVIX MISSION CONTROL
          </SectionBadge>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#3a302a]">
            Studio <span className="italic text-[#c2652a]">Overview</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850]">
            System telemetry, project inquiries, active deliverables, and client portal operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/requests"
            className="px-4 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-1.5"
          >
            <span>Review Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className={`p-5 rounded-3xl bg-white/80 border transition-all hover:shadow-warm-md flex flex-col justify-between ${
                s.highlight
                  ? "border-[#c2652a]/50 ring-2 ring-[#c2652a]/10"
                  : "border-[#d8d0c8]/60 shadow-warm-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8c827a] uppercase tracking-wider">
                  {s.label}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    s.highlight ? "text-[#c2652a]" : "text-[#8c827a]"
                  }`}
                />
              </div>

              <div className="mt-4">
                <p className="text-3xl font-serif text-[#3a302a] font-medium">
                  {s.value}
                </p>
                <p className="text-[10px] text-[#605850] mt-1 line-clamp-1">
                  {s.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Requests & Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Inquiries */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#3a302a]">
              Recent <span className="italic text-[#c2652a]">Inquiries</span>
            </h2>
            <Link
              href="/admin/requests"
              className="text-xs text-[#c2652a] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white/80 rounded-3xl border border-[#d8d0c8]/60 shadow-warm-sm divide-y divide-[#d8d0c8]/40 overflow-hidden">
            {recentRequests && recentRequests.length > 0 ? (
              (recentRequests as ProjectRequest[]).map((req) => (
                <div key={req.id} className="p-4 sm:p-5 hover:bg-[#faf5ee]/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-serif font-semibold text-[#3a302a]">
                        {req.name}{" "}
                        <span className="text-xs font-normal text-[#8c827a]">
                          ({req.company || "Individual"})
                        </span>
                      </p>
                      <p className="text-xs text-[#605850] mt-0.5">{req.email}</p>
                    </div>
                    <ProjectStatusBadge status={req.status} size="sm" />
                  </div>

                  <p className="text-xs text-[#605850] mt-2 line-clamp-2 italic">
                    &ldquo;{req.details || "No project brief text provided."}&rdquo;
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#d8d0c8]/30 text-[11px] font-mono text-[#8c827a]">
                    <span>Budget: {req.budget || "TBD"}</span>
                    <span>Timeline: {req.timeline || "TBD"}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#8c827a]">
                No incoming inquiries logged yet.
              </div>
            )}
          </div>
        </div>

        {/* Right: Recent Projects */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#3a302a]">
              Active <span className="italic text-[#c2652a]">Projects</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs text-[#c2652a] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white/80 rounded-3xl border border-[#d8d0c8]/60 shadow-warm-sm divide-y divide-[#d8d0c8]/40 overflow-hidden">
            {recentProjects && recentProjects.length > 0 ? (
              (recentProjects as Project[]).map((proj) => (
                <div key={proj.id} className="p-4 sm:p-5 hover:bg-[#faf5ee]/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="text-sm font-serif font-semibold text-[#3a302a] hover:text-[#c2652a] transition-colors"
                      >
                        {proj.title}
                      </Link>
                      <p className="text-xs text-[#605850] mt-0.5 line-clamp-1">
                        {proj.description || "Digital engineering project."}
                      </p>
                    </div>
                    <ProjectStatusBadge status={proj.status} size="sm" />
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#d8d0c8]/30 text-[11px]">
                    <span className="font-mono text-[#8c827a]">
                      Category: {proj.category}
                    </span>
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="text-[#c2652a] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Manage
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#8c827a]">
                No projects initialized in database yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
