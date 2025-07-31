import React, { useState, useCallback, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import type { User, UserStats } from "../../types/user/user.types";
import {
  fetchUser,
  updateUserApi,
  deleteUserApi,
  getAllAdminUsers,
  getAdminUserById,
  updateAdminUser as updateAdminUserAPI,
  deleteAdminUser as deleteAdminUserAPI,
  fetchUserNameByIdApi,
  fetchUserStatsApi,
} from "../../services/user/user.service";
import useAuth from "../../hooks/auth/useAuth";
import type { AxiosError } from "axios";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasRefreshed, user: authUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const [usernames, setUsernames] = useState<Record<string, string>>({});

const [stats, setStats] = useState<UserStats | null>(null);



  const fetchedOnce = useRef(false); // Prevent double-fetch when session refresh triggers

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback;

  const fetchUserProfile = useCallback(async () => {
    if (!authUser || fetchedOnce.current) {
      setUser(null);
      return;
    }
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchUser();
      setUser(data);
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.status === 401 || axiosErr.response?.status === 403) {
        setUser(null);
        setError("Your session has expired. Please log in again.");
      } else {
        setError(getErrorMessage(err, "Failed to fetch user"));
      }
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateUserApi(updates);
      setUser(updated);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update profile"));
    } finally {
      setLoading(false);
    }
  }, []);
const fetchUserNameById = useCallback(async (userId: string) => {
  // Return cached if available
  if (usernames[userId]) return usernames[userId];

  setLoading(true);
  setError(null);
  try {
    const name = await fetchUserNameByIdApi(userId);
    if (name) {
      setUsernames((prev) => ({ ...prev, [userId]: name }));
    }
    return name ?? null;
  } catch (err) {
    setError(getErrorMessage(err, "Failed to fetch user name"));
    return null;
  } finally {
    setLoading(false);
  }
}, [usernames]);



  const deleteUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserApi();
      setUser(null);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete user"));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllAdminUsers();
      setUsers(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch users"));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminUserById(id);
      setSelectedUser(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to fetch user"));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAdminUser = useCallback(async (id: string, updates: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdminUserAPI(id, updates);
      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
      setSelectedUser(updated);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update user"));
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAdminUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdminUserAPI(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete user"));
    } finally {
      setLoading(false);
    }
  }, [selectedUser]);

  const fetchUserStats = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchUserStatsApi();
    setStats(data);
  } catch (err) {
    setError(getErrorMessage(err, "Failed to fetch user stats"));
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    if (hasRefreshed) {
      fetchUserProfile();
      fetchUserStats();
    }
  }, [hasRefreshed, fetchUserProfile, fetchUserStats]);

  return (
    <UserContext.Provider
      value={{
        stats,
         usernames, 
    fetchUserNameById, 
        user,
        users,
        selectedUser,
        loading,
        error,
        fetchUser: fetchUserProfile,
        updateUser,
        deleteUser,
        fetchUsers,
        fetchUserById,
        updateAdminUser,
        deleteAdminUser,
        fetchUserStats
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
