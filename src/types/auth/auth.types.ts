import type { User } from "../user/user.types";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;  
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  hasRefreshed: boolean;

  // State setters and resetters
  setUser: (user: User | null) => void;
  resetError: () => void;
  resetMessage: () => void;

  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;
  changePassword: (token: string, newPassword: string) => Promise<void>;
}
