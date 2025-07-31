import { useContext } from "react";
import { UserActivityContext, type UserActivityContextType } from "../../context/user/userActivity/UserActivityContext";

export const useUserActivity = (): UserActivityContextType => {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error("useUserActivity must be used within a UserActivityProvider");
  }
  return context;
};
