import React, { useState, useCallback, useEffect } from 'react';
import { LessonContext } from './LessonContext';
import {
  getAllLessons,
  getLessonsByCourseId,
  getLessonById,
  createLesson as createLessonAPI,
  updateLesson as updateLessonAPI,
  deleteLesson as deleteLessonAPI,
} from '../../../services/course/lesson.service';
import type { Lesson } from '../../../types/course/lesson.types';

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = useCallback(async (courseId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = courseId
        ? await getLessonsByCourseId(courseId)
        : await getAllLessons();
      setLessons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lessons');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLessonById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLessonById(id);
      setSelectedLesson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lesson');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLesson = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const newLesson = await createLessonAPI(formData);
      setLessons((prev) => [...prev, newLesson]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lesson');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLesson = useCallback(async (id: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateLessonAPI(id, formData);
      setLessons((prev) => prev.map((l) => (l._id === id ? updated : l)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lesson');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLesson = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteLessonAPI(id);
      setLessons((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lesson');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return (
    <LessonContext.Provider
      value={{
        lessons,
        selectedLesson,
        loading,
        error,
        fetchLessons,
        fetchLessonById,
        createLesson,
        updateLesson,
        deleteLesson,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};
