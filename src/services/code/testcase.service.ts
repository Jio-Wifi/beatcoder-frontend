import type { TestCase, TestCaseInput } from "../../types/code/testcase.type";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";

// ✅ Get all test cases by problem ID
export const fetchTestCasesApi = (problemId: string): Promise<TestCase[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ testCases: TestCase[] }>(`/testcase/problem/${problemId}`);
    return res.data.testCases;
  }, "Failed to fetch test cases");

// ✅ Get a single test case by ID
export const getTestCaseByIdApi = (id: string): Promise<TestCase> =>
  safeApiCall(async () => {
    const res = await api.get<{ testCase: TestCase }>(`/testcase/${id}`);
    return res.data.testCase;
  }, "Failed to fetch test case");

// ✅ Create a new test case (Admin)
export const createTestCaseApi = (input: TestCaseInput): Promise<TestCase> =>
  safeApiCall(async () => {
    const res = await api.post<{ testCase: TestCase }>("/testcase", input);
    return res.data.testCase;
  }, "Failed to create test case");

// ✅ Update a test case (Admin)
export const updateTestCaseApi = (id: string, input: Partial<TestCaseInput>): Promise<TestCase> =>
  safeApiCall(async () => {
    const res = await api.put<{ testCase: TestCase }>(`/testcase/${id}`, input);
    return res.data.testCase;
  }, "Failed to update test case");

// ✅ Delete a test case (Admin)
export const deleteTestCaseApi = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const res = await api.delete<{ message: string }>(`/testcase/${id}`);
    return res.data;
  }, "Failed to delete test case");


  // 🔹 New: Fetch test cases for a specific problem (Authenticated route)
export const getTestCasesByProblemApi = (problemId: string): Promise<TestCase[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ testCases: TestCase[] }>(`/testcase/problem/${problemId}`);
    return res.data.testCases;
  }, "Failed to fetch test cases by problem");