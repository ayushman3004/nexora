import React from "react";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import type { Project, ProjectUpdate, Profile } from "@/types/database";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adminClient = createAdminClient();

  const [
    { data: project, error },
    { data: updates },
    { data: clients },
  ] = await Promise.all([
    adminClient.from("projects").select("*").eq("id", id).single(),
    adminClient.from("project_updates").select("*").eq("project_id", id).order("created_at", { ascending: false }),
    adminClient.from("profiles").select("*").eq("role", "client").order("name", { ascending: true }),
  ]);

  if (error || !project) {
    notFound();
  }

  return (
    <ProjectEditor
      project={project as Project}
      updates={(updates as ProjectUpdate[]) || []}
      clients={(clients as Profile[]) || []}
    />
  );
}
