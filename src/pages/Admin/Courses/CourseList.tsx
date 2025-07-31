import React, {  useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCourse } from "../../../hooks/course/userCourse";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const ITEMS_PER_PAGE = 5;

const CourseList: React.FC = () => {
  const { courses = [], deleteCourse, loading, error } = useCourse();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

//   console.log(courses)



  // Filter courses safely
const filteredCourses = useMemo(() => {
  return courses.filter((c) =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [courses, searchTerm]);


  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
     <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Courses</h2>
        <Link
          to="/admin/courses/create"
          className="flex items-center gap-2 bg-gradient-to-r from-accent to-secondary text-white px-4 py-2 rounded-md hover:opacity-90 transition-all"
        >
          <AiOutlinePlus size={18} /> Create Course
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by course title..."
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />

      {loading && <CustomLoading message="Loading courses..." />}
      {error && <CustomError message={error} />}

      {!loading && paginatedCourses.length === 0 && (
        <p className="text-center text-gray-500">No courses found.</p>
      )}

      {!loading && paginatedCourses.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Published</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-dark/30">
                  <td className="p-3 border-b">{course.title}</td>
                  <td className="p-3 border-b">₹{course.price}</td>
                  <td className="p-3 border-b">
                    {course.isPublished ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="p-3 border-b flex gap-3">
                    <Link
                      to={`/admin/courses/edit/${course._id}`}
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <AiOutlineEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-red-500 hover:underline flex items-center gap-1"
                    >
                      <AiOutlineDelete /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
    </AnimatedSection>
  );
};

export default CourseList;
