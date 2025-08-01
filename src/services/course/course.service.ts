import type { Course } from "../../types/course/course.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

const API_URL = "/course";

// Fetch all courses
export const getAllCourses = (): Promise<Course[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ courses: Course[] }>(API_URL);
    return data.courses || [];
  }, "Failed to fetch courses");

// Fetch a course by ID
export const getCourseById = (id: string): Promise<Course> =>
  safeApiCall(async () => {
    const { data } = await api.get<Course>(`${API_URL}/${id}`);
    console.log(data)
    return data;
  }, "Failed to fetch course");

// Create a new course (multipart/form-data)
export const createCourse = (formData: FormData): Promise<Course> =>
  safeApiCall(async () => {
    const { data } = await api.post<Course>(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }, "Failed to create course");

// Update a course by ID (multipart/form-data)
export const updateCourse = (id: string, formData: FormData): Promise<Course> =>
  safeApiCall(async () => {
    const { data } = await api.put<{ updated: Course }>(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.updated;
  }, "Failed to update course");

// Delete a course by ID
export const deleteCourse = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete course");
