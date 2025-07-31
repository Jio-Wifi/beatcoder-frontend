export interface PopulatedUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface PopulatedCourse {
  _id: string;
  title: string;
}

export interface Instructor {
  _id: string;
  user: PopulatedUser;         
  bio: string;
  expertise: string[];         
  courses: PopulatedCourse[];  
  createdAt: string;
  updatedAt: string;
}

export interface InstructorState {
  instructors: Instructor[];
  selectedInstructor: Instructor | null;
  loading: boolean;
  error: string | null;
}
export interface InstructorContextProps extends InstructorState {
  fetchInstructors: () => Promise<void>;
  fetchInstructorById: (id: string) => Promise<void>;
  createInstructor: (data: {
    user: string;             
    bio: string;
    expertise: string[];
    courses: string[];         
  }) => Promise<Instructor | null>;
  updateInstructor: (id: string, data: {
    bio?: string;
    expertise?: string[];
    courses?: string[];         
  }) => Promise<Instructor | null>;
  deleteInstructor: (id: string) => Promise<boolean>;
}
