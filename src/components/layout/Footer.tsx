"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export function Footer() {
  const pathname = usePathname();
  const { openModal } = useModal();

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/auth")
  ) {
    return null;
  }

  return (
    <footer className="bg-[#f6f0e8] border-t border-[#d8d0c8]/60 text-[#3a302a] relative overflow-hidden">
      {/* Subtle ambient decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0a878]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#d8d0c8]/60">
          {/* Brand & Studio Brief */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo.png"
                  alt="GROVIX Logo"
                  width={160}
                  height={44}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-[#605850] max-w-sm leading-relaxed">
                A warm minimalist digital studio engineering resilient web architectures, high-impact growth systems, and proprietary digital tools.
              </p>
            </div>

            <div>
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs sm:text-sm font-semibold shadow-warm-sm hover:shadow-warm-md transition-all duration-200"
              >
                <span>Initiate Studio Partnership</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Nav Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Services & Capabilities */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8c827a]">
                Disciplines
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/build" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Custom Software
                  </Link>
                </li>
                <li>
                  <Link href="/build" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Cloud Infrastructure
                  </Link>
                </li>
                <li>
                  <Link href="/grow" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Data-Driven Growth
                  </Link>
                </li>
                <li>
                  <Link href="/grow" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Search Visibility & SEO
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    ServeQ
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Our Work
                  </Link>
                </li>
              </ul>
            </div>

            {/* Studio & Ventures */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8c827a]">
                Studio
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Our Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    The Minds
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Our Products
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => openModal("case-study")}
                    className="text-[#605850] hover:text-[#c2652a] transition-colors text-left"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <Link href="/about#global" className="text-[#605850] hover:text-[#c2652a] transition-colors">
                    Global Hubs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Transparency */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8c827a]">
                Transparency
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <span className="text-[#605850] hover:text-[#3a302a] cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-[#605850] hover:text-[#3a302a] cursor-pointer">
                    Terms of Engagement
                  </span>
                </li>
                <li>
                  <span className="text-[#605850] hover:text-[#3a302a] cursor-pointer">
                    Security & SOC2
                  </span>
                </li>
                <li>
                  <span className="text-[#605850] hover:text-[#3a302a] cursor-pointer">
                    Carbon Offset Status
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c827a]">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 GROVIX Studio. Crafted for growth.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#605850]">
              <Globe className="w-3.5 h-3.5 text-[#c2652a]" />
              San Francisco &bull; London &bull; Zurich &bull; Tokyo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
