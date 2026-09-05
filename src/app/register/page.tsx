"use client";

import React, { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { registerAction } from "@/app/actions/auth";
import { ArrowRight, Lock, Mail, User, Building, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    formData.set("redirectTo", redirectTo);

    startTransition(async () => {
      const res = await registerAction(formData);
      if (res?.error) {
        setErrorMessage(res.error);
      } else if (res?.redirectTo) {
        router.push(res.redirectTo);
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <Image
              src="/logo.png"
              alt="GROVIX Logo"
              width={34}
              height={34}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-2xl tracking-tight text-[#3a302a] font-medium">
              GROVIX
            </span>
          </Link>

          <div className="flex justify-center">
            <SectionBadge icon={Sparkles} variant="primary">
              NEW CLIENT ONBOARDING
            </SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-[#3a302a] tracking-tight">
            Create your <span className="italic text-[#c2652a]">account.</span>
          </h1>
          <p className="text-sm text-[#605850] font-sans">
            Track your digital engineering build, view milestones, and leave product reviews.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#d8d0c8]/70 shadow-warm-md">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[#8c3c3c]/10 border border-[#8c3c3c]/20 flex items-start gap-3 text-sm text-[#8c3c3c]">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-[#3a302a] tracking-wide uppercase mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8c827a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-xs font-semibold text-[#3a302a] tracking-wide uppercase mb-1.5"
              >
                Company / Organization (Optional)
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#8c827a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Vance Hospitality Co."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#3a302a] tracking-wide uppercase mb-1.5"
              >
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8c827a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="eleanor@vance.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#3a302a] tracking-wide uppercase mb-1.5"
              >
                Password (min. 6 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8c827a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>{isPending ? "Creating Account..." : "Create Client Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#d8d0c8]/50 text-center text-xs text-[#605850]">
            Already have an account?{" "}
            <Link
              href={`/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
              className="text-[#c2652a] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#605850] hover:text-[#3a302a] font-medium transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-[#605850]">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
