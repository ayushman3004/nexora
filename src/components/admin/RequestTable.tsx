"use client";

import React, { useState, useTransition } from "react";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import {
  updateRequestStatusAction,
  createProjectFromRequestAction,
} from "@/app/actions/admin";
import {
  PlusCircle,
  Eye,
  X,
  ArrowRight,
} from "lucide-react";
import type { ProjectRequest, Profile, ProjectRequestStatus } from "@/types/database";

interface RequestTableProps {
  requests: ProjectRequest[];
  clients: Profile[];
}

export function RequestTable({ requests, clients }: RequestTableProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [createModalRequest, setCreateModalRequest] = useState<ProjectRequest | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredRequests = requests.filter((r) => {
    if (filter === "ALL") return true;
    return r.status === filter;
  });

  const handleStatusChange = (
    requestId: string,
    status: ProjectRequestStatus,
    clientId?: string | null
  ) => {
    startTransition(async () => {
      await updateRequestStatusAction(requestId, status, clientId);
      if (selectedRequest && selectedRequest.id === requestId) {
        setSelectedRequest((prev) => (prev ? { ...prev, status, client_id: clientId || prev.client_id } : null));
      }
    });
  };

  const handleCreateProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createProjectFromRequestAction(formData);
      setCreateModalRequest(null);
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          "ALL",
          "SUBMITTED",
          "UNDER_REVIEW",
          "ACCEPTED",
          "IN_PROGRESS",
          "REJECTED",
        ].map((s) => (
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

      {/* Requests Table */}
      <div className="bg-white/80 rounded-3xl border border-[#d8d0c8]/60 shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d8d0c8]/60 bg-[#faf5ee]/60 text-[11px] font-mono uppercase tracking-wider text-[#8c827a]">
                <th className="py-3.5 px-6">Client / Company</th>
                <th className="py-3.5 px-4">Service & Type</th>
                <th className="py-3.5 px-4">Budget & Timeline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned Client</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8d0c8]/40 text-sm">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  const assignedClient = clients.find((c) => c.id === req.client_id);

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-[#faf5ee]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-serif font-medium text-[#3a302a]">
                          {req.name}
                        </div>
                        <div className="text-xs text-[#605850]">
                          {req.company || "Individual"} • {req.email}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs text-[#3a302a]">
                        <span className="font-medium text-[#c2652a]">
                          {req.service_type || "Digital Engineering"}
                        </span>
                        <div className="text-[11px] text-[#8c827a]">
                          {req.project_type || "Custom Build"}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs text-[#605850]">
                        <div>Budget: {req.budget || "TBD"}</div>
                        <div className="text-[11px] text-[#8c827a]">
                          Timeline: {req.timeline || "TBD"}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <ProjectStatusBadge status={req.status} size="sm" />
                      </td>

                      <td className="py-4 px-4 text-xs">
                        {assignedClient ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#f2ece4] border border-[#d8d0c8] text-[#3a302a] font-medium text-[11px]">
                            {assignedClient.name}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-[#8c827a]">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="px-3 py-1.5 rounded-full bg-[#f2ece4] hover:bg-[#ece6dc] text-xs font-semibold text-[#3a302a] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => {
                            setCreateModalRequest(req);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Create Project</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-xs text-[#8c827a] font-sans"
                  >
                    No project inquiries matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. Request Details Drawer / Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-[#3a302a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf5ee] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#d8d0c8] shadow-warm-lg space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#d8d0c8]/60">
              <div>
                <h3 className="text-2xl font-serif text-[#3a302a]">
                  Project Inquiry Details
                </h3>
                <p className="text-xs text-[#605850]">ID: {selectedRequest.id}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-full hover:bg-[#ece6dc] text-[#605850]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-mono text-[#8c827a] uppercase block">
                  Client Name
                </span>
                <p className="text-sm font-semibold text-[#3a302a] mt-0.5">
                  {selectedRequest.name}
                </p>
              </div>
              <div>
                <span className="font-mono text-[#8c827a] uppercase block">
                  Email
                </span>
                <p className="text-sm font-semibold text-[#3a302a] mt-0.5">
                  {selectedRequest.email}
                </p>
              </div>
              <div>
                <span className="font-mono text-[#8c827a] uppercase block">
                  Company
                </span>
                <p className="text-sm font-semibold text-[#3a302a] mt-0.5">
                  {selectedRequest.company || "Not specified"}
                </p>
              </div>
              <div>
                <span className="font-mono text-[#8c827a] uppercase block">
                  Current Status
                </span>
                <div className="mt-1">
                  <ProjectStatusBadge status={selectedRequest.status} />
                </div>
              </div>
            </div>

            {/* Scope / Brief */}
            <div className="p-4 rounded-2xl bg-white border border-[#d8d0c8]/60 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8c827a]">
                Project Brief & Details
              </span>
              <p className="text-sm text-[#3a302a] whitespace-pre-wrap leading-relaxed font-sans">
                {selectedRequest.details || "No brief details provided."}
              </p>
            </div>

            {/* Assign Client Profile */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-[#3a302a]">
                Assign to Client Profile
              </label>
              <select
                value={selectedRequest.client_id || ""}
                onChange={(e) => {
                  const newClientId = e.target.value;
                  handleStatusChange(
                    selectedRequest.id,
                    selectedRequest.status,
                    newClientId
                  );
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
              >
                <option value="">Unassigned (No client account)</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email}) {c.company ? `— ${c.company}` : ""}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#8c827a]">
                Assigning binds this project to the client’s authenticated dashboard.
              </p>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-[#d8d0c8]/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleStatusChange(selectedRequest.id, "UNDER_REVIEW")
                  }
                  disabled={isPending}
                  className="px-3.5 py-2 rounded-full bg-[#f0a878]/20 text-[#c2652a] text-xs font-semibold hover:bg-[#f0a878]/30 transition-colors"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedRequest.id, "ACCEPTED")
                  }
                  disabled={isPending}
                  className="px-3.5 py-2 rounded-full bg-[#c2652a] text-white text-xs font-semibold hover:bg-[#a8521e] transition-colors"
                >
                  Accept Request
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedRequest.id, "REJECTED")
                  }
                  disabled={isPending}
                  className="px-3.5 py-2 rounded-full bg-[#8c3c3c]/15 text-[#8c3c3c] text-xs font-semibold hover:bg-[#8c3c3c]/25 transition-colors"
                >
                  Decline
                </button>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-full border border-[#d8d0c8] text-xs font-semibold text-[#605850] hover:bg-[#ece6dc]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Create Project Modal */}
      {createModalRequest && (
        <div className="fixed inset-0 z-50 bg-[#3a302a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf5ee] rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#d8d0c8] shadow-warm-lg space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8d0c8]/60">
              <h3 className="text-2xl font-serif text-[#3a302a]">
                Initialize New Project
              </h3>
              <button
                onClick={() => setCreateModalRequest(null)}
                className="p-2 rounded-full hover:bg-[#ece6dc] text-[#605850]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-4">
              <input
                type="hidden"
                name="request_id"
                value={createModalRequest.id}
              />

              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase mb-1">
                  Project Title
                </label>
                <input
                  name="title"
                  required
                  defaultValue={`${createModalRequest.company || createModalRequest.name} Platform`}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase mb-1">
                  Assign Client Account
                </label>
                <select
                  name="client_id"
                  defaultValue={createModalRequest.client_id || ""}
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

              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue="web"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                >
                  <option value="web">Client Website / Web Application</option>
                  <option value="product">Nexora Product / SaaS</option>
                  <option value="architecture">Cloud & Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase mb-1">
                  Description & Scope
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={createModalRequest.details || ""}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a]"
                />
              </div>

              <div className="pt-4 border-t border-[#d8d0c8]/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalRequest(null)}
                  className="px-4 py-2 rounded-full border border-[#d8d0c8] text-xs font-semibold text-[#605850]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isPending ? "Creating..." : "Initialize Project"}</span>
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
