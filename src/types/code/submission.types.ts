export interface SubmissionInput {
  code: string;
  language: string;
  problem: string;
  isRunOnly?: boolean;
  executionTime?: number; // Optional, sent when Judge0 provides it
  memory?: number; // Optional, sent when Judge0 provides it
}

export type RunResult = {
  compile_output: string | null; // Output from compiler, if any
  stderr: string | null; // Standard error output from program
  stdout: string | null; // Standard output from program

  message: string; // Custom message (your system’s)
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Compilation Error";

  passed: number; // Test cases passed
  failed: number; // Test cases failed
  total: number; // Total test cases

  executionTime: number; // in ms
  memory?: number; // in KB

  output: string; // Final aggregated output
  error: string; // Final aggregated error message

  language?: string; // Optional (used if running multiple langs)
};

export type ProblemType = {
  _id: string;
  title: string;
  slug: string;
  difficulty: string;
};

export interface RecentAccepted {
  title?: string;
  slug?: string;
  difficulty?: "easy" | "medium" | "hard";
  solvedAt: string;
}

export interface Submission {
  _id: string;
  user: string;
  problem: ProblemType;
  code: string;
  language: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Compilation Error";
  output?: string;
  error?: string;
  executionTime?: number; // ms
  memory?: number; // KB (matches backend schema)
  createdAt: string;
}

export type ProblemSubmissionsResponse = {
  problemId: string;
  submissions: Submission[];
};

export interface LanguageStats {
  language: string;
  problemsSolved: number;
}

export interface SubmissionActivity {
  date: string;
  count: number;
}
