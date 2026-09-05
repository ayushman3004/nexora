"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Users,
  Globe,
  Star,
  ExternalLink,
} from "lucide-react";

interface AdminSidebarProps {
  pendingRequestsCount?: number;
  pendingReviewsCount?: number;
}

export function AdminSidebar({
  pendingRequestsCount = 0,
  pendingReviewsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Inquiries & Requests",
      href: "/admin/requests",
      icon: Inbox,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
      badge: null,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: Users,
      badge: null,
    },
    {
      name: "Work CMS",
      href: "/admin/work",
      icon: Globe,
      badge: null,
    },
    {
      name: "Product Reviews",
      href: "/admin/reviews",
      icon: Star,
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : null,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#f6f0e8] border-r border-[#d8d0c8]/60 flex flex-col justify-between p-4 shrink-0 min-h-screen">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-3 py-2 border-b border-[#d8d0c8]/60 pb-5">
          <Link href="/admin" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="GROVIX Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c2652a] animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-[#c2652a]">
              STUDIO ADMIN CONSOLE
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#c2652a] text-white shadow-warm-sm"
                    : "text-[#605850] hover:text-[#3a302a] hover:bg-[#ece6dc]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </div>

                {link.badge !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      active
                        ? "bg-white text-[#c2652a]"
                        : "bg-[#c2652a] text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Public Links */}
      <div className="pt-4 border-t border-[#d8d0c8]/60 space-y-2 px-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-[#8c827a] hover:text-[#3a302a] transition-colors py-1.5"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center justify-between text-xs text-[#8c827a] hover:text-[#3a302a] transition-colors py-1.5"
        >
          <span>Client Portal View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
