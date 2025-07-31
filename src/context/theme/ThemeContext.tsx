import { createContext } from "react";
import type { ThemeContextType } from "../../types/theme.types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
