import { createContext } from "react";
import type {
  LanguageStats,
  RunResult,
  Submission,
  SubmissionInput,
  SubmissionActivity,
  RecentAccepted, 
} from "../../../types/code/submission.types";

export interface SubmissionContextType {
  submissions: Submission[];
   recentAccepted: RecentAccepted[];
  languageStats: LanguageStats[];
  submissionActivity: SubmissionActivity[]; 

  loading: boolean;
  error: string | null;
  runResult: RunResult | null;

  fetchSubmissionBySlug: (slug: string) => Promise<void>;
  fetchMySubmissionsBySlug: (slug: string) => Promise<void>;
  fetchSubmissions: (problemId: string) => Promise<void>;
  fetchMySubmissions: () => Promise<void>;
  fetchMyRecentAccepted: () => Promise<void>;
  fetchMyLanguagesStats: () => Promise<void>;
  fetchMySubmissionActivity: (days?: number) => Promise<void>;

  createSubmission: (input: SubmissionInput) => Promise<void>;
  runCode: (input: SubmissionInput) => Promise<void>;
}

export const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);


