import React, { useState, useEffect, useCallback, useRef } from "react";
import { SubmissionContext } from "./SubmissionContext";
import {
  fetchMySubmissionsApi,
  fetchSubmissionsApi,
  createSubmissionApi,
  runCodeApi,
  fetchMyRecentAcceptedApi,
  fetchMyLanguagesStatsApi,
  fetchMySubmissionActivityApi,
  fetchSubmissionsBySlugApi,
  fetchMySubmissionsBySlugApi,
} from "../../../services/code/submission.service";
import type {
  Submission,
  SubmissionInput,
  RunResult,
  LanguageStats,
  SubmissionActivity,
  RecentAccepted,
} from "../../../types/code/submission.types";
import useAuth from "../../../hooks/auth/useAuth";

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasRefreshed, isLoggedIn } = useAuth();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [recentAccepted, setRecentAccepted] = useState<RecentAccepted[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
  const [submissionActivity, setSubmissionActivity] = useState<SubmissionActivity[]>([]);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  /** Fetch all dashboard data (submissions, stats, etc.) */
  const fetchDashboardData = useCallback(async () => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);

    try {
      const [subs, langs, accepted, activity] = await Promise.all([
        fetchMySubmissionsApi(),
        fetchMyLanguagesStatsApi(),
        fetchMyRecentAcceptedApi(),
        fetchMySubmissionActivityApi(90),
      ]);

      setSubmissions(subs);
      setLanguageStats(langs);
      setRecentAccepted(accepted);
      setSubmissionActivity(activity);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubmissions = useCallback(async (problemId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubmissionsApi(problemId);
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  }, []);

   const fetchSubmissionBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
       const res = await fetchSubmissionsBySlugApi(slug); // <- this returns an object, not array
    // setSubmissions(res.submissions);
    // console.log(res.submissions)
    setSubmissions(res.submissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  }, []);
   const fetchMySubmissionsBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
       const res = await fetchMySubmissionsBySlugApi(slug); 
    setSubmissions(res.submissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchRecentAccepted = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyRecentAcceptedApi();
      setRecentAccepted(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch recent accepted");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLanguagesStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyLanguagesStatsApi();
      setLanguageStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch language stats");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActivity = useCallback(async (days = 90) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMySubmissionActivityApi(days);
      setSubmissionActivity(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch submission activity");
    } finally {
      setLoading(false);
    }
  }, []);

 const createSubmission = useCallback(async (input: SubmissionInput) => {
  setLoading(true);
  setError(null);
  try {
    const newSubmission = await createSubmissionApi(input);
    setSubmissions((prev) => [...(prev ?? []), newSubmission]);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to create submission");
  } finally {
    setLoading(false);
  }
}, []);


  const runCode = useCallback(async (input: SubmissionInput) => {
    setLoading(true);
    setError(null);
    setRunResult(null);
    try {
      const result = await runCodeApi(input);
      setRunResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run code");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Auto-fetch dashboard data when user session is ready */
  useEffect(() => {
    if (hasRefreshed && isLoggedIn) {
      fetchDashboardData();
    }
  }, [hasRefreshed, isLoggedIn, fetchDashboardData]);

  return (
    <SubmissionContext.Provider
      value={{
        submissions,
        recentAccepted,
        languageStats,
        submissionActivity,
        runResult,
        loading,
        error,
        fetchSubmissionBySlug,
        fetchMySubmissionsBySlug,
        fetchSubmissions,
        fetchMySubmissions: fetchDashboardData,
        fetchMyRecentAccepted: fetchRecentAccepted,
        fetchMyLanguagesStats: fetchLanguagesStats,
        fetchMySubmissionActivity: fetchActivity,
        createSubmission,
        runCode,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
