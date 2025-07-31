import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

interface CustomErrorProps {
  message: string | null;
}

const CustomError = ({ message }: CustomErrorProps) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 px-4 py-3 mb-4 text-danger bg-gradient-to-r from-danger/10 to-danger/20 border border-danger/30 rounded-lg shadow-sm"
    >
      <FiAlertTriangle className="text-danger text-lg" />
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

export default CustomError;
