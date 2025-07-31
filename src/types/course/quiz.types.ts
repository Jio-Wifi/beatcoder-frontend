
export interface Quiz {
  _id: string;
  course: string;       
  question: string;
  options: string[];    
  correctAnswer: string; 
  createdAt: string;
  updatedAt: string;
}

export interface QuizState {
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

export interface QuizContextProps extends QuizState {
  fetchQuizzes: () => Promise<void>;
  fetchQuizById: (id: string) => Promise<void>;
  createQuiz: (data: { course: string; question: string; options: string[]; correctAnswer: string }) => Promise<void>;
  updateQuiz: (id: string, data: { question?: string; options?: string[]; correctAnswer?: string }) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
}
