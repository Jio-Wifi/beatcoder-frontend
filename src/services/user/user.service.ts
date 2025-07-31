import type { User, UserStats } from "../../types/user/user.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

const API_URL = "/user";

// ---------------------------
// Logged-in User Services
// ---------------------------

// GET: Fetch logged-in user's profile
export const fetchUser = (): Promise<User> =>
  safeApiCall(async () => {
    const { data } = await api.get(`${API_URL}/profile`);
    return data.user ?? data;
  }, "Failed to fetch user profile");

// PATCH: Update logged-in user's profile
export const updateUserApi = (updates: Partial<User>): Promise<User> =>
  safeApiCall(async () => {
    const { data } = await api.patch(`${API_URL}/profile`, updates);
    return data.user ?? data;
  }, "Failed to update user profile");

// DELETE: Delete logged-in user's account
export const deleteUserApi = (): Promise<void> =>
  safeApiCall(async () => {
    await api.delete(`${API_URL}/profile`);
  }, "Failed to delete user account");

// ---------------------------
// Admin Services
// ---------------------------

export const getAllAdminUsers = (): Promise<User[]> =>
  safeApiCall(async () => {
    const { data } = await api.get(`${API_URL}`);
    return data.users ?? data;
  }, "Failed to fetch users");

export const getAdminUserById = (id: string): Promise<User> =>
  safeApiCall(async () => {
    const { data } = await api.get(`${API_URL}/${id}`);
    return data.user ?? data;
  }, "Failed to fetch user");

export const updateAdminUser = (id: string, updates: Partial<User>): Promise<User> =>
  safeApiCall(async () => {
    const { data } = await api.put(`${API_URL}/${id}`, updates);
    return data.user ?? data;
  }, "Failed to update user");

export const deleteAdminUser = (id: string): Promise<void> =>
  safeApiCall(async () => {
    await api.delete(`${API_URL}/${id}`);
  }, "Failed to delete user");


  // ------------Public -------------
  export const fetchUserNameByIdApi = (userId: string): Promise<string | null> =>
  safeApiCall(async () => {
    const res = await api.get<{ name: string | null }>(`${API_URL}/${userId}/name`);
    return res.data.name;
  }, 'Failed to fetch user name');



  // user stats activity
export const fetchUserStatsApi = (): Promise<UserStats> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ stats: UserStats }>(`${API_URL}/activity/stats/me`);
    return data.stats; // ✅ Already extracting the `.stats` object
  }, "Failed to fetch user stats");