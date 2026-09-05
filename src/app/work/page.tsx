"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Briefcase,
  Layers,
  Store,
  ShoppingCart,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  MapPin,
  TrendingUp,
  Star,
  Quote,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";
import Link from "next/link";
import { ClientBrowserPreview } from "@/components/work/ClientBrowserPreview";
import { ClientWebsiteFullscreenModal } from "@/components/work/ClientWebsiteFullscreenModal";
import type { Project } from "@/types/database";

interface ProjectItem {
  id: string;
  title: string;
  clientName: string;
  location?: string;
  category: "web" | "product";
  categoryLabel: string;
  badgeLabel: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  tech: string[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  icon: React.ComponentType<{ className?: string }>;
  featured: boolean;
  link?: string;
  demoLink?: string;
  isProduct?: boolean;
  testimonial?: {
    rating: number;
    review: string;
    clientName: string;
    company?: string;
    date?: string;
  };
}

export default function WorkPage() {
  const { openModal } = useModal();
  const [activeFilter, setActiveFilter] = useState("all");
  const [dbProjects, setDbProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenProject, setFullscreenProject] = useState<{
    title: string;
    url: string;
    categoryLabel: string;
    tagline?: string;
  } | null>(null);

  useEffect(() => {
    async function loadPublishedProjects() {
      try {
        const supabase = createClient();
        const [projectsRes, reviewsRes] = await Promise.all([
          supabase
            .from("projects")
            .select("*")
            .eq("published", true)
            .in("status", ["DELIVERED", "COMPLETED"])
            .order("created_at", { ascending: false }),
          supabase
            .from("reviews")
            .select("*, profiles(name, company)")
            .eq("status", "APPROVED"),
        ]);

        const data = projectsRes.data;
        const approvedReviews = reviewsRes.data || [];

        const reviewsByProjectId: Record<string, any> = {};
        for (const r of approvedReviews) {
          if (r.product_id) {
            reviewsByProjectId[r.product_id] = r;
          }
        }

        if (data && data.length > 0) {
          const mapped: ProjectItem[] = (data as Project[]).map((item) => {
            const itemReview = reviewsByProjectId[item.id];
            const itemCaseStudyTestimonial = item.case_study?.testimonial;

            let testimonial: ProjectItem["testimonial"] = undefined;
            if (itemReview) {
              testimonial = {
                rating: itemReview.rating || 5,
                review: itemReview.review,
                clientName:
                  itemReview.profiles?.name ||
                  itemCaseStudyTestimonial?.client_name ||
                  "Verified Client",
                company:
                  itemReview.profiles?.company ||
                  itemCaseStudyTestimonial?.client_company ||
                  item.title,
                date: itemReview.created_at,
              };
            } else if (
              itemCaseStudyTestimonial &&
              itemCaseStudyTestimonial.review &&
              itemCaseStudyTestimonial.status !== "REJECTED"
            ) {
              testimonial = {
                rating: itemCaseStudyTestimonial.rating || 5,
                review: itemCaseStudyTestimonial.review,
                clientName:
                  itemCaseStudyTestimonial.client_name || "Verified Client",
                company:
                  itemCaseStudyTestimonial.client_company || item.title,
                date: itemCaseStudyTestimonial.date,
              };
            }

            return {
              id: item.id,
              title: item.title,
              clientName: item.title,
              category: (item.category as "web" | "product") || "web",
              categoryLabel:
                item.category === "product"
                  ? "GROVIX Product Studio"
                  : "Client Digital Platform",
              badgeLabel:
                item.category === "product"
                  ? "GROVIX PRODUCT"
                  : "LIVE CLIENT WEBSITE",
              tagline:
                item.description || "High-performance digital engineering by GROVIX.",
              description:
                item.description ||
                "A custom engineered digital platform designed for high performance.",
              challenge:
                item.case_study?.challenge ||
                "Scaling modern digital architecture and user acquisition.",
              solution:
                item.case_study?.solution ||
                "GROVIX engineered an ultra-fast, mobile-first web architecture.",
              features:
                item.case_study?.features ||
                (item.technologies && item.technologies.length > 0
                  ? item.technologies
                  : ["Responsive Web Architecture", "High-Performance Edge CDN"]),
              tech:
                item.technologies && item.technologies.length > 0
                  ? item.technologies
                  : ["Next.js", "TypeScript", "Tailwind CSS"],
              outcome:
                item.case_study?.outcome ||
                "Production deployment with superior performance and user conversion.",
              metrics: item.case_study?.metrics,
              icon: item.category === "product" ? Layers : Store,
              featured: true,
              demoLink: item.website_url || item.preview_url || undefined,
              link: item.website_url || undefined,
              isProduct: item.category === "product",
              testimonial,
            };
          });
          setDbProjects(mapped);
        } else {
          setDbProjects([]);
        }
      } catch (err) {
        console.warn("Could not load dynamic projects from database:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPublishedProjects();
  }, []);

  const studioProducts: ProjectItem[] = [
    {
      id: "serveq",
      title: "ServeQ — Service Orchestration & Queue Dispatch",
      clientName: "GROVIX Product Studio",
      category: "product",
      categoryLabel: "GROVIX Product Studio",
      badgeLabel: "GROVIX PRODUCT",
      tagline: "Queue less. Serve better.",
      description:
        "Queue and service management platform designed to simplify customer flow and improve operational efficiency for restaurants, clinics, and service businesses. Eliminates physical wait lines through real-time SMS/WhatsApp notifications and automated staff triage dashboards.",
      challenge:
        "Businesses lose valuable walk-ins and customers every day because of long, unmanaged queues. Existing queue management software was bulky, expensive, and forced customers to download redundant mobile apps.",
      solution:
        "GROVIX engineered ServeQ — a lightweight, zero-install queue management system with real-time web socket queue displays, automated multi-channel notifications, staff telemetry, and wait-time prediction algorithms.",
      features: [
        "Real-time queue display & automated customer SMS/WhatsApp notifications",
        "Staff command dashboard with live wait-time triage & analytics",
        "Zero-install customer mobile pass with live progress tracker",
        "Multi-location support with automated failover and queue balancing",
      ],
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Twilio API"],
      outcome:
        "Live in production and powering over 25,000 monthly customer check-ins across early adopter venues with an average 42% reduction in perceived wait times.",
      metrics: [
        { label: "Monthly Check-Ins", value: "25,000+" },
        { label: "Wait Time Reduction", value: "42%" },
        { label: "Customer Satisfaction", value: "99.4%" },
      ],
      icon: Layers,
      featured: false,
      link: "/products",
      demoLink: "",
      isProduct: true,
    },
  ];

  const allProjects = [
    ...dbProjects,
    ...studioProducts.filter(
      (sp) =>
        !dbProjects.some(
          (dp) =>
            dp.id === sp.id ||
            dp.title.toLowerCase().trim().includes("serveq")
        )
    ),
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Client Websites" },
    { id: "product", label: "GROVIX Products" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. WORK HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden border-b border-[#d8d0c8]/60">
        {/* Full-width Atmospheric Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-work.jpg"
            alt="GROVIX Project Gallery"
            fill
            priority
            className="object-cover object-center brightness-100 contrast-105"
          />
          {/* Warm overlay allowing vibrant image details to show through */}
          <div className="absolute inset-0 bg-[#faf5ee]/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ee]/30 via-transparent to-[#faf5ee]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <SectionBadge icon={Briefcase} variant="primary">
              OUR WORK &bull; CLIENT SHOWCASE
            </SectionBadge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#3a302a] tracking-tight leading-[1.02] drop-shadow-sm">
              Real client websites.{" "}
              <span className="italic text-[#c2652a] font-normal">
                Live in production.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3a302a] max-w-2xl mx-auto font-sans leading-relaxed font-medium bg-[#faf5ee]/60 backdrop-blur-sm p-3.5 rounded-2xl border border-[#d8d0c8]/40 shadow-warm-xs">
              Explore the websites, luxury e-commerce platforms, and digital
              products we&apos;ve engineered for real clients. Test drive them
              directly in our live interactive browser previews below.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FILTER BAR */}
      {/* ============================================================ */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#c2652a] text-white shadow-warm-sm scale-105"
                    : "bg-[#f6f0e8] text-[#605850] border border-[#d8d0c8]/80 hover:bg-[#ece6dc] hover:text-[#3a302a]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PROJECTS SHOWCASE GRID */}
      {/* ============================================================ */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl border shadow-warm-md hover:shadow-warm-lg transition-all overflow-hidden ${
                  project.featured
                    ? "bg-[#faf5ee] border-[#c2652a]/40 ring-1 ring-[#c2652a]/20"
                    : "bg-[#faf5ee] border-[#d8d0c8]"
                }`}
              >
                <div className="p-6 sm:p-8 md:p-10 space-y-8">
                  {/* Top Meta Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#d8d0c8]/60">
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={`p-3.5 rounded-2xl border shrink-0 ${
                          project.featured
                            ? "bg-[#fbe8d8] text-[#c2652a] border-[#f0a878]/40"
                            : "bg-[#f6f0e8] text-[#605850] border-[#d8d0c8]/60"
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#3a302a]">
                            {project.title}
                          </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#8c827a] font-sans">
                          <span className="font-mono uppercase tracking-wider text-[#c2652a] font-semibold">
                            {project.categoryLabel}
                          </span>
                          {project.location && (
                            <>
                              <span>&bull;</span>
                              <span className="flex items-center gap-1 text-[#605850]">
                                <MapPin className="w-3.5 h-3.5 text-[#c2652a]" />
                                {project.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Badge & Quick Links */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide bg-[#fbe8d8] text-[#c2652a] border border-[#f0a878]/40 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#c2652a] animate-pulse" />
                        {project.badgeLabel}
                      </span>

                      {project.demoLink && (
                        <button
                          onClick={() =>
                            setFullscreenProject({
                              title: project.title,
                              url: project.demoLink!,
                              categoryLabel: project.categoryLabel,
                              tagline: project.tagline,
                            })
                          }
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f6f0e8] hover:bg-[#ece6dc] text-[#3a302a] border border-[#d8d0c8] transition-colors flex items-center gap-1.5 shadow-warm-xs"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-[#c2652a]" />
                          <span>Fullscreen Preview</span>
                        </button>
                      )}

                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#c2652a] hover:bg-[#a8521e] text-white transition-colors flex items-center gap-1.5 shadow-warm-xs"
                        >
                          <span>Visit Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.link && (
                        <Link
                          href={project.link}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#c2652a] hover:bg-[#a8521e] text-white transition-colors flex items-center gap-1.5 shadow-warm-xs"
                        >
                          <span>Explore Product</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Tagline & Narrative Description */}
                  <div className="space-y-3">
                    <p className="text-xl sm:text-2xl font-serif italic text-[#c2652a]">
                      &ldquo;{project.tagline}&rdquo;
                    </p>
                    <p className="text-base text-[#605850] leading-relaxed max-w-4xl">
                      {project.description}
                    </p>
                  </div>

                  {/* ======================================================== */}
                  {/* LIVE WEBSITE PREVIEW (INTERACTIVE BROWSER WINDOW) */}
                  {/* ======================================================== */}
                  <div className="pt-2">
                    <div className="mb-2 flex items-center justify-between text-xs text-[#8c827a] px-1">
                      <span className="font-mono uppercase tracking-wider font-semibold text-[#3a302a] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c2652a]" />
                        Interactive Live Preview
                      </span>
                      <span className="hidden sm:inline text-[#605850]">
                        Test the real website directly inside the frame or switch to mobile
                      </span>
                    </div>

                    <ClientBrowserPreview
                      title={project.title}
                      url={project.demoLink || "/products"}
                      categoryLabel={project.categoryLabel}
                      isExternal={!!project.demoLink}
                      isProduct={project.isProduct}
                      onOpenFullscreen={
                        project.demoLink
                          ? () =>
                              setFullscreenProject({
                                title: project.title,
                                url: project.demoLink!,
                                categoryLabel: project.categoryLabel,
                                tagline: project.tagline,
                              })
                          : undefined
                      }
                    />
                  </div>

                  {/* Key Metrics / Highlights if available */}
                  {project.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-4 rounded-2xl bg-[#f6f0e8] border border-[#d8d0c8]/70 text-center"
                        >
                          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#c2652a]">
                            {m.value}
                          </div>
                          <div className="text-xs text-[#605850] font-sans font-medium mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Challenge → Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-6 rounded-2xl bg-[#f6f0e8] border border-[#d8d0c8]/70 space-y-2">
                      <div className="text-xs font-bold text-[#c2652a] uppercase tracking-wider">
                        The Challenge
                      </div>
                      <p className="text-sm text-[#605850] leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#f6f0e8] border border-[#d8d0c8]/70 space-y-2">
                      <div className="text-xs font-bold text-[#c2652a] uppercase tracking-wider">
                        The Solution
                      </div>
                      <p className="text-sm text-[#605850] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Verified Client Testimonial Card */}
                  {project.testimonial && (
                    <div className="p-6 rounded-2xl bg-[#f6f0e8] border border-[#c2652a]/30 shadow-warm-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= project.testimonial!.rating
                                    ? "fill-[#c2652a] text-[#c2652a]"
                                    : "text-[#d8d0c8]"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[#c2652a] font-mono">
                            {project.testimonial.rating}.0 / 5.0
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2e2621] bg-[#c2652a]/15 border border-[#c2652a]/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c2652a]" />
                          <span>Verified Client Review</span>
                        </span>
                      </div>

                      <blockquote className="text-sm sm:text-base text-[#3a302a] font-serif italic leading-relaxed">
                        &ldquo;{project.testimonial.review}&rdquo;
                      </blockquote>

                      <div className="pt-2.5 border-t border-[#d8d0c8]/60 flex items-center justify-between text-xs text-[#605850]">
                        <div className="font-semibold text-[#3a302a] flex items-center gap-1.5">
                          <span>{project.testimonial.clientName}</span>
                          {project.testimonial.company && (
                            <span className="font-normal text-[#8c827a]">
                              • {project.testimonial.company}
                            </span>
                          )}
                        </div>
                        {project.testimonial.date && (
                          <span className="text-[11px] font-mono text-[#8c827a]">
                            Delivered & Verified {new Date(project.testimonial.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Features + Tech + Outcome Footer Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-[#d8d0c8]/60">
                    {/* Key Features */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#3a302a] uppercase tracking-wider">
                        Key Features Delivered
                      </div>
                      <div className="space-y-2">
                        {project.features.map((feat) => (
                          <div
                            key={feat}
                            className="flex items-start gap-2 text-xs text-[#3a302a] leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#3a302a] uppercase tracking-wider">
                        Technology Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#f2ece4] border border-[#d8d0c8]/80 text-[#3a302a] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Real Outcome */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#3a302a] uppercase tracking-wider">
                        Verified Business Outcome
                      </div>
                      <p className="text-sm text-[#605850] leading-relaxed">
                        {project.outcome}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#c2652a] hover:text-[#a8521e] transition-colors"
                          >
                            <span>Open Client Website</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => openModal("inquiry")}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#3a302a] hover:text-[#c2652a] transition-colors"
                        >
                          <span>Build Similar Project</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#c2652a] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs font-mono text-[#8c827a]">Loading published portfolio...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-white/60 border border-dashed border-[#d8d0c8] max-w-xl mx-auto space-y-4">
            <Briefcase className="w-10 h-10 text-[#c2652a]/60 mx-auto" />
            <h3 className="text-2xl font-serif text-[#3a302a]">
              Portfolio in Production
            </h3>
            <p className="text-sm text-[#605850] font-sans leading-relaxed">
              New client architectures and digital platforms are currently in development.
              Projects published by the studio upon delivery will appear here live.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openModal("inquiry")}
                className="px-6 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs sm:text-sm font-semibold shadow-warm-sm transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {/* ============================================================ */}
      {/* 4. FULLSCREEN INTERACTIVE PREVIEW MODAL */}
      {/* ============================================================ */}
      {fullscreenProject && (
        <ClientWebsiteFullscreenModal
          isOpen={!!fullscreenProject}
          onClose={() => setFullscreenProject(null)}
          title={fullscreenProject.title}
          url={fullscreenProject.url}
          categoryLabel={fullscreenProject.categoryLabel}
          tagline={fullscreenProject.tagline}
        />
      )}

      {/* ============================================================ */}
      {/* 4.5. VERIFIED CLIENT TESTIMONIALS SECTION */}
      {/* ============================================================ */}
      {dbProjects.filter((p) => p.testimonial).length > 0 && (
        <section className="py-16 md:py-24 border-t border-[#d8d0c8]/60 bg-[#f6f0e8]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <SectionBadge icon={Star} variant="primary">
                PROVEN CLIENT IMPACT
              </SectionBadge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
                What Founders Say About{" "}
                <span className="italic text-[#c2652a]">GROVIX</span>
              </h2>
              <p className="text-sm sm:text-base text-[#605850]">
                Verified ratings and real feedback from client founders whose digital
                platforms and websites we engineered and delivered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbProjects
                .filter((p) => p.testimonial)
                .map((proj) => (
                  <div
                    key={`testimonial-${proj.id}`}
                    className="p-6 rounded-3xl bg-white/90 border border-[#d8d0c8]/70 shadow-warm-sm flex flex-col justify-between space-y-4 hover:shadow-warm-md transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= proj.testimonial!.rating
                                  ? "fill-[#c2652a] text-[#c2652a]"
                                  : "text-[#d8d0c8]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c2652a] bg-[#c2652a]/10 px-2.5 py-0.5 rounded-full">
                          {proj.title}
                        </span>
                      </div>

                      <blockquote className="text-sm text-[#3a302a] font-serif italic leading-relaxed">
                        &ldquo;{proj.testimonial!.review}&rdquo;
                      </blockquote>
                    </div>

                    <div className="pt-3 border-t border-[#d8d0c8]/50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-[#3a302a]">
                          {proj.testimonial!.clientName}
                        </div>
                        <div className="text-[11px] text-[#8c827a]">
                          {proj.testimonial!.company || proj.title}
                        </div>
                      </div>
                      {proj.demoLink && (
                        <a
                          href={proj.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#c2652a] hover:underline font-semibold inline-flex items-center gap-1"
                        >
                          <span>Visit Site</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#3a302a] text-[#faf5ee] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionBadge icon={Sparkles} variant="neutral">
            YOUR PROJECT NEXT
          </SectionBadge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Ready to build your{" "}
            <span className="italic text-[#f0a878]">flagship website?</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            From bespoke hospitality showcases to luxury retail and enterprise
            SaaS platforms — we design and engineer digital experiences that
            convert visitors into loyal clients.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openModal("inquiry")}
              className="px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
