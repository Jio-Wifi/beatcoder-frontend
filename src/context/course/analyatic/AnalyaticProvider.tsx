import React, { useState, useCallback, useEffect, useRef } from "react";
import type { AnalyticsOverview, RevenueData } from "../../../types/course/analyatic.types";
import {
  fetchAnalyticsOverview,
  fetchRevenueData,
  fetchMonthlySubscriptions,
} from "../../../services/course/analyatic.service";
import { AnalyticsContext } from "./AnalyaticContext";
import useAuth from "../../../hooks/auth/useAuth";
import PageSkeleton from "../../../components/Common/PageSkeleton";

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasRefreshed, isLoggedIn, user } = useAuth();
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [subscriptions, setSubscriptions] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  const getOverview = useCallback(async () => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsOverview();
      setOverview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch analytics overview");
    } finally {
      setLoading(false);
    }
  }, []);

  const getRevenue = useCallback(async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRevenueData(year);
      setRevenue(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch revenue data");
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubscriptions = useCallback(async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMonthlySubscriptions(year);
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch subscription data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasRefreshed && isLoggedIn && user?.role === "admin") {
      getOverview();
    }
  }, [hasRefreshed, isLoggedIn, user, getOverview]);

  if (!hasRefreshed) {
    return <PageSkeleton />;
  }

  return (
    <AnalyticsContext.Provider
      value={{
        overview,
        revenue,
        subscriptions,
        loading,
        error,
        fetchOverview: getOverview,
        fetchRevenue: getRevenue,
        fetchSubscriptions: getSubscriptions,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
