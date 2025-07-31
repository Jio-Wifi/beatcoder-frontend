import { useContext } from "react";
import type { ThemeContextType } from "../types/theme.types";
import ThemeContext from "../context/theme/ThemeContext";

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
