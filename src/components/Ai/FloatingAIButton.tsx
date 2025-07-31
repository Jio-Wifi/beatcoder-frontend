import React from "react";
import { RiRobot3Fill } from "react-icons/ri";

interface FloatingAIButtonProps {
  onClick: () => void;
}

const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open Gemini AI"
      className="fixed bottom-24 flex justify-center items-center  right-6 w-14 h-14 rounded-full shadow-lg z-50 text-2xl
        bg-accent text-dark hover:bg-secondary hover:text-light 
        dark:bg-secondary dark:text-light dark:hover:bg-accent
        transition-all duration-300"
    >
      <RiRobot3Fill size={28} />
    </button>
  );
};

export default FloatingAIButton;
