import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import SubscriptionContext from "./SubscriptionContext";
import {
  fetchPlansAPI,
  createPlanAPI,
  startSubscriptionAPI,
  cancelSubscriptionAPI,
  checkSubscriptionAPI,
  verifyWebhookAPI,
  fetchRevenueAPI,
  fetchSettlementsAPI,
  fetchUserSubscriptionDetailsAPI,
} from "../../../services/course/subscription.service";
import type { Plan, SubscriptionContextProps, Settlement } from "../../../types/course/subscription.types";
import type { RevenueData } from "../../../types/course/analyatic.types";
import useAuth from "../../../hooks/auth/useAuth";

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { hasRefreshed, isLoggedIn, user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"pending" | "active" | "expired" | "cancelled" | null>(null);

  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedPlansOnce = useRef(false);

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback;

  const fetchPlans = useCallback(async () => {
    if (fetchedPlansOnce.current) return;
    fetchedPlansOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const res = await fetchPlansAPI();
      setPlans(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load plans"));
      fetchedPlansOnce.current = false; // retry allowed
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserSubscriptionDetails = useCallback(async () => {
    try {
      const res = await fetchUserSubscriptionDetailsAPI();
      if (res.data) {
        setIsSubscribed(true);
        setSubscriptionStatus(res.data.status);
        setActivePlan(typeof res.data.planId === "object" ? res.data.planId : null);
      } else {
        setIsSubscribed(false);
        setSubscriptionStatus(null);
        setActivePlan(null);
      }
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch subscription details"));
      setIsSubscribed(false);
      setSubscriptionStatus(null);
      setActivePlan(null);
    }
  }, []);

  const checkSubscription = useCallback(async (userId: string) => {
    try {
      const res = await checkSubscriptionAPI(userId);
      setIsSubscribed(res.isSubscribed);
      setSubscriptionStatus(res.status ?? null);
      setActivePlan(res.activePlan ?? null);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to check subscription"));
      setIsSubscribed(false);
      setSubscriptionStatus(null);
      setActivePlan(null);
    }
  }, []);

  const fetchRevenue = useCallback(async () => {
    if (!user || user.role !== "admin") {
      setError("Unauthorized: Admin access required");
      return;
    }
    try {
      const res = await fetchRevenueAPI();
      setRevenue(res.revenue);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch revenue"));
      setRevenue(null);
    }
  }, [user]);

  const fetchSettlements = useCallback(async () => {
    if (!user || user.role !== "admin") {
      setError("Unauthorized: Admin access required");
      return;
    }
    try {
      const res = await fetchSettlementsAPI();
      setSettlements(res.settlements);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch settlements"));
      setSettlements([]);
    }
  }, [user]);

  const startSubscription = useCallback(async (userId: string, planId: string) => {
    return startSubscriptionAPI(userId, planId);
  }, []);

  const cancelSubscription = useCallback(async (razorpaySubscriptionId: string) => {
    return cancelSubscriptionAPI(razorpaySubscriptionId);
  }, []);

  const createPlan = useCallback(
    async (planData: { name: string; price: number; interval: "month" | "year"; description?: string; razorpayPlanId?: string }) => {
      if (!user || user.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return;
      }
      try {
        await createPlanAPI(planData);
        fetchedPlansOnce.current = false;
        await fetchPlans();
      } catch (err) {
        setError(getErrorMessage(err, "Failed to create plan"));
      }
    },
    [user, fetchPlans]
  );

  const verifyWebhook = useCallback(async (payload: unknown) => {
    return verifyWebhookAPI(payload);
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  useEffect(() => {
    if (hasRefreshed && isLoggedIn) {
      fetchUserSubscriptionDetails();
    }
  }, [hasRefreshed, isLoggedIn, fetchUserSubscriptionDetails]);

  if (!hasRefreshed) {
    return <div className="p-4 text-center">Checking session...</div>;
  }

  const value: SubscriptionContextProps = {
    plans,
    activePlan,
    isSubscribed,
    subscriptionStatus,
    revenue,
    settlements,
    loading,
    error,
    fetchPlans,
    fetchUserSubscriptionDetails,
    fetchRevenue,
    fetchSettlements,
    checkSubscription,
    startSubscription,
    cancelSubscription,
    createPlan,
    verifyWebhook,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export default SubscriptionProvider;
