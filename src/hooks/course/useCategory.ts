import { useContext } from 'react';
import { CategoryContext } from '../../context/course/category/CategoryContext';

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
