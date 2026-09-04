"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "inquiry" | "demo" | "case-study" | null;

interface ModalContextType {
  activeModal: ModalType;
  modalData?: unknown;
  openModal: (type: ModalType, data?: unknown) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<unknown>(null);

  const openModal = (type: ModalType, data?: unknown) => {
    setActiveModal(type);
    setModalData(data || null);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
    document.body.style.overflow = "unset";
  };

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
