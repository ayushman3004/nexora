"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Search,
  BarChart3,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  LineChart,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function GrowPage() {
  const { openModal } = useModal();

  const growthDisciplines = [
    {
      icon: Search,
      title: "SEO & Search Visibility",
      tag: "ORGANIC DISCOVERY",
      description:
        "Engineered search dominance through programmatic SEO architectures, technical crawl optimization, and sub-100ms Core Web Vitals.",
      metrics: "+310% Average Organic Traffic Lift",
      points: [
        "Dynamic Next.js programmatic indexation",
        "Semantic schema structured data automation",
        "Zero CLS and sub-2.0s Largest Contentful Paint",
        "High-intent commercial keyword mapping",
      ],
    },
    {
      icon: BarChart3,
      title: "Data-Driven Strategy",
      tag: "ANALYTICS & ATTRIBUTION",
      description:
        "Transforming fragmented event streams into unified customer intelligence models with real-time attribution and predictive cohort analysis.",
      metrics: "Real-Time Event Ingestion Engine",
      points: [
        "Full-funnel multi-touch attribution modeling",
        "Server-side event streaming (Segment / RudderStack)",
        "Automated churn prediction and LTV modeling",
        "Live executive KPI telemetry dashboards",
      ],
    },
    {
      icon: Target,
      title: "Performance Marketing",
      tag: "ACQUISITION VELOCITY",
      description:
        "High-ROAS paid acquisition campaigns across Meta, Google Search, LinkedIn, and programmatic networks powered by iterative creative sprints.",
      metrics: "3.8x Average Return on Ad Spend (ROAS)",
      points: [
        "High-velocity modular creative testing matrix",
        "First-party data audience segmentation",
        "Automated bid optimization algorithms",
        "Omni-channel spend reallocation protocols",
      ],
    },
    {
      icon: Zap,
      title: "Conversion Optimization",
      tag: "JOURNEY ENGINEERING",
      description:
        "Granular multivariate testing (A/B/n), friction-free onboarding flows, and behavioral micro-interactions that turn visitors into loyal customers.",
      metrics: "+48% Checkout & Sign-up Conversion",
      points: [
        "Behavioral telemetry & session replay audits",
        "Frictionless zero-latency checkout sequences",
        "Dynamic personalized landing page delivery",
        "Iterative bi-weekly statistical hypothesis testing",
      ],
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. GROW HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#d8d0c8]/60">
        {/* Full-width Atmospheric Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-grow.jpg"
            alt="Growth Architecture"
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
            <SectionBadge icon={TrendingUp} variant="primary">
              GROWTH SERVICES &bull; DISCIPLINE 02
            </SectionBadge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#3a302a] tracking-tight leading-[1.02] drop-shadow-sm">
              Strategic Growth <span className="italic text-[#c2652a] font-normal">& Engineering.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3a302a] max-w-2xl mx-auto font-sans leading-relaxed font-medium bg-[#faf5ee]/60 backdrop-blur-sm p-3 rounded-2xl border border-[#d8d0c8]/40">
              We don&apos;t rely on superficial hacks. We engineer repeatable, data-backed growth loops that scale user acquisition and maximize customer lifetime value.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => openModal("inquiry")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Start Scaling</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("disciplines-grid");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#faf5ee] hover:bg-[#f6f0e8] text-[#3a302a] font-semibold text-sm sm:text-base border border-[#d8d0c8] shadow-warm-sm transition-all"
              >
                <span>View Growth Framework</span>
              </button>
            </div>
          </div>

        {/* Growth Analytics Telemetry Banner */}
        <div className="mt-14 relative rounded-3xl bg-[#f6f0e8] border border-[#d8d0c8] p-6 sm:p-8 shadow-warm-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-[#c2652a] font-bold uppercase tracking-wider">
                LIVE GROWTH TELEMETRY
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#3a302a]">
                Predictable metrics, <br />
                <span className="italic text-[#c2652a]">compounding results.</span>
              </h3>
              <p className="text-sm text-[#605850] leading-relaxed">
                Our growth squads connect technical SEO architecture directly with paid funnel telemetry and conversion rate testing pipelines.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm">
                <div className="text-xs text-[#8c827a] font-mono">ORGANIC SURGE</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#c2652a] mt-1">+310%</div>
                <div className="text-[11px] text-[#605850] mt-1">Average 6-month organic impression lift</div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm">
                <div className="text-xs text-[#8c827a] font-mono">CONVERSION BOOST</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#3a302a] mt-1">+48%</div>
                <div className="text-[11px] text-[#605850] mt-1">Funnel checkout completion rate</div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm">
                <div className="text-xs text-[#8c827a] font-mono">BLENDED ROAS</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8c3c3c] mt-1">3.8x</div>
                <div className="text-[11px] text-[#605850] mt-1">Sustained acquisition efficiency</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. DISCIPLINES OF GROWTH (2x2 GRID) */}
      {/* ============================================================ */}
      <section id="disciplines-grid" className="py-16 md:py-24 bg-[#f2ece4] border-y border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <SectionBadge icon={Sparkles} variant="primary">
              GROWTH DISCIPLINES
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
              The 4 levers of <span className="italic text-[#c2652a]">digital scale.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#605850]">
              Every discipline is executed by dedicated quantitative analysts and growth engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {growthDisciplines.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-xl bg-[#f6f0e8] text-[#c2652a] border border-[#d8d0c8]/60">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#c2652a] px-3 py-1 rounded-full bg-[#fbe8d8]">
                        {item.metrics}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#8c827a] uppercase tracking-wider">
                      {item.tag}
                    </div>

                    <h3 className="text-2xl font-serif text-[#3a302a]">{item.title}</h3>
                    <p className="text-sm text-[#605850] leading-relaxed">{item.description}</p>
                  </div>

                  <div className="border-t border-[#d8d0c8]/60 pt-6 space-y-2.5">
                    {item.points.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-xs text-[#3a302a]">
                        <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PROOF OF GROWTH METRICS */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#f6f0e8] border border-[#d8d0c8] p-8 sm:p-14 shadow-warm-md">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="text-xs font-mono text-[#8c827a] uppercase tracking-widest">
              VALIDATED IMPACT
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#3a302a]">
              Proof of <span className="italic text-[#c2652a]">Growth.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#d8d0c8]/60">
            <div className="space-y-2 pt-6 md:pt-0">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-[#c2652a]">10+</div>
              <div className="text-base font-bold text-[#3a302a]">Ventures & Products Scaled</div>
              <p className="text-xs text-[#605850] max-w-xs mx-auto">From Series A to high-revenue maturity</p>
            </div>

            <div className="space-y-2 pt-6 md:pt-0">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-[#3a302a]">50M+</div>
              <div className="text-base font-bold text-[#3a302a]">Users Reached Globally</div>
              <p className="text-xs text-[#605850] max-w-xs mx-auto">Via organic and algorithmic growth engines</p>
            </div>

            <div className="space-y-2 pt-6 md:pt-0">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-[#8c3c3c]">24/7</div>
              <div className="text-base font-bold text-[#3a302a]">Automated Growth Telemetry</div>
              <p className="text-xs text-[#605850] max-w-xs mx-auto">Continuous conversion monitoring and anomaly triggers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. INTERNAL GROWTH SQUADS SECTION */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2ece4] border-t border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Description */}
            <div className="lg:col-span-6 space-y-6">
              <SectionBadge icon={Users} variant="primary">
                EMBEDDED SQUADS
              </SectionBadge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] leading-tight">
                An internal growth team, <br />
                <span className="italic text-[#c2652a]">without the overhead.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#605850] leading-relaxed">
                Rather than dealing with detached agencies, you get an elite cross-functional squad of data engineers, growth strategists, and CRO specialists embedded directly into your Slack and workflows.
              </p>

              {/* Checklist */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-1">
                  <div className="font-bold text-sm text-[#3a302a] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                    Dedicated Cross-Functional Squads
                  </div>
                  <p className="text-xs text-[#605850] pl-6">
                    A dedicated growth lead, data engineer, and copywriter working exclusively on your KPIs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-1">
                  <div className="font-bold text-sm text-[#3a302a] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                    Transparent Live KPI Dashboards
                  </div>
                  <p className="text-xs text-[#605850] pl-6">
                    Real-time access to our data pipeline dashboards with zero obfuscated reporting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-1">
                  <div className="font-bold text-sm text-[#3a302a] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                    Iterative Rapid Deployment Sprints
                  </div>
                  <p className="text-xs text-[#605850] pl-6">
                    Weekly experiment iterations deploying code, landing pages, and creative iterations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Visual Dashboard */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#faf5ee] border border-[#d8d0c8] p-6 sm:p-8 shadow-warm-lg space-y-6">
                <div className="flex items-center justify-between border-b border-[#d8d0c8]/60 pb-4">
                  <div className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-[#c2652a]" />
                    <span className="font-serif text-lg text-[#3a302a]">Growth Sprint Sprint #14</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 font-semibold">
                    In Progress
                  </span>
                </div>

                {/* Simulated Experiment List */}
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#3a302a]">Hypothesis 48B: Dynamic Pricing Modal</div>
                      <div className="text-[#8c827a]">Status: Statistically Significant (+18.4% ARR)</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#c2652a] text-white font-mono font-bold text-[10px]">
                      WON
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#3a302a]">Hypothesis 49A: Next.js Edge SEO Indexer</div>
                      <div className="text-[#8c827a]">Status: 42,000 pages indexed in 48h</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#3a302a] text-white font-mono font-bold text-[10px]">
                      LIVE
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#3a302a]">Hypothesis 50C: 1-Click SSO Onboarding</div>
                      <div className="text-[#8c827a]">Status: Cohort A/B test active (n=12,400)</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#fbe8d8] text-[#c2652a] font-mono font-bold text-[10px]">
                      TESTING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#3a302a] text-[#faf5ee] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionBadge icon={Sparkles} variant="neutral">
            DISCIPLINE 02 // ACCELERATION
          </SectionBadge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Let&apos;s Build Your <span className="italic text-[#f0a878]">Growth Engine.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Schedule an initial growth audit with our strategy lead. We&apos;ll evaluate your current acquisition funnels, SEO footprint, and technical conversion bottlenecks.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openModal("inquiry")}
              className="px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
