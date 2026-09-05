"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Lightbulb, TrendingUp, Cpu, HelpCircle, Lock, ShieldCheck } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { createClient } from "@/lib/supabase/client";

export function ProjectInquiryModal() {
  const { closeModal } = useModal();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Authentication State
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [userProfile, setUserProfile] = useState<{ id: string; name?: string; email?: string; company?: string } | null>(null);

  // Form State
  const [service, setService] = useState<string>("build");
  const [projectType, setProjectType] = useState<string>("existing-business");
  const [budget, setBudget] = useState<string>("₹15,000 – ₹50,000 (15k – 50k)");
  const [timeline, setTimeline] = useState<string>("1 – 3 Months");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          if (isMounted) setAuthStatus("unauthenticated");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (isMounted) {
          const profileData = {
            id: user.id,
            name: profile?.name || user.user_metadata?.name || "",
            email: user.email || "",
            company: profile?.company || user.user_metadata?.company || "",
          };
          setUserProfile(profileData);
          setFormData(prev => ({
            ...prev,
            name: profileData.name || prev.name,
            email: profileData.email || prev.email,
            company: profileData.company || prev.company,
          }));
          setAuthStatus("authenticated");
        }
      } catch (err) {
        console.error("Auth check failed in ProjectInquiryModal:", err);
        if (isMounted) setAuthStatus("unauthenticated");
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const services = [
    {
      id: "build",
      title: "Build",
      desc: "Website, software, SaaS, AI, mobile app",
      icon: Cpu,
    },
    {
      id: "grow",
      title: "Grow",
      desc: "SEO, marketing, conversion, digital growth",
      icon: TrendingUp,
    },
    {
      id: "product",
      title: "Product",
      desc: "Build or validate a new product idea",
      icon: Lightbulb,
    },
    {
      id: "not-sure",
      title: "Not sure yet",
      desc: "Tell us what you're trying to achieve",
      icon: HelpCircle,
    },
  ];

  const projectTypes = [
    { id: "existing-business", label: "Existing Business", desc: "Upgrade or build for your current business" },
    { id: "new-business", label: "New Business", desc: "Getting started and need a digital presence" },
    { id: "startup-saas", label: "Startup / SaaS", desc: "Building a product or software platform" },
    { id: "internal-tool", label: "Internal Tool", desc: "Internal dashboard, workflow, or automation" },
    { id: "personal", label: "Personal Project", desc: "Portfolio, blog, or personal brand" },
    { id: "other", label: "Other", desc: "Something else entirely" },
  ];

  const budgetTiers = [
    {
      label: "Starter",
      amount: "₹10,000 – ₹30,000",
      short: "10k – 30k",
      range: "₹10,000 – ₹30,000 (10k – 30k)",
      desc: "Landing page, simple website, or quick turnaround",
    },
    {
      label: "Growth",
      amount: "₹15,000 – ₹50,000",
      short: "15k – 50k",
      range: "₹15,000 – ₹50,000 (15k – 50k)",
      desc: "Custom website, SEO setup, or business web app",
    },
    {
      label: "Scale",
      amount: "₹50,000 – ₹1,00,000",
      short: "50k – 100k",
      range: "₹50,000 – ₹1,00,000 (50k – 100k)",
      desc: "Full product build, SaaS MVP, or custom web platform",
    },
    {
      label: "Custom / Enterprise",
      amount: "₹1,00,000+",
      short: "100k+",
      range: "₹1,00,000+ (100k+)",
      desc: "Complex systems, ongoing partnership, or enterprise",
    },
  ];

  const timelineOptions = ["ASAP (< 2 Weeks)", "1 – 3 Months", "3 – 6 Months", "Flexible / Ongoing"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          details: formData.details,
          service,
          projectType,
          budget,
          timeline,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setAuthStatus("unauthenticated");
          return;
        }
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authStatus === "loading") {
    return (
      <div className="relative w-full max-w-lg bg-[#faf5ee] border border-[#d8d0c8]/70 rounded-3xl shadow-warm-lg p-10 flex flex-col items-center justify-center text-center">
        <div className="w-9 h-9 border-3 border-[#c2652a] border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="text-base font-serif text-[#3a302a]">Verifying client session...</h3>
        <p className="text-xs text-[#8c827a] mt-1">Connecting to GROVIX Client Portal</p>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <div className="relative w-full max-w-lg bg-[#faf5ee] border border-[#d8d0c8]/70 rounded-3xl shadow-warm-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#d8d0c8]/50 flex items-center justify-between bg-[#f6f0e8]/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#fbe8d8] text-[#c2652a]">
              <Lock className="w-3 h-3" />
              AUTHENTICATION REQUIRED
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full text-[#605850] hover:text-[#3a302a] hover:bg-[#ece6dc] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Locked Body */}
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#fbe8d8] text-[#c2652a] flex items-center justify-center mx-auto shadow-warm-sm border border-[#c2652a]/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#3a302a]">
              Sign in to start your <span className="italic text-[#c2652a]">project.</span>
            </h3>
            <p className="text-sm text-[#605850] max-w-sm mx-auto leading-relaxed">
              This page cannot be accessed until you are logged in. Please sign into your GROVIX Client Portal account or register below to submit a project brief and track development milestones.
            </p>
          </div>

          <div className="bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-2xl p-4 text-xs text-[#605850] text-left space-y-2 max-w-sm mx-auto">
            <div className="flex items-center gap-2 font-semibold text-[#3a302a]">
              <Sparkles className="w-3.5 h-3.5 text-[#c2652a]" />
              <span>Client Portal Membership Includes:</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#605850] pl-5 list-disc">
              <li>Direct engineering roadmap & architecture scoping</li>
              <li>Milestone changelogs & live staging preview links</li>
              <li>Transparent budget estimation in Indian Rupees (INR)</li>
            </ul>
          </div>

          <div className="space-y-2.5 pt-2 max-w-sm mx-auto">
            <Link
              href="/login?redirectTo=/?inquiry=true"
              onClick={closeModal}
              className="w-full py-3 px-5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm shadow-warm-sm hover:shadow-warm-md transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register?redirectTo=/?inquiry=true"
              onClick={closeModal}
              className="w-full py-3 px-5 rounded-full bg-white/80 hover:bg-white text-[#3a302a] font-semibold text-sm border border-[#d8d0c8] shadow-warm-xs transition-all flex items-center justify-center"
            >
              Create Client Account
            </Link>
          </div>

          <p className="text-[11px] text-[#8c827a]">
            Free consultation • No upfront commitment required
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl bg-[#faf5ee] border border-[#d8d0c8]/60 rounded-2xl shadow-warm-lg overflow-hidden flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-[#d8d0c8]/50 flex items-start justify-between bg-[#f6f0e8]/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#fbe8d8] text-[#c2652a]">
              <Sparkles className="w-3 h-3" />
              START A PROJECT
            </span>
            <span className="text-xs text-[#8c827a]">Step {step} of 3</span>
            {userProfile && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#605850] bg-[#ece6dc] px-2.5 py-0.5 rounded-full border border-[#d8d0c8]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate max-w-[150px]">{userProfile.email}</span>
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-[#3a302a]">
            Tell us about your <span className="italic text-[#c2652a]">project.</span>
          </h2>
        </div>
        <button
          onClick={closeModal}
          className="p-2 rounded-full text-[#605850] hover:text-[#3a302a] hover:bg-[#ece6dc] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-[#ece6dc] h-1">
        <motion.div
          className="h-full bg-[#c2652a]"
          initial={{ width: "33%" }}
          animate={{ width: isSuccess ? "100%" : `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 overflow-y-auto flex-1">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#fbe8d8] text-[#c2652a] flex items-center justify-center mx-auto mb-6 shadow-warm-sm">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif text-[#3a302a] mb-3">
              We&apos;ll be in <span className="italic text-[#c2652a]">touch.</span>
            </h3>
            <p className="text-[#605850] max-w-md mx-auto mb-8 leading-relaxed">
              Thanks{formData.name ? `, ${formData.name}` : ""}! We&apos;ve received your project details and will get back to you within 24 hours with next steps.
            </p>
            <div className="bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-xl p-4 max-w-md mx-auto text-left mb-8">
              <div className="text-xs font-semibold text-[#8c827a] uppercase tracking-wider mb-2">Project Summary</div>
              <div className="text-sm text-[#3a302a] flex justify-between py-1 border-b border-[#d8d0c8]/40">
                <span>Service:</span>
                <span className="font-medium text-[#c2652a] capitalize">{service === "not-sure" ? "To be discussed" : service}</span>
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-1 border-b border-[#d8d0c8]/40">
                <span>Project Type:</span>
                <span className="font-medium capitalize">{projectTypes.find(p => p.id === projectType)?.label}</span>
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-1 border-b border-[#d8d0c8]/40">
                <span>Budget:</span>
                <span className="font-medium">{budget}</span>
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-1">
                <span>Timeline:</span>
                <span className="font-medium">{timeline}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                onClick={closeModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-medium transition-all shadow-warm-sm hover:shadow-warm-md flex items-center justify-center gap-2"
              >
                <span>Track in Client Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={closeModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#ece6dc] hover:bg-[#d8d0c8] text-[#3a302a] font-medium transition-all"
              >
                Back to Website
              </button>
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Step 1: What can we help with? */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((item) => {
                      const Icon = item.icon;
                      const isSelected = service === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setService(item.id)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border ${
                            isSelected
                              ? "bg-[#fbe8d8]/50 border-[#c2652a] shadow-warm-sm"
                              : "bg-[#f6f0e8] border-[#d8d0c8]/60 hover:border-[#c2652a]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-lg ${isSelected ? "bg-[#c2652a] text-white" : "bg-[#ece6dc] text-[#605850]"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-[#c2652a] bg-[#c2652a] text-white" : "border-[#d8d0c8]"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                          <h4 className="font-semibold text-[#3a302a] text-sm">{item.title}</h4>
                          <p className="text-xs text-[#605850] mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-2.5">
                    What best describes your situation?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setProjectType(type.id)}
                        className={`p-3 rounded-xl text-left text-xs transition-all border ${
                          projectType === type.id
                            ? "bg-[#fbe8d8]/50 border-[#c2652a] shadow-warm-sm"
                            : "bg-[#f6f0e8] border-[#d8d0c8]/60 hover:border-[#c2652a]/50"
                        }`}
                      >
                        <div className="font-semibold text-[#3a302a] mb-0.5">{type.label}</div>
                        <div className="text-[10px] text-[#605850]">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-3">
                    What&apos;s your estimated budget?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {budgetTiers.map((tier) => {
                      const isSelected = budget === tier.range;
                      return (
                        <div
                          key={tier.label}
                          onClick={() => setBudget(tier.range)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border ${
                            isSelected
                              ? "bg-[#fbe8d8]/50 border-[#c2652a] shadow-warm-sm"
                              : "bg-[#f6f0e8] border-[#d8d0c8]/60 hover:border-[#c2652a]/50"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider">{tier.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#c2652a]" />}
                          </div>
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="text-base font-bold text-[#3a302a]">{tier.amount}</div>
                            <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                              isSelected
                                ? "bg-[#c2652a]/10 text-[#c2652a] border-[#c2652a]/30"
                                : "bg-[#f2ece4] text-[#8c827a] border-[#d8d0c8]/60"
                            }`}>
                              {tier.short}
                            </span>
                          </div>
                          <div className="text-xs text-[#605850] mt-1.5">{tier.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-2.5">
                    When do you need this done?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelineOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTimeline(item)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all ${
                          timeline === item
                            ? "bg-[#c2652a] text-white shadow-warm-sm font-semibold"
                            : "bg-[#f6f0e8] text-[#605850] border border-[#d8d0c8]/60 hover:bg-[#ece6dc]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact & Project Brief */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ayushman"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider">
                        Email *
                      </label>
                      <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Portal Verified
                      </span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                    Company / Business Name (optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. My Startup"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                    Tell us about your project
                  </label>
                  <textarea
                    name="details"
                    rows={3}
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="What are you trying to build or achieve? What problem are you solving?"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#ffffff] border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a] resize-none"
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {!isSuccess && (
        <div className="p-4 md:p-6 border-t border-[#d8d0c8]/50 bg-[#f6f0e8]/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-full border border-[#d8d0c8] text-sm font-medium text-[#605850] hover:bg-[#ece6dc] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div className="text-xs text-[#8c827a]">
              No commitment &bull; Free consultation
            </div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold flex items-center gap-2 shadow-warm-sm transition-all"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-7 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold flex items-center gap-2 shadow-warm-sm hover:shadow-warm-md transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
