import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ReviewForm, ReviewableItem } from "@/components/client/ReviewForm";
import { submitReviewAction } from "@/app/actions/reviews";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Star, ArrowLeft, CheckCircle2, Clock, XCircle, Sparkles, ExternalLink, Globe } from "lucide-react";
import type { Product, Review, Project } from "@/types/database";

export default async function ClientReviewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let assignedProjects: Project[] = [];
  let products: Product[] = [];
  let userReviews: (Review & { products?: { name: string } })[] = [];

  const adminClient = createAdminClient();

  // 1. Fetch assigned projects for this client
  if (user) {
    try {
      const { data: projData } = await adminClient
        .from("projects")
        .select("*")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });
      assignedProjects = (projData as Project[]) || [];
    } catch (err) {
      console.warn("Could not fetch assigned client projects:", err);
    }
  }

  // 2. Fetch available studio products (ServeQ, etc.)
  try {
    const { data: prodData } = await supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true });
    products = (prodData as Product[]) || [];
  } catch (err) {
    console.warn("Could not fetch products:", err);
  }

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

  // 3. Build prioritized list of reviewable items (client projects first!)
  const reviewableItems: ReviewableItem[] = [
    ...assignedProjects.map((p) => ({
      id: p.id,
      name: p.title,
      type: "project" as const,
      status: p.status,
      category: p.category,
      description: p.description,
    })),
    ...products
      .filter((pr) => !assignedProjects.some((p) => p.id === pr.id))
      .map((pr) => ({
        id: pr.id,
        name: pr.name,
        type: "product" as const,
        description: pr.description,
      })),
  ];

  // 4. Fetch reviews previously submitted by this client
  if (user) {
    try {
      const { data: reviewsData } = await adminClient
        .from("reviews")
        .select("*, products(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      userReviews =
        (reviewsData as unknown as (Review & { products?: { name: string } })[]) ||
        [];
    } catch (err) {
      console.warn("Could not fetch user reviews:", err);
    }
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
            Project & Product <span className="italic text-[#c2652a]">Reviews</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#605850] font-sans">
            Submit ratings and testimonials for your delivered projects and GROVIX software solutions.
          </p>
        </div>

        <div>
          <SectionBadge icon={Sparkles} variant="primary">
            VERIFIED CLIENT TESTIMONIALS
          </SectionBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Review Submission Form */}
        <div className="lg:col-span-6">
          <ReviewForm
            items={reviewableItems}
            onSubmitReview={submitReviewAction}
          />
        </div>

        {/* Right: Submitted Reviews History */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif text-[#3a302a]">Your Submissions</h2>
              <p className="text-xs text-[#605850] mt-0.5">
                Review history and live publication status
              </p>
            </div>

            <Link
              href="/work"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#faf5ee] border border-[#d8d0c8] text-[#3a302a] hover:text-[#c2652a] hover:border-[#c2652a]/40 transition-all shadow-warm-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#c2652a]" />
              <span>Public Work Tab</span>
              <ExternalLink className="w-3 h-3 text-[#8c827a]" />
            </Link>
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
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
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
                        </div>
                        <span className="text-xs font-semibold text-[#3a302a] ml-1">
                          {rev.products?.name || "Client Project"}
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
                            <CheckCircle2 className="w-3 h-3 text-[#c2652a]" />
                            <span>Live on Work Tab</span>
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

                    <p className="text-xs sm:text-sm text-[#3a302a] leading-relaxed italic font-serif">
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

                    <div className="pt-2 border-t border-[#d8d0c8]/40 flex items-center justify-between">
                      {rev.status === "APPROVED" ? (
                        <Link
                          href="/work"
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#c2652a] hover:underline"
                        >
                          <span>Featured on /work</span>
                          <ArrowLeft className="w-3 h-3 rotate-180" />
                        </Link>
                      ) : (
                        <div />
                      )}
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
                Select your assigned project on the left to submit a rating and review. Once submitted, it will appear here and live in the public Work portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
