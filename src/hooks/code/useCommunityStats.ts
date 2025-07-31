import { useContext } from "react";
import { CommunityStatsContext } from "../../context/code/communityStats/CommunityStatsContext";

export const useCommunityStats = () => {
  const context = useContext(CommunityStatsContext);
  if (!context) {
    throw new Error("useCommunityStats must be used within a CommunityStatsProvider");
  }
  return context;
};
