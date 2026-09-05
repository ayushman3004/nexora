import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProjectInquiryForm } from "@/components/client/ProjectInquiryForm";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Start a Project — GROVIX Studio",
  description: "Submit a project brief and scoping inquiry directly to GROVIX Studio engineering leads.",
};

export default async function StartProjectPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/start-project");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const userProfile = {
    id: user.id,
    name: profile?.name || user.user_metadata?.name || "",
    email: user.email || "",
    company: profile?.company || user.user_metadata?.company || "",
  };

  return (
    <div className="min-h-screen bg-[#faf5ee] py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#605850] hover:text-[#c2652a] transition-colors bg-white/70 px-4 py-2 rounded-full border border-[#d8d0c8]/60 shadow-warm-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Client Portal</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#605850] bg-white/70 px-3 py-1.5 rounded-full border border-[#d8d0c8]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Signed in as <strong>{userProfile.email}</strong></span>
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center">
            <SectionBadge icon={Sparkles} variant="primary">
              PROJECT SCOPING & INTAKE
            </SectionBadge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#3a302a] tracking-tight">
            Tell us about your <span className="italic text-[#c2652a]">project.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#605850] font-sans max-w-xl mx-auto leading-relaxed">
            Submit your requirements, budget, and timeline. Our engineering leads will review your brief within 24 hours and prepare an architecture blueprint.
          </p>
        </div>

        {/* Project Inquiry Card */}
        <div className="bg-[#faf5ee] border border-[#d8d0c8]/70 rounded-3xl shadow-warm-lg overflow-hidden">
          <ProjectInquiryForm userProfile={userProfile} />
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12 text-xs text-[#8c827a]">
        GROVIX Studio Engineering • Confidential & Protected Client Intake
      </div>
    </div>
  );
}
