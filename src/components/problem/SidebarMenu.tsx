import { useState } from "react";
import { FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
import { FiBookOpen, FiStar, FiList } from "react-icons/fi";
import CustomSidebar, { type SidebarItem } from "../Custom/CustomSidebar";

const menuItems: SidebarItem[] = [
  { to: "/problemset", label: "Library", icon: <FiBookOpen /> },
  { to: "/study-plan", label: "Study Plan", icon: <FiList /> },
  { to: "/favorites", label: "Favorites", icon: <FiStar /> },
];

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button - visible on mobile & tablet only */}
      <button
        className="md:hidden fixed top-16 left-2 z-50 text-2xl text-primary dark:text-accent bg-white dark:bg-dark p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaAnglesDown /> : <FaAnglesRight />}
      </button>

      {/* Sidebar */}
      <CustomSidebar isOpen={isOpen} setIsOpen={setIsOpen} items={menuItems} />
    </div>
  );
};

export default SidebarMenu;
