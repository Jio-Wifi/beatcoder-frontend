import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useLesson } from "../../../hooks/course/useLesson";
import { useCourse } from "../../../hooks/course/userCourse";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomLink from "../../../components/Custom/CustomLink";

const ITEMS_PER_PAGE = 5;

const LessonList: React.FC = () => {
  const { lessons, fetchLessons, deleteLesson, loading, error } = useLesson();
  const { courses, fetchCourses } = useCourse();

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch courses and lessons once
  useEffect(() => {
    fetchCourses();
    fetchLessons();
  }, [fetchCourses, fetchLessons]);

  // Filter lessons by selected course & search term
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const course =
        typeof lesson.course === "object" ? lesson.course : null;
      const courseTitle = course?.title?.toLowerCase() || "";
      const lessonTitle = lesson.title?.toLowerCase() || "";
      const matchesCourse =
        !selectedCourseId ||
        (course?._id && course._id === selectedCourseId);
      const matchesSearch =
        lessonTitle.includes(searchTerm.toLowerCase()) ||
        courseTitle.includes(searchTerm.toLowerCase());
      return matchesCourse && matchesSearch;
    });
  }, [lessons, selectedCourseId, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / ITEMS_PER_PAGE);
  const paginatedLessons = filteredLessons.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      await deleteLesson(id);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Lessons</h2>

        {/* Course Tabs */}
        <div className="flex gap-3 mb-4 overflow-x-auto">
          <button
            onClick={() => {
              setSelectedCourseId("");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-md ${
              selectedCourseId === ""
                ? "bg-accent text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            All Lesson
          </button>
          {courses.map((course) => (
            <button
              key={course._id}
              onClick={() => {
                setSelectedCourseId(course._id);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-md ${
                selectedCourseId === course._id
                  ? "bg-accent text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {course.title}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by lesson or course..."
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        {loading && <CustomLoading message="Loading lessons..." />}
        {error && <CustomError message={error} />}

        {!loading && paginatedLessons.length === 0 && (
          <p className="text-center text-gray-500">No lessons found.</p>
        )}

        {!loading && paginatedLessons.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark">
                  <th className="p-3 border-b">Lesson Title</th>
                  <th className="p-3 border-b">Course</th>
                  <th className="p-3 border-b">Order</th>
                  <th className="p-3 border-b">Preview</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLessons.map((lesson) => {
                  const course =
                    typeof lesson.course === "object" ? lesson.course : null;
                  return (
                    <tr
                      key={lesson._id}
                      className="hover:bg-gray-50 dark:hover:bg-dark/30"
                    >
                      <td className="p-3 border-b">{lesson.title}</td>
                      <td className="p-3 border-b">
                        {course?.title || "Unknown Course"}
                      </td>
                      <td className="p-3 border-b">{lesson.order}</td>
                      <td className="p-3 border-b">
                        {lesson.isFreePreview ? (
                          <span className="text-green-600">Yes</span>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </td>
                   {/* // Inside your table row: */}
<td className="p-3 border-b flex gap-3">
  <CustomLink
    to={`/admin/lessons/edit/${lesson._id}`}
    className="text-blue-500 hover:underline flex items-center gap-1"
  >
    <AiOutlineEdit /> Edit
  </CustomLink>
  <button
    onClick={() => handleDelete(lesson._id)}
    className="text-red-500 hover:underline flex items-center gap-1"
  >
    <AiOutlineDelete /> Delete
  </button>
</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
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

export default LessonList;
