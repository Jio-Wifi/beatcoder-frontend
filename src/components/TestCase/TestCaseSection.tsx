import { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CustomLoading from "../Common/CustomLoading";
import CustomError from "../Common/CustomError";
import { useTestCase } from "../../hooks/code/useTestCase";
import useAuth from "../../hooks/auth/useAuth";

interface Props {
  problemId: string;
}

const TestCaseSection = ({ problemId }: Props) => {
  const {
    testCases,
    fetchTestCases,
    loading,
    error,
    createTestCase,
    updateTestCase,
    deleteTestCase,
  } = useTestCase();

  const { user } = useAuth();

  const [newInput, setNewInput] = useState("");
  const [newOutput, setNewOutput] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [editInputs, setEditInputs] = useState<Record<string, string>>({});
  const [editOutputs, setEditOutputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (problemId) fetchTestCases(problemId);
  }, [problemId, fetchTestCases]);

  useEffect(() => {
    const inputState: Record<string, string> = {};
    const outputState: Record<string, string> = {};
    testCases.forEach((tc) => {
      inputState[tc._id] = tc.input;
      outputState[tc._id] = tc.expectedOutput;
    });
    setEditInputs(inputState);
    setEditOutputs(outputState);
  }, [testCases]);

  // console.log("Current User ID:", user?._id);
  // console.log(
  //   "User's Test Cases:",
  //   testCases.filter((tc) => String(tc.createdBy) === String(user?._id))
  // );

  const handleAddTestCase = async () => {
    if (!newInput || !newOutput) return;
    await createTestCase({
      input: newInput,
      expectedOutput: newOutput,
      isPublic,
      problem: problemId,
    });
    setNewInput("");
    setNewOutput("");
    setIsPublic(true);
  };

  const handleUpdate = async (id: string) => {
    await updateTestCase(id, {
      input: editInputs[id],
      expectedOutput: editOutputs[id],
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this test case?");
    if (!confirm) return;
    await deleteTestCase(id);
  };

  return (
    
    <div className="bg-white dark:bg-primary p-4 border rounded-md shadow space-y-6">
      <h3 className="text-lg font-semibold text-primary dark:text-success">🧪 Test Cases</h3>

      {/* Add Test Case Form */}
   {user && (
  <div className="space-y-2">
    <textarea
      value={newInput}
      onChange={(e) => setNewInput(e.target.value)}
      placeholder="Input"
      className="w-full p-2 rounded border text-sm bg-gray-50 dark:bg-dark dark:text-white"
    />
    <textarea
      value={newOutput}
      onChange={(e) => setNewOutput(e.target.value)}
      placeholder="Expected Output"
      className="w-full p-2 rounded border text-sm bg-gray-50 dark:bg-dark dark:text-white"
    />
    <div className="flex items-center justify-between">
      <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        {isPublic ? (
          <span className="flex items-center gap-1 text-green-600">
            <FiEye /> Public
          </span>
        ) : (
          <span className="flex items-center gap-1 text-yellow-600">
            <FiEyeOff /> Private
          </span>
        )}
      </label>

      <button
        onClick={handleAddTestCase}
        className="bg-accent text-white px-3 py-1 rounded text-sm hover:bg-accent/90"
      >
        ➕ Add Test Case
      </button>
    </div>
  </div>
)}

      {/* Test Case List */}
      {loading ? (
        <CustomLoading message="Loading test cases..." />
      ) : error ? (
        <CustomError message={error} />
      ) : testCases.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-300">No test cases available.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scroll">
          {testCases.map((tc, index) => {
            const isOwner = String(tc.createdBy) === String(user?._id);

            return (
              <div
                key={tc._id}
                className="min-w-[300px] max-w-sm flex-shrink-0 bg-gray-50 dark:bg-dark p-3 rounded border border-gray-300 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200 flex gap-2 items-center">
                    <span className="font-bold">#{index + 1}</span>
                    {tc.isPublic ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <FiEye /> Public
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <FiEyeOff /> Private
                      </span>
                    )}
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => handleDelete(tc._id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete Test Case"
                    >
                      <MdDelete size={18} />
                    </button>
                  )}
                </div>

                <div className="text-sm space-y-2">
                  <label className="text-gray-500 dark:text-gray-400 font-medium">Input:</label>
                  <textarea
                    value={editInputs[tc._id] || ""}
                    onChange={(e) =>
                      setEditInputs((prev) => ({
                        ...prev,
                        [tc._id]: e.target.value,
                      }))
                    }
                    className="w-full p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                    disabled={!isOwner}
                  />
                  <label className="text-gray-500 dark:text-gray-400 font-medium">Expected Output:</label>
                  <textarea
                    value={editOutputs[tc._id] || ""}
                    onChange={(e) =>
                      setEditOutputs((prev) => ({
                        ...prev,
                        [tc._id]: e.target.value,
                      }))
                    }
                    className="w-full p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                    disabled={!isOwner}
                  />
                  {isOwner && (
                    <button
                      onClick={() => handleUpdate(tc._id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs bg-success text-white px-3 py-1 rounded hover:bg-success/90"
                    >
                      <FiEdit size={14} />
                      Save
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestCaseSection;
