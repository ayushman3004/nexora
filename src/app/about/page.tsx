"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  ShieldCheck,
  Globe,
  Compass,
  Award,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Terminal,
  Layers,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function AboutPage() {
  const { openModal } = useModal();
  const [timezones, setTimezones] = useState({
    sf: "--:--",
    london: "--:--",
    zurich: "--:--",
    tokyo: "--:--",
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimezones({
        sf: now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit" }),
        london: now.toLocaleTimeString("en-US", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }),
        zurich: now.toLocaleTimeString("en-US", { timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit" }),
        tokyo: now.toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const team = [
    {
      name: "Ayushman",
      role: "Founder & Web Developer",
      discipline: "Full-Stack Web Development & Architecture",
      bio: "Full-stack developer and technical lead focused on building high-performance web applications, robust architectures, and intuitive digital experiences.",
      focus: ["Full-Stack Development", "Web Architecture", "Modern Frameworks"],
      initials: "A",
      image: "/images/team-ayushman.jpg",
      color: "from-[#fbe8d8] to-[#f0a878]",
    },
    {
      name: "Ritika",
      role: "Co-Founder, Web Developer & SEO Manager",
      discipline: "Web Development & Search Engine Optimization",
      bio: "Web developer and SEO strategist specializing in organic growth, technical SEO architecture, performance optimization, and data-driven user experiences.",
      focus: ["Web Development", "Technical SEO", "Organic Growth & CRO"],
      initials: "R",
      image: "/images/team-ritika.jpg",
      color: "from-[#f9ecea] to-[#f0a878]",
    },
  ];

  const hubs = [
    {
      city: "San Francisco",
      country: "United States",
      timezone: timezones.sf,
      zone: "PST (UTC-8)",
      focus: "Product Strategy & AI",
    },
    {
      city: "London",
      country: "United Kingdom",
      timezone: timezones.london,
      zone: "GMT (UTC+0)",
      focus: "Design Systems & Editorial",
    },
    {
      city: "Zurich",
      country: "Switzerland",
      timezone: timezones.zurich,
      zone: "CET (UTC+1)",
      focus: "Distributed Systems & Security",
    },
    {
      city: "Tokyo",
      country: "Japan",
      timezone: timezones.tokyo,
      zone: "JST (UTC+9)",
      focus: "Cloud Edge & Venture Ops",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. ABOUT HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#d8d0c8]/60">
        {/* Full-width Atmospheric Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-about.jpg"
            alt="GROVIX Studio Courtyard"
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
            <SectionBadge icon={Users} variant="primary">
              ABOUT GROVIX &bull; OUR ETHOS
            </SectionBadge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#3a302a] tracking-tight leading-[1.02] drop-shadow-sm">
              More Than a Partner. <br />
              <span className="italic text-[#c2652a] font-normal">We Are Your Internal Team.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3a302a] max-w-2xl mx-auto font-sans leading-relaxed font-medium bg-[#faf5ee]/60 backdrop-blur-sm p-3 rounded-2xl border border-[#d8d0c8]/40">
              We are a dedicated collective of product designers, full-stack engineers, and growth strategists united by craft, speed, and real business results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/start-project"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Meet the Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        {/* Studio Culture & Manifesto Visual Card */}
        <div className="mt-14 relative rounded-3xl bg-[#f6f0e8] border border-[#d8d0c8] p-6 sm:p-10 shadow-warm-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-[#c2652a] font-bold uppercase tracking-wider">
                STUDIO MANIFESTO
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif text-[#3a302a] leading-tight">
                Simplicity is not the absence of clutter; <br />
                <span className="italic text-[#c2652a]">it is the presence of intention.</span>
              </h3>
              <p className="text-sm text-[#605850] leading-relaxed">
                In an era overwhelmed by bloat, brittle code, and generic designs, GROVIX operates with deliberate restraint. We strip away superficial noise to uncover robust, enduring software that stands the test of scale.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-2">
                <div className="text-3xl font-serif font-bold text-[#c2652a]">100%</div>
                <div className="text-xs font-bold text-[#3a302a]">Founder-Led</div>
                <p className="text-[11px] text-[#605850]">Direct collaboration with Ayushman & Ritika</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-2">
                <div className="text-3xl font-serif font-bold text-[#3a302a]">0</div>
                <div className="text-xs font-bold text-[#3a302a]">Middlemen</div>
                <p className="text-[11px] text-[#605850]">Zero account managers or outsourced handoffs</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-2">
                <div className="text-3xl font-serif font-bold text-[#8c3c3c]">100%</div>
                <div className="text-xs font-bold text-[#3a302a]">In-House Craft</div>
                <p className="text-[11px] text-[#605850]">Every line of code & SEO tailored by us</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 space-y-2">
                <div className="text-3xl font-serif font-bold text-[#c2652a]">Fast</div>
                <div className="text-xs font-bold text-[#3a302a]">Sprint Velocity</div>
                <p className="text-[11px] text-[#605850]">Rapid turnaround from concept to production</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR PHILOSOPHY (2 PILLARS) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f2ece4] border-y border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <SectionBadge icon={Sparkles} variant="primary">
              DUAL FOUNDATIONS
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
              Our <span className="italic text-[#c2652a]">Philosophy.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#605850]">
              Every project we undertake is governed by two complementary tenets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fbe8d8] text-[#c2652a] flex items-center justify-center font-serif text-xl font-bold">
                  01
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#3a302a]">
                  Disciplined <span className="italic text-[#c2652a]">Minimalism</span>
                </h3>
                <p className="text-sm text-[#605850] leading-relaxed">
                  The art of restraint. We reject superfluous decorations and sensory overload. By focusing strictly on typography hierarchy, generous whitespace, and warm earthy tones, we create intuitive experiences with zero cognitive friction.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#d8d0c8]/60 text-xs text-[#3a302a]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                  <span>Intentional typography with EB Garamond & Manrope</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                  <span>Sun-baked warmth over sterile cold minimalism</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f2ece4] text-[#3a302a] flex items-center justify-center font-serif text-xl font-bold">
                  02
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#3a302a]">
                  Engineering <span className="italic text-[#c2652a]">Excellence</span>
                </h3>
                <p className="text-sm text-[#605850] leading-relaxed">
                  Robust, scalable code built for longevity. We write type-safe TypeScript, compile zero-copy Go routines, automate infrastructure with Terraform, and enforce strict test coverage so your software never breaks under pressure.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#d8d0c8]/60 text-xs text-[#3a302a]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                  <span>Modular microservices with sub-50ms latency guarantees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a]" />
                  <span>Continuous automated CI/CD and rigorous data protection postures</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THE MINDS BEHIND GROVIX (TEAM CARDS) */}
      {/* ============================================================ */}
      <section id="team" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <SectionBadge icon={Users} variant="neutral">
            LEADERSHIP & CRAFT
          </SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
            The Minds Behind <span className="italic text-[#c2652a]">GROVIX.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#605850]">
            Direct access to veteran leaders who write code, design systems, and execute strategy daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="group p-6 rounded-3xl bg-[#f6f0e8] border border-[#d8d0c8] shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Stylized Portrait Card with Hover Zoom */}
                <div className="relative aspect-square rounded-2xl border border-[#d8d0c8]/60 overflow-hidden bg-[#faf5ee] shadow-inner">
                  {member.image ? (
                    <>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        priority
                      />
                      {/* Gentle warm gradient vignette overlay for editorial feel */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a221b]/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                      {/* Floating discipline badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide bg-[#faf5ee]/95 backdrop-blur-md text-[#3a302a] border border-[#d8d0c8]/80 shadow-sm">
                          {member.discipline}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full p-6">
                      <div className="text-center space-y-3">
                        <div className="w-20 h-20 rounded-full bg-[#fbe8d8] text-[#c2652a] font-serif text-3xl font-bold flex items-center justify-center mx-auto shadow-warm-sm group-hover:scale-110 transition-transform duration-300">
                          {member.initials}
                        </div>
                        <div className="text-xs font-mono text-[#8c827a] tracking-wider">
                          {member.discipline}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-serif text-[#3a302a]">{member.name}</h3>
                  <div className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider mt-0.5">
                    {member.role}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#605850] leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="border-t border-[#d8d0c8]/60 pt-4 flex flex-wrap gap-1.5">
                {member.focus.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#faf5ee] border border-[#d8d0c8]/60 text-[#3a302a]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. GLOBAL REACH, LOCAL DEPTH (WORLD MAP & HUBS) */}
      {/* ============================================================ */}
      <section id="global" className="py-20 md:py-28 bg-[#f2ece4] border-t border-[#d8d0c8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <SectionBadge icon={Globe} variant="primary">
              GLOBAL AVAILABILITY
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a]">
              Global Reach, <span className="italic text-[#c2652a]">Remote Agility.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#605850]">
              Collaborating seamlessly with clients across international timezones with flexible, async-first workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub) => (
              <div
                key={hub.city}
                className="p-6 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/80 shadow-warm-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#c2652a]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{hub.country}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#c2652a] animate-pulse" />
                </div>

                <div>
                  <h4 className="text-2xl font-serif text-[#3a302a]">{hub.city}</h4>
                  <div className="text-xs text-[#8c827a] mt-0.5">{hub.focus}</div>
                </div>

                <div className="pt-3 border-t border-[#d8d0c8]/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#605850] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#c2652a]" />
                    {hub.timezone}
                  </span>
                  <span className="text-[#8c827a] text-[11px]">{hub.zone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#3a302a] text-[#faf5ee] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionBadge icon={Sparkles} variant="neutral">
            STUDIO ENGAGEMENT
          </SectionBadge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Let&apos;s build together with <span className="italic text-[#f0a878]">warm discipline.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Reach out to Ayushman or Ritika directly to discuss initiating a new product build, architecture audit, or growth sprint.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="px-8 py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition-all inline-flex items-center justify-center gap-2 mx-auto"
            >
              <span>Schedule Intro Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
