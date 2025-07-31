import { useContext } from "react";
import { SkillStatsContext } from "../../context/code/skillStats/SkillStatsContext";

export const useSkillStats = () => {
  const context = useContext(SkillStatsContext);
  if (!context) {
    throw new Error("useSkillStats must be used within a SkillStatsProvider");
  }
  return context;
};
