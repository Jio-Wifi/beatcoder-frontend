import { useCallback, useState } from "react";
import { TestCaseContext } from "./TestCaseContext";
import type { TestCase, TestCaseInput } from "../../../types/code/testcase.type";
import {
  createTestCaseApi,
  deleteTestCaseApi,
  fetchTestCasesApi,
  getTestCaseByIdApi,
  updateTestCaseApi,
  getTestCasesByProblemApi,
} from "../../../services/code/testcase.service";

export const TestCaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestCases = useCallback(async (problemId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTestCasesApi(problemId);
      setTestCases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch test cases");
    } finally {
      setLoading(false);
    }
  }, []);

  const getTestCasesByProblem = useCallback(async (problemId: string): Promise<TestCase[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTestCasesByProblemApi(problemId);
      setTestCases(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch test cases by problem");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getTestCaseById = useCallback(async (id: string): Promise<TestCase | null> => {
    setLoading(true);
    setError(null);
    try {
      return await getTestCaseByIdApi(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch test case");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTestCase = useCallback(async (input: TestCaseInput) => {
    setLoading(true);
    setError(null);
    try {
      const newTest = await createTestCaseApi(input);
      setTestCases((prev) => [newTest, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create test case");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTestCase = useCallback(async (id: string, input: Partial<TestCaseInput>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTestCaseApi(id, input);
      setTestCases((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update test case");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTestCase = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTestCaseApi(id);
      setTestCases((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete test case");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TestCaseContext.Provider
      value={{
        testCases,
        loading,
        error,
        fetchTestCases,
        getTestCasesByProblem,
        getTestCaseById,
        createTestCase,
        updateTestCase,
        deleteTestCase,
      }}
    >
      {children}
    </TestCaseContext.Provider>
  );
};
