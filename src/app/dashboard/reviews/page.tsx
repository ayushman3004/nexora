import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ReviewForm } from "@/components/client/ReviewForm";
import { submitReviewAction } from "@/app/actions/reviews";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Star, ArrowLeft, CheckCircle2, Clock, XCircle, Sparkles } from "lucide-react";
import type { Product, Review } from "@/types/database";

export default async function ClientReviewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let products: Product[] = [];
  let userReviews: (Review & { products?: { name: string } })[] = [];

  // 1. Fetch available products
  const { data: prodData } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });
  products = (prodData as Product[]) || [];

  // Fallback if products table is empty in new db
  if (products.length === 0) {
    products = [
      {
        id: "default-serve-q",
        name: "ServeQ",
        slug: "serve-q",
        description: "Autonomous incident triage & observability suite",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  // 2. Fetch reviews submitted by this client
  if (user) {
    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("*, products(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    userReviews =
      (reviewsData as unknown as (Review & { products?: { name: string } })[]) ||
      [];
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="text-xs text-[#8c827a] hover:text-[#3a302a] inline-flex items-center gap-1 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>
          <h1 className="text-3xl font-serif text-[#3a302a]">
            Product <span className="italic text-[#c2652a]">Reviews & Feedback</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850] font-sans">
            Submit ratings and testimonials for Nexora software products you have utilized.
          </p>
        </div>

        <div>
          <SectionBadge icon={Sparkles} variant="primary">
            COMMUNITY & QUALITY
          </SectionBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Review Submission Form */}
        <div className="lg:col-span-6">
          <ReviewForm
            products={products}
            onSubmitReview={submitReviewAction}
          />
        </div>

        {/* Right: Submitted Reviews History */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-2xl font-serif text-[#3a302a]">Your Submissions</h2>
            <p className="text-xs text-[#605850] mt-0.5">
              Review history and live publication status
            </p>
          </div>

          {userReviews.length > 0 ? (
            <div className="space-y-4">
              {userReviews.map((rev) => {
                const formattedDate = new Date(rev.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div
                    key={rev.id}
                    className="p-6 rounded-3xl bg-white/80 border border-[#d8d0c8]/60 shadow-warm-sm space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= rev.rating
                                ? "fill-[#c2652a] text-[#c2652a]"
                                : "text-[#d8d0c8]"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-semibold text-[#3a302a] ml-1.5">
                          {rev.products?.name || "Nexora Product"}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                          rev.status === "APPROVED"
                            ? "bg-[#2e2621] text-[#faf5ee]"
                            : rev.status === "PENDING"
                            ? "bg-[#f0a878]/20 text-[#c2652a] border border-[#f0a878]/50"
                            : "bg-[#8c3c3c]/10 text-[#8c3c3c]"
                        }`}
                      >
                        {rev.status === "APPROVED" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Live on Products Page</span>
                          </>
                        ) : rev.status === "PENDING" ? (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>Under Moderation</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Declined</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#3a302a] leading-relaxed italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>

                    {rev.feedback && (
                      <div className="pt-2 border-t border-[#d8d0c8]/40">
                        <span className="text-[10px] font-mono text-[#8c827a] block">
                          Private Engineering Note:
                        </span>
                        <p className="text-xs text-[#605850]">{rev.feedback}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-[#d8d0c8]/40 flex justify-end">
                      <span className="text-[10px] font-mono text-[#8c827a]">
                        Submitted {formattedDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white/60 border border-dashed border-[#d8d0c8] text-center space-y-2">
              <Star className="w-8 h-8 text-[#c2652a]/60 mx-auto" />
              <h3 className="text-base font-serif text-[#3a302a]">No Reviews Submitted Yet</h3>
              <p className="text-xs text-[#605850] max-w-sm mx-auto">
                Once you submit a rating or product feedback using the form, its status will be tracked here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
