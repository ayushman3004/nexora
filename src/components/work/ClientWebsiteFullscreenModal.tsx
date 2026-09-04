"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCw,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  Globe,
  ArrowRight
} from "lucide-react";

interface ClientWebsiteFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  categoryLabel: string;
  tagline?: string;
}

export function ClientWebsiteFullscreenModal({
  isOpen,
  onClose,
  title,
  url,
  categoryLabel,
  tagline,
}: ClientWebsiteFullscreenModalProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const getViewportWidth = () => {
    switch (deviceMode) {
      case "mobile":
        return "w-[390px] max-w-full h-[844px] max-h-[85vh] rounded-[40px] border-[8px] border-[#222] shadow-2xl ring-1 ring-white/20";
      case "tablet":
        return "w-[768px] max-w-full h-[90vh] rounded-2xl border-[6px] border-[#222] shadow-2xl ring-1 ring-white/20";
      case "desktop":
      default:
        return "w-full h-[88vh] rounded-xl border border-white/10 shadow-2xl";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1512]/95 backdrop-blur-md text-white">
        {/* Top Control Bar */}
        <header className="px-4 py-3 bg-[#241d18] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 select-none">
          {/* Left: Project Brand & Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Close Fullscreen Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base font-serif font-semibold text-white">
                  {title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#c2652a]/20 text-[#f0a878] border border-[#c2652a]/40">
                  {categoryLabel}
                </span>
              </div>
              {tagline && (
                <p className="text-xs font-sans text-white/60 hidden sm:block">
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === "desktop"
                  ? "bg-[#c2652a] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === "tablet"
                  ? "bg-[#c2652a] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === "mobile"
                  ? "bg-[#c2652a] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{displayUrl}</span>
            </div>

            <button
              onClick={() => {
                setIsLoading(true);
                setIframeKey((k) => k + 1);
              }}
              title="Reload preview"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Open in Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Viewport Frame Container */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#15110e]">
          <div className={`relative transition-all duration-300 overflow-hidden bg-white ${getViewportWidth()}`}>
            {/* Mobile Notch */}
            {deviceMode === "mobile" && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#222] rounded-full z-20 pointer-events-none flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black mr-3" />
                <div className="w-2 h-2 rounded-full bg-blue-900/60" />
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#251e1a] text-white space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#f0a878] border-t-transparent animate-spin" />
                <div className="text-sm font-mono text-white/90">
                  Streaming live client preview...
                </div>
                <div className="text-xs text-white/50">{displayUrl}</div>
              </div>
            )}

            <iframe
              key={iframeKey}
              src={url}
              title={`${title} Fullscreen Preview`}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </main>
      </div>
    </AnimatePresence>
  );
}
