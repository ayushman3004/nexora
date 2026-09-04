"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import { createProjectAction } from "@/app/actions/admin";
import {
  Plus,
  ArrowRight,
  Globe,
  ExternalLink,
  X,
} from "lucide-react";
import type { Project, Profile } from "@/types/database";

interface ProjectTableProps {
  projects: (Project & { profiles?: { name: string; company: string | null } })[];
  clients: Profile[];
}

export function ProjectTable({ projects, clients }: ProjectTableProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filtered = projects.filter((p) => {
    if (filter === "ALL") return true;
    return p.status === filter;
  });

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createProjectAction(formData);
      setCreateModalOpen(false);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "IN_PROGRESS", "DELIVERED", "COMPLETED", "ON_HOLD"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === s
                  ? "bg-[#c2652a] text-white shadow-warm-sm"
                  : "bg-white/80 text-[#605850] hover:bg-[#f2ece4] border border-[#d8d0c8]/60"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white/80 rounded-3xl border border-[#d8d0c8]/60 shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d8d0c8]/60 bg-[#faf5ee]/60 text-[11px] font-mono uppercase tracking-wider text-[#8c827a]">
                <th className="py-3.5 px-6">Project Title & Scope</th>
                <th className="py-3.5 px-4">Client Partner</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published on /work</th>
                <th className="py-3.5 px-4">URLs</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8d0c8]/40 text-sm">
              {filtered.length > 0 ? (
                filtered.map((proj) => {
                  const client = clients.find((c) => c.id === proj.client_id);

                  return (
                    <tr key={proj.id} className="hover:bg-[#faf5ee]/50 transition-colors">
                      <td className="py-4 px-6">
                        <Link
                          href={`/admin/projects/${proj.id}`}
                          className="font-serif font-medium text-base text-[#3a302a] hover:text-[#c2652a] transition-colors"
                        >
                          {proj.title}
                        </Link>
                        <p className="text-xs text-[#605850] line-clamp-1 mt-0.5">
                          {proj.description || "Digital engineering build."}
                        </p>
                      </td>

                      <td className="py-4 px-4 text-xs">
                        {client ? (
                          <div>
                            <span className="font-semibold text-[#3a302a]">
                              {client.name}
                            </span>
                            <p className="text-[11px] text-[#8c827a]">
                              {client.company || client.email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-[11px] font-mono text-[#8c827a]">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <ProjectStatusBadge status={proj.status} size="sm" />
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold ${
                            proj.published
                              ? "bg-[#c2652a]/10 text-[#c2652a] border border-[#c2652a]/30"
                              : "bg-[#f2ece4] text-[#8c827a]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              proj.published ? "bg-[#c2652a]" : "bg-[#8c827a]"
                            }`}
                          />
                          {proj.published ? "Live Showcase" : "Unpublished"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs space-y-1">
                        {proj.website_url && (
                          <a
                            href={proj.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#c2652a] hover:underline flex items-center gap-1"
                          >
                            <Globe className="w-3 h-3" />
                            <span>Live Site</span>
                          </a>
                        )}
                        {proj.preview_url && (
                          <a
                            href={proj.preview_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#605850] hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Staging</span>
                          </a>
                        )}
                        {!proj.website_url && !proj.preview_url && (
                          <span className="text-[11px] font-mono text-[#8c827a]">
                            —
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/admin/projects/${proj.id}`}
                          className="px-3.5 py-1.5 rounded-full bg-[#f2ece4] hover:bg-[#ece6dc] text-xs font-semibold text-[#3a302a] transition-colors inline-flex items-center gap-1"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#8c827a]">
                    No projects found matching current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3a302a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf5ee] rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#d8d0c8] shadow-warm-lg space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8d0c8]/60">
              <h3 className="text-2xl font-serif text-[#3a302a]">
                Create New Project
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#ece6dc] text-[#605850]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Project Title
                </label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Lumina Health Platform"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Assign Client
                </label>
                <select
                  name="client_id"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                >
                  <option value="">Unassigned</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email}) {c.company ? `— ${c.company}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                  >
                    <option value="web">Client Website</option>
                    <option value="product">Nexora Product</option>
                    <option value="architecture">Engineering Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                  >
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On Hold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Description / Scope
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Summary of engineering build, goals, and technical specs..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Live Website URL (Optional)
                </label>
                <input
                  name="website_url"
                  type="url"
                  placeholder="https://clientdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Staging / Preview URL (Optional)
                </label>
                <input
                  name="preview_url"
                  type="url"
                  placeholder="https://staging.clientdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3a302a] mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  name="technologies"
                  placeholder="Next.js 16, TypeScript, Tailwind CSS, Supabase"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div className="pt-4 border-t border-[#d8d0c8]/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#d8d0c8] text-xs font-semibold text-[#605850]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isPending ? "Creating..." : "Create Project"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
