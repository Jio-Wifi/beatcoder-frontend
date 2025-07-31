// src/context/CourseProvider.tsx
import React, { useState, useCallback, useEffect } from "react";
import {
  getAllCourses,
  getCourseById,
  createCourse as createCourseAPI,
  updateCourse as updateCourseAPI,
  deleteCourse as deleteCourseAPI,
} from "../../../services/course/course.service";
import type { Course } from "../../../types/course/course.types";
import CourseContext from "./CourseContext";
import useAuth from "../../../hooks/auth/useAuth"; // Optional for admin-only checks

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCourseById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourseById(id);
      setSelectedCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch course");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(
    async (formData: FormData): Promise<boolean> => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return false;
      }
      setLoading(true);
      setError(null);
      try {
        const newCourse = await createCourseAPI(formData);
        setCourses((prev) => [...prev, newCourse]);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create course");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  const updateCourse = useCallback(
    async (id: string, formData: FormData): Promise<boolean> => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return false;
      }
      setLoading(true);
      setError(null);
      try {
        const updated = await updateCourseAPI(id, formData);
        setCourses((prev) =>
          prev.map((course) => (course._id === updated._id ? updated : course))
        );
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update course");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  const deleteCourse = useCallback(
    async (id: string): Promise<boolean> => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return false;
      }
      setLoading(true);
      setError(null);
      try {
        await deleteCourseAPI(id);
        setCourses((prev) => prev.filter((course) => course._id !== id));
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete course");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        selectedCourse,
        loading,
        error,
        fetchCourses,
        fetchCourseById,
        createCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
