import type { AnalyticsOverview, RevenueData } from "../../types/course/analyatic.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

const API_BASE = "/analytics";


export const fetchAnalyticsOverview = (): Promise<AnalyticsOverview> =>
  safeApiCall(async () => {
    const res = await api.get<{ success: boolean; data: AnalyticsOverview }>(
      API_BASE
    );
    return res.data.data; // Return only the overview data
  }, "Failed to fetch analytics overview");


export const fetchRevenueData = (year: number): Promise<RevenueData[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ success: boolean; data: RevenueData[] }>(
      `${API_BASE}/revenue?year=${year}`
    );
    return res.data.data; // Return only the revenue data
  }, "Failed to fetch revenue data");


export const fetchMonthlySubscriptions = (year: number): Promise<RevenueData[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ success: boolean; data: RevenueData[] }>(
      `${API_BASE}/subscriptions?year=${year}`
    );
    return res.data.data; // Return only the subscription stats
  }, "Failed to fetch subscription stats");
