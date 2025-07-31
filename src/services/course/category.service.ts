import api from "../axios.service";
import type { Category } from "../../types/course/category.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/category";

// Fetch all categories
export const getAllCategories = (): Promise<Category[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ categories: Category[] }>(API_URL);
    return data.categories;
  }, "Failed to fetch categories");

// Fetch a category by ID
export const getCategoryById = (id: string): Promise<Category> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ category: Category }>(`${API_URL}/${id}`);
    return data.category;
  }, "Failed to fetch category");

// Create a new category
export const createCategory = (payload: { name: string }): Promise<Category> =>
  safeApiCall(async () => {
    const { data } = await api.post<{ category: Category }>(API_URL, payload);
    return data.category;
  }, "Failed to create category");

// Update an existing category
export const updateCategory = (id: string, payload: { name: string }): Promise<Category> =>
  safeApiCall(async () => {
    const { data } = await api.put<{ updated: Category }>(`${API_URL}/${id}`, payload);
    return data.updated;
  }, "Failed to update category");

// Delete a category
export const deleteCategory = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete category");
