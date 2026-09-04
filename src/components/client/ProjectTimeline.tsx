import React from "react";
import { CheckCircle2, Clock, CircleDot, PlayCircle, PackageCheck, Award } from "lucide-react";
import type { ProjectStatus, ProjectRequestStatus } from "@/types/database";

interface ProjectTimelineProps {
  currentStatus: ProjectStatus | ProjectRequestStatus | string;
}

const STAGES = [
  { id: "SUBMITTED", label: "Submitted", icon: Clock },
  { id: "UNDER_REVIEW", label: "Under Review", icon: CircleDot },
  { id: "ACCEPTED", label: "Accepted", icon: CheckCircle2 },
  { id: "IN_PROGRESS", label: "In Progress", icon: PlayCircle },
  { id: "DELIVERED", label: "Delivered", icon: PackageCheck },
  { id: "COMPLETED", label: "Completed", icon: Award },
];

function getStageIndex(status: string): number {
  switch (status) {
    case "REQUESTED":
    case "SUBMITTED":
      return 0;
    case "UNDER_REVIEW":
      return 1;
    case "ACCEPTED":
      return 2;
    case "IN_PROGRESS":
      return 3;
    case "DELIVERED":
      return 4;
    case "COMPLETED":
      return 5;
    default:
      return 0;
  }
}

export function ProjectTimeline({ currentStatus }: ProjectTimelineProps) {
  const currentIndex = getStageIndex(currentStatus);
  const isCancelledOrRejected = currentStatus === "REJECTED" || currentStatus === "CANCELLED";

  return (
    <div className="w-full py-4">
      {isCancelledOrRejected ? (
        <div className="p-4 rounded-2xl bg-[#8c3c3c]/10 border border-[#8c3c3c]/20 text-center">
          <p className="text-sm font-semibold text-[#8c3c3c]">
            Status: {currentStatus === "REJECTED" ? "Request Declined" : "Project Cancelled"}
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Progress Bar Line */}
          <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-[#d8d0c8]/60 -z-0">
            <div
              className="h-full bg-[#c2652a] transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(100, (currentIndex / (STAGES.length - 1)) * 100)}%`,
              }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-2 relative z-10">
            {STAGES.map((stage, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.id}
                  className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                      isCurrent
                        ? "bg-[#c2652a] text-white shadow-warm-md ring-4 ring-[#f0a878]/30 scale-105"
                        : isPast
                        ? "bg-[#faf5ee] border-2 border-[#c2652a] text-[#c2652a]"
                        : "bg-[#f2ece4] border border-[#d8d0c8] text-[#8c827a]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? "text-[#c2652a] font-bold"
                          : isPast
                          ? "text-[#3a302a]"
                          : "text-[#8c827a]"
                      }`}
                    >
                      {stage.label}
                    </p>
                    <span className="text-[10px] text-[#8c827a] block">
                      {isPast ? "Done" : isCurrent ? "Active" : "Upcoming"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
