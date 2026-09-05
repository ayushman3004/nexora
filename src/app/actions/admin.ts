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
    message: "Project officially initiated by the GROVIX engineering studio.",
    created_by: user.id,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/admin/requests");
  revalidatePath("/dashboard");
  return { success: true, projectId: project.id };
}

// 3. Create Standalone Project (Supports No Client Studio Projects & Immediate Delivery/Publishing)
export async function createProjectAction(formData: FormData) {
  const user = await verifyAdmin();
  const adminClient = createAdminClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const clientId = (formData.get("client_id") as string) || null;
  const category = (formData.get("category") as string) || "web";
  let status = (formData.get("status") as ProjectStatus) || "IN_PROGRESS";
  const websiteUrl = formData.get("website_url") as string;
  const previewUrl = formData.get("preview_url") as string;
  const techStr = formData.get("technologies") as string;
  const published = formData.get("published") === "true";

  // If publishing to /work, ensure status is marked as DELIVERED or COMPLETED
  if (published && status !== "COMPLETED") {
    status = "DELIVERED";
  }

  const technologies = techStr
    ? techStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  // Case study metadata
  const tagline = formData.get("tagline") as string | null;
  const challenge = formData.get("challenge") as string | null;
  const solution = formData.get("solution") as string | null;
  const outcome = formData.get("outcome") as string | null;
  const featuresStr = formData.get("features") as string | null;

  const case_study: Record<string, unknown> = {};
  if (tagline) case_study.tagline = tagline;
  if (challenge) case_study.challenge = challenge;
  if (solution) case_study.solution = solution;
  if (outcome) case_study.outcome = outcome;
  if (featuresStr) {
    case_study.features = featuresStr.split(",").map((s) => s.trim()).filter(Boolean);
  }

  const insertData: Record<string, unknown> = {
    title,
    description: description || null,
    client_id: clientId,
    category,
    status,
    website_url: websiteUrl || null,
    preview_url: previewUrl || null,
    technologies,
    published,
    case_study: Object.keys(case_study).length > 0 ? case_study : null,
  };

  if (status === "DELIVERED" || status === "COMPLETED" || published) {
    insertData.delivered_at = new Date().toISOString();
  }

  const { data: project, error } = await adminClient
    .from("projects")
    .insert(insertData)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await adminClient.from("project_updates").insert({
    project_id: project.id,
    status: status === "DELIVERED" ? "Delivered & Published" : "Created",
    message: clientId
      ? "Project record initialized in GROVIX management system."
      : "Studio internal project / showcase created by administrator.",
    created_by: user.id,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/admin/work");
  revalidatePath("/work");
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
  let status = formData.get("status") as ProjectStatus;
  const websiteUrl = formData.get("website_url") as string;
  const previewUrl = formData.get("preview_url") as string;
  const techStr = formData.get("technologies") as string;
  const published = formData.get("published") === "true";

  // If publishing, ensure status is marked DELIVERED if not already completed
  if (published && status !== "COMPLETED" && status !== "DELIVERED") {
    status = "DELIVERED";
  }

  const technologies = techStr
    ? techStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const updateData: Record<string, unknown> = {
    title,
    description: description || null,
    client_id: clientId,
    category,
    status,
    website_url: websiteUrl || null,
    preview_url: previewUrl || null,
    technologies,
    published,
    updated_at: new Date().toISOString(),
  };

  // Case study fields if submitted
  const tagline = formData.get("tagline") as string | null;
  const challenge = formData.get("challenge") as string | null;
  const solution = formData.get("solution") as string | null;
  const outcome = formData.get("outcome") as string | null;
  const featuresStr = formData.get("features") as string | null;

  if (
    tagline !== null ||
    challenge !== null ||
    solution !== null ||
    outcome !== null ||
    featuresStr !== null
  ) {
    const case_study: Record<string, unknown> = {};
    if (tagline) case_study.tagline = tagline;
    if (challenge) case_study.challenge = challenge;
    if (solution) case_study.solution = solution;
    if (outcome) case_study.outcome = outcome;
    if (featuresStr) {
      case_study.features = featuresStr.split(",").map((s) => s.trim()).filter(Boolean);
    }
    updateData.case_study = case_study;
  }

  if (status === "DELIVERED" || status === "COMPLETED" || published) {
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

// 6. Toggle Work Page Publishing (Restricts to Delivered Projects)
export async function toggleWorkPublishAction(projectId: string, published: boolean) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const updateData: Record<string, unknown> = {
    published,
    updated_at: new Date().toISOString(),
  };

  if (published) {
    // Ensure project is delivered when publishing to public showcase
    const { data: currentProject } = await adminClient
      .from("projects")
      .select("status, delivered_at")
      .eq("id", projectId)
      .single();

    if (currentProject && currentProject.status !== "COMPLETED") {
      updateData.status = "DELIVERED";
    }
    if (!currentProject?.delivered_at) {
      updateData.delivered_at = new Date().toISOString();
    }
  }

  const { error } = await adminClient
    .from("projects")
    .update(updateData)
    .eq("id", projectId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/work");
  revalidatePath("/admin/projects");
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

// 9. Confirm Client Email Directly (Admin One-Click Override)
export async function confirmClientEmailAction(userId: string) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    email_confirm: true,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/clients");
  return { success: true };
}

// 10. Generate Instant Verification Link for Client
export async function generateVerificationLinkAction(email: string) {
  await verifyAdmin();
  const adminClient = createAdminClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await adminClient.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=/auth/verified`,
    },
  });

  if (error) throw new Error(error.message);

  return { success: true, actionLink: data?.properties?.action_link };
}
