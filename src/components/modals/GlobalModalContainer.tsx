"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { ProjectInquiryModal } from "./ProjectInquiryModal";
import { ServeQDemoModal } from "./ServeQDemoModal";
import { CaseStudyModal } from "./CaseStudyModal";

function InquiryQuerySync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openModal, activeModal } = useModal();

  useEffect(() => {
    if (searchParams.get("inquiry") === "true") {
      if (activeModal !== "inquiry") {
        openModal("inquiry");
      }
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("inquiry");
      const nextQuery = nextParams.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [searchParams, activeModal, openModal, router, pathname]);

  return null;
}

export function GlobalModalContainer() {
  const { activeModal, closeModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <>
      <Suspense fallback={null}>
        <InquiryQuerySync />
      </Suspense>
      <AnimatePresence>
        {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#3a302a]/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl md:max-w-3xl flex justify-center"
          >
            {activeModal === "inquiry" && <ProjectInquiryModal />}
            {activeModal === "demo" && <ServeQDemoModal />}
            {activeModal === "case-study" && <CaseStudyModal />}
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </>
  );
}
