import { createContext } from "react";
import type { Problem, ProblemInput, Subject } from "../../../types/code/problem.types";

export interface ProblemContextType {
  problems: Problem[];
  loading: boolean;
  error: string | null;
 fetchProblems: (
  filters?: { subject?: Subject; difficulty?: "easy" | "medium" | "hard" },
  force?: boolean
) => Promise<void>;
  createProblem: (payload: ProblemInput) => Promise<Problem | null>;
  updateProblem: (slug: string, data: Partial<ProblemInput>) => Promise<Problem | null>;
  deleteProblem: (slug: string) => Promise<boolean>;
  getProblemBySlug: (slug: string) => Promise<Problem | null>;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);
export default ProblemContext;
