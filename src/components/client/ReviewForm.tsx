"use client";

import React, { useState, useTransition } from "react";
import { Star, CheckCircle2, AlertCircle, ArrowRight, ChevronDown, FolderKanban, Sparkles } from "lucide-react";
import type { Product } from "@/types/database";

export interface ReviewableItem {
  id: string;
  name: string;
  type: "project" | "product";
  status?: string;
  category?: string;
  description?: string | null;
}

interface ReviewFormProps {
  products?: Product[];
  items?: ReviewableItem[];
  onSubmitReview: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function ReviewForm({ products = [], items, onSubmitReview }: ReviewFormProps) {
  // Normalize items
  const allItems: ReviewableItem[] = items || products.map((p) => ({
    id: p.id,
    name: p.name,
    type: "product",
    description: p.description,
  }));

  const projectItems = allItems.filter((i) => i.type === "project");
  const productItems = allItems.filter((i) => i.type === "product");

  // Default selection: First assigned project if available, otherwise first item
  const defaultSelectedId = projectItems[0]?.id || allItems[0]?.id || "";
  const [selectedId, setSelectedId] = useState<string>(defaultSelectedId);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("rating", rating.toString());
    formData.set("product_id", selectedId);

    startTransition(async () => {
      const result = await onSubmitReview(formData);
      if (result.error) {
        setStatusMessage({ type: "error", text: result.error });
      } else {
        setStatusMessage({
          type: "success",
          text: "Review submitted successfully! It is now live in the portfolio and work showcase.",
        });
        form.reset();
        setRating(5);
      }
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/70 shadow-warm-md">
      <div className="mb-6">
        <h3 className="text-xl font-serif text-[#3a302a]">
          {projectItems.length > 0
            ? "Share Your Project Experience & Testimonial"
            : "Share Your Product Experience"}
        </h3>
        <p className="text-xs text-[#605850] mt-1 font-sans">
          {projectItems.length > 0
            ? "Your feedback and review will be featured alongside your delivered project in our live portfolio."
            : "Your feedback helps us continuously refine GROVIX software products and client architectures."}
        </p>
      </div>

      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm ${
            statusMessage.type === "success"
              ? "bg-[#c2652a]/10 border border-[#c2652a]/20 text-[#c2652a]"
              : "bg-[#8c3c3c]/10 border border-[#8c3c3c]/20 text-[#8c3c3c]"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-[#c2652a]" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-[#8c3c3c]" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project / Product Selector */}
        <div>
          <label
            htmlFor="product_id"
            className="block text-xs font-mono uppercase tracking-wider text-[#8c827a] mb-2"
          >
            {projectItems.length > 0 ? "Select Assigned Project" : "Select Product / Project"}
          </label>
          <div className="relative">
            <select
              id="product_id"
              name="product_id"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all cursor-pointer font-medium"
            >
              {projectItems.length > 0 && (
                <optgroup label="✨ Your Assigned Projects">
                  {projectItems.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.status ? `• ${p.status}` : ""}
                    </option>
                  ))}
                </optgroup>
              )}
              {productItems.length > 0 && (
                <optgroup label="GROVIX Studio Products">
                  {productItems.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <ChevronDown className="w-4 h-4 text-[#8c827a] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {projectItems.length === 0 && (
            <p className="text-[11px] text-[#8c827a] mt-1.5 font-sans">
              No delivered client projects are currently linked to this account. Once a project is assigned by the studio, you can select it directly here.
            </p>
          )}
        </div>

        {/* Interactive Star Rating */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8c827a] mb-2">
            Rating
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-[#d8d0c8] hover:text-[#c2652a] transition-colors cursor-pointer"
                title={`${star} Star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={`w-6 h-6 transition-all ${
                    star <= (hoverRating || rating)
                      ? "fill-[#c2652a] text-[#c2652a] scale-110"
                      : "text-[#d8d0c8]"
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-mono text-[#8c827a] ml-2 font-bold">
              {rating}/5 Stars
            </span>
          </div>
        </div>

        {/* Public Testimonial / Review */}
        <div>
          <label
            htmlFor="review"
            className="block text-xs font-mono uppercase tracking-wider text-[#8c827a] mb-2"
          >
            Public Testimonial & Review
          </label>
          <textarea
            id="review"
            name="review"
            required
            rows={4}
            placeholder="Share your experience working with GROVIX Studio on this project (design aesthetics, engineering quality, communication, delivery, business impact)..."
            className="w-full px-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all resize-y leading-relaxed"
          />
        </div>

        {/* Private Engineering Feedback */}
        <div>
          <label
            htmlFor="feedback"
            className="block text-xs font-mono uppercase tracking-wider text-[#8c827a] mb-2"
          >
            Private Engineering Feedback (Optional)
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={2}
            placeholder="Any confidential feedback or suggestions visible only to the GROVIX studio team..."
            className="w-full px-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-xs sm:text-sm shadow-warm-sm hover:shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <span>{isPending ? "Submitting Review..." : "Submit Review"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
