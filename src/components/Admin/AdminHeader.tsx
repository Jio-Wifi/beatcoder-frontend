import { FiLogOut, FiMenu } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import useAuth from "../../hooks/auth/useAuth";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

const AdminHeader = ({ onToggleSidebar }: AdminHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-primary shadow-md">
      {/* Hamburger (for mobile) */}
      <button
        className="md:hidden text-primary dark:text-accent"
        onClick={onToggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Logo */}
      <h1 onClick={() => navigate("/")} className="text-xl cursor-pointer font-bold text-primary dark:text-accent">
        Beat<span className="text-danger">Coder</span>
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-secondary dark:text-accent">
            {user?.name || "Admin"}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-danger hover:text-red-500 transition-colors"
          >
            <FiLogOut size={18} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
