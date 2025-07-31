import React, { useState, useCallback, useEffect, useRef } from "react";
import { CommunityStatsContext } from "./CommunityStatsContext";
import {
  getCommunityStats,
  incrementCommunityStats,
  createCommunityStats,
  updateCommunityStats,
  deleteCommunityStats,
} from "../../../services/code/communityStats.service";
import type { CommunityStats } from "../../../types/code/communityStats.types";
import useAuth from "../../../hooks/auth/useAuth";

export const CommunityStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasRefreshed, isLoggedIn, user } = useAuth();
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  /** Fetch stats (skips duplicate fetches unless `force = true`) */
  const fetchCommunityStats = useCallback(async (force = false) => {
    if (!isLoggedIn || (!force && fetchedOnce.current)) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const statsData = await getCommunityStats();
      setStats(statsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch community stats";

      // Ignore "Refresh Token Required!" if it's just first load and user is not authenticated
      if (message !== "Refresh Token Required!") {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  /** Increment stats (views, solutions, discussions) */
  const incrementStats = useCallback(
    async (increments: Partial<Pick<CommunityStats, "views" | "solutions" | "discussions">>) => {
      try {
        const updatedStats = await incrementCommunityStats(increments);
        setStats(updatedStats);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to increment stats";
        setError(message);
      }
    },
    []
  );

  /** Create stats (admin use) */
  const createStatsHandler = useCallback(async (): Promise<CommunityStats | null> => {
    setLoading(true);
    setError(null);
    try {
      const newStats = await createCommunityStats();
      setStats(newStats);
      return newStats;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create community stats";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Update stats */
  const updateStatsHandler = useCallback(async (updates: Partial<CommunityStats>): Promise<CommunityStats | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedStats = await updateCommunityStats(updates);
      setStats(updatedStats);
      return updatedStats;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update stats";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Delete stats (only admins) */
  const deleteStatsHandler = useCallback(async (): Promise<boolean> => {
    if (!user || user.role !== "admin") {
      setError("Unauthorized: Only admins can delete community stats");
      return false;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteCommunityStats();
      setStats(null);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete community stats";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  /** Reset states when user logs out */
  useEffect(() => {
    if (!isLoggedIn) {
      fetchedOnce.current = false;
      setStats(null);
    }
  }, [isLoggedIn]);

  /** Fetch stats only when session is confirmed */
  useEffect(() => {
    if (hasRefreshed && isLoggedIn) {
      fetchCommunityStats();
    }
  }, [hasRefreshed, isLoggedIn, fetchCommunityStats]);

  if (!hasRefreshed) {
    return <div className="p-4 text-center">Checking session...</div>;
  }

  return (
    <CommunityStatsContext.Provider
      value={{
        stats,
        loading,
        error,
        fetchCommunityStats, // can be forced by passing `true`
        incrementStats,
        createStats: createStatsHandler,
        updateStats: updateStatsHandler,
        deleteStats: deleteStatsHandler,
      }}
    >
      {children}
    </CommunityStatsContext.Provider>
  );
};
