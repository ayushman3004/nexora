import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ReviewManager } from "@/components/admin/ReviewManager";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Star } from "lucide-react";
import type { Review } from "@/types/database";

export default async function AdminReviewsPage() {
  const adminClient = createAdminClient();

  const { data: reviews } = await adminClient
    .from("reviews")
    .select("*, profiles(name, email, company), products(name, slug)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <SectionBadge icon={Star} variant="primary">
            PRODUCT TESTIMONIALS
          </SectionBadge>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            Review <span className="italic text-[#c2652a]">Moderation</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850]">
            Moderate incoming client product reviews. Approved testimonials are immediately published to the public /products page.
          </p>
        </div>
      </div>

      <ReviewManager
        reviews={
          (reviews as unknown as (Review & {
            profiles?: { name: string; email: string; company: string | null };
            products?: { name: string; slug: string };
          })[]) || []
        }
      />
    </div>
  );
}
