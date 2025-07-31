import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import CustomMessage from "../../../../components/Custom/CustomMessage";
import CustomLoading from "../../../../components/Common/CustomLoading";
import AnimatedSection from "../../../../components/Common/AnimatedSection";
import { useTestCase } from "../../../../hooks/code/useTestCase";

const ViewTestCaseById: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const { testCases, getTestCasesByProblem, deleteTestCase, loading, error } = useTestCase();

// getTestCasesByProblem

  // console.log("fetchTestCase: ", testCases)
  // Fetch test cases by problemId
  useEffect(() => {
    if (problemId) getTestCasesByProblem(problemId);
  }, [problemId, getTestCasesByProblem]);

  if (loading) return <CustomLoading message="Loading test cases..." />;
  if (error) return <CustomMessage type="error" message={error} />;
  if (!testCases.length)
    return <CustomMessage type="error" message="No test cases found for this problem." />;

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Test Cases</h2>
        <ul className="space-y-4">
          {testCases.map((testCase) => (
            <li
              key={testCase._id}
              className="p-4 border rounded-md bg-gray-50 dark:bg-dark/30 flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Input:</strong> {testCase.input}
                </p>
                <p>
                  <strong>Expected Output:</strong> {testCase.expectedOutput}
                </p>
                <p>
                  <strong>Visibility:</strong>{" "}
                  {testCase.isPublic ? "Public" : "Private"}
                </p>
                <p>
                  <strong>Created By:</strong> {testCase.createdBy || "Unknown"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Edit button */}
                <Link
                  to={`/admin/testcases/edit/${testCase._id}`}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Test Case"
                >
                  <AiOutlineEdit size={22} />
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => deleteTestCase(testCase._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Test Case"
                >
                  <AiOutlineDelete size={22} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
};

export default ViewTestCaseById;
