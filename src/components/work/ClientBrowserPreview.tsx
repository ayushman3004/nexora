"use client";

import React, { useState, useRef } from "react";
import {
  ExternalLink,
  RotateCw,
  Maximize2,
  Smartphone,
  Monitor,
  Copy,
  Check,
  Lock,
  Sparkles,
  ArrowUpRight,
  Activity,
  Layers
} from "lucide-react";

interface ClientBrowserPreviewProps {
  title: string;
  url: string;
  categoryLabel: string;
  isExternal?: boolean;
  onOpenFullscreen?: () => void;
  aspectRatio?: "video" | "wide";
  isProduct?: boolean;
}

export function ClientBrowserPreview({
  title,
  url,
  categoryLabel,
  isExternal = true,
  onOpenFullscreen,
  aspectRatio = "wide",
  isProduct = false,
}: ClientBrowserPreviewProps) {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url.startsWith("http")) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Clean URL for display in address bar
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="w-full rounded-2xl border border-[#d8d0c8] bg-[#2e2621] text-white shadow-warm-md overflow-hidden flex flex-col transition-all">
      {/* 1. Browser Chrome / Window Header */}
      <div className="px-3.5 py-2.5 bg-[#251e1a] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Left: Window dots & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-90 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-90 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-90 hover:opacity-100 transition-opacity" />
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-white/50 tracking-wider">
            {title} &bull; {categoryLabel}
          </span>
        </div>

        {/* Center: Interactive Omnibar / Address bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-auto">
          <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/10 transition-colors">
            <div className="flex items-center gap-2 overflow-hidden truncate">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate text-[11px] sm:text-xs text-white/90">
                {isProduct ? "nexora.com/products/serveq" : displayUrl}
              </span>
            </div>
            {!isProduct && (
              <button
                onClick={handleCopy}
                title="Copy website link"
                className="p-1 hover:text-[#f0a878] transition-colors ml-1 text-white/60"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right: Viewport switchers & Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {!isProduct && (
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setDeviceView("desktop")}
                title="Desktop View"
                className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                  deviceView === "desktop"
                    ? "bg-[#c2652a] text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView("mobile")}
                title="Mobile View"
                className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                  deviceView === "mobile"
                    ? "bg-[#c2652a] text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>
          )}

          {!isProduct && (
            <button
              onClick={handleReload}
              title="Reload preview"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenFullscreen && !isProduct && (
            <button
              onClick={onOpenFullscreen}
              title="Expand to Fullscreen Preview"
              className="p-1.5 rounded-lg bg-[#c2652a]/20 hover:bg-[#c2652a] text-[#f0a878] hover:text-white border border-[#c2652a]/40 transition-colors flex items-center gap-1 text-xs font-semibold px-2"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Fullscreen</span>
            </button>
          )}

          {isExternal && url.startsWith("http") && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open website in new tab"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Interactive Preview Canvas */}
      <div className="relative bg-[#1a1512] flex items-center justify-center overflow-hidden min-h-[440px] sm:min-h-[520px]">
        {/* If product (ServeQ), render interactive UI simulation */}
        {isProduct ? (
          <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between space-y-6 text-[#faf5ee]">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#c2652a]/20 border border-[#c2652a]/40 text-[#f0a878]">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    ServeQ Service Orchestration Dashboard
                  </h3>
                  <p className="text-xs font-mono text-[#f0a878]">
                    LIVE SAAS KERNEL &bull; V2.4 MULTI-TENANT
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>ACTIVE QUEUES: 14 STATIONS</span>
              </div>
            </div>

            {/* Simulated Live Queue Stats & Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono text-white/60">AVG WAIT TIME</div>
                <div className="text-3xl font-serif font-bold text-[#f0a878] mt-1">4.2 min</div>
                <div className="text-[11px] text-emerald-400 mt-1">&darr; 42% vs physical queue</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono text-white/60">TODAY&apos;S CUSTOMERS</div>
                <div className="text-3xl font-serif font-bold text-white mt-1">842</div>
                <div className="text-[11px] text-white/60 mt-1">100% automated SMS dispatch</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono text-white/60">CLIENT SATISFACTION</div>
                <div className="text-3xl font-serif font-bold text-emerald-400 mt-1">99.4%</div>
                <div className="text-[11px] text-white/60 mt-1">Zero app install required</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[#f0a878] text-[11px]">
                <span>LIVE DISPATCH PIPELINE</span>
                <span className="text-emerald-400">● REAL-TIME WEBSOCKET</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  <div className="text-[#f0a878]">Ticket #Q-104</div>
                  <div className="text-white text-sm font-sans font-medium">Fontainhas Health Center</div>
                  <div className="text-[11px] text-white/50">Dr. D&apos;Souza &bull; Called 1m ago</div>
                </div>
                <div className="p-2.5 rounded bg-[#c2652a]/20 border border-[#c2652a]/40">
                  <div className="text-emerald-400">Ticket #Q-105 (Next)</div>
                  <div className="text-white text-sm font-sans font-medium">Boutique Fitting Studio</div>
                  <div className="text-[11px] text-white/50">WhatsApp alert sent &bull; In lounge</div>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  <div className="text-[#f0a878]">Ticket #Q-106</div>
                  <div className="text-white text-sm font-sans font-medium">Coastal Bistro Table Triage</div>
                  <div className="text-[11px] text-white/50">Party of 4 &bull; Estimated wait: 5m</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-white/60">
                Built and maintained end-to-end by Nexora engineering.
              </span>
              <a
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white transition-all shadow-sm"
              >
                <span>View Full Product Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* Live Iframe for Client Websites */
          <div
            className={`transition-all duration-300 w-full h-[460px] sm:h-[540px] md:h-[580px] flex justify-center items-center ${
              deviceView === "mobile" ? "py-6" : "p-0"
            }`}
          >
            {/* Mobile device shell when mobile view is active */}
            <div
              className={`relative h-full transition-all duration-300 ${
                deviceView === "mobile"
                  ? "w-[360px] max-w-full rounded-[38px] border-[6px] border-[#38302a] shadow-2xl overflow-hidden bg-black ring-1 ring-white/20"
                  : "w-full"
              }`}
            >
              {/* Dynamic Island / Speaker Notch for Mobile */}
              {deviceView === "mobile" && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 pointer-events-none flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
                  <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#251e1a]/90 backdrop-blur-sm text-white space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#f0a878] border-t-transparent animate-spin" />
                  <div className="text-xs font-mono text-white/80">
                    Connecting to live Vercel deployment...
                  </div>
                  <div className="text-[10px] text-white/50">{displayUrl}</div>
                </div>
              )}

              {/* Live interactive iframe */}
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={url}
                title={`${title} Live Preview`}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Interactive Helper Bar */}
      <div className="px-4 py-2 bg-[#251e1a] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-emerald-300">
            LIVE CLIENT DEPLOYMENT
          </span>
          <span className="hidden sm:inline text-white/40">&bull;</span>
          <span className="hidden sm:inline text-[11px] text-white/70">
            Interactive: Click and scroll inside to test dishes, fabrics, and booking workflows.
          </span>
        </div>

        {url.startsWith("http") && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#f0a878] hover:text-white inline-flex items-center gap-1 transition-colors font-medium ml-auto"
          >
            <span>Visit Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
