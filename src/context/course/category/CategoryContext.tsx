import { createContext } from 'react';
import type { CategoryContextProps } from '../../../types/course/category.types';

export const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);
