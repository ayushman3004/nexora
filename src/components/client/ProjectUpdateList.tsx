import React from "react";
import { MessageSquare, Calendar } from "lucide-react";
import type { ProjectUpdate } from "@/types/database";

interface ProjectUpdateListProps {
  updates: ProjectUpdate[];
}

export function ProjectUpdateList({ updates }: ProjectUpdateListProps) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-10 px-4 rounded-2xl bg-[#faf5ee]/60 border border-dashed border-[#d8d0c8] text-[#8c827a]">
        <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50 text-[#c2652a]" />
        <p className="text-xs font-medium">No progress notes published yet.</p>
        <p className="text-[11px] mt-0.5">
          Engineering changelogs and milestone updates will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {updates.map((update, idx) => {
        const formattedDate = new Date(update.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={update.id || idx}
            className="p-5 rounded-2xl bg-white/70 border border-[#d8d0c8]/60 shadow-warm-sm space-y-2 relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#c2652a]/10 text-[#c2652a] text-[11px] font-mono font-semibold uppercase">
                {update.status}
              </span>
              <span className="text-[11px] text-[#8c827a] font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>

            <p className="text-sm text-[#3a302a] whitespace-pre-wrap leading-relaxed font-sans">
              {update.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
