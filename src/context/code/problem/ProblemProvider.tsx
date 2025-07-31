// src/context/code/ProblemProvider.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProblemContext from "./ProblemContext";
import {
  fetchAllProblemsApi,
  createProblemApi,
  updateProblemApi,
  deleteProblemApi,
  getProblemBySlugApi,
} from "../../../services/code/problem.service";
import type { Problem, ProblemInput, Subject } from "../../../types/code/problem.types";

interface ProblemProviderProps {
  children: React.ReactNode;
}

export const ProblemProvider: React.FC<ProblemProviderProps> = ({ children }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false);

  /** Fetch all problems (skip duplicate calls unless forced) */
const fetchProblems = useCallback(
  async (
    filters?: { subject?: Subject; difficulty?: "easy" | "medium" | "hard" },
    force = false
  ) => {
    if (!force && fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllProblemsApi(filters);
      setProblems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  },
  []
);
  /** Get single problem by slug */
  const getProblemBySlug = useCallback(async (slug: string): Promise<Problem | null> => {
    setLoading(true);
    setError(null);
    try {
      return await getProblemBySlugApi(slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch problem");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Create a new problem */
  const createProblem = useCallback(async (payload: ProblemInput): Promise<Problem | null> => {
    try {
      const newProblem = await createProblemApi(payload);
      setProblems((prev) => [...prev, newProblem]);
      return newProblem;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create problem");
      return null;
    }
  }, []);

  /** Update an existing problem */
  const updateProblem = useCallback(
    async (slug: string, data: Partial<ProblemInput>): Promise<Problem | null> => {
      setLoading(true);
      setError(null);
      try {
        const updated = await updateProblemApi(slug, data);
        setProblems((prev) => prev.map((p) => (p.slug === slug ? updated : p)));
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update problem");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /** Delete a problem */
  const deleteProblem = useCallback(async (slug: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteProblemApi(slug);
      setProblems((prev) => prev.filter((p) => p.slug !== slug));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete problem");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch problems when mounted (once unless forced)
  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  return (
    <ProblemContext.Provider
      value={{
        problems,
        loading,
        error,
        fetchProblems,
        getProblemBySlug,
        createProblem,
        updateProblem,
        deleteProblem,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};
