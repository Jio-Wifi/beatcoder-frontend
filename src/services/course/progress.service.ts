import api from "../axios.service";
import type { Progress } from "../../types/course/progress.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/progress";

// Fetch all progress records
export const getAllProgresses = (): Promise<Progress[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ progressList: Progress[] }>(API_URL);
    return data.progressList;
  }, "Failed to fetch progress records");

// Fetch a specific progress by ID
export const getProgressById = (id: string): Promise<Progress> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ progress: Progress }>(`${API_URL}/${id}`);
    return data.progress;
  }, "Failed to fetch progress");

// Create a new progress record
export const createProgress = (
  payload: { user: string; course: string; completedLessons?: string[] }
): Promise<Progress> =>
  safeApiCall(async () => {
    const { data } = await api.post<{ progress: Progress }>(API_URL, payload);
    return data.progress;
  }, "Failed to create progress record");

// Update a progress record by ID
export const updateProgress = (
  id: string,
  payload: { completedLessons?: string[] }
): Promise<Progress> =>
  safeApiCall(async () => {
    const { data } = await api.put<{ updated: Progress }>(`${API_URL}/${id}`, payload);
    return data.updated;
  }, "Failed to update progress record");

// Delete a progress record by ID
export const deleteProgress = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete progress record");
