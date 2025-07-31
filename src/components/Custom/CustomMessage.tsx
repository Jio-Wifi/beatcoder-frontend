import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiInfo, FiAlertCircle, FiXCircle } from "react-icons/fi";

interface Props {
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose?: () => void; // Callback when message closes
  autoHideDuration?: number; // Optional, defaults to 5000ms
}

const typeStyles = {
  success: {
    icon: <FiCheckCircle />,
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
  },
  error: {
    icon: <FiXCircle />,
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
  },
  info: {
    icon: <FiInfo />,
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  warning: {
    icon: <FiAlertCircle />,
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
};

const CustomMessage: React.FC<Props> = ({ 
  type, 
  message, 
  onClose, 
  autoHideDuration = 5000 
}) => {
  const [visible, setVisible] = useState(true);
  const { icon, bg, text, border } = typeStyles[type];

  // Auto-hide after given duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`flex items-start justify-center gap-3 p-4 rounded-lg border shadow-sm max-w-md relative ${bg} ${text} ${border}`}
    >
      <div className="text-xl mt-0.5">{icon}</div>
      <div className="flex-1 text-sm">{message}</div>

      {/* Manual close button */}
      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="text-lg hover:opacity-70 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default CustomMessage;
