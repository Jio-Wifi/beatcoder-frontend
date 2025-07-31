import { createContext } from 'react';
import type { ReviewContextProps } from '../../../types/course/review.types';

export const ReviewContext = createContext<ReviewContextProps | undefined>(undefined);
