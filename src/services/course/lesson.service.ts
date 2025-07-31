import api from "../axios.service";
import type { Lesson } from "../../types/course/lesson.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/lesson";

// Fetch all lessons
export const getAllLessons = (): Promise<Lesson[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ lessons: Lesson[] }>(API_URL);
    return data.lessons;
  }, "Failed to fetch lessons");

  // Fetch lessons by course ID
export const getLessonsByCourseId = (courseId: string): Promise<Lesson[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ lessons: Lesson[] }>(
      `${API_URL}/course/${courseId}`
    );
    return data.lessons;
  }, "Failed to fetch lessons for this course");


// Fetch a lesson by ID
export const getLessonById = (id: string): Promise<Lesson> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ lesson: Lesson }>(`${API_URL}/${id}`);
    return data.lesson;
  }, "Failed to fetch lesson");

// Create a new lesson (multipart/form-data)
export const createLesson = (formData: FormData): Promise<Lesson> =>
  safeApiCall(async () => {
    const { data } = await api.post<{ lesson: Lesson }>(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.lesson;
  }, "Failed to create lesson");

// Update a lesson by ID (multipart/form-data)
export const updateLesson = (id: string, formData: FormData): Promise<Lesson> =>
  safeApiCall(async () => {
    const { data } = await api.put<Lesson>(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }, "Failed to update lesson");

// Delete a lesson by ID
export const deleteLesson = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete lesson");
