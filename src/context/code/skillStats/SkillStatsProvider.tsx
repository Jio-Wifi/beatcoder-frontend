import React, { useState, useCallback, useEffect, useRef } from "react";
import { SkillStatsContext } from "./SkillStatsContext";
import { fetchMySkillStats } from "../../../services/code/skillStats.service";
import type { SkillStat } from "../../../types/code/skillStats.types";
import useAuth from "../../../hooks/auth/useAuth";

interface SkillStatsProviderProps {
  children: React.ReactNode;
}

export const SkillStatsProvider: React.FC<SkillStatsProviderProps> = ({ children }) => {
  const { hasRefreshed, isLoggedIn } = useAuth();
  const [skills, setSkills] = useState<SkillStat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  /** Fetch skill stats (avoids duplicate fetch unless `force=true`) */
  const fetchSkillStats = useCallback(async (force = false) => {
    if (!force && fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const result = await fetchMySkillStats();
      setSkills(result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load skill stats");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Reset cache when login state changes (new session triggers fetch) */
  useEffect(() => {
    fetchedOnce.current = false;
  }, [isLoggedIn]);

  /** Fetch automatically once session is refreshed and user is logged in */
  useEffect(() => {
    if (hasRefreshed && isLoggedIn) {
      fetchSkillStats();
    }
  }, [hasRefreshed, isLoggedIn, fetchSkillStats]);

  if (!hasRefreshed) {
    return <div className="p-4 text-center">Checking session...</div>;
  }

  return (
    <SkillStatsContext.Provider
      value={{
        skills,
        loading,
        error,
        fetchSkillStats, // can be manually called, supports `force=true`
      }}
    >
      {children}
    </SkillStatsContext.Provider>
  );
};
