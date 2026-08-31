"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, Calendar, Clock, ShieldCheck, Zap, Server, BarChart3, ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export function ServeQDemoModal() {
  const { closeModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState("Enterprise (50+ Seats)");
  const [selectedSlot, setSelectedSlot] = useState("Tomorrow at 10:00 AM EST");
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "20-50 engineers",
  });

  const slots = [
    "Tomorrow, 10:00 AM EST",
    "Tomorrow, 2:00 PM EST",
    "Wednesday, 11:30 AM EST",
    "Thursday, 3:00 PM EST",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full max-w-2xl bg-[#faf5ee] border border-[#d8d0c8]/60 rounded-2xl shadow-warm-lg overflow-hidden flex flex-col max-h-[90vh]">
      {/* Modal Header */}
      <div className="p-6 md:p-8 border-b border-[#d8d0c8]/50 flex items-start justify-between bg-[#f6f0e8]/90">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#fbe8d8] text-[#c2652a]">
              <Zap className="w-3 h-3" />
              SERVEQ PLATFORM DEMO
            </span>
            <span className="text-xs text-[#8c827a]">Interactive Walkthrough</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#3a302a]">
            Experience <span className="italic text-[#c2652a]">ServeQ</span> live.
          </h2>
          <p className="text-xs md:text-sm text-[#605850] mt-1">
            See how internal ticketing, automated routing, and SLA compliance streamline operations.
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

      {/* Body Content */}
      <div className="p-6 md:p-8 overflow-y-auto flex-1">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#fbe8d8] text-[#c2652a] flex items-center justify-center mx-auto mb-4 shadow-warm-sm">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-[#3a302a] mb-2">
              Demo Reserved for <span className="italic text-[#c2652a]">{demoForm.name || "You"}</span>
            </h3>
            <p className="text-[#605850] text-sm max-w-md mx-auto mb-6">
              A calendar invite with dedicated sandbox credentials and video conference link has been sent to <strong className="text-[#3a302a]">{demoForm.email || "your email"}</strong>.
            </p>

            <div className="bg-[#f6f0e8] border border-[#d8d0c8]/60 rounded-xl p-4 max-w-md mx-auto text-left mb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#c2652a] font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                Session Details
              </div>
              <div className="text-sm font-medium text-[#3a302a] flex items-center justify-between">
                <span>Selected Time:</span>
                <span className="text-[#c2652a] font-semibold">{selectedSlot}</span>
              </div>
              <div className="text-sm font-medium text-[#3a302a] flex items-center justify-between">
                <span>Platform Tier:</span>
                <span>{selectedTier}</span>
              </div>
              <div className="text-xs text-[#8c827a] pt-1 border-t border-[#d8d0c8]/40 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Dedicated solutions architect assigned
              </div>
            </div>

            <button
              onClick={closeModal}
              className="px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-sm font-medium transition-all shadow-warm-sm"
            >
              Done & Return
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Feature Highlights Pill Bar */}
            <div className="grid grid-cols-3 gap-2 bg-[#f2ece4] p-3 rounded-xl border border-[#d8d0c8]/60 text-center">
              <div className="flex flex-col items-center">
                <Server className="w-4 h-4 text-[#c2652a] mb-1" />
                <span className="text-xs font-semibold text-[#3a302a]">Sub-100ms Latency</span>
                <span className="text-[10px] text-[#8c827a]">Global Edge Engine</span>
              </div>
              <div className="flex flex-col items-center border-x border-[#d8d0c8]/60">
                <BarChart3 className="w-4 h-4 text-[#c2652a] mb-1" />
                <span className="text-xs font-semibold text-[#3a302a]">Live SLA Telemetry</span>
                <span className="text-[10px] text-[#8c827a]">Automated Alerts</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#c2652a] mb-1" />
                <span className="text-xs font-semibold text-[#3a302a]">SOC2 & HIPAA</span>
                <span className="text-[10px] text-[#8c827a]">Ready Architecture</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a] focus:outline-none focus:border-[#c2652a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@studio.com"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a] focus:outline-none focus:border-[#c2652a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Acme Global"
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a] focus:outline-none focus:border-[#c2652a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-1.5">
                  Engineering / Support Team Size
                </label>
                <select
                  value={demoForm.teamSize}
                  onChange={(e) => setDemoForm({ ...demoForm, teamSize: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8d0c8] text-sm text-[#3a302a] focus:outline-none focus:border-[#c2652a]"
                >
                  <option value="1-10">1 – 10 Team Members</option>
                  <option value="10-50">10 – 50 Team Members</option>
                  <option value="50-200">50 – 200 Team Members</option>
                  <option value="200+">200+ Enterprise</option>
                </select>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-semibold text-[#3a302a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c2652a]" />
                Select Preferred Demo Time Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {slots.map((slot) => (
                  <div
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                      selectedSlot === slot
                        ? "bg-[#fbe8d8]/60 border-[#c2652a] text-[#3a302a] font-semibold shadow-warm-sm"
                        : "bg-[#f6f0e8] border-[#d8d0c8]/60 text-[#605850] hover:border-[#c2652a]/40"
                    }`}
                  >
                    <span>{slot}</span>
                    {selectedSlot === slot && <Check className="w-3.5 h-3.5 text-[#c2652a]" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-full border border-[#d8d0c8] text-xs font-medium text-[#605850] hover:bg-[#ece6dc] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white text-xs font-semibold flex items-center gap-1.5 shadow-warm-sm hover:shadow-warm-md transition-all"
              >
                <span>Confirm Demo Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
