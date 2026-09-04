import React from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RealtimeProjectDetail } from "@/components/client/RealtimeProjectDetail";
import type { Project, ProjectUpdate } from "@/types/database";

export default async function ClientProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=/dashboard/projects/${id}`);
  }

  // Fetch project; RLS ensures client can only fetch if client_id = user.id or user is admin
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (projectError || !project) {
    notFound();
  }

  // Fetch project updates
  const { data: updates } = await supabase
    .from("project_updates")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  return (
    <RealtimeProjectDetail
      initialProject={project as Project}
      initialUpdates={(updates as ProjectUpdate[]) || []}
    />
  );
}
