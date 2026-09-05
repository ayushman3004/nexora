"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(formData: FormData): Promise<{
  success?: boolean;
  error?: string;
}> {
  const targetId =
    (formData.get("product_id") as string) ||
    (formData.get("target_id") as string);
  const ratingStr = formData.get("rating") as string;
  const review = formData.get("review") as string;
  const feedback = formData.get("feedback") as string;

  if (!targetId || !ratingStr || !review) {
    return { error: "Please fill in all required fields." };
  }

  const rating = parseInt(ratingStr, 10);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5 stars." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to submit a review." };
  }

  const adminClient = createAdminClient();

  // Get author name & company from profiles or metadata
  const { data: profile } = await adminClient
    .from("profiles")
    .select("name, company, email")
    .eq("id", user.id)
    .maybeSingle();

  const authorName =
    profile?.name || user.user_metadata?.name || "Verified Client";
  const authorCompany =
    profile?.company || user.user_metadata?.company || "Client";

  // Check if targetId is an assigned project
  const { data: project } = await adminClient
    .from("projects")
    .select("id, title, description, case_study, client_id, status")
    .eq("id", targetId)
    .maybeSingle();

  if (project) {
    // 1. Sync project into products table to satisfy reviews.product_id foreign key
    await adminClient.from("products").upsert(
      {
        id: project.id,
        name: project.title,
        slug: project.id,
        description:
          project.description || `Client Project: ${project.title}`,
      },
      { onConflict: "id" }
    );

    // 2. Insert record into reviews table (APPROVED so it immediately shows on the work tab!)
    const { error: revError } = await adminClient.from("reviews").insert({
      product_id: project.id,
      user_id: user.id,
      rating,
      review: review.trim(),
      feedback: feedback ? feedback.trim() : null,
      status: "APPROVED",
    });

    if (revError) {
      console.error("Error inserting review:", revError);
      return { error: revError.message };
    }

    // 3. Update the project's case_study with the verified testimonial
    const existingCaseStudy = project.case_study || {};
    const updatedCaseStudy = {
      ...existingCaseStudy,
      testimonial: {
        rating,
        review: review.trim(),
        client_name: authorName,
        client_company: authorCompany || project.title,
        date: new Date().toISOString(),
        status: "APPROVED",
      },
    };

    const { error: projUpdateError } = await adminClient
      .from("projects")
      .update({
        case_study: updatedCaseStudy,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (projUpdateError) {
      console.error("Error updating project case_study:", projUpdateError);
    }
  } else {
    // Target is a product (e.g., ServeQ)
    const { error: prodRevError } = await adminClient.from("reviews").insert({
      product_id: targetId,
      user_id: user.id,
      rating,
      review: review.trim(),
      feedback: feedback ? feedback.trim() : null,
      status: "APPROVED",
    });

    if (prodRevError) {
      console.error("Error submitting product review:", prodRevError);
      return { error: prodRevError.message };
    }
  }

  // Revalidate relevant pages so review shows everywhere instantly
  revalidatePath("/dashboard/reviews");
  revalidatePath("/work");
  revalidatePath("/admin/reviews");
  revalidatePath("/admin/work");
  revalidatePath("/products");
  return { success: true };
}
