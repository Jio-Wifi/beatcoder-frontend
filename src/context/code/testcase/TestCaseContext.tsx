import { createContext } from "react";
import type { TestCase, TestCaseInput } from "../../../types/code/testcase.type";

interface TestCaseContextType {
  testCases: TestCase[];
  loading: boolean;
  error: string | null;
  fetchTestCases: (problemId: string) => Promise<void>;
  getTestCasesByProblem: (problemId: string) => Promise<TestCase[]>; 
   getTestCaseById: (id: string) => Promise<TestCase | null>;
  createTestCase: (input: TestCaseInput) => Promise<void>;
  updateTestCase: (id: string, input: Partial<TestCaseInput>) => Promise<void>;
  deleteTestCase: (id: string) => Promise<void>;
}

export const TestCaseContext = createContext<TestCaseContextType | undefined>(undefined);
