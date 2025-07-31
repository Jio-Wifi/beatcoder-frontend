import type { User } from "../../types/user/user.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

const API_URL = "/auth";

// Register new user
export const registerApi = (data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: User }> =>
  safeApiCall(async () => {
    const { data: res } = await api.post(`${API_URL}/register`, data);
    return res; // { message, user }
  }, "Failed to register");

// Login user
export const loginApi = (data: {
  email: string;
  password: string;
}): Promise<{ user: User }> =>
  safeApiCall(async () => {
    const { data: res } = await api.post(`${API_URL}/login`, data);
    return res; // { message, user }
  }, "Failed to login");

// Refresh session (from cookies)
export const refreshTokenApi = (): Promise<{ user: User }> =>
  safeApiCall(async () => {
    const { data: res } = await api.post(`${API_URL}/refresh`,{});
    return res; // { message, user }
  }, "Failed to refresh session");

// Logout user
export const logoutApi = (): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data: res } = await api.post(`${API_URL}/logout`);
    return res; // { message }
  }, "Failed to logout");

// Forgot password
export const forgotPasswordApi = (email: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data: res } = await api.post(`${API_URL}/forgot-password`, { email });
    return res; // { message }
  }, "Failed to send password reset email");

// Change password
export const changePasswordApi = (token: string, newPassword: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data: res } = await api.post(`${API_URL}/change-password`, { token, newPassword });
    return res; // { message }
  }, "Failed to change password");
