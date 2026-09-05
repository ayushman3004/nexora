"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap, X, ChevronRight, Settings2, Check } from "lucide-react";

const COOKIE_NAME = "grovix_cookie_consent";
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

export function CookieConsent() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [performanceEnabled, setPerformanceEnabled] = useState(true);

  useEffect(() => {
    // Check if consent cookie is already set
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      // Delay showing slightly so initial paint and hero animations are completely uninterrupted
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (consent === "all" || consent === "performance") {
      // If user previously accepted performance cookies, pre-warm top routes
      preheatRoutes();
    }

    // Listen for custom event to reopen preferences from footer
    const handleReopen = () => {
      setIsVisible(true);
      setIsDetailsOpen(true);
    };

    window.addEventListener("open-cookie-preferences", handleReopen);
    return () => window.removeEventListener("open-cookie-preferences", handleReopen);
  }, []);

  const preheatRoutes = () => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        try {
          router.prefetch("/build");
          router.prefetch("/grow");
          router.prefetch("/products");
          router.prefetch("/work");
          router.prefetch("/about");
        } catch {
          // prefetch graceful fallback
        }
      });
    }
  };

  const handleAcceptAll = () => {
    setCookie(COOKIE_NAME, "all", ONE_YEAR_SECONDS);
    preheatRoutes();
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    setCookie(COOKIE_NAME, "essential", ONE_YEAR_SECONDS);
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const value = performanceEnabled ? "performance" : "essential";
    setCookie(COOKIE_NAME, value, ONE_YEAR_SECONDS);
    if (performanceEnabled) {
      preheatRoutes();
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Performance Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#faf5ee] border border-[#d8d0c8] rounded-2xl shadow-warm-xl p-5 sm:p-6 backdrop-blur-md text-[#3a302a]">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#3a302a] leading-tight">
                Optimized Speed &amp; Cookies
              </h3>
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#8c827a]">
                Privacy &bull; Performance
              </p>
            </div>
          </div>
          <button
            onClick={handleAcceptEssential}
            aria-label="Dismiss and keep essential only"
            className="text-[#8c827a] hover:text-[#3a302a] transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#605850] leading-relaxed mb-4">
          We use strictly necessary cookies for secure session routing, and optional performance cookies to pre-warm studio routes for instant, sub-second page transitions.
        </p>

        {/* Expandable Details Accordion */}
        {isDetailsOpen && (
          <div className="mb-4 space-y-3 pt-3 border-t border-[#d8d0c8]/60 text-xs">
            <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-[#f2ece4]/60 border border-[#d8d0c8]/40">
              <div className="space-y-0.5">
                <div className="font-semibold text-[#3a302a] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c2652a]" />
                  <span>Essential &amp; Security</span>
                </div>
                <p className="text-[11px] text-[#605850]">
                  Required for CSRF protection, secure auth states, and form delivery.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#8c827a] bg-[#faf5ee] px-2 py-0.5 rounded border border-[#d8d0c8]/60 self-center">
                Always Active
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-[#f2ece4]/60 border border-[#d8d0c8]/40">
              <div className="space-y-0.5">
                <div className="font-semibold text-[#3a302a] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#c2652a]" />
                  <span>Performance &amp; Pre-caching</span>
                </div>
                <p className="text-[11px] text-[#605850]">
                  Pre-loads studio routes and caches assets in idle cycles for zero-latency clicks.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={performanceEnabled}
                onClick={() => setPerformanceEnabled(!performanceEnabled)}
                className={`w-9 h-5 rounded-full transition-colors relative self-center ${
                  performanceEnabled ? "bg-[#c2652a]" : "bg-[#d8d0c8]"
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    performanceEnabled ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="text-[11px] text-[#8c827a] flex items-center justify-between pt-1">
              <Link href="/privacy" className="underline hover:text-[#c2652a]">
                Read Privacy Policy
              </Link>
              <Link href="/security" className="underline hover:text-[#c2652a]">
                Data Protection
              </Link>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          {isDetailsOpen ? (
            <button
              type="button"
              onClick={handleSaveCustom}
              className="w-full py-2 px-3 rounded-xl bg-[#3a302a] hover:bg-[#26201b] text-white text-xs font-semibold shadow-warm-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Selected Preferences</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3 rounded-xl bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold shadow-warm-sm transition-all text-center"
              >
                Enable Optimal Performance
              </button>

              <button
                type="button"
                onClick={handleAcceptEssential}
                className="py-2 px-3 rounded-xl bg-[#f2ece4] hover:bg-[#eae2d6] text-[#3a302a] text-xs font-medium border border-[#d8d0c8] transition-colors text-center"
              >
                Essential Only
              </button>
            </>
          )}
        </div>

        {/* Customize Toggle */}
        {!isDetailsOpen && (
          <div className="mt-2.5 text-center">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] text-[#8c827a] hover:text-[#3a302a] transition-colors"
            >
              <Settings2 className="w-3 h-3" />
              <span>Customize preferences</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; max-age=${maxAge}; path=/; SameSite=Lax${secure}`;
}
