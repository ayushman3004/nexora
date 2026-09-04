import React from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Users, Mail, Building, FolderKanban, Calendar, ArrowRight } from "lucide-react";
import type { Profile, Project } from "@/types/database";

export default async function AdminClientsPage() {
  const adminClient = createAdminClient();

  const [{ data: clients }, { data: projects }] = await Promise.all([
    adminClient.from("profiles").select("*").eq("role", "client").order("created_at", { ascending: false }),
    adminClient.from("projects").select("id, title, client_id, status"),
  ]);

  const clientList = (clients as Profile[]) || [];
  const projectList = (projects as Project[]) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <SectionBadge icon={Users} variant="primary">
            CLIENT ORGANIZATIONS
          </SectionBadge>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            Registered <span className="italic text-[#c2652a]">Clients</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850]">
            Directory of client accounts, assigned engineering workspaces, and portal access.
          </p>
        </div>

        <span className="px-4 py-1.5 rounded-full bg-[#f2ece4] border border-[#d8d0c8] text-xs font-mono text-[#605850]">
          Total: {clientList.length} Client{clientList.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Clients Grid */}
      {clientList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientList.map((client) => {
            const assignedProjects = projectList.filter(
              (p) => p.client_id === client.id
            );
            const formattedDate = new Date(client.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <div
                key={client.id}
                className="p-6 rounded-3xl bg-white/80 border border-[#d8d0c8]/60 shadow-warm-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#f2ece4] border border-[#d8d0c8] flex items-center justify-center font-bold text-sm text-[#c2652a]">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-mono text-[#8c827a] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#3a302a]">
                      {client.name}
                    </h3>
                    <p className="text-xs text-[#605850] flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-[#8c827a]" />
                      <span>{client.company || "Individual Client"}</span>
                    </p>
                    <p className="text-xs text-[#8c827a] flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-[#8c827a]" />
                      <span>{client.email}</span>
                    </p>
                  </div>

                  {/* Assigned Projects */}
                  <div className="pt-3 border-t border-[#d8d0c8]/40 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#8c827a] block">
                      Assigned Projects ({assignedProjects.length})
                    </span>
                    {assignedProjects.length > 0 ? (
                      <div className="space-y-1">
                        {assignedProjects.map((p) => (
                          <Link
                            key={p.id}
                            href={`/admin/projects/${p.id}`}
                            className="block p-2 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/50 text-xs font-semibold text-[#3a302a] hover:text-[#c2652a] transition-colors truncate"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#8c827a] italic">
                        No projects assigned yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d8d0c8]/40 flex justify-end">
                  <span className="text-[10px] font-mono text-[#8c827a]">
                    ID: {client.id.substring(0, 8)}...
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white/70 border border-dashed border-[#d8d0c8] text-center space-y-3 max-w-md mx-auto">
          <Users className="w-10 h-10 text-[#c2652a]/60 mx-auto" />
          <h3 className="text-lg font-serif text-[#3a302a]">No Clients Registered Yet</h3>
          <p className="text-xs text-[#605850] leading-relaxed">
            When clients sign up via `/register`, their profile details and assigned projects will be tracked here.
          </p>
        </div>
      )}
    </div>
  );
}
