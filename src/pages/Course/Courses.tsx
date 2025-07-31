import React from "react";
import { useCourse } from "../../hooks/course/userCourse";
import CourseCard from "../../components/Course/CourseCard";

const Courses: React.FC = () => {
  const { courses, loading, error } = useCourse();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white p-6">
      <div className="max-w-container mt-8 mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl flex flex-col gap-2 font-bold text-primary dark:text-success mb-4">
          <small className="text-success dark:text-light text-sm font-semibold">
            Welcome to
          </small>{" "}
          <span className="text-danger">BeatCoder Courses</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Learn, practice, and master coding with interactive courses designed for every level.
        </p>

        {loading && <p className="text-gray-500">Loading courses...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
