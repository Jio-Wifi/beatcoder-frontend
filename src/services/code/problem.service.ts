import type { Problem, ProblemInput, Subject } from "../../types/code/problem.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

const API_URL = "/problems";

export const fetchAllProblemsApi = async (
  filters?: { subject?: Subject; difficulty?: "easy" | "medium" | "hard" }
): Promise<Problem[]> =>
  safeApiCall(async () => {
    let url = "/problems";

    const params: string[] = [];
    if (filters?.subject) {
      params.push(`subject=${encodeURIComponent(filters.subject)}`);
    }
    if (filters?.difficulty) {
      params.push(`difficulty=${encodeURIComponent(filters.difficulty)}`);
    }

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    const { data } = await api.get<{ problems: Problem[] }>(url, {
      headers: {
        Authorization: undefined, // Ensure public access
      },
    });

    return data.problems;
  }, "Failed to fetch problems");

export const getProblemBySlugApi = (slug: string): Promise<Problem> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ problem: Problem }>(`${API_URL}/${slug}`);
    return data.problem;
  }, "Failed to fetch problem");

/**
 * Create a new problem (Admin only)
 */
export const createProblemApi = (payload: ProblemInput): Promise<Problem> =>
  safeApiCall(async () => {
    const { data } = await api.post<{ message: string; problem: Problem }>(
      API_URL,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data.problem;
  }, "Failed to create problem");

/**
 * Update an existing problem by slug (Admin only)
 */
export const updateProblemApi = (
  slug: string,
  payload: Partial<ProblemInput>
): Promise<Problem> =>
  safeApiCall(async () => {
    const { data } = await api.put<{ message: string; updated: Problem }>(
      `${API_URL}/${slug}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data.updated;
  }, "Failed to update problem");

/**
 * Delete a problem by slug (Admin only)
 */
export const deleteProblemApi = (slug: string): Promise<string> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(
      `${API_URL}/${slug}`
    );
    return data.message;
  }, "Failed to delete problem");
