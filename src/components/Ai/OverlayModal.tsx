import React from "react";
import { motion } from "framer-motion";

interface OverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-transparent  p-6 text-dark dark:text-light"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-xl font-bold text-dark dark:text-light hover:text-danger transition"
        >
          ✕
        </button>

        {children}
      </motion.div>
    </div>
  );
};

export default OverlayModal;
