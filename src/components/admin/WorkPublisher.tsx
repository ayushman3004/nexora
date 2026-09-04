"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  toggleWorkPublishAction,
  updateProjectAction,
} from "@/app/actions/admin";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import {
  Globe,
  CheckCircle2,
  X,
  Save,
  ExternalLink,
  Edit3,
} from "lucide-react";
import type { Project } from "@/types/database";

interface WorkPublisherProps {
  projects: Project[];
}

export function WorkPublisher({ projects }: WorkPublisherProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleTogglePublish = (projectId: string, currentPublished: boolean) => {
    startTransition(async () => {
      await toggleWorkPublishAction(projectId, !currentPublished);
      setStatusMessage(
        !currentPublished
          ? "Project published to public /work page!"
          : "Project unpublished from public /work page."
      );
      setTimeout(() => setStatusMessage(null), 3500);
    });
  };

  const handleSaveShowcase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProject) return;

    const formData = new FormData(e.currentTarget);
    formData.set("project_id", selectedProject.id);
    formData.set("status", selectedProject.status);
    formData.set("client_id", selectedProject.client_id || "");

    startTransition(async () => {
      await updateProjectAction(formData);
      setStatusMessage("Showcase details updated successfully.");
      setSelectedProject(null);
      setTimeout(() => setStatusMessage(null), 3500);
    });
  };

  const publishedCount = projects.filter((p) => p.published).length;

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="p-4 rounded-2xl bg-[#c2652a]/10 border border-[#c2652a]/20 text-[#c2652a] text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/60 shadow-warm-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif text-[#3a302a]">
            Public Portfolio Auto-Publishing Engine
          </h2>
          <p className="text-xs text-[#605850] mt-1 max-w-xl leading-relaxed">
            When you mark a project as &ldquo;Published&rdquo;, it automatically renders on the live
            Nexora <Link href="/work" target="_blank" className="text-[#c2652a] underline font-medium">/work</Link> page
            using the existing Sahara Warm browser preview and case study layout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-[#c2652a]/10 text-[#c2652a] border border-[#c2652a]/20 text-xs font-mono font-semibold">
            {publishedCount} Published Showcase Item{publishedCount === 1 ? "" : "s"}
          </span>
          <Link
            href="/work"
            target="_blank"
            className="px-4 py-2 rounded-full bg-[#c2652a] text-white text-xs font-semibold shadow-warm-sm hover:bg-[#a8521e] transition-all flex items-center gap-1.5"
          >
            <span>Live /work</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`p-6 rounded-3xl bg-white/80 border transition-all flex flex-col justify-between ${
              proj.published
                ? "border-[#c2652a]/50 shadow-warm-md"
                : "border-[#d8d0c8]/60 shadow-warm-sm"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <ProjectStatusBadge status={proj.status} size="sm" />
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    proj.published
                      ? "bg-[#c2652a] text-white"
                      : "bg-[#f2ece4] text-[#8c827a]"
                  }`}
                >
                  {proj.published ? "LIVE ON /WORK" : "DRAFT"}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-medium text-[#3a302a]">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#605850] line-clamp-2 mt-1">
                  {proj.description || "Digital engineering project."}
                </p>
              </div>

              {proj.website_url && (
                <div className="text-xs text-[#c2652a] flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span className="truncate">{proj.website_url}</span>
                </div>
              )}

              {proj.technologies && proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#faf5ee] border border-[#d8d0c8]/60 text-[10px] font-mono text-[#605850]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-5 mt-5 border-t border-[#d8d0c8]/40 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedProject(proj)}
                className="px-3.5 py-1.5 rounded-full bg-[#f2ece4] hover:bg-[#ece6dc] text-xs font-semibold text-[#3a302a] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Showcase</span>
              </button>

              <button
                onClick={() => handleTogglePublish(proj.id, proj.published)}
                disabled={isPending}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  proj.published
                    ? "bg-[#8c3c3c]/15 text-[#8c3c3c] hover:bg-[#8c3c3c]/25"
                    : "bg-[#c2652a] text-white hover:bg-[#a8521e] shadow-warm-sm"
                }`}
              >
                {proj.published ? "Unpublish" : "Publish to /work"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Showcase Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#3a302a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf5ee] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#d8d0c8] shadow-warm-lg space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8d0c8]/60">
              <div>
                <h3 className="text-2xl font-serif text-[#3a302a]">
                  Edit Work Showcase Metadata
                </h3>
                <p className="text-xs text-[#605850]">
                  Configure fields displayed on the public /work showcase page
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full hover:bg-[#ece6dc] text-[#605850]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveShowcase} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Showcase Title
                </label>
                <input
                  name="title"
                  required
                  defaultValue={selectedProject.title}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                    Category Filter
                  </label>
                  <select
                    name="category"
                    defaultValue={selectedProject.category}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                  >
                    <option value="web">Client Website (category: web)</option>
                    <option value="product">Nexora Product (category: product)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                    Live Status
                  </label>
                  <select
                    name="published"
                    defaultValue={selectedProject.published ? "true" : "false"}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                  >
                    <option value="true">Published to /work</option>
                    <option value="false">Unpublished / Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Public Overview / Tagline
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={selectedProject.description || ""}
                  placeholder="Overview paragraph displayed on the project card..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                    Website URL (for live browser preview)
                  </label>
                  <input
                    name="website_url"
                    type="url"
                    defaultValue={selectedProject.website_url || ""}
                    placeholder="https://clientdomain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                    Demo / Staging Preview URL
                  </label>
                  <input
                    name="preview_url"
                    type="url"
                    defaultValue={selectedProject.preview_url || ""}
                    placeholder="https://preview.clientdomain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  name="technologies"
                  defaultValue={
                    selectedProject.technologies
                      ? selectedProject.technologies.join(", ")
                      : ""
                  }
                  placeholder="Next.js 16, TypeScript, Tailwind CSS, Vercel Edge"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div className="pt-4 border-t border-[#d8d0c8]/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-full border border-[#d8d0c8] text-xs font-semibold text-[#605850]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isPending ? "Saving..." : "Save Showcase Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
