"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  moderateReviewAction,
  deleteReviewAction,
} from "@/app/actions/admin";
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import type { Review, ReviewStatus } from "@/types/database";

interface ReviewManagerProps {
  reviews: (Review & {
    profiles?: { name: string; email: string; company: string | null };
    products?: { name: string; slug: string };
  })[];
}

export function ReviewManager({ reviews }: ReviewManagerProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = reviews.filter((r) => {
    if (filter === "ALL") return true;
    return r.status === filter;
  });

  const handleModerate = (reviewId: string, status: ReviewStatus) => {
    startTransition(async () => {
      await moderateReviewAction(reviewId, status);
      setStatusMessage(
        status === "APPROVED"
          ? "Review approved! It is now visible on the public /products page."
          : "Review status updated to " + status
      );
      setTimeout(() => setStatusMessage(null), 3500);
    });
  };

  const handleDelete = (reviewId: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) {
      return;
    }
    startTransition(async () => {
      await deleteReviewAction(reviewId);
      setStatusMessage("Review record deleted.");
      setTimeout(() => setStatusMessage(null), 3500);
    });
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="p-4 rounded-2xl bg-[#c2652a]/10 border border-[#c2652a]/20 text-[#c2652a] text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/60 shadow-warm-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif text-[#3a302a]">
            Editorial Moderation & Testimonials
          </h2>
          <p className="text-xs text-[#605850] mt-1 max-w-xl leading-relaxed">
            Client feedback submitted via the client portal starts as &ldquo;Pending&rdquo;. Once approved,
            reviews are dynamically surfaced on the public <Link href="/products" target="_blank" className="text-[#c2652a] underline font-medium">/products</Link> page.
          </p>
        </div>

        <Link
          href="/products"
          target="_blank"
          className="px-4 py-2 rounded-full bg-[#c2652a] text-white text-xs font-semibold shadow-warm-sm hover:bg-[#a8521e] transition-all flex items-center gap-1.5 w-fit"
        >
          <span>View /products</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === s
                ? "bg-[#c2652a] text-white shadow-warm-sm"
                : "bg-white/80 text-[#605850] hover:bg-[#f2ece4] border border-[#d8d0c8]/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((rev) => {
            const formattedDate = new Date(rev.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <div
                key={rev.id}
                className={`p-6 rounded-3xl bg-white/80 border transition-all ${
                  rev.status === "PENDING"
                    ? "border-[#c2652a]/50 shadow-warm-md"
                    : "border-[#d8d0c8]/60 shadow-warm-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= rev.rating
                                ? "fill-[#c2652a] text-[#c2652a]"
                                : "text-[#d8d0c8]"
                            }`}
                          />
                        ))}
                      </div>

                      <span className="font-serif font-semibold text-sm text-[#3a302a]">
                        {rev.products?.name || "Product Review"}
                      </span>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          rev.status === "APPROVED"
                            ? "bg-[#2e2621] text-white"
                            : rev.status === "PENDING"
                            ? "bg-[#f0a878]/25 text-[#c2652a] border border-[#f0a878]/50"
                            : "bg-[#8c3c3c]/15 text-[#8c3c3c]"
                        }`}
                      >
                        {rev.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#3a302a] leading-relaxed font-sans italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>

                    {rev.feedback && (
                      <div className="p-3 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/50 text-xs text-[#605850]">
                        <span className="font-mono text-[10px] text-[#8c827a] block uppercase font-semibold">
                          Private Feedback to Studio:
                        </span>
                        {rev.feedback}
                      </div>
                    )}

                    <div className="text-[11px] text-[#8c827a] font-mono">
                      Author: {rev.profiles?.name || "Client"} •{" "}
                      {rev.profiles?.company || rev.profiles?.email || "Partner"} •{" "}
                      Submitted {formattedDate}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    {rev.status !== "APPROVED" && (
                      <button
                        onClick={() => handleModerate(rev.id, "APPROVED")}
                        disabled={isPending}
                        className="px-3.5 py-1.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}

                    {rev.status !== "REJECTED" && (
                      <button
                        onClick={() => handleModerate(rev.id, "REJECTED")}
                        disabled={isPending}
                        className="px-3.5 py-1.5 rounded-full bg-[#8c3c3c]/15 hover:bg-[#8c3c3c]/25 text-[#8c3c3c] text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(rev.id)}
                      disabled={isPending}
                      className="p-2 rounded-full hover:bg-[#8c3c3c]/15 text-[#8c827a] hover:text-[#8c3c3c] transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 rounded-3xl bg-white/70 border border-dashed border-[#d8d0c8] text-center space-y-3">
            <MessageSquare className="w-8 h-8 text-[#c2652a]/60 mx-auto" />
            <h3 className="text-base font-serif text-[#3a302a]">
              No Reviews Found
            </h3>
            <p className="text-xs text-[#605850]">
              Reviews submitted by clients from their client portal will appear here for editorial moderation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
