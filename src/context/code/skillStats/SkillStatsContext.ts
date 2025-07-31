import { createContext } from "react";
import type { SkillStatsContextType } from "../../../types/code/skillStats.types";

export const SkillStatsContext = createContext<SkillStatsContextType>({
  skills: [],
  loading: false,
  error: null,
  fetchSkillStats: async () => {},
});
