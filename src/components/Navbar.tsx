import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdOutlineExplore,
  MdArrowDropDown,
  MdDashboard,
} from "react-icons/md";
import { PiClipboardTextFill } from "react-icons/pi";
import { FcAbout } from "react-icons/fc";
import { TbPremiumRights } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/auth/useAuth";
import { FaBookOpen } from "react-icons/fa";
import { DiVisualstudio } from "react-icons/di";
import { TbBinaryTree } from "react-icons/tb";
import { FaPenNib } from "react-icons/fa6";

const NAV_ITEMS = [
  { name: "Home", to: "/", icon: <MdHome size={22} color="orange" /> },
  { name: "Problems", to: "/problemset", icon: <PiClipboardTextFill size={22} color="green" /> },
  { name: "Breif", to: "/breif", icon: <FcAbout size={22} /> },
  {
    name: "PREMIUM",
    to: "/subscribe",
    icon: <TbPremiumRights size={22} color="yellow" />,
    extraClass: "text-success font-semibold animate-pulse",
  },
];

export const Logo = () => (
  <Link to="/" className="flex flex-col w-fit items-center">
    <img
      className="w-4 md:w-7"
      src="https://img.icons8.com/?size=100&id=63765&format=png&color=000000"
      alt="logo"
    />
    <h1 className="text-base md:text-xl">
      <span className="text-light">Beat</span>
      <span className="text-danger">Coder</span>
    </h1>
  </Link>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowDropdown(false);
    setShowExploreDropdown(false);
    setToggleMenu(false);
  }, [location.pathname]);

  const renderAuthSection = () =>
    user ? (
      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center gap-1 font-semibold text-sm md:text-base text-success"
        >
          <span>👋 {user.name.split(" ")[0]}</span>
          <MdArrowDropDown size={20} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-black dark:text-white"
              >
                <MdDashboard size={16} />
                Dashboard
              </Link>
            )}
            {user.role === "user" && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-black dark:text-white"
                >
                  <MdDashboard size={16} />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-black dark:text-white"
                >
                  <FaUser size={16} />
                  Profile
                </Link>
              </>
            )}
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-800 text-sm text-red-600 dark:text-red-400"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link
        to="/account/signin"
        className="cursor-pointer text-base text-secondary dark:text-accent relative after:block after:h-[2px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left"
      >
        Sign in
      </Link>
    );

  const renderNavLinks = (isMobile = false) =>
    NAV_ITEMS.map(({ name, to, icon, extraClass }) => {
      const isActive = location.pathname === to;
      return (
        <li key={name} className={`${isMobile ? "flex items-center space-x-2" : ""}`}>
          {isMobile && <span>{icon}</span>}
          <Link
            to={to}
            className={`${
              isActive
                ? "text-danger font-bold"
                : "relative after:block after:h-[2px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left"
            } ${extraClass || ""}`}
          >
            {name}
          </Link>
        </li>
      );
    });

  return (
    <div className="bg-white dark:bg-primary z-50">
      {/* ✅ Desktop Navbar */}
      <div className="max-w-container hidden mx-auto text-secondary dark:text-accent text-base md:flex items-center justify-between py-2">
        <Logo />
        <ul className="flex space-x-7 items-center">
          {/* Explore Dropdown */}
          <li className="relative">
            <button
              onClick={() => setShowExploreDropdown((prev) => !prev)}
              className="flex items-center gap-1 text-base font-medium bg-dime dark:bg-dark p-2 rounded-md "
            >
              <MdOutlineExplore size={22} />
              Explore
              <MdArrowDropDown />
            </button>
            {showExploreDropdown && (
              <ul className="absolute mt-2 flex flex-col gap-2 z-55 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-40 min-w-[150px]">
                {[
                  { name: "Courses", to: "/explore/courses",  icon: <FaBookOpen size={22} /> },
                  { name: "Compiler", to: "/explore/compiler",  icon: <DiVisualstudio size={22} /> },
                  { name: "Lab Visual", to: "/explore/sketch",  icon: <FaPenNib size={22} />},
                  { name: "Visualizer", to: "https://dsa-visualize.netlify.app/",  icon: <TbBinaryTree size={22} />, target: "_blank" },
                ].map(({ name, to,icon,target }) => (
                  <li key={name}>
                    <Link
                      to={to}
                      target={target}
                      className="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-secondary dark:text-accent"
                    >
                      {icon}
                      {name}
                      
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {renderNavLinks()}
        </ul>
        <div className="flex space-x-6 items-center">
          <ThemeToggle />
          {renderAuthSection()}
        </div>
      </div>

      {/* ✅ Mobile Navbar */}
      <div className="md:hidden flex bg-white dark:bg-primary justify-between items-center px-4 py-2 relative z-50">
        <div
          className="flex flex-col space-y-1 cursor-pointer"
          onClick={() => setToggleMenu((prev) => !prev)}
        >
          {[...Array(3)].map((_, i) => (
            <small key={i} className="w-6 h-[3px] bg-primary dark:bg-accent rounded-sm" />
          ))}
        </div>
        <Logo />
        <div className="flex space-x-2 items-center">
          <ThemeToggle />
          {renderAuthSection()}
        </div>
      </div>

      {/* ✅ Fade Overlay */}
      <div
        onClick={() => setToggleMenu(false)}
        className={`fixed inset-0 bg-black/40 md:hidden backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${
          toggleMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-[56px] left-0 h-screen w-[80vw] md:hidden max-w-xs bg-white dark:bg-primary opacity-95 z-50 transform transition-transform duration-500 ease-in-out ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col mt-11 space-y-12 px-5 text-secondary dark:text-accent">
          {/* Explore Mobile Click Dropdown */}
          <li className="flex flex-col space-y-2">
            <button
              onClick={() => setShowExploreDropdown((prev) => !prev)}
              className="flex items-center gap-2 font-medium text-pink-600"
            >
              <MdOutlineExplore size={22} />
              Explore
              <MdArrowDropDown />
            </button>
            {showExploreDropdown && (
              <ul className="ml-8 flex flex-col gap-3 space-y-1 text-sm">
                <li><Link to="/explore/courses" className="flex gap-3 mt-2">
                <FaBookOpen size={22} />
                Courses
                </Link></li>
                <li><Link to="/explore/compiler" className="flex gap-3"><DiVisualstudio size={22} /> Compiler</Link></li>
                <li><Link to="/explore/sketch" className="flex gap-3"><FaPenNib size={22} />Lab Visual</Link></li>
                <li><Link to="https://dsa-visualize.netlify.app/" className="flex gap-3" target="_blank"><TbBinaryTree size={22} />Visualizer</Link></li>
              </ul>
            )}
          </li>
          {renderNavLinks(true)}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
