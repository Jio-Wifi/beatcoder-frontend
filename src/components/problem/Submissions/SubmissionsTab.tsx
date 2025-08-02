import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSubmission } from "../../../hooks/code/useSubmission";
import CustomLoading from "../../Common/CustomLoading";
import CustomMessage from "../../Custom/CustomMessage";
import useAuth from "../../../hooks/auth/useAuth";

const SubmissionsTab: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { hasRefreshed, isLoggedIn } = useAuth();

  const {
    submissions = [],
    loading,
    error,
    fetchMySubmissionsBySlug,
  } = useSubmission();

  // Fetch user's submissions for the current problem slug
  useEffect(() => {
    if (slug && hasRefreshed && isLoggedIn) {
      fetchMySubmissionsBySlug(slug);
    }
  }, [slug, hasRefreshed, isLoggedIn, fetchMySubmissionsBySlug]);

  const handleRowClick = useCallback(
    (submissionId: string) => {
      if (slug) {
        navigate(`/problems/${slug}/submissions/${submissionId}`);
      }
    },
    [navigate, slug]
  );

  if (loading) {
    return <CustomLoading message="Loading your submissions..." />;
  }

  if (error) {
    return (
      <div className="p-4">
        <CustomMessage type="error" message={error} />
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <div className="p-4">
        <CustomMessage type="info" message="You haven’t submitted any solutions yet." />
      </div>
    );
  }

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-sm">
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Problem</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Language</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Execution Time</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => {
            const statusColor =
              sub.status === "Accepted"
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";

            return (
              <tr
                key={sub._id}
                onClick={() => handleRowClick(sub._id)}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <td className="px-4 py-2 text-accent hover:underline">
                  {slug || "Unknown Problem"}
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-2">{sub.language || "N/A"}</td>
                <td className="px-4 py-2">
                  {sub.executionTime ? `${sub.executionTime} ms` : "N/A"}
                </td>
                <td className="px-4 py-2">
                  {sub.createdAt
                    ? new Date(sub.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTab;
