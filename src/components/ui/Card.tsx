// src/components/ui/card.tsx
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div
      className={`rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-dark transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className = "", children }) => {
  return (
    <div className={`p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
};
