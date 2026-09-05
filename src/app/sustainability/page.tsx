import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Leaf,
  Cpu,
  Zap,
  Globe,
  Mail,
  CheckCircle2,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability & Digital Efficiency | GROVIX",
  description:
    "Explore GROVIX's commitment to sustainable web engineering, low-carbon digital architecture, and energy-efficient software systems.",
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f4] text-[#3a302a] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8c827a] hover:text-[#c2652a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#d8d0c8]/60 pb-8 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8c827a] mb-2">
            Environmental Responsibility
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] tracking-tight mb-4">
            Sustainability &amp; Digital Efficiency
          </h1>
          <p className="text-xs font-mono text-[#8c827a]">
            Last Updated: September 5, 2026
          </p>
        </div>

        {/* Intro Highlight */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 shadow-warm-sm mb-12 space-y-4 text-sm sm:text-base text-[#605850] leading-relaxed">
          <p>
            The internet accounts for a growing portion of global electricity consumption. At <strong className="text-[#3a302a]">GROVIX</strong>, we believe environmental responsibility begins in the codebase. Rather than purchasing opaque, unverified carbon offset certificates, we practice <strong className="text-[#3a302a]">digital conservation</strong>—engineering lightweight, computationally efficient web systems that reduce energy consumption at the source.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="space-y-12 text-sm sm:text-base text-[#605850] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                1. Lean Code &amp; Minimal Computational Overhead
              </h2>
            </div>
            <p>
              Bloated JavaScript bundles force millions of end-user devices to burn unnecessary CPU cycles and battery power rendering web pages. We build with strict performance budgets:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#c2652a]">
              <li>
                <strong className="text-[#3a302a]">Server Components Architecture:</strong> Zero-bundle server execution minimizes the JavaScript footprint delivered to visitor devices.
              </li>
              <li>
                <strong className="text-[#3a302a]">Sub-100ms Response Times:</strong> Streamlined server-side rendering and edge routing drastically lower CPU utilization on cloud servers.
              </li>
              <li>
                <strong className="text-[#3a302a]">Tree-Shaking &amp; Zero Bloat:</strong> Rigorous pruning of unused libraries and dependencies ensures every byte served has a direct purpose.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                2. Asset Compression &amp; Network Efficiency
              </h2>
            </div>
            <p>
              Data transfer across global telecommunication networks and underwater fiber cables directly consumes electricity. We minimize transfer payloads through modern web optimization:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Next-gen image delivery (WebP & AVIF)",
                "Vector-based UI icons and typography",
                "Aggressive edge caching and CDN distribution",
                "Lazy-loading offscreen media and modules",
                "Gzip and Brotli compression across all endpoints",
                "Elimination of excessive tracking scripts",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#3a302a]">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                3. Renewable-First Cloud Infrastructure
              </h2>
            </div>
            <p>
              Where your code runs matters. GROVIX deploys client platforms on modern cloud infrastructure providers (including AWS and Vercel Edge networks) that have committed to operating on 100% renewable energy and carbon-neutral data centers.
            </p>
            <p>
              By leveraging serverless execution and auto-scaling compute pools, our infrastructure powers down idle resources when not in use—preventing waste from constantly idling server racks.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                4. Operational Footprint &amp; Remote Studio Model
              </h2>
            </div>
            <p>
              Beyond the code, GROVIX operates as a remote-first engineering collective:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#c2652a]">
              <li>
                <strong className="text-[#3a302a]">Zero Commuting Emissions:</strong> Fully distributed remote collaboration eliminates daily vehicular travel for our core team.
              </li>
              <li>
                <strong className="text-[#3a302a]">Paperless Operations:</strong> 100% digital client contracts, documentation, and invoicing eliminate physical office waste.
              </li>
              <li>
                <strong className="text-[#3a302a]">Long-Life Engineering:</strong> We build enduring software architectures that evolve over years rather than disposable products that require frequent, wasteful rebuilds.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 pt-6 border-t border-[#d8d0c8]/60">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              5. Sustainable Partnerships &amp; Questions
            </h2>
            <p>
              Interested in optimizing your existing digital product for lower carbon impact and faster page speeds? Reach out to our engineering team:
            </p>
            <div className="p-6 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 space-y-3">
              <div className="font-serif font-bold text-lg text-[#3a302a]">GROVIX Studio</div>
              <div className="flex items-center gap-2 text-sm text-[#605850]">
                <Globe className="w-4 h-4 text-[#c2652a]" />
                <span>Website:</span>
                <a
                  href="https://www.grovix.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c2652a] hover:underline font-mono text-xs"
                >
                  www.grovix.site
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#605850]">
                <Mail className="w-4 h-4 text-[#c2652a]" />
                <span>Email:</span>
                <a
                  href="mailto:contact@grovix.site"
                  className="text-[#c2652a] hover:underline font-mono text-xs"
                >
                  contact@grovix.site
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
