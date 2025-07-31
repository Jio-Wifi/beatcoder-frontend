import { createContext } from "react";
import type { CommunityStatsContextType } from "../../../types/code/communityStats.types";

export const CommunityStatsContext = createContext<CommunityStatsContextType>({
  stats: null,
  loading: false,
  error: null,
  fetchCommunityStats: async () => {},
  incrementStats: async () => {},
  createStats: async () => null,
  updateStats: async () => null,
  deleteStats: async () => false,
});