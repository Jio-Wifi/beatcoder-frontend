export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  gender?: "male" | "female" | "other";
  location?: string;
  birthday?: string;
  summary?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  work?: string;
  education?: string;
  skills?: string[];
  createdAt: string;
}

export interface AdminUserState {
  users: AdminUser[];
  selectedUser: AdminUser | null;
  loading: boolean;
  error: string | null;
}

export interface AdminUserContextProps extends AdminUserState {
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  updateUser: (id: string, data: Partial<AdminUser>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
