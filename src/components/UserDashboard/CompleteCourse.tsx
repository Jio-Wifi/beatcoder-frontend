import React from "react";
import { FiBookOpen, FiCheckCircle } from "react-icons/fi";

export interface CompletedCourse {
  name: string;
  lessonsCompleted: number;
  totalLessons: number;
}

interface CompleteCourseProps {
  courses: CompletedCourse[];
}

const CompleteCourse: React.FC<CompleteCourseProps> = ({ courses }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-accent">
        <FiBookOpen /> Completed Courses
      </h3>

      {!courses.length ? (
        <div className="p-4 text-center text-secondary dark:text-accent bg-dime dark:bg-dark rounded-lg shadow">
          No completed courses yet.
        </div>
      ) : (
        courses.map((course, idx) => {
          const progress = Math.round((course.lessonsCompleted / course.totalLessons) * 100);

          return (
            <div
              key={idx}
              className="bg-dime dark:bg-primary p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-200 space-y-2"
              ref={(el) => {
                if (el) {
                  el.style.setProperty("--progress", `${progress}%`);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-dark dark:text-white">{course.name}</p>
                <span className="flex items-center text-success text-sm">
                  <FiCheckCircle className="mr-1" /> {progress}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-dark rounded-full h-2 overflow-hidden">
                <div className="progress-bar h-2 bg-success rounded-full transition-all duration-300" />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CompleteCourse;
