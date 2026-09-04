import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Calendar } from "lucide-react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import type { Project } from "@/types/database";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-[#d8d0c8]/60 shadow-warm-sm hover:shadow-warm-md transition-all group flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <ProjectStatusBadge status={project.status} size="sm" />
          <span className="text-[11px] font-mono text-[#8c827a] flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-serif text-[#3a302a] font-medium group-hover:text-[#c2652a] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-[#605850] line-clamp-2 mt-1 leading-relaxed font-sans">
            {project.description || "Digital engineering and architecture build for your brand."}
          </p>
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-[#faf5ee] border border-[#d8d0c8]/60 text-[10px] font-mono text-[#605850]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] text-[#8c827a] font-mono">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="pt-5 mt-5 border-t border-[#d8d0c8]/40 flex items-center justify-between">
        {project.website_url ? (
          <a
            href={project.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#605850] hover:text-[#c2652a] flex items-center gap-1 font-medium transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </a>
        ) : (
          <span className="text-xs text-[#8c827a] font-mono">Internal Build</span>
        )}

        <Link
          href={`/dashboard/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c2652a] hover:text-[#a8521e] group-hover:translate-x-0.5 transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
