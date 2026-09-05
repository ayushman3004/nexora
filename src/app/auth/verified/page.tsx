"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/login?verified=true");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
      {/* Background warm aesthetic ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c2652a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <Image
              src="/logo.png"
              alt="Nexora Logo"
              width={34}
              height={34}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-2xl tracking-tight text-[#3a302a] font-medium">
              NEXORA
            </span>
          </Link>
        </div>

        {/* Verification Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#d8d0c8]/70 shadow-warm-lg text-center space-y-6"
        >
          {/* Glowing Animated Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-3xl bg-[#fbe8d8] border border-[#f0a878]/50 flex items-center justify-center mx-auto text-[#c2652a] shadow-warm-sm"
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </motion.div>

          <div className="space-y-2">
            <div className="flex justify-center">
              <SectionBadge icon={ShieldCheck} variant="primary">
                VERIFICATION COMPLETE
              </SectionBadge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#3a302a] tracking-tight">
              Email Verified <span className="italic text-[#c2652a]">Successfully.</span>
            </h1>
            <p className="text-sm text-[#605850] font-sans leading-relaxed max-w-xs mx-auto pt-1">
              Your Nexora Client Portal account is authenticated and confirmed. You now have full access to your projects and milestones.
            </p>
          </div>

          {/* Countdown timer & Progress bar */}
          <div className="p-4 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-[#605850] font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c2652a]" />
                Redirecting to Sign In
              </span>
              <span className="font-bold text-[#c2652a]">{countdown}s</span>
            </div>

            {/* Visual animated bar */}
            <div className="w-full h-1.5 bg-[#d8d0c8]/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#c2652a] rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="/login?verified=true"
              className="w-full py-3.5 rounded-full bg-[#c2652a] hover:bg-[#a8521e] text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Sign In Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#605850] hover:text-[#3a302a] font-medium transition-colors"
          >
            ← Return to Nexora homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
