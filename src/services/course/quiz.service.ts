import api from "../axios.service";
import type { Quiz } from "../../types/course/quiz.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/quiz";

// Fetch all quizzes
export const getAllQuizzes = (): Promise<Quiz[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ quizzes: Quiz[] }>(API_URL);
    return data.quizzes;
  }, "Failed to fetch quizzes");

// Fetch a quiz by ID
export const getQuizById = (id: string): Promise<Quiz> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ quiz: Quiz }>(`${API_URL}/${id}`);
    return data.quiz;
  }, "Failed to fetch quiz");

// Create a new quiz
export const createQuiz = (payload: {
  course: string;
  question: string;
  options: string[];
  correctAnswer: string;
}): Promise<Quiz> =>
  safeApiCall(async () => {
    const { data } = await api.post<{ quiz: Quiz }>(API_URL, payload);
    return data.quiz;
  }, "Failed to create quiz");

// Update an existing quiz
export const updateQuiz = (
  id: string,
  payload: { question?: string; options?: string[]; correctAnswer?: string }
): Promise<Quiz> =>
  safeApiCall(async () => {
    const { data } = await api.put<{ updated: Quiz }>(`${API_URL}/${id}`, payload);
    return data.updated;
  }, "Failed to update quiz");

// Delete a quiz
export const deleteQuiz = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete quiz");
