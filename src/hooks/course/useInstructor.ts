import { useContext } from 'react';
import { InstructorContext } from '../../context/course/instructor/InstructorContext';

export const useInstructor = () => {
  const context = useContext(InstructorContext);
  if (!context) {
    throw new Error('useInstructor must be used within an InstructorProvider');
  }
  return context;
};
