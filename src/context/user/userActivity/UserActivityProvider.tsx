import React, { useState, useCallback, useEffect, useRef } from "react";
import { UserActivityContext } from "./UserActivityContext";
import { fetchUserActivityApi } from "../../../services/user/userActivity.service";
import type { UserActivity } from "../../../types/user/userActivity.types";
import useAuth from "../../../hooks/auth/useAuth";

interface UserActivityProviderProps {
  children: React.ReactNode;
}

export const UserActivityProvider: React.FC<UserActivityProviderProps> = ({ children }) => {
  const { hasRefreshed, isLoggedIn } = useAuth();
  const [activity, setActivity] = useState<UserActivity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback;

  const fetchActivity = useCallback(async (force = false) => {
    if (!force && fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserActivityApi();
      setActivity(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch user activity"));
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset cache when user logs in/out so it refetches for a new session
  useEffect(() => {
    fetchedOnce.current = false;
  }, [isLoggedIn]);

  // Only fetch once the session is confirmed and user is logged in
  useEffect(() => {
    if (hasRefreshed && isLoggedIn) {
      fetchActivity();
    }
  }, [hasRefreshed, isLoggedIn, fetchActivity]);

  if (!hasRefreshed) {
    return <div className="p-4 text-center">Checking session...</div>;
  }

  return (
    <UserActivityContext.Provider value={{ activity, loading, error, fetchActivity }}>
      {children}
    </UserActivityContext.Provider>
  );
};
