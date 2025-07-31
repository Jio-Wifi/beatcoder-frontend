import type { Lesson } from "./lesson.types";

export interface Instructor {
  _id: string;
  name: string;
  email?: string;
}


export interface Course {
  _id: string;
  title: string;
  description?: string;
  category?: string;          // Category ID as a string
  lessons?: Lesson[];         // Array of lesson IDs
  instructor?: Instructor;        // Instructor ID
  price?: number;
  isPublished?: boolean;
  rating?: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt?: string;         
  thumbnailPath?: string;
  videoPath?: string;
}


export interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

// Reducer actions for managing state
export type CourseAction =
  | { type: "FETCH_COURSES_START" }
  | { type: "FETCH_COURSES_SUCCESS"; payload: Course[] }
  | { type: "FETCH_COURSES_ERROR"; payload: string }
  | { type: "SELECT_COURSE"; payload: Course | null }
  | { type: "CREATE_COURSE_START" }
  | { type: "CREATE_COURSE_SUCCESS"; payload: Course }
  | { type: "CREATE_COURSE_ERROR"; payload: string }
  | { type: "UPDATE_COURSE_SUCCESS"; payload: Course }
  | { type: "DELETE_COURSE_SUCCESS"; payload: string };
