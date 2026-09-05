"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import {
  FolderKanban,
  Star,
  LayoutDashboard,
  LogOut,
  User,
  ExternalLink,
  Menu,
  X,
  Shield,
} from "lucide-react";
import type { Profile } from "@/types/database";

interface DashboardHeaderProps {
  profile?: Profile | null;
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "Product Reviews", href: "/dashboard/reviews", icon: Star },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf5ee]/90 backdrop-blur-md border-b border-[#d8d0c8]/60 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="group flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Nexora Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md bg-[#c2652a]/10 text-[#c2652a] font-semibold border border-[#c2652a]/20">
              CLIENT PORTAL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#c2652a] text-white shadow-warm-sm"
                      : "text-[#605850] hover:text-[#3a302a] hover:bg-[#f2ece4]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {profile?.role === "admin" && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3a302a] hover:bg-[#201a17] text-white text-xs font-semibold shadow-warm-sm transition-all ml-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#f0a878]" />
                <span>Admin Console</span>
              </Link>
            )}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="hidden md:flex items-center gap-4">
          {profile?.role === "admin" && (
            <Link
              href="/admin/requests"
              className="text-xs px-3 py-1 rounded-full bg-[#c2652a]/10 hover:bg-[#c2652a]/20 text-[#c2652a] font-medium border border-[#c2652a]/30 transition-colors flex items-center gap-1.5"
            >
              <span>Review Requests</span>
            </Link>
          )}

          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#8c827a] hover:text-[#3a302a] flex items-center gap-1 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <div className="h-4 w-[1px] bg-[#d8d0c8]" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2ece4] border border-[#d8d0c8] flex items-center justify-center text-[#c2652a]">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-[#3a302a] leading-tight">
                {profile?.name || "Client"}
              </p>
              <p className="text-[11px] text-[#8c827a] leading-tight truncate max-w-[140px]">
                {profile?.company || profile?.email || "Partner"}
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

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-[#3a302a] bg-[#f2ece4] border border-[#d8d0c8]/60"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden pt-3 px-4 pb-2 border-t border-[#d8d0c8]/40 mt-3 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold ${
                  active
                    ? "bg-[#c2652a] text-white"
                    : "text-[#605850] hover:bg-[#f2ece4]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {profile?.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold bg-[#3a302a] text-white shadow-warm-sm"
            >
              <Shield className="w-4 h-4 text-[#f0a878]" />
              <span>Admin Console</span>
            </Link>
          )}
          <div className="pt-2 border-t border-[#d8d0c8]/40 flex items-center justify-between">
            <span className="text-xs text-[#605850]">{profile?.name || "Client"}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs text-[#8c3c3c] font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
