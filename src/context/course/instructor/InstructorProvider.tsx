import React, { useState, useCallback, useEffect } from "react";
import { InstructorContext } from "./InstructorContext";
import {
  getAllInstructors,
  getInstructorById,
  createInstructor as createInstructorAPI,
  updateInstructor as updateInstructorAPI,
  deleteInstructor as deleteInstructorAPI,
} from "../../../services/course/instructor.service";
import type { Instructor } from "../../../types/course/instructor.types";

export const InstructorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllInstructors();
      setInstructors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch instructors");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInstructorById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInstructorById(id);
      setSelectedInstructor(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch instructor");
    } finally {
      setLoading(false);
    }
  }, []);

  const createInstructor = useCallback(
    async (payload: { user: string; bio: string; expertise: string[] }): Promise<Instructor | null> => {
      setLoading(true);
      setError(null);
      try {
        const newInstructor = await createInstructorAPI(payload);
        setInstructors((prev) => [...prev, newInstructor]);
        return newInstructor;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create instructor");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateInstructor = useCallback(
    async (id: string, payload: { bio?: string; expertise?: string[] }): Promise<Instructor | null> => {
      setLoading(true);
      setError(null);
      try {
        const updated = await updateInstructorAPI(id, payload);
        setInstructors((prev) => prev.map((i) => (i._id === id ? updated : i)));
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update instructor");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteInstructor = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteInstructorAPI(id);
      setInstructors((prev) => prev.filter((i) => i._id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete instructor");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        selectedInstructor,
        loading,
        error,
        fetchInstructors,
        fetchInstructorById,
        createInstructor,
        updateInstructor,
        deleteInstructor,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};
