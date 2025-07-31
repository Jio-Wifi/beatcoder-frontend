import { createContext } from 'react';
import type { InstructorContextProps } from '../../../types/course/instructor.types';

export const InstructorContext = createContext<InstructorContextProps | undefined>(undefined);
