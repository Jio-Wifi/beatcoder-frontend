
import type { Course } from "./course.types";



export interface Lesson {
  _id: string;
  title: string;
  content: string;
  videoUrl?: string;
  videoDescription?: string;
  videoDuration?: number; // in seconds
  videoType?: 'mp4' | 'youtube' | 'vimeo';
  transcript?: string;
  resources?: string[];
  isFreePreview?: boolean;
    course: string | Course;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface LessonState {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

export interface LessonContextProps extends LessonState {
  fetchLessons: (courseId?: string) => Promise<void>;
  fetchLessonById: (id: string) => Promise<void>;
  createLesson: (data: FormData) => Promise<void>;
  updateLesson: (id: string, data: FormData) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
}
