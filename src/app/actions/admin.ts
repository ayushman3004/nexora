"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { ProjectStatus, ProjectRequestStatus, ReviewStatus } from "@/types/database";

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("Forbidden: Admin privileges required.");
  }

  return user;
}

// 1. Update Project Request Status & Assign Client
export async function updateRequestStatusAction(
  requestId: string,
  status: ProjectRequestStatus,
  clientId?: string | null
) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (clientId !== undefined) {
    updateData.client_id = clientId || null;
  }

  const { error } = await adminClient
    .from("project_requests")
    .update(updateData)
    .eq("id", requestId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/requests");
  revalidatePath("/admin");
  return { success: true };
}

// 2. Convert Request into Active Project
export async function createProjectFromRequestAction(formData: FormData) {
  const user = await verifyAdmin();
  const adminClient = createAdminClient();

  const requestId = formData.get("request_id") as string;
  const clientId = (formData.get("client_id") as string) || null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = (formData.get("category") as string) || "web";

  if (!title) throw new Error("Project title is required.");

  // Insert project
  const { data: project, error: projError } = await adminClient
    .from("projects")
    .insert({
      title,
      description,
      client_id: clientId,
      request_id: requestId || null,
      category,
      status: "IN_PROGRESS",
      published: false,
    })
    .select()
    .single();

  if (projError) throw new Error(projError.message);

  // Update request status to ACCEPTED
  if (requestId) {
    await adminClient
      .from("project_requests")
      .update({
        status: "ACCEPTED",
        client_id: clientId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId);
  }

  // Create initial project update
  await adminClient.from("project_updates").insert({
    project_id: project.id,
    status: "Project Accepted",
    message: "Project officially initiated by the Nexora engineering studio.",
    created_by: user.id,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/admin/requests");
  revalidatePath("/dashboard");
  return { success: true, projectId: project.id };
}

// 3. Create Standalone Project
export async function createProjectAction(formData: FormData) {
  const user = await verifyAdmin();
  const adminClient = createAdminClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const clientId = (formData.get("client_id") as string) || null;
  const category = (formData.get("category") as string) || "web";
  const status = (formData.get("status") as ProjectStatus) || "IN_PROGRESS";
  const websiteUrl = formData.get("website_url") as string;
  const previewUrl = formData.get("preview_url") as string;
  const techStr = formData.get("technologies") as string;

  const technologies = techStr
    ? techStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const { data: project, error } = await adminClient
    .from("projects")
    .insert({
      title,
      description,
      client_id: clientId,
      category,
      status,
      website_url: websiteUrl || null,
      preview_url: previewUrl || null,
      technologies,
      published: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await adminClient.from("project_updates").insert({
    project_id: project.id,
    status: "Created",
    message: "Project record initialized in Nexora management system.",
    created_by: user.id,
  });

  revalidatePath("/admin/projects");
  return { success: true, projectId: project.id };
}

// 4. Update Existing Project
export async function updateProjectAction(formData: FormData) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const projectId = formData.get("project_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const clientId = (formData.get("client_id") as string) || null;
  const category = formData.get("category") as string;
  const status = formData.get("status") as ProjectStatus;
  const websiteUrl = formData.get("website_url") as string;
  const previewUrl = formData.get("preview_url") as string;
  const techStr = formData.get("technologies") as string;
  const published = formData.get("published") === "true";

  const technologies = techStr
    ? techStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const updateData: Record<string, unknown> = {
    title,
    description,
    client_id: clientId,
    category,
    status,
    website_url: websiteUrl || null,
    preview_url: previewUrl || null,
    technologies,
    published,
    updated_at: new Date().toISOString(),
  };

  if (status === "DELIVERED" || status === "COMPLETED") {
    updateData.delivered_at = new Date().toISOString();
  }

  const { error } = await adminClient
    .from("projects")
    .update(updateData)
    .eq("id", projectId);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
  revalidatePath("/admin/work");
  revalidatePath("/work");
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

// 5. Add Milestone Changelog Update to Project
export async function addProjectUpdateAction(
  projectId: string,
  status: string,
  message: string
) {
  const user = await verifyAdmin();
  const adminClient = createAdminClient();

  if (!status || !message) {
    throw new Error("Status and message are required.");
  }

  const { error } = await adminClient.from("project_updates").insert({
    project_id: projectId,
    status,
    message,
    created_by: user.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
  return { success: true };
}

// 6. Toggle Work Page Publishing
export async function toggleWorkPublishAction(projectId: string, published: boolean) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("projects")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", projectId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/work");
  revalidatePath("/work");
  return { success: true };
}

// 7. Moderate Product Review (APPROVE / REJECT)
export async function moderateReviewAction(reviewId: string, status: ReviewStatus) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("reviews")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", reviewId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/products");
  revalidatePath("/dashboard/reviews");
  return { success: true };
}

// 8. Delete Review
export async function deleteReviewAction(reviewId: string) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const { error } = await adminClient.from("reviews").delete().eq("id", reviewId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/products");
  return { success: true };
}
