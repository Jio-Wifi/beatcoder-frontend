import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useReview } from "../../../hooks/course/useReview"; // Custom hook for Review context
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const ITEMS_PER_PAGE = 5;

const ReviewList: React.FC = () => {
  const { reviews, fetchReviews, deleteReview, loading, error } = useReview();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch all reviews when the page loads
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Filter reviews based on search term (user name or course title)
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const userName =
        typeof review.user === "object" ? review.user.name?.toLowerCase() : "";
      const courseTitle =
        typeof review.course === "object"
          ? review.course.title?.toLowerCase()
          : "";
  const content = review.comment?.toLowerCase() || "";

      const search = searchTerm.toLowerCase();
      return (
        userName.includes(search) ||
        courseTitle.includes(search) ||
        content.includes(search)
      );
    });
  }, [reviews, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by user, course, or content..."
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        {loading && <CustomLoading message="Loading reviews..." />}
        {error && <CustomError message={error} />}

        {!loading && paginatedReviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}

        {!loading && paginatedReviews.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark">
                  <th className="p-3 border-b">User</th>
                  <th className="p-3 border-b">Course</th>
                  <th className="p-3 border-b">Rating</th>
                  <th className="p-3 border-b">Content</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReviews.map((review) => {
                  const user =
                    typeof review.user === "object" ? review.user : null;
                  const course =
                    typeof review.course === "object" ? review.course : null;
                  return (
                    <tr
                      key={review._id}
                      className="hover:bg-gray-50 dark:hover:bg-dark/30"
                    >
                      <td className="p-3 border-b">{user?.name || "Unknown"}</td>
                      <td className="p-3 border-b">
                        {course?.title || "Unknown Course"}
                      </td>
                      <td className="p-3 border-b">{review.rating}</td>
                      <td className="p-3 border-b">
                     {review.comment || "No comment"}
                      </td>
                      <td className="p-3 border-b">
                        <button
                          onClick={() => handleDelete(review._id)}
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

export default ReviewList;
