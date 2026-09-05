"use client";

import React, { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { loginAction } from "@/app/actions/auth";
import { ArrowRight, Lock, Mail, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const urlError = searchParams.get("error");
  const isVerified = searchParams.get("verified") === "true";

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(urlError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    formData.set("redirectTo", redirectTo);

    startTransition(async () => {
      const res = await loginAction(formData);
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
              PORTAL ACCESS
            </SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-[#3a302a] tracking-tight">
            Sign into your <span className="italic text-[#c2652a]">portal.</span>
          </h1>
          <p className="text-sm text-[#605850] font-sans">
            Access your active client projects, delivery milestones, and product reviews.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#d8d0c8]/70 shadow-warm-md">
          {isVerified && !errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-[#c2652a]/10 border border-[#c2652a]/30 flex items-start gap-3 text-sm text-[#c2652a] shadow-warm-xs">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-[#c2652a]" />
              <div>
                <span className="font-semibold block text-[#3a302a]">
                  Email Verified Successfully!
                </span>
                <span className="text-xs text-[#605850]">
                  Your portal account is active and verified. Please sign in with your credentials below.
                </span>
              </div>
            </div>
          )}

          {(redirectTo.includes("inquiry") || redirectTo.includes("start")) && !errorMessage && !isVerified && (
            <div className="mb-6 p-4 rounded-2xl bg-[#fbe8d8] border border-[#c2652a]/40 flex items-start gap-3 text-sm text-[#3a302a] shadow-warm-xs">
              <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-[#c2652a]" />
              <div>
                <span className="font-semibold block text-[#3a302a]">
                  Sign In Required to Start a Project
                </span>
                <span className="text-xs text-[#605850]">
                  Please sign in or create an account to submit your project brief and track development milestones in the GROVIX client portal.
                </span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[#8c3c3c]/10 border border-[#8c3c3c]/20 flex items-start gap-3 text-sm text-[#8c3c3c]">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf5ee]/60 border border-[#d8d0c8] text-[#3a302a] text-sm placeholder-[#8c827a]/60 focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 focus:border-[#c2652a] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#3a302a] tracking-wide uppercase"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#c2652a] hover:underline font-medium"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8c827a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
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
                <span>{isPending ? "Authenticating..." : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#d8d0c8]/50 text-center text-xs text-[#605850]">
            Don&apos;t have an account yet?{" "}
            <Link
              href={`/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
              className="text-[#c2652a] font-semibold hover:underline"
            >
              Register here
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-[#605850]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
