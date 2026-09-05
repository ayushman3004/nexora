"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Sparkles, Lightbulb, TrendingUp, Cpu, HelpCircle, ShieldCheck } from "lucide-react";

interface ProjectInquiryFormProps {
  userProfile?: {
    id: string;
    name?: string;
    email?: string;
    company?: string;
  };
  onSuccess?: () => void;
}

export function ProjectInquiryForm({ userProfile, onSuccess }: ProjectInquiryFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [service, setService] = useState<string>("build");
  const [projectType, setProjectType] = useState<string>("existing-business");
  const [budget, setBudget] = useState<string>("₹15,000 – ₹50,000 (15k – 50k)");
  const [timeline, setTimeline] = useState<string>("1 – 3 Months");
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    company: userProfile?.company || "",
    details: "",
  });

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
      await fetch("/api/inquiry", {
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
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Bar */}
      <div className="p-6 md:p-8 border-b border-[#d8d0c8]/50 flex items-center justify-between bg-[#f6f0e8]/80">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#fbe8d8] text-[#c2652a]">
            <Sparkles className="w-3.5 h-3.5" />
            STEP {step} OF 3
          </span>
          <span className="text-sm font-serif text-[#3a302a]">
            {step === 1 && "Select Service & Platform Type"}
            {step === 2 && "Estimated Budget & Delivery Timeline"}
            {step === 3 && "Client Contact & Project Brief"}
          </span>
        </div>

        {userProfile?.email && (
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#605850] bg-[#ece6dc] px-3 py-1 rounded-full border border-[#d8d0c8]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[200px]">{userProfile.email}</span>
          </span>
        )}
      </div>

      {/* Progress Line */}
      <div className="w-full bg-[#ece6dc] h-1.5">
        <motion.div
          className="h-full bg-[#c2652a]"
          initial={{ width: "33%" }}
          animate={{ width: isSuccess ? "100%" : `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-10">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-[#fbe8d8] text-[#c2652a] flex items-center justify-center mx-auto mb-6 shadow-warm-sm border border-[#c2652a]/20">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#3a302a] mb-3">
              We&apos;ll be in <span className="italic text-[#c2652a]">touch.</span>
            </h3>
            <p className="text-[#605850] max-w-md mx-auto mb-8 leading-relaxed text-sm sm:text-base">
              Thanks{formData.name ? `, ${formData.name}` : ""}! We&apos;ve received your project details and will get back to you within 24 hours with scoping and timeline milestones.
            </p>

            <div className="bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-2xl p-6 max-w-md mx-auto text-left mb-8 shadow-warm-xs">
              <div className="text-xs font-semibold text-[#8c827a] uppercase tracking-wider mb-3">
                Submitted Brief Summary
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-2 border-b border-[#d8d0c8]/40">
                <span>Service:</span>
                <span className="font-medium text-[#c2652a] capitalize">{service === "not-sure" ? "To be discussed" : service}</span>
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-2 border-b border-[#d8d0c8]/40">
                <span>Project Type:</span>
                <span className="font-medium capitalize">{projectTypes.find(p => p.id === projectType)?.label}</span>
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-2 border-b border-[#d8d0c8]/40">
                <span>Budget Tier:</span>
                <span className="font-medium">{budget}</span>
              </div>
              <div className="text-sm text-[#3a302a] flex justify-between py-2">
                <span>Timeline:</span>
                <span className="font-medium">{timeline}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm shadow-warm-sm hover:shadow-warm-md transition-all flex items-center justify-center gap-2"
              >
                <span>Track in Client Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#ece6dc] hover:bg-[#d8d0c8] text-[#3a302a] font-semibold text-sm transition-all text-center"
              >
                Return to Website
              </Link>
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
                className="space-y-8"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((item) => {
                      const Icon = item.icon;
                      const isSelected = service === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setService(item.id)}
                          className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                            isSelected
                              ? "bg-[#fbe8d8]/50 border-[#c2652a] shadow-warm-sm ring-1 ring-[#c2652a]"
                              : "bg-[#f6f0e8] border-[#d8d0c8]/60 hover:border-[#c2652a]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#c2652a] text-white" : "bg-[#ece6dc] text-[#605850]"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-[#c2652a] bg-[#c2652a] text-white" : "border-[#d8d0c8]"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <h4 className="font-semibold text-[#3a302a] text-base">{item.title}</h4>
                          <p className="text-xs text-[#605850] mt-1.5 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-3">
                    What best describes your situation?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setProjectType(type.id)}
                        className={`p-4 rounded-2xl text-left text-xs transition-all border ${
                          projectType === type.id
                            ? "bg-[#fbe8d8]/50 border-[#c2652a] shadow-warm-sm ring-1 ring-[#c2652a]"
                            : "bg-[#f6f0e8] border-[#d8d0c8]/60 hover:border-[#c2652a]/50"
                        }`}
                      >
                        <div className="font-semibold text-[#3a302a] text-sm mb-1">{type.label}</div>
                        <div className="text-[11px] text-[#605850] leading-snug">{type.desc}</div>
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
                className="space-y-8"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-3">
                    What&apos;s your estimated budget?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {budgetTiers.map((tier) => {
                      const isSelected = budget === tier.range;
                      return (
                        <div
                          key={tier.label}
                          onClick={() => setBudget(tier.range)}
                          className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                            isSelected
                              ? "bg-[#fbe8d8]/50 border-[#c2652a] shadow-warm-sm ring-1 ring-[#c2652a]"
                              : "bg-[#f6f0e8] border-[#d8d0c8]/60 hover:border-[#c2652a]/50"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-semibold text-[#c2652a] uppercase tracking-wider">{tier.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#c2652a]" />}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-lg font-bold text-[#3a302a]">{tier.amount}</div>
                            <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                              isSelected
                                ? "bg-[#c2652a]/10 text-[#c2652a] border-[#c2652a]/30"
                                : "bg-[#f2ece4] text-[#8c827a] border-[#d8d0c8]/60"
                            }`}>
                              {tier.short}
                            </span>
                          </div>
                          <div className="text-xs text-[#605850] mt-2">{tier.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a302a] mb-3">
                    When do you need this done?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timelineOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTimeline(item)}
                        className={`p-3.5 rounded-2xl text-xs font-medium text-center transition-all ${
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
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ayushman"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider">
                        Email *
                      </label>
                      <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Portal Account Verified
                      </span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-2">
                    Company / Business Name (optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. My Startup"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="What are you trying to build or achieve? What problem are you solving?"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#d8d0c8] text-[#3a302a] placeholder-[#8c827a] text-sm focus:outline-none focus:border-[#c2652a] focus:ring-1 focus:ring-[#c2652a] resize-none"
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {!isSuccess && (
        <div className="p-6 md:p-8 border-t border-[#d8d0c8]/50 bg-[#f6f0e8]/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-full border border-[#d8d0c8] text-sm font-medium text-[#605850] hover:bg-[#ece6dc] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-xs text-[#8c827a] font-mono">
              Free scoping consultation
            </span>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold shadow-warm-sm hover:shadow-warm-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email}
              className="px-7 py-3 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-semibold shadow-warm-sm hover:shadow-warm-md flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Submitting Brief..." : "Submit Project Brief"}</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectInquiryForm;

