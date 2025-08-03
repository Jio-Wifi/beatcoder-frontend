import React from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal content */}
          <motion.div
            className={`relative bg-white dark:bg-dark text-dark dark:text-light mx-4 rounded-xl shadow-lg p-6 ${className}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            {/* Close Icon */}
            <button
              className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FiX size={22} />
            </button>

            {/* Title */}
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

            {/* Content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayModal;
