import React, { useState, useCallback, useEffect, useRef } from "react";
import { CategoryContext } from "./CategoryContext";
import {
  getAllCategories,
  getCategoryById,
  createCategory as createCategoryAPI,
  updateCategory as updateCategoryAPI,
  deleteCategory as deleteCategoryAPI,
} from "../../../services/course/category.service";
import type { Category } from "../../../types/course/category.types";
import useAuth from "../../../hooks/auth/useAuth";

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasRefreshed, isLoggedIn, user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  const fetchCategories = useCallback(async () => {
    if (!hasRefreshed || !isLoggedIn) return;
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [hasRefreshed, isLoggedIn]);

  const fetchCategoryById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoryById(id);
      setSelectedCategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch category");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (payload: { name: string }) => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const newCategory = await createCategoryAPI(payload);
        setCategories((prev) => [...prev, newCategory]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create category");
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  const updateCategory = useCallback(
    async (id: string, payload: { name: string }) => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const updated = await updateCategoryAPI(id, payload);
        setCategories((prev) => prev.map((c) => (c._id === id ? updated : c)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update category");
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await deleteCategoryAPI(id);
        setCategories((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete category");
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  useEffect(() => {
    fetchedOnce.current = false; // Reset fetch if user logs in/out
  }, [isLoggedIn]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (!hasRefreshed) {
    return <div className="p-4 text-center">Checking session...</div>;
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        loading,
        error,
        fetchCategories,
        fetchCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
