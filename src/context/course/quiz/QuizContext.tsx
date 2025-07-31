import { createContext } from 'react';
import type { QuizContextProps } from '../../../types/course/quiz.types';

export const QuizContext = createContext<QuizContextProps | undefined>(undefined);
