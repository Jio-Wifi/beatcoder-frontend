import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../../hooks/course/useQuiz";
import { useCourse } from "../../../hooks/course/userCourse";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomButton from "../../../components/Custom/CustomButton";

const ITEMS_PER_PAGE = 5;

const QuizList: React.FC = () => {
  const { quizzes, fetchQuizzes, deleteQuiz, loading, error } = useQuiz();
  const { courses, fetchCourses } = useCourse();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchQuizzes();
  }, [fetchCourses, fetchQuizzes]);

  const getCourseTitle = (id: string) => {
    const course = courses.find((c) => c._id === id);
    return course ? course.title : "Unknown Course";
  };

  const filtered = quizzes.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Quizzes</h2>
          <Link to="/admin/quizzes/create">
            <CustomButton className="bg-accent text-white">+ Create Quiz</CustomButton>
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by question..."
          className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading && <CustomLoading message="Loading quizzes..." />}
        {error && <CustomError message={error} />}
        {!loading && paginated.length === 0 && (
          <p className="text-center text-gray-500">No quizzes found.</p>
        )}

        {!loading && paginated.length > 0 && (
          <table className="min-w-full border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark">
                <th className="p-3 border-b">Course</th>
                <th className="p-3 border-b">Question</th>
                <th className="p-3 border-b">Correct Answer</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((quiz) => (
                <tr key={quiz._id} className="hover:bg-gray-50 dark:hover:bg-dark/30">
                  <td className="p-3 border-b">{getCourseTitle(quiz.course)}</td>
                  <td className="p-3 border-b">{quiz.question}</td>
                  <td className="p-3 border-b">{quiz.correctAnswer}</td>
                  <td className="p-3 border-b flex gap-3">
                    <Link
                      to={`/admin/quizzes/update/${quiz._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteQuiz(quiz._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default QuizList;
