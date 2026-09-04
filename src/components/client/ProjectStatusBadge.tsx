import React from "react";
import type { ProjectStatus, ProjectRequestStatus } from "@/types/database";

interface ProjectStatusBadgeProps {
  status: ProjectStatus | ProjectRequestStatus | string;
  size?: "sm" | "md";
}

export function ProjectStatusBadge({ status, size = "md" }: ProjectStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "SUBMITTED":
      case "REQUESTED":
        return {
          label: "Submitted",
          bg: "bg-[#f2ece4]",
          text: "text-[#605850]",
          border: "border-[#d8d0c8]",
        };
      case "UNDER_REVIEW":
        return {
          label: "Under Review",
          bg: "bg-[#f0a878]/20",
          text: "text-[#c2652a]",
          border: "border-[#f0a878]/50",
        };
      case "ACCEPTED":
        return {
          label: "Accepted",
          bg: "bg-[#c2652a]/15",
          text: "text-[#c2652a]",
          border: "border-[#c2652a]/30",
        };
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          bg: "bg-[#c2652a] text-white",
          text: "text-white",
          border: "border-transparent",
        };
      case "DELIVERED":
        return {
          label: "Delivered",
          bg: "bg-[#8c3c3c]/15",
          text: "text-[#8c3c3c]",
          border: "border-[#8c3c3c]/30",
        };
      case "COMPLETED":
        return {
          label: "Completed",
          bg: "bg-[#2e2621]",
          text: "text-[#faf5ee]",
          border: "border-transparent",
        };
      case "ON_HOLD":
        return {
          label: "On Hold",
          bg: "bg-[#e5dfd7]",
          text: "text-[#8c827a]",
          border: "border-[#d8d0c8]",
        };
      case "REJECTED":
      case "CANCELLED":
        return {
          label: status === "REJECTED" ? "Rejected" : "Cancelled",
          bg: "bg-[#8c3c3c]/10",
          text: "text-[#8c3c3c]",
          border: "border-[#8c3c3c]/20",
        };
      default:
        return {
          label: status,
          bg: "bg-[#f2ece4]",
          text: "text-[#605850]",
          border: "border-[#d8d0c8]",
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-0.5 text-[11px] font-medium"
      : "px-3 py-1 text-xs font-semibold";

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors font-sans tracking-wide uppercase ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75 animate-pulse" />
      {config.label}
    </span>
  );
}
