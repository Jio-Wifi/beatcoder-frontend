import useTheme from "../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:scale-105 transition-transform"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FaMoon size={20} />
      ) : (
        <FaSun size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
