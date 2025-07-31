import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const CustomButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r from-accent to-secondary 
        hover:from-secondary hover:to-accent  // Gradient reverses on hover
        text-white px-5 py-2 rounded font-semibold
        transition-all duration-300 ease-in-out
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default CustomButton;
