import React from "react";
import Link from "next/link";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import {
  Clock,
  Sparkles,
  Calendar,
  Wallet,
  ArrowRight,
  FileText,
  Building2,
  CheckCircle2,
} from "lucide-react";
import type { ProjectRequest } from "@/types/database";

interface ProjectApplicationsListProps {
  requests: ProjectRequest[];
}

export function ProjectApplicationsList({ requests }: ProjectApplicationsListProps) {
  if (requests.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-white/60 border border-dashed border-[#d8d0c8] text-center space-y-3">
        <FileText className="w-8 h-8 text-[#c2652a]/60 mx-auto" />
        <h3 className="text-base font-serif text-[#3a302a]">
          No Applications or Inquiries Yet
        </h3>
        <p className="text-xs text-[#605850] max-w-sm mx-auto">
          Need a custom web build, AI platform, or redesign? Submit an inquiry to get an engineering roadmap and estimate.
        </p>
        <div className="pt-1">
          <Link
            href="/start-project"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#c2652a] text-white text-xs font-semibold shadow-warm-sm hover:bg-[#a8521e] transition-all"
          >
            <span>Start a Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => {
        const dateFormatted = new Date(req.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div
            key={req.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/80 border border-[#d8d0c8]/70 shadow-warm-sm hover:border-[#c2652a]/40 transition-all space-y-4"
          >
            {/* Top Row: Service & Status */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#c2652a] font-semibold">
                    {req.service_type || "Digital Build"}
                  </span>
                  <span className="text-[#d8d0c8]">•</span>
                  <span className="text-xs text-[#8c827a] capitalize">
                    {req.project_type?.replace("-", " ") || "Custom Project"}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#3a302a] mt-0.5">
                  {req.company || req.name}&apos;s Platform Brief
                </h3>
              </div>

              <ProjectStatusBadge status={req.status} size="sm" />
            </div>

            {/* Brief Excerpt */}
            {req.details ? (
              <p className="text-xs text-[#605850] leading-relaxed line-clamp-2 bg-[#faf5ee]/70 p-3 rounded-2xl border border-[#d8d0c8]/40 italic">
                &ldquo;{req.details}&rdquo;
              </p>
            ) : (
              <p className="text-xs text-[#8c827a] italic">
                No extra brief notes provided.
              </p>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#d8d0c8]/40 text-xs text-[#605850]">
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Wallet className="w-3.5 h-3.5 text-[#c2652a]" />
                <span>Budget: {req.budget || "TBD"}</span>
              </div>

              <div className="h-3 w-[1px] bg-[#d8d0c8]" />

              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#c2652a]" />
                <span>Timeline: {req.timeline || "TBD"}</span>
              </div>

              <div className="h-3 w-[1px] bg-[#d8d0c8]" />

              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#8c827a]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Submitted {dateFormatted}</span>
              </div>
            </div>

            {/* Status Guide Footer */}
            <div className="pt-2">
              {req.status === "SUBMITTED" && (
                <div className="flex items-center gap-2 text-[11px] text-[#605850] bg-[#f2ece4]/60 px-3 py-2 rounded-xl border border-[#d8d0c8]/50">
                  <Sparkles className="w-3.5 h-3.5 text-[#c2652a] shrink-0" />
                  <span>
                    <strong>Under Review:</strong> Our engineering leads are reviewing your brief. We will reach out within 24 hours.
                  </span>
                </div>
              )}

              {req.status === "UNDER_REVIEW" && (
                <div className="flex items-center gap-2 text-[11px] text-[#c2652a] bg-[#f0a878]/10 px-3 py-2 rounded-xl border border-[#f0a878]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#c2652a] shrink-0" />
                  <span>
                    <strong>Active Scoping:</strong> Architecture blueprint & sprint schedule are being prepared.
                  </span>
                </div>
              )}

              {req.status === "ACCEPTED" && (
                <div className="flex items-center gap-2 text-[11px] text-[#3a302a] bg-[#c2652a]/10 px-3 py-2 rounded-xl border border-[#c2652a]/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c2652a] shrink-0" />
                  <span>
                    <strong>Accepted:</strong> Your project has been approved and is being initialized into your active workspace.
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
