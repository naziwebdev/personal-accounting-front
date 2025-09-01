"use client";

import * as React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setIsVisible(true), 10); // trigger slide-down
  }, []);

  const handleClose = () => {
    setIsVisible(false); // trigger slide-up
  };

  // Wait for animation to finish before calling onClose
  React.useEffect(() => {
    if (!isVisible && isMounted) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, isMounted, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 bg-black/20 flex justify-center items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-[90%] h-auto p-4 xs:p-8 bg-white rounded-lg relative transform transition-transform transition-opacity duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-[200%] opacity-0"
        }`}
      >
        <span
          onClick={handleClose}
          className="absolute top-5 left-5 cursor-pointer text-xl"
        >
          ✕
        </span>
        <div className="mt-7">{children}</div>
      </div>
    </div>,
    document.body
  );
}
