import type {
  CancelSubscriptionResponse,
  CheckSubscriptionResponse,
  CreatePlanResponse,
  GetPlansResponse,
  SettlementsResponse,
  StartSubscriptionResponse,
  UserSubscription,
  VerifyWebhookResponse,
} from "../../types/course/subscription.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

const BASE_URL = "/subscription";

// Fetch all subscription plans
export const fetchPlansAPI = (): Promise<GetPlansResponse> =>
  safeApiCall(async () => {
    const { data } = await api.get<GetPlansResponse>(`${BASE_URL}/plans`);
    return data;
  }, "Failed to fetch subscription plans");

// Create a subscription plan (Admin)
export const createPlanAPI = (payload: {
  name: string;
  price: number;
  interval: "month" | "year";
  description?: string;
  razorpayPlanId?: string;
}): Promise<CreatePlanResponse> =>
  safeApiCall(async () => {
    const { data } = await api.post<CreatePlanResponse>(`${BASE_URL}/plans`, payload);
    return data;
  }, "Failed to create subscription plan");

// Start a subscription
export const startSubscriptionAPI = (
  userId: string,
  planId: string
): Promise<StartSubscriptionResponse> =>
  safeApiCall(async () => {
    const { data } = await api.post<StartSubscriptionResponse>(`${BASE_URL}/start`, { userId, planId });
    return data;
  }, "Failed to start subscription");

// Cancel a subscription
export const cancelSubscriptionAPI = (
  razorpaySubscriptionId: string
): Promise<CancelSubscriptionResponse> =>
  safeApiCall(async () => {
    const { data } = await api.post<CancelSubscriptionResponse>(`${BASE_URL}/cancel`, { razorpaySubscriptionId });
    return data;
  }, "Failed to cancel subscription");

// Check a user's subscription status
export const checkSubscriptionAPI = (userId: string): Promise<CheckSubscriptionResponse> =>
  safeApiCall(async () => {
    const { data } = await api.get<CheckSubscriptionResponse>(`${BASE_URL}/check/${userId}`);
    return data;
  }, "Failed to check subscription status");

// Verify Razorpay webhook (server-side verification)
export const verifyWebhookAPI = (payload: unknown): Promise<VerifyWebhookResponse> =>
  safeApiCall(async () => {
    const { data } = await api.post<VerifyWebhookResponse>(`${BASE_URL}/webhook`, payload);
    return data;
  }, "Failed to verify webhook");


// Fetch total revenue (from DB + Razorpay)
export const fetchRevenueAPI = (): Promise<{
  success: boolean;
  revenue: { database: number; razorpay: number; total: number };
}> =>
  safeApiCall(async () => {
    const { data } = await api.get(`${BASE_URL}/revenue`);
    return data;
  }, "Failed to fetch revenue data");

// Fetch settlement history (actual payouts)
export const fetchSettlementsAPI = (): Promise<SettlementsResponse> =>
  safeApiCall(async () => {
    const { data } = await api.get<SettlementsResponse>(`${BASE_URL}/settlements`);
    return data;
  }, "Failed to fetch settlement data");


// Fetch current user's subscription details
export const fetchUserSubscriptionDetailsAPI = (): Promise<{
  success: boolean;
  data: UserSubscription | null;
}> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ success: boolean; data: UserSubscription | null }>(
      `${BASE_URL}/user/details`
    );
    return data;
  }, "Failed to fetch user subscription details");
