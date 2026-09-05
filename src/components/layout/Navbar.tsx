"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export function Navbar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Build", href: "/build" },
    { name: "Grow", href: "/grow" },
    { name: "Work", href: "/work" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
  ];

  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#faf5ee]/90 backdrop-blur-md shadow-warm-sm border-b border-[#d8d0c8]/50 py-3.5"
            : "bg-[#faf5ee]/70 backdrop-blur-sm border-b border-[#d8d0c8]/30 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="GROVIX Logo"
              width={160}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#f2ece4]/70 px-4 py-1.5 rounded-full border border-[#d8d0c8]/50 shadow-warm-sm">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-sans transition-all duration-200 rounded-full ${
                    active
                      ? "font-bold text-[#c2652a] bg-[#faf5ee] shadow-warm-sm"
                      : "text-[#605850] hover:text-[#3a302a] hover:bg-[#faf5ee]/60"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#c2652a] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#605850] hover:text-[#c2652a] transition-colors px-2 py-1"
            >
              Client Portal
            </Link>
            <button
              onClick={() => openModal("inquiry")}
              className="group relative inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs lg:text-sm font-semibold shadow-warm-sm hover:shadow-warm-md transition-all duration-200"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openModal("inquiry")}
              className="px-3.5 py-1.5 rounded-full bg-[#c2652a] text-white text-xs font-semibold shadow-warm-sm"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#3a302a] bg-[#f2ece4] border border-[#d8d0c8]/60 hover:bg-[#ece6dc] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden bg-[#3a302a]/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#faf5ee] border-l border-[#d8d0c8] shadow-warm-lg p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#d8d0c8]/60">
                  <Image
                    src="/logo.png"
                    alt="GROVIX Logo"
                    width={140}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-[#605850] hover:bg-[#ece6dc]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="py-6 space-y-2">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          active
                            ? "bg-[#fbe8d8] text-[#c2652a] font-bold border-l-4 border-[#c2652a]"
                            : "text-[#3a302a] hover:bg-[#f2ece4]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {active && <span className="w-2 h-2 rounded-full bg-[#c2652a]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="space-y-4 pt-6 border-t border-[#d8d0c8]/60">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal("inquiry");
                  }}
                  className="w-full py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-warm-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start a Project</span>
                </button>
                <div className="text-center text-xs text-[#8c827a]">
                  Crafted for high-growth ventures &bull; 2024
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
