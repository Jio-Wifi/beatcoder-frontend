import { useContext } from 'react';
import { LessonContext } from '../../context/course/lesson/LessonContext';

export const useLesson = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
};
