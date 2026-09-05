"use client";

import React, { useState } from "react";
import { X, CheckCircle2, TrendingUp, Cpu, Server, ArrowRight, Gauge, Database, GitBranch } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export function CaseStudyModal() {
  const { closeModal, openModal } = useModal();
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "results">("overview");

  return (
    <div className="relative w-full max-w-3xl bg-[#faf5ee] border border-[#d8d0c8]/60 rounded-2xl shadow-warm-lg overflow-hidden flex flex-col max-h-[90vh]">
      {/* Modal Header */}
      <div className="p-6 md:p-8 border-b border-[#d8d0c8]/50 bg-[#f6f0e8]/90 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#fbe8d8] text-[#c2652a]">
              ENGINEERING CASE STUDY
            </span>
            <span className="text-xs text-[#8c827a]">Fintech Infrastructure</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#3a302a]">
            Enterprise Data Pipeline <span className="italic text-[#c2652a]">Refactor.</span>
          </h2>
          <p className="text-xs md:text-sm text-[#605850] mt-1 max-w-xl">
            How GROVIX re-architected a legacy monolithic transaction engine into an event-driven microservices architecture with a 400% throughput gain.
          </p>
        </div>
        <button
          onClick={closeModal}
          className="p-2 rounded-full text-[#605850] hover:text-[#3a302a] hover:bg-[#ece6dc] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#d8d0c8]/50 px-6 md:px-8 bg-[#f2ece4]">
        {[
          { id: "overview", label: "Executive Summary" },
          { id: "architecture", label: "Technical Architecture" },
          { id: "results", label: "Impact & Benchmarks" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "overview" | "architecture" | "results")}
            className={`py-3 px-4 text-xs md:text-sm font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-[#c2652a] text-[#c2652a]"
                : "border-transparent text-[#605850] hover:text-[#3a302a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-xl text-center">
                <div className="text-2xl font-bold font-serif text-[#c2652a]">+400%</div>
                <div className="text-xs text-[#605850] mt-0.5">Throughput Capacity</div>
              </div>
              <div className="p-3.5 bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-xl text-center">
                <div className="text-2xl font-bold font-serif text-[#3a302a]">42ms</div>
                <div className="text-xs text-[#605850] mt-0.5">p99 End-to-End Latency</div>
              </div>
              <div className="p-3.5 bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-xl text-center">
                <div className="text-2xl font-bold font-serif text-[#3a302a]">99.999%</div>
                <div className="text-xs text-[#605850] mt-0.5">Uptime Achieved</div>
              </div>
              <div className="p-3.5 bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-xl text-center">
                <div className="text-2xl font-bold font-serif text-emerald-700">-64%</div>
                <div className="text-xs text-[#605850] mt-0.5">AWS Cloud Spend</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-[#3a302a]">The Challenge</h4>
              <p className="text-sm text-[#605850] leading-relaxed">
                The client, a high-volume payment routing platform processing over $12B annually, faced cascading database locks, 1.8-second peak latency spikes, and escalating monthly cloud compute bills. Their monolithic Node.js backend lacked idempotent retry pipelines and real-time observability.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-[#3a302a]">GROVIX&apos;s Solution</h4>
              <p className="text-sm text-[#605850] leading-relaxed">
                GROVIX designed and engineered a modular Rust & Go stream processing pipeline orchestrated on AWS EKS with Kafka clusters, automated failover queues, and sub-millisecond in-memory caching layers with Redis Enterprise.
              </p>
            </div>

            <div className="bg-[#f6f0e8] p-4 rounded-xl border border-[#d8d0c8]/60 space-y-2">
              <div className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider">Technology Stack Deployed</div>
              <div className="flex flex-wrap gap-1.5">
                {["TypeScript", "Go Microservices", "Kafka / Event Streams", "AWS EKS / Terraform", "PostgreSQL Sharding", "Redis Cache", "Datadog Telemetry"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-xs bg-[#faf5ee] border border-[#d8d0c8]/60 text-[#3a302a] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="space-y-6">
            <div className="border border-[#d8d0c8]/70 rounded-xl bg-[#2e2621] p-5 text-white space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                <span className="text-[#f0a878] font-mono flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  PIPELINE TOPOLOGY V3.2
                </span>
                <span className="text-xs text-white/60">Distributed Event Stream</span>
              </div>

              {/* Visual Topology Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#f0a878] font-semibold flex items-center gap-1">
                    <Server className="w-3 h-3" />
                    1. Ingress Tier
                  </div>
                  <p className="text-white/70 text-[11px]">Global Anycast CDN &rarr; Envoy Edge Gateway &rarr; Rate Limiter</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-[#c2652a]/40 bg-[#c2652a]/10 space-y-1">
                  <div className="text-[#f0a878] font-semibold flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    2. Stream Processor
                  </div>
                  <p className="text-white/70 text-[11px]">Kafka Partition Broker &rarr; Go Worker Pool with Zero-Copy Deserialization</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#f0a878] font-semibold flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    3. State & Storage
                  </div>
                  <p className="text-white/70 text-[11px]">Sharded Aurora PostgreSQL with Dual-Write Ledger & Cold S3 Lake</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-[#3a302a]">Core Engineering Milestones</h4>
              <div className="space-y-2 text-sm text-[#605850]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a] mt-0.5 shrink-0" />
                  <span><strong>Zero-Downtime Migration:</strong> Multi-phase dual-write protocol switched 40M daily operations with 0 dropped events.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a] mt-0.5 shrink-0" />
                  <span><strong>Automated Anomaly Detection:</strong> Sub-second circuit breakers isolate downstream third-party banking timeout spikes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a] mt-0.5 shrink-0" />
                  <span><strong>SOC2 Type II Compliance:</strong> Integrated envelope encryption across all Kafka topics and persistent ledger storage.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c2652a]">
                  <Gauge className="w-4 h-4" />
                  LATENCY & PERFORMANCE
                </div>
                <p className="text-xs text-[#605850] leading-relaxed">
                  Average API response times dropped from <strong>1,240ms</strong> down to <strong>42ms</strong> under peak load test surges of 85,000 requests/sec.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c2652a]">
                  <TrendingUp className="w-4 h-4" />
                  COST EFFICIENCY
                </div>
                <p className="text-xs text-[#605850] leading-relaxed">
                  Consolidated 140+ unoptimized EC2 nodes into dynamic autoscaled Kubernetes pods, slicing monthly compute costs by <strong>$48,000/month</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f2ece4] border border-[#d8d0c8]/60">
              <blockquote className="text-sm font-serif italic text-[#3a302a] leading-relaxed">
                &ldquo;GROVIX didn&apos;t just optimize our pipeline; they engineered a foundation that allowed us to scale from Series B to Series C without a single architecture rewrite.&rdquo;
              </blockquote>
              <div className="text-xs text-[#8c827a] mt-2 font-sans font-medium">
                — VP of Infrastructure, Tier-1 Global Fintech
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Footer */}
      <div className="p-4 md:p-6 border-t border-[#d8d0c8]/50 bg-[#f6f0e8]/90 flex items-center justify-between">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded-full border border-[#d8d0c8] text-xs font-medium text-[#605850] hover:bg-[#ece6dc] transition-colors"
        >
          Close
        </button>
        <button
          onClick={() => {
            closeModal();
            setTimeout(() => openModal("inquiry"), 200);
          }}
          className="px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold flex items-center gap-1.5 shadow-warm-sm transition-all"
        >
          <span>Discuss Similar Architecture</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
