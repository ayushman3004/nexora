"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(formData: FormData): Promise<{
  success?: boolean;
  error?: string;
}> {
  const productId = formData.get("product_id") as string;
  const ratingStr = formData.get("rating") as string;
  const review = formData.get("review") as string;
  const feedback = formData.get("feedback") as string;

  if (!productId || !ratingStr || !review) {
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

  const { error } = await supabase.from("reviews").insert({
    product_id: productId,
    user_id: user.id,
    rating,
    review: review.trim(),
    feedback: feedback ? feedback.trim() : null,
    status: "PENDING",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/reviews");
  return { success: true };
}
