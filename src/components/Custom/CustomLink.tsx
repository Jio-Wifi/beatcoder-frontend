import React from "react";
import { Link } from "react-router-dom";

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink = ({ to, children, className = "" }: CustomLinkProps) => {
  return (
    <Link
      to={to}
      className={`text-sm text-accent no-underline hover:text-success transition ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
