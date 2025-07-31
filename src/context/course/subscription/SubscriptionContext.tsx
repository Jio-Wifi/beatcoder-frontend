import { createContext } from "react";
import type {
  SubscriptionContextProps,
  StartSubscriptionResponse,
  CancelSubscriptionResponse,  // <-- add this
} from "../../../types/course/subscription.types";

const SubscriptionContext = createContext<SubscriptionContextProps>({
  plans: [],
  isSubscribed: false,
  subscriptionStatus: null,
  activePlan: null,
  revenue: null,
  settlements: [],
  loading: false,
  error: null,

  fetchPlans: async () => {},
  checkSubscription: async () => {},
  fetchUserSubscriptionDetails: async () => {},

  startSubscription: async (): Promise<StartSubscriptionResponse> => ({
    success: false,
    message: "Not implemented",
    data: {
      key_id: "",
      _id: "",
      userId: "",
      planId: "",
      razorpaySubscriptionId: "",
      status: "pending",
      startDate: "",
      endDate: "",
    },
  }),
  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => ({
    success: false,
    message: "Not implemented",
  }),
  createPlan: async () => {},
  verifyWebhook: async () => ({ success: false, message: "" }),
  fetchRevenue: async () => {},
  fetchSettlements: async () => {},
});

export default SubscriptionContext;
