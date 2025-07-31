import type { User } from "../user/user.types";
import type { Course } from "./course.types";


export interface Progress {
  _id: string;
  user: string | User;     
  course: string | Course; 
  completedLessons: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgressState {
  progresses: Progress[];
  selectedProgress: Progress | null;
  loading: boolean;
  error: string | null;
}

export interface ProgressContextProps extends ProgressState {
  fetchProgresses: () => Promise<void>;
  fetchProgressById: (id: string) => Promise<void>;
  createProgress: (data: { user: string; course: string; completedLessons?: string[] }) => Promise<void>;
  updateProgress: (id: string, data: { completedLessons?: string[] }) => Promise<void>;
  deleteProgress: (id: string) => Promise<void>;
}
