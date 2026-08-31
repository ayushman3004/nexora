import React from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "primary" | "tertiary" | "neutral";
  className?: string;
}

export function SectionBadge({
  children,
  icon: Icon,
  variant = "primary",
  className,
}: SectionBadgeProps) {
  const variantStyles = {
    primary: "bg-[#fbe8d8] text-[#c2652a] border-[#f0a878]/30",
    tertiary: "bg-[#f9ecea] text-[#8c3c3c] border-[#8c3c3c]/20",
    neutral: "bg-[#f2ece4] text-[#605850] border-[#d8d0c8]/60",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-warm-sm",
        variantStyles[variant],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
