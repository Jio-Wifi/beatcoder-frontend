export type UserRole = 'user' | 'admin';

export type Gender = 'male' | 'female' | 'other';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  gender?: Gender;
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
}

// ✅ Updated UserState
export interface UserState {
  user: User | null;         
  stats: UserStats | null;            // Authenticated user
  usernames: Record<string, string>;    // Map of userId -> name
  users: User[];                         // Admin user list
  selectedUser: User | null;            // Admin selected user
  loading: boolean;
  error: string | null;
}


export interface UserStatsDifficulty {
  solved: number;
  total: number;
}

export interface UserStats {
  solved: number;
  totalProblems: number;
  acceptanceRate: number;
  attempting: number;
  totalSubmissions: number;
  difficulty: {
    easy: UserStatsDifficulty;
    medium: UserStatsDifficulty;
    hard: UserStatsDifficulty;
  };
}



// ✅ Updated UserContextProps
export interface UserContextProps extends UserState {
  // Authenticated user actions
  fetchUser: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  deleteUser: () => Promise<void>;

  // Admin-only actions
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  updateAdminUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteAdminUser: (id: string) => Promise<void>;

  // Public utility
  fetchUserNameById: (userId: string) => Promise<string | null>;
   fetchUserStats: () => Promise<void>;
}
