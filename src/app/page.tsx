"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  TrendingUp,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Globe2,
  Code2,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function HomePage() {
  const { openModal } = useModal();

  const disciplines = [
    {
      id: "build",
      tag: "DISCIPLINE 01",
      title: "BUILD",
      subtitle: "Products & Software Architecture",
      description:
        "Websites, web apps, SaaS products, mobile apps, and AI integrations — built with modern tech that works and scales.",
      linkText: "See What We Build",
      href: "/build",
      icon: Cpu,
      stats: "Sub-50ms p99 Latency",
      color: "from-[#fbe8d8]/50 to-[#f6f0e8]",
      accentBorder: "group-hover:border-[#c2652a]/60",
    },
    {
      id: "grow",
      tag: "DISCIPLINE 02",
      title: "GROW",
      subtitle: "Data-Driven Digital Growth",
      description:
        "SEO, performance marketing, conversion optimization, and data analytics to help you reach more customers and grow revenue.",
      linkText: "See Growth Services",
      href: "/grow",
      icon: TrendingUp,
      stats: "50M+ Organic Reach",
      color: "from-[#f9ecea]/50 to-[#f6f0e8]",
      accentBorder: "group-hover:border-[#8c3c3c]/60",
    },
    {
      id: "products",
      tag: "DISCIPLINE 03",
      title: "PRODUCTS",
      subtitle: "Internal SaaS & Digital Tools",
      description:
        "We build our own software too. ServeQ is our queue management platform for service businesses. More products on the way.",
      linkText: "View ServeQ",
      href: "/products",
      icon: Layers,
      stats: "Flagship Platform Live",
      color: "from-[#f2ece4] to-[#ece6dc]/60",
      accentBorder: "group-hover:border-[#c2652a]/60",
    },
  ];

  const stats = [
    {
      number: "10+",
      label: "Internal Products Incubated",
      desc: "From ServeQ to developer toolkits",
    },
    {
      number: "50M+",
      label: "Users Impacted Globally",
      desc: "Across consumer & B2B platforms",
    },
    {
      number: "24/7",
      label: "Global Engineering Sprints",
      desc: "Distributed squads in 4 timezones",
    },
    {
      number: "99.99%",
      label: "Production Uptime Guarantee",
      desc: "Resilient cloud microservices",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-[#d8d0c8]/60">
        {/* Full-width Atmospheric Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-home.jpg"
            alt="GROVIX Studio Atmosphere"
            fill
            priority
            className="object-cover object-center brightness-100 contrast-105"
          />
          {/* Subtle warm overlay allowing vibrant image details to show through */}
          <div className="absolute inset-0 bg-[#faf5ee]/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ee]/30 via-transparent to-[#faf5ee]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Studio Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
            <SectionBadge icon={Sparkles} variant="primary">
              Digital Product &amp; Growth Studio
            </SectionBadge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#3a302a] tracking-tight leading-[0.98]"
          >
            Build. Launch. <span className="italic text-[#c2652a] font-normal">Grow.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#605850] max-w-2xl mx-auto font-sans leading-relaxed"
          >
            GROVIX turns ideas into digital products and helps businesses grow them. From websites and custom software to SaaS, AI, SEO, and digital growth.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/start-project"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/work"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#faf5ee] hover:bg-[#f6f0e8] text-[#3a302a] font-semibold text-sm sm:text-base border border-[#d8d0c8] shadow-warm-sm hover:shadow-warm-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-[#c2652a]" />
            </Link>
          </motion.div>
        </div>

        {/* Hero Atmosphere Visual Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-20 relative rounded-3xl border border-[#d8d0c8]/60 bg-[#f6f0e8] p-3 sm:p-4 shadow-warm-lg overflow-hidden"
        >
          <div className="relative rounded-2xl overflow-hidden bg-[#2e2621] text-white border border-[#d8d0c8]/20 min-h-[360px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10">
            {/* Top Bar of Studio Interface */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#c2652a]" />
                  <div className="w-3 h-3 rounded-full bg-[#f0a878]" />
                  <div className="w-3 h-3 rounded-full bg-[#d8d0c8]" />
                </div>
                <span className="text-xs font-mono text-[#f0a878] tracking-wide">
                  GROVIX_STUDIO_KERNEL // v4.18.0
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  LATENCY: 18ms
                </span>
                <span className="hidden sm:inline">REGION: US-EAST (GLOBAL CDN)</span>
              </div>
            </div>

            {/* Middle Visual Elements */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#f0a878] border border-white/10">
                  <Terminal className="w-3 h-3" />
                  PRODUCTION PIPELINE
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#faf5ee] leading-tight">
                  High-throughput architectures, <br />
                  <span className="italic text-[#f0a878]">zero-compromise</span> discipline.
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-lg leading-relaxed">
                  We operate as an integrated technical partner for high-growth enterprises and ambitious venture-backed startups, translating complex vision into reliable digital products.
                </p>
              </div>

              {/* Code Snippet & Visual Telemetry */}
              <div className="lg:col-span-5 bg-black/40 rounded-xl border border-white/10 p-4 font-mono text-xs text-white/80 space-y-2">
                <div className="text-[#f0a878] flex items-center justify-between text-[11px] pb-2 border-b border-white/10">
                  <span>pipeline.config.ts</span>
                  <span className="text-emerald-400">● 100% HEALTHY</span>
                </div>
                <div className="text-[#d8d0c8]/60">&#47;&#47; Automated Next.js &amp; Go microservice mesh</div>
                <div><span className="text-[#f0a878]">export const</span> runtime = <span className="text-[#c2652a]">&quot;edge&quot;</span>;</div>
                <div><span className="text-[#f0a878]">const</span> engine = <span className="text-blue-300">new</span> GrovixMesh(&#123;</div>
                <div className="pl-4">caching: <span className="text-[#c2652a]">&quot;sub-millisecond-redis&quot;</span>,</div>
                <div className="pl-4">analytics: <span className="text-emerald-400">true</span>,</div>
                <div className="pl-4">slaTarget: <span className="text-[#f0a878]">&quot;99.999%&quot;</span></div>
                <div>&#125;);</div>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-white/60">
              <span>Warm Minimalism &bull; Sahara Design Protocol</span>
              <button
                onClick={() => openModal("case-study")}
                className="text-[#f0a878] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Read Enterprise Pipeline Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THREE CORE DISCIPLINES CARDS */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f6f0e8] border-y border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <SectionBadge icon={Zap} variant="primary">
                CORE CAPABILITIES
              </SectionBadge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
                Three pillars of <span className="italic text-[#c2652a]">impact.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#605850]">
                We combine deep technical rigor with scalable organic growth and proprietary software incubation.
              </p>
            </div>
            <div className="text-xs text-[#8c827a] font-mono">
              01 BUILD &bull; 02 GROW &bull; 03 PRODUCTS
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {disciplines.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`group relative rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-warm-lg ${item.accentBorder}`}
                >
                  <div className="space-y-6">
                    {/* Header with Tag & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest text-[#8c827a] uppercase font-mono">
                        {item.tag}
                      </span>
                      <div className="p-3 rounded-xl bg-[#f2ece4] group-hover:bg-[#fbe8d8] text-[#3a302a] group-hover:text-[#c2652a] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#3a302a] tracking-tight">
                        {item.title}
                      </h3>
                      <div className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider mt-1">
                        {item.subtitle}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#605850] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer with Stat & Link */}
                  <div className="pt-8 mt-6 border-t border-[#d8d0c8]/50 flex items-center justify-between">
                    <div className="text-xs font-medium text-[#8c827a]">
                      {item.stats}
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#c2652a] group-hover:text-[#a8521e] group-hover:translate-x-1 transition-all"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. "ROOM TO EVOLVE" FEATURE BANNER */}
      {/* ============================================================ */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <SectionBadge icon={Sparkles} variant="neutral">
              ROOM TO EVOLVE
            </SectionBadge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] leading-tight">
              Crafted for longevity, <br />
              <span className="italic text-[#c2652a]">engineered for scale.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#605850] leading-relaxed">
              We reject the transient clutter of disposable software. By adhering to disciplined minimalism and rigorous engineering principles, we build systems that endure, evolve, and deliver continuous value to your enterprise.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#3a302a]">
                <CheckCircle2 className="w-5 h-5 text-[#c2652a] shrink-0 mt-0.5" />
                <span>Zero technical debt through modular, test-driven micro-architectures.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#3a302a]">
                <CheckCircle2 className="w-5 h-5 text-[#c2652a] shrink-0 mt-0.5" />
                <span>Unified design systems bridging design tokens directly to production code.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#3a302a]">
                <CheckCircle2 className="w-5 h-5 text-[#c2652a] shrink-0 mt-0.5" />
                <span>Continuous data telemetry optimizing conversion funnels in real-time.</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/start-project"
                className="inline-flex px-6 py-3 rounded-full bg-[#3a302a] hover:bg-[#2e2621] text-white text-sm font-semibold shadow-warm-sm transition-all items-center gap-2"
              >
                <span>Discuss Your System Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column Showcase Visual */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#2e2621] text-white border border-[#d8d0c8]/30 p-6 sm:p-8 shadow-warm-lg overflow-hidden">
              {/* Subtle background circuit pattern */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#f0a878]">
                  <Code2 className="w-4 h-4 text-[#f0a878]" />
                  <span>WORKSPACE_ORCHESTRATOR.SH</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIVE DEPLOYMENT
                </span>
              </div>

              {/* Workspace Visual Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-[#f0a878] font-bold">● CLOUD INFRASTRUCTURE</div>
                  <div className="text-white/70">Terraform & AWS EKS clusters</div>
                  <div className="text-white/50 text-[11px]">Autoscaling: 12 &rarr; 80 pods</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[#c2652a] w-4/5 rounded-full" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-blue-300 font-bold">● REACT & NEXT.JS CORE</div>
                  <div className="text-white/70">Server Components + Edge API</div>
                  <div className="text-white/50 text-[11px]">Bundle size: 48kb gzip</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-emerald-400 w-11/12 rounded-full" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-[#fbe8d8] font-bold">● DATA STREAMING</div>
                  <div className="text-white/70">Apache Kafka & ClickHouse</div>
                  <div className="text-white/50 text-[11px]">Throughput: 85k events/sec</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[#f0a878] w-3/4 rounded-full" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-emerald-300 font-bold">● OBSERVABILITY</div>
                  <div className="text-white/70">OpenTelemetry & Datadog</div>
                  <div className="text-white/50 text-[11px]">Error rate: 0.0001%</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-emerald-400 w-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="font-serif italic text-sm text-[#f0a878]">
                  &ldquo;Engineering Excellence.&rdquo;
                </span>
                <span className="font-mono text-[11px]">GROVIX ARCHITECTURE REPO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. STRATEGIC PARTNERSHIP & IMPACT METRICS */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2ece4] border-t border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Manifesto */}
            <div className="lg:col-span-5 space-y-6">
              <SectionBadge icon={ShieldCheck} variant="primary">
                STRATEGIC PARTNERSHIP
              </SectionBadge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] leading-tight">
                Not a vendor. <br />
                <span className="italic text-[#c2652a]">Your embedded force multiplier.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#605850] leading-relaxed">
                Traditional agencies disappear after delivery. GROVIX embeds directly with leadership and product teams, aligning incentives around business outcomes, engineering resilience, and compounded growth.
              </p>
              <div className="p-5 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm space-y-2">
                <div className="text-xs font-bold text-[#c2652a] uppercase tracking-wider">
                  The GROVIX Guarantee
                </div>
                <p className="text-xs sm:text-sm text-[#3a302a] leading-relaxed">
                  Every product shipped includes comprehensive design tokens, automated CI/CD pipelines, complete documentation, and internal team handover training.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Typographic Stats */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 shadow-warm-sm hover:shadow-warm-md transition-shadow space-y-2"
                >
                  <div className="text-4xl sm:text-5xl font-serif font-bold text-[#c2652a]">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-[#3a302a]">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#605850]">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CLIENT & PARTNER PERSPECTIVES */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <SectionBadge icon={Sparkles} variant="neutral">
            CLIENT VOICES
          </SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3a302a]">
            Validated by <span className="italic text-[#c2652a]">industry leaders.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "GROVIX re-engineered our high-frequency trading interface in 6 weeks. The performance boost transformed our platform's user retention.",
              author: "Marcus Thorne",
              role: "CTO, Aurora Capital",
              firm: "Fintech Platform",
            },
            {
              quote:
                "Their approach to warm minimalism is refreshing. In an industry full of generic templates, GROVIX created a brand and product we are genuinely proud of.",
              author: "Claire Sterling",
              role: "VP of Product",
              firm: "Enterprise SaaS",
            },
            {
              quote:
                "ServeQ alone automated 40% of our tier-1 engineering triage within two weeks. GROVIX builds tools that actually solve operational friction.",
              author: "Devon Bradley",
              role: "Head of Operations",
              firm: "Logistics Mesh",
            },
          ].map((item, idx) => (
            <div
              key={item.author}
              className="p-7 rounded-2xl bg-[#f6f0e8] border border-[#d8d0c8]/70 shadow-warm-sm flex flex-col justify-between space-y-6"
            >
              <p className="text-sm sm:text-base font-serif italic text-[#3a302a] leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="border-t border-[#d8d0c8]/50 pt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#3a302a]">{item.author}</div>
                  <div className="text-[11px] text-[#8c827a]">{item.role}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#faf5ee] border border-[#d8d0c8]/60 text-[#605850] font-mono">
                  {item.firm}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. BOTTOM ENGAGEMENT CTA */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#3a302a] text-[#faf5ee] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#f0a878] border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            READY TO COMMENCE
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight">
            Have a project in mind? <br />
            Let&apos;s build your <span className="italic text-[#f0a878]">competitive edge.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-sans leading-relaxed">
            Whether you need a 0-to-1 product engineered, an existing architecture optimized, or a dedicated growth engine deployed, our studio is ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/start-project"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Initiate Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Internal Products</span>
              <Layers className="w-4 h-4 text-[#f0a878]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
