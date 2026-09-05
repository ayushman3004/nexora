"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import { ProjectTimeline } from "@/components/client/ProjectTimeline";
import { ProjectUpdateList } from "@/components/client/ProjectUpdateList";
import {
  updateProjectAction,
  addProjectUpdateAction,
} from "@/app/actions/admin";
import {
  ArrowLeft,
  ExternalLink,
  Save,
  MessageSquarePlus,
  CheckCircle2,
  Send,
} from "lucide-react";
import type { Project, ProjectUpdate, Profile, ProjectStatus } from "@/types/database";

interface ProjectEditorProps {
  project: Project;
  updates: ProjectUpdate[];
  clients: Profile[];
}

export function ProjectEditor({
  project: initialProject,
  updates: initialUpdates,
  clients,
}: ProjectEditorProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [updates, setUpdates] = useState<ProjectUpdate[]>(initialUpdates);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [newUpdateStatus, setNewUpdateStatus] = useState<string>("In Development");
  const [newUpdateMessage, setNewUpdateMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleUpdateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    const formData = new FormData(e.currentTarget);
    formData.set("project_id", project.id);

    startTransition(async () => {
      await updateProjectAction(formData);
      setStatusMessage("Project details successfully saved.");
      setTimeout(() => setStatusMessage(null), 3500);
    });
  };

  const handleAddMilestoneUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateMessage.trim()) return;

    startTransition(async () => {
      await addProjectUpdateAction(
        project.id,
        newUpdateStatus,
        newUpdateMessage.trim()
      );
      setUpdates((prev) => [
        {
          id: `temp-${Date.now()}`,
          project_id: project.id,
          status: newUpdateStatus,
          message: newUpdateMessage.trim(),
          created_by: null,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setNewUpdateMessage("");
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <Link
            href="/admin/projects"
            className="text-xs text-[#8c827a] hover:text-[#3a302a] inline-flex items-center gap-1.5 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects List</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif text-[#3a302a]">{project.title}</h1>
            <ProjectStatusBadge status={project.status} />
          </div>
          <p className="text-xs font-mono text-[#8c827a]">
            Project ID: {project.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/projects/${project.id}`}
            target="_blank"
            className="px-4 py-2 rounded-full bg-white hover:bg-[#faf5ee] border border-[#d8d0c8] text-xs font-semibold text-[#3a302a] transition-all flex items-center gap-1.5"
          >
            <span>Client View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-[#c2652a]/10 border border-[#c2652a]/20 text-[#c2652a] text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Visual Pipeline */}
      <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/60 shadow-warm-sm space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8c827a]">
          Client Status Timeline Preview
        </h2>
        <ProjectTimeline currentStatus={project.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Project Edit Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleUpdateProject}
            className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/60 shadow-warm-sm space-y-5"
          >
            <h2 className="text-xl font-serif text-[#3a302a]">Edit Project Configuration</h2>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                Project Title
              </label>
              <input
                name="title"
                required
                defaultValue={project.title}
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Assign Client
                </label>
                <select
                  name="client_id"
                  defaultValue={project.client_id || ""}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
                >
                  <option value="">No Client (Internal Studio Project / Direct Showcase)</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email}) {c.company ? `— ${c.company}` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#8c827a] mt-1">
                  Leave as &ldquo;No Client&rdquo; for studio-engineered internal products or direct portfolio showcases.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Lifecycle Status
                </label>
                <select
                  name="status"
                  defaultValue={project.status}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      status: e.target.value as ProjectStatus,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
                >
                  <option value="DELIVERED">Delivered (Showcase Eligible)</option>
                  <option value="COMPLETED">Completed (Showcase Eligible)</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REQUESTED">Requested</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="ON_HOLD">On Hold</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={project.category}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
                >
                  <option value="web">Client Website / Web App</option>
                  <option value="product">Nexora SaaS Product</option>
                  <option value="architecture">Engineering Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Work Page Showcase (/work)
                </label>
                <select
                  name="published"
                  defaultValue={project.published ? "true" : "false"}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
                >
                  <option value="false">Unpublished (Private)</option>
                  <option value="true">Published (Visible on /work when Delivered)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                Public Tagline / Pitch
              </label>
              <input
                name="tagline"
                defaultValue={project.case_study?.tagline || ""}
                placeholder="e.g. High-performance digital engineering architecture."
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                Description & Scope
              </label>
              <textarea
                name="description"
                rows={3}
                defaultValue={project.description || ""}
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Live Production URL
                </label>
                <input
                  name="website_url"
                  type="url"
                  defaultValue={project.website_url || ""}
                  placeholder="https://clientdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Staging / Preview URL
                </label>
                <input
                  name="preview_url"
                  type="url"
                  defaultValue={project.preview_url || ""}
                  placeholder="https://staging.vercel.app"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                Technologies (comma-separated)
              </label>
              <input
                name="technologies"
                defaultValue={project.technologies ? project.technologies.join(", ") : ""}
                placeholder="Next.js 16, TypeScript, Tailwind CSS, Framer Motion"
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-sm text-[#3a302a]"
              />
            </div>

            {/* Case Study Details */}
            <div className="p-4 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c2652a]">
                Case Study Narrative (/work page)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#3a302a] mb-1">
                    The Challenge
                  </label>
                  <textarea
                    name="challenge"
                    rows={2}
                    defaultValue={project.case_study?.challenge || ""}
                    placeholder="e.g. Modernizing legacy infrastructure..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8d0c8] text-xs text-[#3a302a]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#3a302a] mb-1">
                    The Solution
                  </label>
                  <textarea
                    name="solution"
                    rows={2}
                    defaultValue={project.case_study?.solution || ""}
                    placeholder="e.g. Engineered custom Next.js architecture..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8d0c8] text-xs text-[#3a302a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#3a302a] mb-1">
                  Key Features Delivered (comma-separated)
                </label>
                <input
                  name="features"
                  defaultValue={
                    project.case_study?.features
                      ? project.case_study.features.join(", ")
                      : ""
                  }
                  placeholder="Interactive Preview, Mobile-First Booking, Edge CDN"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8d0c8] text-xs text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#3a302a] mb-1">
                  Verified Business Outcome
                </label>
                <input
                  name="outcome"
                  defaultValue={project.case_study?.outcome || ""}
                  placeholder="e.g. 100% lighthouse score and 3x conversion increase."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8d0c8] text-xs text-[#3a302a]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#d8d0c8]/60 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? "Saving..." : "Save Project Settings"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Publish Milestone Updates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Post New Update */}
          <div className="bg-white/80 rounded-3xl p-6 border border-[#d8d0c8]/60 shadow-warm-sm space-y-4">
            <h3 className="text-lg font-serif text-[#3a302a] flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-[#c2652a]" />
              <span>Publish Milestone Update</span>
            </h3>

            <form onSubmit={handleAddMilestoneUpdate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8c827a] mb-1">
                  Milestone Status Tag
                </label>
                <input
                  value={newUpdateStatus}
                  onChange={(e) => setNewUpdateStatus(e.target.value)}
                  placeholder="e.g. Architecture Approved, Sprint 2 Completed"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-xs text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8c827a] mb-1">
                  Changelog / Note to Client
                </label>
                <textarea
                  rows={3}
                  value={newUpdateMessage}
                  onChange={(e) => setNewUpdateMessage(e.target.value)}
                  placeholder="Summarize engineering progress, shipped components, or staging deliverables..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-xs text-[#3a302a]"
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !newUpdateMessage.trim()}
                className="w-full py-2.5 rounded-full bg-[#2e2621] hover:bg-[#3a302a] text-[#faf5ee] text-xs font-semibold shadow-warm-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Client Portal</span>
              </button>
            </form>
          </div>

          {/* Existing Updates Feed */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#605850]">
              Published Changelog ({updates.length})
            </h3>
            <ProjectUpdateList updates={updates} />
          </div>
        </div>
      </div>
    </div>
  );
}
