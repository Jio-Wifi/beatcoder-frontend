import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiClock, FiCpu, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSubmission } from "../../../hooks/code/useSubmission";
import CustomLoading from "../../Common/CustomLoading";
import CustomMessage from "../../Custom/CustomMessage";
import type { Submission } from "../../../types/code/submission.types";

// PrismJS
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// Import languages you need:
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
// Add more as needed...

const SubmissionDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const { submissions, loading, error } = useSubmission();
  const [submission, setSubmission] = useState<Submission | null>(null);
  // console.log(submissions)

 useEffect(() => {
  if (Array.isArray(submissions) && submissions.length > 0 && submissionId) {
    const found = submissions.find((s) => s._id === submissionId) || null;
    setSubmission(found);
  }
}, [submissions, submissionId]);


  // Highlight code after submission is loaded
  useEffect(() => {
    Prism.highlightAll();
  }, [submission]);

  if (loading) return <CustomLoading message="Loading submission..." />;

  if (error) {
    return (
      <div className="p-6">
        <CustomMessage type="error" message={error} onClose={() => navigate(-1)} />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="p-6">
        <CustomMessage
          type="info"
          message="Submission not found."
          onClose={() => navigate(-1)}
        />
      </div>
    );
  }

  const isAccepted = submission.status === "Accepted";

  return (
    <div className="p-6 bg-gray-50 dark:bg-dark min-h-screen text-gray-900 dark:text-gray-100 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-accent hover:underline mb-2"
      >
        <FiArrowLeft className="mr-2" /> Back to Submissions
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold">
        Submission for <span className="text-accent uppercase">{slug || "Unknown"}</span>
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Status */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 space-x-4">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              isAccepted ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
            }`}
          >
            {isAccepted ? (
              <FiCheckCircle className="text-green-500 dark:text-green-300 text-2xl" />
            ) : (
              <FiXCircle className="text-red-500 dark:text-red-300 text-2xl" />
            )}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p
              className={`text-2xl font-bold ${
                isAccepted ? "text-green-600" : "text-red-600"
              }`}
            >
              {submission.status}
            </p>
          </div>
        </div>

        {/* Execution Time */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 space-x-4">
          <div className="flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full">
            <FiClock className="text-blue-500 dark:text-blue-300 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Execution Time</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {submission.executionTime || "N/A"} ms
            </p>
          </div>
        </div>

        {/* Memory */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 space-x-4">
          <div className="flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-full">
            <FiCpu className="text-purple-500 dark:text-purple-300 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Memory Usage</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {submission.memory || "N/A"} KB
            </p>
          </div>
        </div>
      </div>

      {/* Code Section */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Submitted Code</h3>
        <div className="rounded-lg overflow-hidden shadow">
          <pre className="bg-gray-900 text-gray-100 text-sm p-4 rounded-lg overflow-x-auto">
            <code className={`language-${submission.language?.toLowerCase() || "javascript"}`}>
              {submission.code || "// No code available"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
