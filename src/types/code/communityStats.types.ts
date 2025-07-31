export interface CommunityStats {
  _id?: string;
  user: string;        // The userId this stat belongs to
  views: number;
  rank?: string;
   solutions: number;
  discussions: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommunityStatsContextType {
  stats: CommunityStats | null;
  loading: boolean;
  error: string | null;

  // Fetch stats for the currently authenticated user
  fetchCommunityStats: () => Promise<void>;

  // Increment stats for current user (e.g., +1 view/solution)
  incrementStats: (
    increments: Partial<Pick<CommunityStats, "views" | "solutions" | "discussions">>
  ) => Promise<void>;

  // Create stats entry (usually on signup, for the logged-in user)
  createStats: () => Promise<CommunityStats | null>;

  // Update stats (current user)
  updateStats: (updates: Partial<CommunityStats>) => Promise<CommunityStats | null>;

  // Delete stats (current user)
  deleteStats: () => Promise<boolean>;
}
