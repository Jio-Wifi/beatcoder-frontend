import React, { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginApi,
  registerApi,
  logoutApi,
  refreshTokenApi,
  forgotPasswordApi,
  changePasswordApi,
} from "../../services/auth/auth.service";
import type { User } from "../../types/user/user.types";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start true until refresh finishes
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const resetError = () => setError(null);
  const resetMessage = () => setMessage(null);

  /** Refresh session (called on mount + manually) */
const refresh = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const { user } = await refreshTokenApi();
    setUser(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Session refresh failed";

    // Ignore "Refresh Token Required!" for first-time/unauthenticated visits
    if (message !== "Refresh Token Required!") {
      setError(message);
    }

    setUser(null);
  } finally {
    setHasRefreshed(true);
    setLoading(false);
  }
}, []);


  /** Login user */
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await loginApi({ email, password });
      setUser(user);
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      setUser(null);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  /** Register user */
  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await registerApi({ name, email, password });
      setUser(user);
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  /** Logout user */
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutApi();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Forgot password */
  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await forgotPasswordApi(email);
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Change password */
  const changePassword = useCallback(async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await changePasswordApi(token, newPassword);
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh session on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading: loading,
        error,
        message,
        hasRefreshed,
        setUser, // expose for other providers if needed
        resetError,
        resetMessage,
        login,
        register,
        logout,
        refresh,
        forgotPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
