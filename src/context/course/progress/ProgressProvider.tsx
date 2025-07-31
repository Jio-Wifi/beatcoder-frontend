// src/context/ProgressProvider.tsx
import React, { useState, useCallback } from 'react';
import { ProgressContext } from './ProgressContext';
import {
  getAllProgresses,
  getProgressById,
  createProgress as createProgressAPI,
  updateProgress as updateProgressAPI,
  deleteProgress as deleteProgressAPI,
} from '../../../services/course/progress.service';
import type { Progress } from '../../../types/course/progress.types';

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [selectedProgress, setSelectedProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProgresses();
      setProgresses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProgressById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProgressById(id);
      setSelectedProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProgress = useCallback(async (payload: { user: string; course: string; completedLessons?: string[] }) => {
    setLoading(true);
    setError(null);
    try {
      const newProgress = await createProgressAPI(payload);
      setProgresses((prev) => [...prev, newProgress]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create progress');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (id: string, payload: { completedLessons?: string[] }) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProgressAPI(id, payload);
      setProgresses((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProgress = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProgressAPI(id);
      setProgresses((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete progress');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progresses,
        selectedProgress,
        loading,
        error,
        fetchProgresses,
        fetchProgressById,
        createProgress,
        updateProgress,
        deleteProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
