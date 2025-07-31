import type { ReactNode } from "react";
import type { RevenueData } from "./analyatic.types";

export interface Plan {
  isActive?: boolean;
  billingCycle: ReactNode;
  _id: string;
  name: string;
  price: number; // in paise (e.g., 6000 = ₹60)
  interval: "month" | "year";
  description?: string;
  razorpayPlanId?: string;

  // For subscription display
  endDate?: string;
  startDate?: string;
}

export interface Settlement {
  id: string;
  entity: "settlement";
  amount: number;
  fees: number;
  tax: number;
  status: string;
  utr?: string;
  created_at: number;
}

export interface UserSubscription {
  key_id: string; // Razorpay key
  _id: string;
  userId: string;
  planId: string | Plan;
  razorpaySubscriptionId: string;
  status: "active" | "cancelled" | "pending" | "expired";
  startDate: string;
  endDate?: string;
}

export interface SubscriptionState {
  plans: Plan[];
  isSubscribed: boolean;
  subscriptionStatus: "pending" | "active" | "expired" | "cancelled" | null;
  activePlan: Plan | null;
  revenue: RevenueData | null;
  settlements: Settlement[];
  loading: boolean;
  error: string | null;
}

export interface VerifyWebhookResponse {
  success: boolean;
  message: string;
}

export interface GetPlansResponse {
  success: boolean;
  data: Plan[];
}

export interface CreatePlanResponse {
  success: boolean;
  message: string;
  data: Plan;
}

export interface StartSubscriptionResponse {
  success: boolean;
  message: string;
  data: UserSubscription;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
  data?: UserSubscription; // <-- Made optional so errors work
}

export interface CheckSubscriptionResponse {
  success: boolean;
  isSubscribed: boolean;
  status: "pending" | "active" | "expired" | "cancelled" | null;
  activePlan: Plan | null;
}

export interface SettlementsResponse {
  success: boolean;
  totalPayout: number;
  settlements: Settlement[];
}

export interface SubscriptionContextProps extends SubscriptionState {
  fetchPlans: () => Promise<void>;
  checkSubscription: (userId: string) => Promise<void>;
  fetchUserSubscriptionDetails: (userId: string) => Promise<void>;
  startSubscription: (userId: string, planId: string) => Promise<StartSubscriptionResponse>;

  // Fixed return type
  cancelSubscription: (razorpaySubscriptionId: string) => Promise<CancelSubscriptionResponse>;

  createPlan: (planData: {
    name: string;
    price: number;
    interval: "month" | "year";
    description?: string;
    razorpayPlanId?: string;
  }) => Promise<void>;

  verifyWebhook: (payload: unknown) => Promise<VerifyWebhookResponse>;
  fetchRevenue: () => Promise<void>;
  fetchSettlements: () => Promise<void>;
}
