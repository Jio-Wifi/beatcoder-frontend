// src/context/QuizProvider.tsx
import React, { useState, useCallback } from 'react';
import { QuizContext } from './QuizContext';
import {
  getAllQuizzes,
  getQuizById,
  createQuiz as createQuizAPI,
  updateQuiz as updateQuizAPI,
  deleteQuiz as deleteQuizAPI,
} from '../../../services/course/quiz.service';
import type { Quiz } from '../../../types/course/quiz.types';

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQuizById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuizById(id);
      setSelectedQuiz(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz');
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuiz = useCallback(async (payload: { course: string; question: string; options: string[]; correctAnswer: string }) => {
    setLoading(true);
    setError(null);
    try {
      const newQuiz = await createQuizAPI(payload);
      setQuizzes((prev) => [...prev, newQuiz]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuiz = useCallback(async (id: string, payload: { question?: string; options?: string[]; correctAnswer?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateQuizAPI(id, payload);
      setQuizzes((prev) => prev.map((q) => (q._id === id ? updated : q)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quiz');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteQuiz = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteQuizAPI(id);
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quiz');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        selectedQuiz,
        loading,
        error,
        fetchQuizzes,
        fetchQuizById,
        createQuiz,
        updateQuiz,
        deleteQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
