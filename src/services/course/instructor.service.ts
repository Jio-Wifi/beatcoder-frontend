import api from "../axios.service";
import type { Instructor } from "../../types/course/instructor.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/instructor";

// Fetch all instructors
export const getAllInstructors = (): Promise<Instructor[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ instructors: Instructor[] }>(API_URL);
    return data.instructors;
  }, "Failed to fetch instructors");

// Fetch instructor by ID
export const getInstructorById = (id: string): Promise<Instructor> =>
  safeApiCall(async () => {
    const { data } = await api.get<Instructor>(`${API_URL}/${id}`);
    return data;
  }, "Failed to fetch instructor");

// Create a new instructor
export const createInstructor = (
  payload: { user: string; bio: string; expertise: string[] }
): Promise<Instructor> =>
  safeApiCall(async () => {
    const { data } = await api.post<Instructor>(API_URL, payload);
    return data;
  }, "Failed to create instructor");

// Update an instructor
export const updateInstructor = (
  id: string,
  payload: { bio?: string; expertise?: string[] }
): Promise<Instructor> =>
  safeApiCall(async () => {
    const { data } = await api.put<Instructor>(`${API_URL}/${id}`, payload);
    return data;
  }, "Failed to update instructor");

// Delete an instructor
export const deleteInstructor = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete instructor");
