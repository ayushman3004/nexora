"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { ProjectInquiryModal } from "./ProjectInquiryModal";
import { ServeQDemoModal } from "./ServeQDemoModal";
import { CaseStudyModal } from "./CaseStudyModal";

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
  );
}
