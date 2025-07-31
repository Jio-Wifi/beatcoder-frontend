import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {  FiChevronDown, FiChevronRight } from "react-icons/fi"; // Two chevrons

interface DropdownMenuProps {
  name: string;
  icon: React.ReactNode;
  links: { name: string; to: string; icon?: React.ReactNode }[];
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ name, icon, links, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
      {/* Main Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 rounded-md text-sm font-medium text-secondary dark:text-dime hover:bg-light dark:hover:text-primary transition"
      >
        <span className="flex items-center gap-2">
          {icon}
          {name}
        </span>
        {/* Show Left Arrow (collapsed) OR Down Arrow (open) */}
        {isOpen ? (
          <FiChevronDown size={18} className="text-gray-500 transition-all" />
        ) : (
          <FiChevronRight size={18} className="text-gray-500 transition-all" />
        )}
      </button>

      {/* Dropdown Links */}
      {isOpen && (
        <div className="ml-6 mt-2 space-y-2">
          {links.map(({ name, to, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-2 p-2 rounded-md text-sm transition-all
                ${
                  location.pathname === to
                    ? "bg-accent text-primary"
                    : "text-secondary dark:text-dime hover:bg-light dark:hover:text-primary"
                }`}
            >
              {icon && <span className="text-lg">{icon}</span>}
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
