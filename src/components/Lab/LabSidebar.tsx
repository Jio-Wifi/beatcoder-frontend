import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaPencilAlt,
  FaPaintBrush,
  FaProjectDiagram,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import CustomLink from "../Custom/CustomLink";

const LabSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const baseClass = "flex items-center gap-2 p-2 rounded transition";
  const textClass = "text-secondary dark:text-dime";
  const hoverClass = "hover:bg-light dark:hover:bg-secondary";
  const activeClass = "bg-light dark:bg-secondary font-semibold";

  return (
    <div>
      {/* 👨‍💻 Sidebar for desktop */}
      <aside className="w-full mt-8 ml-2 h-fit sm:w-64 bg-white dark:bg-primary text-white rounded-sm p-4 space-y-4 sm:block hidden">
        <h2 className="text-lg font-semibold mb-4 text-primary dark:text-accent">Tools</h2>
        <nav className="flex flex-col gap-2">
          <CustomLink
            to="/explore/sketch"
            className={`${baseClass} ${textClass} ${hoverClass} ${
              isActive("/explore/sketch") ? activeClass : ""
            }`}
          >
            <FaPencilAlt /> <span>Sketch</span>
          </CustomLink>
          <CustomLink
            to="/explore/draw"
            className={`${baseClass} ${textClass} ${hoverClass} ${
              isActive("/explore/draw") ? activeClass : ""
            }`}
          >
            <FaPaintBrush /> <span>Draw</span>
          </CustomLink>
          <CustomLink
            to="/explore/flow"
            className={`${baseClass} ${textClass} ${hoverClass} ${
              isActive("/explore/flow") ? activeClass : ""
            }`}
          >
            <FaProjectDiagram /> <span>Flow Diagram</span>
          </CustomLink>
        </nav>
      </aside>

      {/* 📱 Floating FAB menu on mobile */}
      <div className="fixed bottom-4 right-6 z-50 sm:hidden">
        {/* Toggle Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary dark:bg-accent text-white p-4 rounded-full shadow-lg text-xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Bottom-up expanding menu */}
        {isOpen && (
          <div className="flex flex-col items-end mb-2 space-y-2 animate-slide-up">
            <div onClick={() => setIsOpen(false)}>
              <CustomLink
                to="/explore/sketch"
                className="bg-white dark:bg-primary text-black dark:text-white px-4 py-2 rounded shadow flex items-center gap-2"
              >
                <FaPencilAlt /> Sketch
              </CustomLink>
            </div>
            <div onClick={() => setIsOpen(false)}>
              <CustomLink
                to="/explore/draw"
                className="bg-white dark:bg-primary text-black dark:text-white px-4 py-2 rounded shadow flex items-center gap-2"
              >
                <FaPaintBrush /> Draw
              </CustomLink>
            </div>
            {/* <div onClick={() => setIsOpen(false)}>
              <CustomLink
                to="/explore/flow"
                className="bg-white dark:bg-primary text-black dark:text-white px-4 py-2 rounded shadow flex items-center gap-2"
              >
                <FaProjectDiagram /> Flow
              </CustomLink>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabSidebar;
