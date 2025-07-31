// components/common/AnimatedCard.tsx
import { motion } from "framer-motion";
import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard = ({ children, className = "" }: AnimatedCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-md p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
