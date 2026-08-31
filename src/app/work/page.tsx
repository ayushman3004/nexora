"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Briefcase,
  Layers,
  Store,
  ShoppingCart,
  Layout,
  CheckCircle2,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";
import Link from "next/link";

export default function WorkPage() {
  const { openModal } = useModal();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "product", label: "Products" },
    { id: "web", label: "Websites" },
    { id: "ecommerce", label: "E-commerce" },
  ];

  const projects = [
    {
      id: "serveq",
      title: "ServeQ",
      category: "product",
      categoryLabel: "SaaS / Product",
      tagline: "Queue less. Serve better.",
      description:
        "Queue and service management platform designed to simplify customer flow and improve operational efficiency for restaurants, clinics, and service businesses.",
      challenge: "Businesses lose customers every day because of long, unmanaged queues. There was no simple, affordable solution for small businesses.",
      solution: "We built ServeQ — a real-time queue management system with customer notifications, staff dashboards, and analytics.",
      features: [
        "Real-time queue display & customer notifications",
        "Staff dashboard with service analytics",
        "SMS & WhatsApp integration",
        "Works on any device, no app install needed",
      ],
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Twilio"],
      outcome: "Live and in active development. Built entirely in-house by Nexora.",
      icon: Layers,
      featured: true,
      link: "/products",
      demoLink: "", // Add demo URL here
    },
    {
      id: "restaurant-website",
      title: "Modern Restaurant Website",
      category: "web",
      categoryLabel: "Website / Business",
      tagline: "Digital presence for local dining.",
      description:
        "A beautiful, fast-loading restaurant website with online menu, table reservations, photo gallery, and Google Maps integration.",
      challenge: "The client had no online presence and was losing customers to competitors who appeared in Google search results.",
      solution: "We designed and built a responsive, SEO-optimized website that showcases their menu and makes it easy for customers to find and reserve.",
      features: [
        "Responsive design optimized for mobile",
        "Online menu with categories & pricing",
        "Table reservation system",
        "Google Maps & contact integration",
      ],
      tech: ["Next.js", "Tailwind CSS", "Vercel"],
      outcome: "3x increase in online inquiries within the first month.",
      icon: Store,
      demoLink: "https://chackos-qidp.vercel.app/", // Add demo URL here
    },
    {
      id: "ecommerce-store",
      title: "E-commerce Platform",
      category: "ecommerce",
      categoryLabel: "E-commerce",
      tagline: "Sell online, grow offline.",
      description:
        "A complete e-commerce solution with product catalog, shopping cart, secure payments, and order management dashboard.",
      challenge: "The client was selling only through physical channels and wanted to expand online without a complicated setup.",
      solution: "We built a clean, modern online store with Stripe integration, inventory management, and a simple admin panel.",
      features: [
        "Product catalog with search & filters",
        "Secure checkout with Stripe payments",
        "Order tracking & management dashboard",
        "SEO-optimized product pages",
      ],
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      outcome: "Launched in 3 weeks. First online sale within 24 hours of launch.",
      icon: ShoppingCart,
      demoLink: "https://tailoring-rho.vercel.app/", // Add demo URL here
    },
    {
      id: "portfolio-site",
      title: "Creative Portfolio Website",
      category: "web",
      categoryLabel: "Website / Personal",
      tagline: "Your work, beautifully presented.",
      description:
        "A minimal, elegant portfolio website for a freelance photographer with project galleries, about section, and contact form.",
      challenge: "The photographer was sharing work via Instagram only and needed a professional website to attract higher-budget clients.",
      solution: "We designed a gallery-first portfolio with lazy-loaded high-res images, smooth animations, and a simple inquiry form.",
      features: [
        "Masonry gallery with lightbox viewer",
        "Smooth page transitions & animations",
        "Contact form with email notifications",
        "Optimized for fast image loading",
      ],
      tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Cloudinary"],
      outcome: "Client landed 3 new corporate photography contracts within 2 months.",
      icon: Layout,
      demoLink: "", // Add demo URL here
    },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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
            alt="Nexora Project Gallery"
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
            <SectionBadge icon={Briefcase} variant="primary">
              OUR WORK
            </SectionBadge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#3a302a] tracking-tight leading-[1.02] drop-shadow-sm">
              Projects we&apos;re <span className="italic text-[#c2652a] font-normal">proud of.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3a302a] max-w-2xl mx-auto font-sans leading-relaxed font-medium bg-[#faf5ee]/60 backdrop-blur-sm p-3 rounded-2xl border border-[#d8d0c8]/40">
              From our own products to client work — here&apos;s what we&apos;ve built. Each project is structured so you can see the problem, the solution, and the result.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FILTER BAR */}
      {/* ============================================================ */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${active
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
      {/* 3. PROJECTS GRID */}
      {/* ============================================================ */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-10">
          {filteredProjects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-3xl border shadow-warm-sm hover:shadow-warm-md transition-all overflow-hidden ${project.featured
                  ? "bg-[#faf5ee] border-[#c2652a]/30"
                  : "bg-[#faf5ee] border-[#d8d0c8]"
                  }`}
              >
                <div className="p-6 sm:p-8 md:p-10">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl border ${project.featured
                        ? "bg-[#fbe8d8] text-[#c2652a] border-[#f0a878]/40"
                        : "bg-[#f6f0e8] text-[#605850] border-[#d8d0c8]/60"
                        }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#3a302a]">
                          {project.title}
                        </h2>
                        <p className="text-xs font-mono text-[#8c827a] uppercase tracking-wider mt-0.5">
                          {project.categoryLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fbe8d8] text-[#c2652a] border border-[#f0a878]/30">
                          NEXORA PRODUCT
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-base sm:text-lg font-serif italic text-[#605850] mb-4">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#605850] leading-relaxed mb-6 max-w-3xl">
                    {project.description}
                  </p>

                  {/* Challenge → Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-5 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60">
                      <div className="text-xs font-bold text-[#c2652a] uppercase tracking-wider mb-2">
                        The Challenge
                      </div>
                      <p className="text-sm text-[#605850] leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-[#f6f0e8] border border-[#d8d0c8]/60">
                      <div className="text-xs font-bold text-[#c2652a] uppercase tracking-wider mb-2">
                        The Solution
                      </div>
                      <p className="text-sm text-[#605850] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Features + Tech + Outcome */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Key Features */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#3a302a] uppercase tracking-wider mb-2">
                        Key Features
                      </div>
                      {project.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-[#3a302a]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c2652a] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology */}
                    <div>
                      <div className="text-xs font-bold text-[#3a302a] uppercase tracking-wider mb-2">
                        Technology
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#f2ece4] border border-[#d8d0c8]/60 text-[#3a302a]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcome */}
                    <div>
                      <div className="text-xs font-bold text-[#3a302a] uppercase tracking-wider mb-2">
                        Outcome
                      </div>
                      <p className="text-sm text-[#605850] leading-relaxed">
                        {project.outcome}
                      </p>
                      {project.link && (
                        <Link
                          href={project.link}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#c2652a] hover:text-[#a8521e] mt-2 transition-colors"
                        >
                          <span>View Product</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      <a
                        href={project.demoLink || "#"}
                        target={project.demoLink ? "_blank" : undefined}
                        rel={project.demoLink ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#c2652a] hover:text-[#a8521e] mt-2 transition-colors"
                      >
                        <span>View Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#8c827a] text-sm">
              No projects in this category yet. Check back soon.
            </p>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 4. BOTTOM CTA */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#3a302a] text-[#faf5ee] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionBadge icon={Sparkles} variant="neutral">
            YOUR PROJECT NEXT
          </SectionBadge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Have an idea? <span className="italic text-[#f0a878]">Let&apos;s build it.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Whether you need a website, a web app, a SaaS product, or a growth strategy — we&apos;d love to hear about it. No commitment, just a conversation.
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
