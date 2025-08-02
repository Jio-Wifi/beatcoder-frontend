
export type Subject =
  | "Arrays"
  | "Strings"
  | "Linked List"
  | "Stack"
  | "Queue"
  | "Hashing"
  | "Trees"
  | "Graphs"
  | "Recursion"
  | "Dynamic Programming"
  | "Greedy"
  | "Heap"
  | "Trie"
  | "Sorting & Searching"
  | "Bit Manipulation";

export interface VideoSolution {
  title: string;
  url: string;
  duration?: string;
  language?: string;
  codeLanguage?: "C++" | "JavaScript" | "Python" | "Java";
  isPremium?: boolean;
  thumbnail?: string;
  description?: string;
  uploadedBy?: string;
  createdAt?: Date;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  testCases?: string[];
  constraints?: string;
  subject?: Subject;
  starterCode?: Record<string, string>;
  videoSolutions?: VideoSolution[];
  createdAt?: string;
}

export type ProblemInput = Omit<Problem, "_id" | "createdAt" | "videoSolutions"> & {
  videoSolutions?: VideoSolution[];
};
