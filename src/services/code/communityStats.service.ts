import type { CommunityStats } from "../../types/code/communityStats.types";
import api from "../axios.service";
import { safeApiCall } from "../../utils/safeApiCall";

const BASE_URL = "/community/stats";

// Fetch current user's community stats
export const getCommunityStats = (): Promise<CommunityStats> =>
  safeApiCall(async () => {
    const res = await api.get<{ stats: CommunityStats }>(`${BASE_URL}/me`);
    return res.data.stats;
  }, "Failed to fetch community stats");

// Create community stats (for a new user/session)
export const createCommunityStats = (): Promise<CommunityStats> =>
  safeApiCall(async () => {
    const res = await api.post<{ stats: CommunityStats }>(`${BASE_URL}`);
    return res.data.stats;
  }, "Failed to create community stats");

// Update entire stats record
export const updateCommunityStats = (
  updates: Partial<CommunityStats>
): Promise<CommunityStats> =>
  safeApiCall(async () => {
    const res = await api.put<{ stats: CommunityStats }>(`${BASE_URL}/me`, updates);
    return res.data.stats;
  }, "Failed to update community stats");

// Increment specific fields (views, solutions, discussions)
export const incrementCommunityStats = (
  increments: Partial<Pick<CommunityStats, "views" | "solutions" | "discussions">>
): Promise<CommunityStats> =>
  safeApiCall(async () => {
    const res = await api.patch<{ stats: CommunityStats }>(`${BASE_URL}/me`, increments);
    return res.data.stats;
  }, "Failed to increment community stats");

// Delete stats (Admin only)
export const deleteCommunityStats = (): Promise<void> =>
  safeApiCall(async () => {
    await api.delete(`${BASE_URL}/me`);
  }, "Failed to delete community stats");
