import { createContext } from "react";
import type { Course } from "../../../types/course/course.types";

export interface CourseContextProps {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;

  // CRUD methods
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  createCourse: (formData: FormData) => Promise<boolean>;
  updateCourse: (id: string, formData: FormData) => Promise<boolean>;
  deleteCourse: (id: string) => Promise<boolean>;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export default CourseContext;
