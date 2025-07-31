import { createContext } from "react";
import type { AuthContextType } from "../../types/auth/auth.types";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  message: null,
  hasRefreshed: false, // indicates session check completion
  setUser: () => {},   // exposed for other components to update user
  resetError: () => {}, 
  resetMessage: () => {},
  login: async () => ({ success: false, error: "Not implemented" }),
  register: async () => ({ success: false, error: "Not implemented" }),
  logout: async () => {},
  refresh: async () => {},
  forgotPassword: async () => {},
  changePassword: async () => {},
});
