import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import CustomLoading from "../../../../components/Common/CustomLoading";
import CustomError from "../../../../components/Common/CustomError";
import AnimatedSection from "../../../../components/Common/AnimatedSection";
import { useProblem } from "../../../../hooks/code/useProblem";
import { useTestCase } from "../../../../hooks/code/useTestCase";
import ConfirmModal from "../../../../components/Common/ConfirmModal";

const ITEMS_PER_PAGE = 5;

const ProblemList: React.FC = () => {
  const { problems, deleteProblem, loading, error } = useProblem();
  const { testCases, fetchTestCases, deleteTestCase } = useTestCase();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    slug: string;
  } | null>(null);

  const handleDeleteProblem = async (problemId: string, slug: string) => {
    try {
      await fetchTestCases(problemId);
      for (const testCase of testCases) {
        if (testCase.problem === problemId) {
          await deleteTestCase(testCase._id);
        }
      }
      await deleteProblem(slug);
      setConfirmDelete(null); // Close confirmation modal after deleting
    } catch (err) {
      console.error("Failed to delete problem and its test cases", err);
    }
  };

  const filteredProblems = useMemo(() => {
    return problems.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [problems, searchTerm]);

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginated = filteredProblems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">All Problems</h2>
          <Link
            to="/admin/problems/create"
            className="px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-md"
          >
            + Create Problem
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-accent"
        />

        {loading && <CustomLoading message="Loading problems..." />}
        {error && <CustomError message={error} />}
        {!loading && paginated.length === 0 && (
          <p className="text-center text-gray-500">No problems found.</p>
        )}

        {!loading && paginated.length > 0 && (
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Slug</th>
                <th className="p-3 border-b">Difficulty</th>
                <th className="p-3 border-b">Subject</th>
                <th className="p-3 border-b">Actions</th>
                <th className="p-3 border-b">View Test Cases</th>
                <th className="p-3 border-b">Add Test Case</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((problem) => (
                <tr
                  key={problem._id}
                  className="hover:bg-gray-50 dark:hover:bg-dark/30"
                >
                  <td className="p-3 border-b">{problem.title}</td>
                  <td className="p-3 border-b">{problem.slug}</td>
                  <td className="p-3 border-b capitalize">
                    {problem.difficulty}
                  </td>
                  <td className="p-3 border-b">{problem.subject}</td>
                  <td className="p-3 border-b flex gap-5 items-center">
                    <Link
                      to={`/admin/problems/edit/${problem.slug}`}
                      className="text-secondary flex items-center gap-1 hover:text-accent"
                      title="Edit Problem"
                    >
                      <AiOutlineEdit size={18} />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() =>
                        setConfirmDelete({
                          id: problem._id,
                          slug: problem.slug,
                        })
                      }
                      className="text-red-500 flex items-center gap-1 hover:text-red-700"
                    >
                      <AiOutlineDelete size={18} /> Delete
                    </button>
                  </td>
                  <td className="p-3 border-b">
                    <Link
                      to={`/admin/testcases/${problem._id}`}
                      className="text-green-500 flex items-center gap-2 hover:text-green-700"
                      title="View Test Cases"
                    >
                      <AiOutlineEye size={20} />
                      <span>View</span>
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link
                      to={`/admin/testcases/create/${problem._id}`}
                      className="text-accent flex items-center gap-2 hover:text-accent/80"
                      title="Add Test Case"
                    >
                      <AiOutlinePlusCircle size={20} />
                      <span>Add</span>
                    </Link>
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
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmDelete && (
          <ConfirmModal
            title="Delete Problem"
            message="Are you sure you want to delete this problem and its test cases?"
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={() =>
              handleDeleteProblem(confirmDelete.id, confirmDelete.slug)
            }
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </div>
    </AnimatedSection>
  );
};

export default ProblemList;
