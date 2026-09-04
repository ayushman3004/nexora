"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ProjectTimeline } from "./ProjectTimeline";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectUpdateList } from "./ProjectUpdateList";
import {
  Globe,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Zap,
} from "lucide-react";
import type { Project, ProjectUpdate } from "@/types/database";

interface RealtimeProjectDetailProps {
  initialProject: Project;
  initialUpdates: ProjectUpdate[];
}

export function RealtimeProjectDetail({
  initialProject,
  initialUpdates,
}: RealtimeProjectDetailProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [updates, setUpdates] = useState<ProjectUpdate[]>(initialUpdates);
  const supabase = createClient();

  useEffect(() => {
    // 1. Subscribe to changes on this specific project
    const projectChannel = supabase
      .channel(`project-${project.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "projects",
          filter: `id=eq.${project.id}`,
        },
        (payload) => {
          setProject(payload.new as Project);
        }
      )
      .subscribe();

    // 2. Subscribe to new updates published for this project
    const updatesChannel = supabase
      .channel(`project-updates-${project.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "project_updates",
          filter: `project_id=eq.${project.id}`,
        },
        (payload) => {
          setUpdates((prev) => [payload.new as ProjectUpdate, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectChannel);
      supabase.removeChannel(updatesChannel);
    };
  }, [project.id, supabase]);

  const formattedCreated = new Date(project.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedDelivered = project.delivered_at
    ? new Date(project.delivered_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <Link
            href="/dashboard/projects"
            className="text-xs text-[#8c827a] hover:text-[#3a302a] inline-flex items-center gap-1.5 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-serif text-[#3a302a]">
              {project.title}
            </h1>
            <ProjectStatusBadge status={project.status} />
          </div>
          <p className="text-xs font-mono text-[#8c827a] flex items-center gap-1.5 pt-1">
            <Calendar className="w-3 h-3" />
            Initiated on {formattedCreated}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.website_url && (
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Visit Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.preview_url && (
            <a
              href={project.preview_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#faf5ee] border border-[#d8d0c8] text-xs font-semibold text-[#3a302a] transition-all flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-[#c2652a]" />
              <span>Staging Preview</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Visual Status Pipeline */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/60 shadow-warm-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#3a302a] font-sans">
            Project Progression Pipeline
          </h2>
          <span className="text-[11px] font-mono text-[#c2652a] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#c2652a] animate-pulse" />
            Realtime Sync Active
          </span>
        </div>
        <ProjectTimeline currentStatus={project.status} />
      </div>

      {/* Main Details & Updates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scope & Metadata */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/60 shadow-warm-sm space-y-5">
            <h2 className="text-xl font-serif text-[#3a302a]">Project Scope & Details</h2>
            <p className="text-sm text-[#605850] font-sans leading-relaxed whitespace-pre-wrap">
              {project.description || "No project overview description provided."}
            </p>

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="pt-4 border-t border-[#d8d0c8]/50 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3a302a] block">
                  Core Technologies & Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-[#faf5ee] border border-[#d8d0c8]/70 text-xs font-mono text-[#605850]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="pt-4 border-t border-[#d8d0c8]/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#8c827a] block">
                  Target / Completion Date
                </span>
                <p className="text-sm font-semibold text-[#3a302a] mt-0.5">
                  {formattedDelivered || "In Active Development"}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#8c827a] block">
                  Publishing Status
                </span>
                <p className="text-sm font-semibold text-[#3a302a] mt-0.5">
                  {project.published ? "Showcased on Nexora /work" : "Private Client Workspace"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Changelog / Updates */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#3a302a]">
              Milestone <span className="italic text-[#c2652a]">Updates</span>
            </h2>
            <span className="text-xs text-[#8c827a] font-mono">
              {updates.length} note{updates.length === 1 ? "" : "s"}
            </span>
          </div>

          <ProjectUpdateList updates={updates} />
        </div>
      </div>
    </div>
  );
}
