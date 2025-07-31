import { createContext } from 'react';
import type { ProgressContextProps } from '../../../types/course/progress.types';

export const ProgressContext = createContext<ProgressContextProps | undefined>(undefined);
