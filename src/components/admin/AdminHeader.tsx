"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/app/actions/auth";
import { LogOut, Shield } from "lucide-react";
import type { Profile } from "@/types/database";

interface AdminHeaderProps {
  profile?: Profile | null;
  pendingRequestsCount?: number;
}

export function AdminHeader({ profile }: AdminHeaderProps) {

  return (
    <header className="sticky top-0 z-30 bg-[#faf5ee]/90 backdrop-blur-md border-b border-[#d8d0c8]/60 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Left: Mobile Brand & Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/admin">
            <Image
              src="/logo.png"
              alt="GROVIX Logo"
              width={120}
              height={30}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c2652a]/10 text-[#c2652a] font-bold">
            ADMIN
          </span>
        </div>

        {/* Center / Desktop breadcrumbs label */}
        <div className="hidden lg:flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#c2652a]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#605850]">
            System Administration & Studio Management
          </span>
        </div>

        {/* Right: Admin Profile & Sign Out */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#c2652a] text-white flex items-center justify-center font-bold text-xs shadow-warm-sm">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-[#3a302a] leading-tight">
                {profile?.name || "Admin"}
              </p>
              <p className="text-[10px] font-mono text-[#c2652a] leading-tight font-bold">
                ROOT PRIVILEGES
              </p>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="p-2 rounded-xl text-[#8c827a] hover:text-[#8c3c3c] hover:bg-[#8c3c3c]/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
