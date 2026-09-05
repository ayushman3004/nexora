import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ClientList } from "@/components/admin/ClientList";
import { Users } from "lucide-react";
import type { Profile, Project } from "@/types/database";

export default async function AdminClientsPage() {
  const adminClient = createAdminClient();

  const [
    { data: clients },
    { data: projects },
    { data: authUsersData },
  ] = await Promise.all([
    adminClient.from("profiles").select("*").eq("role", "client").order("created_at", { ascending: false }),
    adminClient.from("projects").select("id, title, client_id, status"),
    adminClient.auth.admin.listUsers(),
  ]);

  const clientList = (clients as Profile[]) || [];
  const projectList = (projects as Project[]) || [];
  const authUsers = authUsersData?.users || [];

  // Match auth status
  const clientsWithAuth = clientList.map((c) => {
    const authUser = authUsers.find((u) => u.id === c.id || u.email === c.email);
    return {
      ...c,
      email_confirmed: !!authUser?.email_confirmed_at,
    };
  });

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
            Directory of client accounts, email verification status, and workspace permissions.
          </p>
        </div>

        <span className="px-4 py-1.5 rounded-full bg-[#f2ece4] border border-[#d8d0c8] text-xs font-mono text-[#605850]">
          Total: {clientList.length} Client{clientList.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Interactive Clients Grid with Email Verification Controls */}
      <ClientList clients={clientsWithAuth} projects={projectList} />
    </div>
  );
}
