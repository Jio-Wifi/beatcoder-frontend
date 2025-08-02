import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useProgress } from "../../../hooks/course/useProgress";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const ITEMS_PER_PAGE = 5;

const ProgressTracker: React.FC = () => {
  const { progresses, fetchProgresses, deleteProgress, loading, error } = useProgress();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch progress data on mount
  useEffect(() => {
    fetchProgresses();
  }, [fetchProgresses]);

  // Filter progresses by user name or course title, safely checking types
  const filteredProgress = useMemo(() => {
    return progresses.filter((progress) => {
      const userName =
        typeof progress.user === "object" && progress.user !== null
          ? progress.user.name.toLowerCase()
          : "";
      const courseTitle =
        typeof progress.course === "object" && progress.course !== null
          ? progress.course.title.toLowerCase()
          : "";

      const term = searchTerm.toLowerCase();
      return userName.includes(term) || courseTitle.includes(term);
    });
  }, [progresses, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProgress.length / ITEMS_PER_PAGE);
  const paginatedProgress = filteredProgress.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this progress record?")) {
      await deleteProgress(id);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Progress Tracker</h2>

        <input
          type="text"
          placeholder="Search by user or course..."
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        {loading && <CustomLoading message="Loading user progress..." />}
        {error && <CustomError message={error} />}

        {!loading && paginatedProgress.length === 0 && (
          <p className="text-center text-gray-500">No progress records found.</p>
        )}

        {!loading && paginatedProgress.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark">
                  <th className="p-3 border-b">User</th>
                  <th className="p-3 border-b">Course</th>
                  <th className="p-3 border-b">Completed Lessons</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProgress.map((progress) => {
                  const userName =
                    typeof progress.user === "object" && progress.user !== null
                      ? progress.user.name
                      : "Unknown User";

                  const courseTitle =
                    typeof progress.course === "object" && progress.course !== null
                      ? progress.course.title
                      : "Unknown Course";

                  return (
                    <tr key={progress._id} className="hover:bg-gray-50 dark:hover:bg-dark/30">
                      <td className="p-3 border-b">{userName}</td>
                      <td className="p-3 border-b">{courseTitle}</td>
                      <td className="p-3 border-b">{progress.completedLessons.length}</td>
                      <td className="p-3 border-b">
                        <button
                          onClick={() => handleDelete(progress._id)}
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

        {/* Pagination controls */}
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

export default ProgressTracker;
