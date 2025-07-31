import React from "react";

interface CustomHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const CustomHeading = ({ children, className = "" }: CustomHeadingProps) => (
  <h2 className={`text-2xl md:text-3xl font-bold mb-3 text-danger ${className}`}>
    {children}
  </h2>
);

export default CustomHeading;
