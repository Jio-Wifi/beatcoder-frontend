import { createContext, useContext } from "react";
import type { UserActivity } from "../../../types/user/userActivity.types";

export interface UserActivityContextType {
  activity: UserActivity | null;
  loading: boolean;
  error: string | null;
  fetchActivity: () => Promise<void>;
}

export const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (!context) throw new Error("useUserActivity must be used within UserActivityProvider");
  return context;
};
