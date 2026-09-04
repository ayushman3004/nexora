"use client";

import React, { useState, useTransition } from "react";
import { Star, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import type { Product } from "@/types/database";

interface ReviewFormProps {
  products: Product[];
  onSubmitReview: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function ReviewForm({ products, onSubmitReview }: ReviewFormProps) {
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

    startTransition(async () => {
      const result = await onSubmitReview(formData);
      if (result.error) {
        setStatusMessage({ type: "error", text: result.error });
      } else {
        setStatusMessage({
          type: "success",
          text: "Review submitted! It will appear publicly on the Nexora Products page once approved.",
        });
        form.reset();
        setRating(5);
      }
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#d8d0c8]/70 shadow-warm-md">
      <div className="mb-6">
        <h3 className="text-xl font-serif text-[#3a302a]">Share Your Product Experience</h3>
        <p className="text-xs text-[#605850] mt-1 font-sans">
          Your feedback helps us continuously refine Nexora software products and tools.
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
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="product_id"
            className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wide mb-1.5"
          >
            Product Used
          </label>
          <select
            id="product_id"
            name="product_id"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all"
          >
            {products && products.length > 0 ? (
              products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} — {prod.description || "In-house product"}
                </option>
              ))
            ) : (
              <option value="serve-q">ServeQ (Autonomous Observability Suite)</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wide mb-1.5">
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
                className="p-1 text-2xl focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 ${
                    (hoverRating || rating) >= star
                      ? "fill-[#c2652a] text-[#c2652a]"
                      : "text-[#d8d0c8]"
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="text-xs font-mono text-[#605850] ml-2">
              {rating} of 5 Stars
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wide mb-1.5"
          >
            Public Testimonial / Review
          </label>
          <textarea
            id="review"
            name="review"
            required
            rows={4}
            placeholder="Describe your operational experience with this product, performance metrics achieved, or impact on your workflow..."
            className="w-full px-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all resize-y"
          />
        </div>

        <div>
          <label
            htmlFor="feedback"
            className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wide mb-1.5"
          >
            Private Engineering Feedback (Optional)
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={2}
            placeholder="Feature requests, bugs, or technical suggestions visible only to the Nexora product engineering team..."
            className="w-full px-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-xs sm:text-sm shadow-warm-sm hover:shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <span>{isPending ? "Submitting..." : "Submit Review"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
