"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Server,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  GitBranch,
  Code2,
  Database,
  Cloud,
  CheckCircle2,
  Monitor,
  Activity,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function BuildPage() {
  const { openModal } = useModal();
  const [selectedStack, setSelectedStack] = useState<string>("ALL");

  const stackFilters = [
    "ALL",
    "REACT",
    "NEXT.JS",
    "TYPESCRIPT",
    "NODE.JS / GO",
    "AWS / GCP",
    "AI / ML",
  ];

  const stackDetails: Record<string, { desc: string; metrics: string; tools: string[] }> = {
    ALL: {
      desc: "Our unified polyglot stack is optimized for zero cold starts, type-safe full-stack cohesion, and resilient cloud orchestration.",
      metrics: "Sub-50ms p99 latency &bull; 99.999% SLA",
      tools: ["Next.js 15+", "TypeScript", "Go / Rust", "PostgreSQL", "AWS EKS", "Redis Enterprise", "Tailwind CSS"],
    },
    REACT: {
      desc: "Component-driven user interfaces engineered with modern React 19 concurrent features, strict state boundary controls, and accessible tokenized design systems.",
      metrics: "60fps animations &bull; Zero layout shifts",
      tools: ["React 19", "Framer Motion", "Tailwind CSS", "Radix UI", "TanStack Query"],
    },
    "NEXT.JS": {
      desc: "Enterprise App Router architectures with Server Components, streaming SSR, Edge middleware routing, and zero-bundle server logic.",
      metrics: "100/100 Lighthouse score &bull; 40ms TTFB",
      tools: ["App Router", "Turbopack", "Edge Middleware", "Static Incremental ISR"],
    },
    TYPESCRIPT: {
      desc: "End-to-end type safety from database schema (Prisma/Drizzle) through backend API contracts to client-side form validations with Zod.",
      metrics: "0 Runtime Type Mismatches &bull; Strict Null Checking",
      tools: ["TypeScript 5.x", "Zod", "tRPC", "Prisma", "Drizzle ORM"],
    },
    "NODE.JS / GO": {
      desc: "High-throughput asynchronous microservices, gRPC inter-service communication, and concurrent worker pools for heavy compute tasks.",
      metrics: "85,000 req/sec &bull; 12MB memory footprint",
      tools: ["Go 1.23", "Node.js 22 LTS", "gRPC / Protobuf", "Fiber", "Fastify"],
    },
    "AWS / GCP": {
      desc: "Infrastructure as Code (IaC) via Terraform, multi-region failover Kubernetes clusters, and automated CI/CD deployment pipelines.",
      metrics: "Automated Blue-Green Deployments &bull; Zero Downtime",
      tools: ["Terraform", "AWS EKS / ECS", "Cloudflare Workers", "S3 Data Lake"],
    },
    "AI / ML": {
      desc: "Production-grade LLM orchestration, semantic vector retrieval (pgvector / Pinecone), and private context fine-tuning for workflow automation.",
      metrics: "Sub-second embedding retrieval &bull; RAG pipelines",
      tools: ["OpenAI API", "Anthropic Claude", "pgvector", "LangChain", "Hugging Face"],
    },
  };

  const capabilities = [
    {
      icon: Code2,
      title: "Product Development",
      description:
        "We take your idea from concept to launch — whether it's an MVP, a SaaS platform, a web app, or a mobile application.",
      features: [
        "MVP Development & Rapid Prototyping",
        "SaaS & Web Applications",
        "Mobile Apps (React Native / Flutter)",
        "E-commerce & Marketplace Platforms",
      ],
      tag: "PRODUCT DEVELOPMENT",
    },
    {
      icon: Layers,
      title: "Engineering",
      description:
        "Clean, modern code that scales. We build frontends, backends, APIs, and cloud infrastructure using battle-tested technologies.",
      features: [
        "Frontend (React, Next.js, TypeScript)",
        "Backend & APIs (Node.js, Go, Python)",
        "Databases (PostgreSQL, MongoDB, Redis)",
        "Cloud & DevOps (AWS, GCP, CI/CD)",
      ],
      tag: "ENGINEERING",
    },
    {
      icon: Cloud,
      title: "AI & Automation",
      description:
        "We integrate AI into real workflows — from chatbots and content generation to intelligent automations that save you hours every week.",
      features: [
        "AI Integrations (OpenAI, Claude, Custom)",
        "LLM-Powered Applications & Chatbots",
        "Workflow Automation & Smart Pipelines",
        "Data Processing & Analytics Dashboards",
      ],
      tag: "AI & AUTOMATION",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. BUILD HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#d8d0c8]/60">
        {/* Full-width Atmospheric Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-build.jpg"
            alt="Engineering Architecture"
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
            <SectionBadge icon={Cpu} variant="primary">
              BUILD &bull; DESIGN &bull; SHIP
            </SectionBadge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#3a302a] tracking-tight leading-[1.02]">
            From Idea to <span className="italic text-[#c2652a] font-normal">Production.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#605850] max-w-2xl mx-auto font-sans leading-relaxed">
            We design and build digital products from MVP to scalable production systems — combining thoughtful UX with reliable, modern technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/start-project"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Start Building</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openModal("case-study")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#faf5ee] hover:bg-[#f6f0e8] text-[#3a302a] font-semibold text-sm sm:text-base border border-[#d8d0c8] shadow-warm-sm transition-all flex items-center justify-center gap-2"
            >
              <span>View Data Pipeline Case Study</span>
              <ArrowUpRight className="w-4 h-4 text-[#c2652a]" />
            </button>
          </div>
        </div>

        {/* Server & Architectural Rack Visual Backdrop */}
        <div className="mt-14 relative rounded-3xl bg-[#2e2621] text-white border border-[#d8d0c8]/30 p-6 sm:p-8 shadow-warm-lg overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#f0a878]">
              <Server className="w-4 h-4 text-[#f0a878]" />
              <span>CLUSTER_OVERVIEW // REGION_GLOBAL_MESH</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>STATUS: ALL NODES OPERATIONAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[#f0a878] font-bold">EDGE NETWORK / ROUTING</div>
              <p className="text-white/70 text-[11px]">
                Anycast DNS routing incoming traffic to nearest edge compute region within 12ms.
              </p>
              <div className="pt-2 text-[11px] text-white/50 flex justify-between border-t border-white/10">
                <span>Cache Hit Ratio:</span>
                <span className="text-emerald-400 font-bold">98.4%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[#f0a878] font-bold">MICROSERVICES ENGINE</div>
              <p className="text-white/70 text-[11px]">
                Autoscaled worker pools processing streaming queues with Zero-Copy deserialization.
              </p>
              <div className="pt-2 text-[11px] text-white/50 flex justify-between border-t border-white/10">
                <span>p99 Latency:</span>
                <span className="text-[#f0a878] font-bold">28ms</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[#f0a878] font-bold">PERSISTENCE & LEDGER</div>
              <p className="text-white/70 text-[11px]">
                Multi-region active-active PostgreSQL with real-time replication and encryption.
              </p>
              <div className="pt-2 text-[11px] text-white/50 flex justify-between border-t border-white/10">
                <span>Data Durability:</span>
                <span className="text-emerald-400 font-bold">99.9999999%</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MODERN STACK TAGS (FILTERABLE & INTERACTIVE) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20 bg-[#f6f0e8] border-y border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <SectionBadge icon={Sparkles} variant="primary">
              TECHNOLOGY MATRIX
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#3a302a]">
              A curated, <span className="italic text-[#c2652a]">battle-tested</span> stack.
            </h2>
            <p className="text-sm text-[#605850]">
              Click any technology layer below to inspect our architectural standards and benchmarks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {stackFilters.map((pill) => {
              const active = selectedStack === pill;
              return (
                <button
                  key={pill}
                  onClick={() => setSelectedStack(pill)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#c2652a] text-white shadow-warm-sm scale-105"
                      : "bg-[#faf5ee] text-[#605850] border border-[#d8d0c8]/80 hover:bg-[#ece6dc] hover:text-[#3a302a]"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Dynamic Stack Details Card */}
          <motion.div
            key={selectedStack}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8] shadow-warm-md max-w-4xl mx-auto space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8d0c8]/60 pb-4">
              <div>
                <span className="text-xs font-mono text-[#c2652a] font-bold uppercase tracking-wider">
                  LAYER // {selectedStack}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#3a302a] mt-0.5">
                  Architectural Rigor & Standard
                </h3>
              </div>
              <div
                className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#fbe8d8] text-[#c2652a] font-semibold self-start sm:self-auto"
                dangerouslySetInnerHTML={{ __html: stackDetails[selectedStack].metrics }}
              />
            </div>

            <p className="text-sm sm:text-base text-[#605850] leading-relaxed">
              {stackDetails[selectedStack].desc}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#8c827a] uppercase tracking-wider font-mono">
                Featured Tools & Frameworks in this tier
              </div>
              <div className="flex flex-wrap gap-2">
                {stackDetails[selectedStack].tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#f2ece4] border border-[#d8d0c8]/70 text-[#3a302a]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURED CASE STUDY CARD */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-[#faf5ee] border border-[#d8d0c8] p-6 sm:p-10 shadow-warm-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbe8d8] text-xs font-semibold text-[#c2652a] border border-[#f0a878]/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                FEATURED ARCHITECTURAL STUDY
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] leading-tight">
                Enterprise Data Pipeline <br />
                <span className="italic text-[#c2652a]">Refactor.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#605850] leading-relaxed">
                A high-volume fintech platform processing $12B+ in transactions replaced their bottlenecked monolith with a GROVIX-engineered distributed event mesh.
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="p-4 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/70">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#c2652a]">+400%</div>
                  <div className="text-xs text-[#605850] mt-0.5">Throughput Increase</div>
                </div>
                <div className="p-4 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/70">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#3a302a]">42ms</div>
                  <div className="text-xs text-[#605850] mt-0.5">p99 End-to-End Latency</div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => openModal("case-study")}
                  className="px-6 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold shadow-warm-sm hover:shadow-warm-md transition-all flex items-center gap-2"
                >
                  <span>View Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#2e2621] text-white border border-white/10 p-5 shadow-warm-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-[#f0a878]">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span>FINTECH_METRIC_DASHBOARD</span>
                  </div>
                  <span className="text-emerald-400">99.999% SLA</span>
                </div>

                {/* Simulated Data Dashboard Visual */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-white/70">Kafka Streaming Events</span>
                    <span className="text-[#f0a878] font-bold">14.8M / hour</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-white/70">Database Query Pool</span>
                    <span className="text-emerald-300 font-bold">0.8ms average</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-white/70">Cloud Spend Reduction</span>
                    <span className="text-[#fbe8d8] font-bold">-64% monthly</span>
                  </div>
                </div>

                {/* Visual Chart Wave */}
                <div className="pt-2">
                  <div className="text-[10px] text-white/50 font-mono mb-1">THROUGHPUT STABILITY (24H SURGE)</div>
                  <div className="h-12 bg-white/5 rounded-lg flex items-end gap-1 p-1.5 border border-white/10">
                    {[40, 45, 60, 75, 80, 65, 90, 95, 85, 92, 98, 88, 94, 99, 90, 85, 92].map((val, i) => (
                      <div
                        key={i}
                        style={{ height: `${val}%` }}
                        className="flex-1 bg-[#c2652a] rounded-sm opacity-90 hover:opacity-100 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CORE CAPABILITIES GRID (3 CARDS) */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2ece4] border-t border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <SectionBadge icon={Zap} variant="primary">
              CORE CAPABILITIES
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
              Built for <span className="italic text-[#c2652a]">resilience.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#605850]">
              Every solution is crafted with modularity, thorough test coverage, and strict performance SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-[#f6f0e8] text-[#c2652a] w-fit border border-[#d8d0c8]/60">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-[11px] font-mono text-[#8c827a] uppercase tracking-wider">
                      {cap.tag}
                    </div>
                    <h3 className="text-2xl font-serif text-[#3a302a]">{cap.title}</h3>
                    <p className="text-sm text-[#605850] leading-relaxed">{cap.description}</p>
                  </div>

                  <div className="border-t border-[#d8d0c8]/60 pt-6 space-y-2.5">
                    {cap.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-[#3a302a]">
                        <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#3a302a] text-[#faf5ee] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionBadge icon={Sparkles} variant="neutral">
            DISCIPLINE 01 // READY
          </SectionBadge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Let&apos;s Build <span className="italic text-[#f0a878]">Something Great.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Tell us about your technical challenges, architecture requirements, or project deadlines. We&apos;ll schedule an architecture consultation.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all inline-flex items-center justify-center gap-2 mx-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
