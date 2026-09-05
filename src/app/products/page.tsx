"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users2,
  FileCode2,
  Compass,
  Clock,
  ShieldCheck,
  Server,
  Activity,
  ArrowUpRight,
  Star,
  Quote,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { createClient } from "@/lib/supabase/client";
import type { Review } from "@/types/database";

export default function ProductsPage() {
  const { openModal } = useModal();
  const [activeTicketStatus, setActiveTicketStatus] = useState("all");
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("reviews")
          .select("*, profiles(name, company)")
          .eq("status", "APPROVED")
          .order("created_at", { ascending: false });
        if (data && data.length > 0) {
          setApprovedReviews(data as unknown as Review[]);
        }
      } catch (err) {
        console.warn("Could not load approved reviews from database:", err);
      }
    }
    loadReviews();
  }, []);

  const tickets = [
    {
      id: "SRV-8942",
      title: "Automated AWS EKS Autoscaling Failure Triage",
      priority: "CRITICAL",
      sla: "12m remaining",
      assignee: "Julian V.",
      status: "In Progress",
    },
    {
      id: "SRV-8941",
      title: "FinTech Webhook Replay Timeout Discrepancy",
      priority: "HIGH",
      sla: "45m remaining",
      assignee: "Elena R.",
      status: "Resolved",
    },
    {
      id: "SRV-8940",
      title: "Stripe Billing Dual-Write Sync Verification",
      priority: "NORMAL",
      sla: "2h 15m",
      assignee: "Aria C.",
      status: "Automated",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. PRODUCTS HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#d8d0c8]/60">
        {/* Full-width Atmospheric Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-products.jpg"
            alt="GROVIX Products Studio"
            fill
            priority
            className="object-cover object-center brightness-100 contrast-105"
          />
          {/* Subtle warm overlay allowing vibrant image details to show through */}
          <div className="absolute inset-0 bg-[#faf5ee]/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ee]/30 via-transparent to-[#faf5ee]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <SectionBadge icon={Layers} variant="primary">
              BUILT BY GROVIX
            </SectionBadge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#3a302a] tracking-tight leading-[1.02] drop-shadow-sm">
              Our <span className="italic text-[#c2652a] font-normal">Products.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3a302a] max-w-2xl mx-auto font-sans leading-relaxed font-medium bg-[#faf5ee]/60 backdrop-blur-sm p-3 rounded-2xl border border-[#d8d0c8]/40">
              We don&apos;t just build for clients — we build our own software too. These are the products we&apos;ve designed, engineered, and launched in-house.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => openModal("demo")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Explore ServeQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("pipeline-bento");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#faf5ee] hover:bg-[#f6f0e8] text-[#3a302a] font-semibold text-sm sm:text-base border border-[#d8d0c8] shadow-warm-sm transition-all flex items-center justify-center gap-2"
              >
                <span>What&apos;s Coming Next</span>
                <ArrowUpRight className="w-4 h-4 text-[#c2652a]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FEATURED PRODUCT HIGHLIGHT — SERVEQ */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f6f0e8] border-y border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#faf5ee] border border-[#d8d0c8] p-6 sm:p-10 shadow-warm-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: ServeQ Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fbe8d8] text-[#c2652a] border border-[#f0a878]/30">
                    GROVIX PRODUCT 01
                  </span>
                  <span className="text-xs text-[#8c827a] font-mono">Live</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
                    Serve<span className="text-[#c2652a]">Q</span>
                  </h2>
                  <p className="text-base sm:text-lg font-serif italic text-[#605850] mt-1">
                    Queue less. Serve better.
                  </p>
                </div>

                <p className="text-sm text-[#605850] leading-relaxed">
                  A queue and service management platform designed to simplify customer flow and improve operational efficiency. Built for restaurants, clinics, salons, and any business that serves customers.
                </p>

                {/* Bullets with Checkmarks */}
                <div className="space-y-3 pt-1">
                  {[
                    "Real-time queue display for customers — no more guessing wait times",
                    "Smart notifications via SMS and WhatsApp when it's their turn",
                    "Dashboard for staff to manage flow, track service times, and reduce bottlenecks",
                    "Works on any device — no app install required for customers",
                  ].map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3a302a]">
                      <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => openModal("demo")}
                    className="px-7 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold shadow-warm-sm hover:shadow-warm-md transition-all flex items-center gap-2"
                  >
                    <span>Request Enterprise Sandbox Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity ServeQ Dashboard Preview */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#2e2621] text-white border border-white/10 p-5 sm:p-6 shadow-warm-lg space-y-4">
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-lg text-[#f0a878]">
                        Serve<span className="text-[#c2652a]">Q</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                        ENTERPRISE CONTROL
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        SLA HEALTH: 99.4%
                      </span>
                    </div>
                  </div>

                  {/* Top Stats Metric Grid */}
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[10px] text-white/50">ACTIVE QUEUE</div>
                      <div className="text-lg font-bold text-[#f0a878]">14 Cases</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[10px] text-white/50">AVG RESOLUTION</div>
                      <div className="text-lg font-bold text-emerald-300">4.2 min</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[10px] text-white/50">AUTO-TRIAGED</div>
                      <div className="text-lg font-bold text-[#fbe8d8]">78%</div>
                    </div>
                  </div>

                  {/* Live Ticket Backlog */}
                  <div className="space-y-2 pt-1 font-mono text-xs">
                    <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider flex justify-between">
                      <span>LIVE DISPATCH BACKLOG</span>
                      <span className="text-[#f0a878]">Auto-refreshing</span>
                    </div>

                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/10 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#f0a878] font-bold text-[11px]">{t.id}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                t.priority === "CRITICAL"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : t.priority === "HIGH"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-blue-500/20 text-blue-300"
                              }`}
                            >
                              {t.priority}
                            </span>
                          </div>
                          <div className="text-white text-xs font-sans font-medium">{t.title}</div>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-white/60 self-end sm:self-auto">
                          <div className="flex items-center gap-1 text-[#fbe8d8]">
                            <Clock className="w-3 h-3" />
                            {t.sla}
                          </div>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white/80">
                            {t.assignee}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Activity Stream */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span>Engine: Kafka + Go Edge Ingestion</span>
                    <button
                      onClick={() => openModal("demo")}
                      className="text-[#f0a878] hover:text-white transition-colors"
                    >
                      Open Live Sandbox &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INNOVATION PIPELINE (BENTO GRID LAYOUT) */}
      {/* ============================================================ */}
      <section id="pipeline-bento" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <SectionBadge icon={Sparkles} variant="neutral">
            INNOVATION LAB
          </SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
            The GROVIX <span className="italic text-[#c2652a]">Pipeline.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#605850]">
            A snapshot of our proprietary venture software currently being tested and incubated in-house.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento 1: Large 2-Col - Metrics Hub */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-[#f6f0e8] border border-[#d8d0c8] shadow-warm-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#faf5ee] text-[#c2652a] border border-[#d8d0c8]/60">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#fbe8d8] text-[#c2652a]">
                  BETA // ACTIVE
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#3a302a]">Metrics Hub</h3>
                <p className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider mt-0.5">
                  Centralized multi-source telemetry & attribution aggregation
                </p>
              </div>

              <p className="text-sm text-[#605850] max-w-xl leading-relaxed">
                Aggregates Stripe, Google Analytics, Segment, and AWS CloudWatch events into a single unified executive terminal with zero lag.
              </p>
            </div>

            {/* Simulated Chart Preview */}
            <div className="p-4 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[#8c827a]">
                <span>AGGREGATED REVENUE RUN-RATE</span>
                <span className="text-[#c2652a] font-bold">$4.82M ARR</span>
              </div>
              <div className="h-10 flex items-end gap-1.5">
                {[30, 45, 40, 60, 55, 75, 70, 85, 80, 92, 88, 96].map((v, i) => (
                  <div
                    key={i}
                    style={{ height: `${v}%` }}
                    className="flex-1 bg-[#c2652a] rounded-sm opacity-80"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bento 2: 1-Col - Sync */}
          <div className="p-8 rounded-3xl bg-[#faf5ee] border border-[#d8d0c8] shadow-warm-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#f6f0e8] text-[#c2652a] border border-[#d8d0c8]/60">
                  <Users2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#f2ece4] text-[#605850]">
                  INTERNAL
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#3a302a]">Sync</h3>
                <p className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider mt-0.5">
                  Async team alignment & directory
                </p>
              </div>

              <p className="text-sm text-[#605850] leading-relaxed">
                Lightweight daily standup log, timezone synchronizer, and project momentum tracker for distributed squads.
              </p>
            </div>

            <div className="pt-4 border-t border-[#d8d0c8]/50">
              <button
                onClick={() => openModal("inquiry")}
                className="text-xs font-semibold text-[#c2652a] hover:text-[#a8521e] flex items-center gap-1 transition-colors"
              >
                <span>Read manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento 3: 1-Col - Blueprint */}
          <div className="p-8 rounded-3xl bg-[#faf5ee] border border-[#d8d0c8] shadow-warm-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#f6f0e8] text-[#c2652a] border border-[#d8d0c8]/60">
                  <FileCode2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#f2ece4] text-[#605850]">
                  DEV TOOL
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#3a302a]">Blueprint</h3>
                <p className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider mt-0.5">
                  Design token sync engine
                </p>
              </div>

              <p className="text-sm text-[#605850] leading-relaxed">
                Syncs Figma design tokens directly into Tailwind CSS classes and React component props automatically on commit.
              </p>
            </div>

            <div className="pt-4 border-t border-[#d8d0c8]/50 text-xs font-mono text-[#8c827a]">
              <span>Status: v1.1 Active</span>
            </div>
          </div>

          {/* Bento 4: 2-Col - Coming Soon */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-[#2e2621] text-white border border-white/10 shadow-warm-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#f0a878]">
                <Compass className="w-4 h-4 text-[#f0a878]" />
                <span>GROVIX PRODUCTS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#faf5ee]">
                More <span className="italic text-[#f0a878]">coming soon.</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                We&apos;re always working on new tools and products. Stay tuned for what&apos;s next from the GROVIX product lab.
              </p>
            </div>

            <button
              onClick={() => openModal("inquiry")}
              className="px-6 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs sm:text-sm font-semibold shadow-warm-sm flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Get Notified</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3.5 CLIENT PRODUCT REVIEWS (DYNAMIC FROM SUPABASE) */}
      {/* ============================================================ */}
      {approvedReviews.length > 0 && (
        <section className="py-20 md:py-24 border-b border-[#d8d0c8]/60 bg-[#f6f0e8]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SectionBadge icon={Star} variant="primary">
                VERIFIED REVIEWS
              </SectionBadge>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#3a302a]">
                What our users <span className="italic text-[#c2652a]">experience.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#605850]">
                Live feedback from engineering leaders, product operators, and clients deploying GROVIX tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-8 rounded-3xl bg-white/80 border border-[#d8d0c8]/60 shadow-warm-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rev.rating
                              ? "fill-[#c2652a] text-[#c2652a]"
                              : "text-[#d8d0c8]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#3a302a] leading-relaxed font-sans italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#d8d0c8]/40">
                    <p className="font-serif font-semibold text-sm text-[#3a302a]">
                      {rev.profiles?.name || "Verified Client"}
                    </p>
                    <p className="text-xs text-[#8c827a]">
                      {rev.profiles?.company || "Enterprise Operator"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. BOTTOM CTA */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#3a302a] text-[#faf5ee] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionBadge icon={Sparkles} variant="neutral">
            BUILT BY GROVIX
          </SectionBadge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Want something <span className="italic text-[#f0a878]">built for you?</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            If you like what we build for ourselves, imagine what we can build for your business. Let&apos;s talk about your project.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openModal("inquiry")}
              className="px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
