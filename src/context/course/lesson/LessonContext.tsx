
import { createContext } from 'react';
import type { LessonContextProps } from '../../../types/course/lesson.types';

export const LessonContext = createContext<LessonContextProps | undefined>(undefined);
