import { createContext } from "react";
import type { AnalyticsOverview, RevenueData } from "../../../types/course/analyatic.types";

export interface AnalyticsContextValue {
  overview: AnalyticsOverview | null;
  revenue: RevenueData[];
  subscriptions: RevenueData[]; // New field for monthly subscriptions
  loading: boolean;
  error: string | null;
  fetchOverview: () => Promise<void>;
  fetchRevenue: (year: number) => Promise<void>;
  fetchSubscriptions: (year: number) => Promise<void>; // New fetcher
}

export const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(
  undefined
);
