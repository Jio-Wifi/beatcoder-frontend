import { useParams,useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProblem } from "../../../hooks/code/useProblem";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";

interface LocationState {
  difficulty?: string;
}

// Slugify helper for problem titles
const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const StudyPlanDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { problems, loading, error, fetchProblems } = useProblem();
  const navigate = useNavigate();
  
  const location = useLocation();
  const { difficulty } = (location.state as LocationState) || {};

 useEffect(() => {
    if (!slug) return;

    fetchProblems(
      {
        // Default: use passed difficulty if available
        difficulty: difficulty as "easy" | "medium" | "hard",
      },
      true
    );
  }, [slug, difficulty, fetchProblems]);

    const handleProblemClick = (title: string) => {
    const problemSlug = slugify(title);
    navigate(`/problems/${problemSlug}/description`);
  };

  if (loading) return <CustomLoading message="Loading Study Plan..." />;
  if (error) return <CustomMessage type="error" message={error} />;

  return (
    <div className="bg-dime dark:bg-dark min-h-screen text-dark dark:text-white">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-3xl font-bold capitalize">{slug?.replace(/-/g, " ")}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Complete this plan to strengthen your coding skills.
        </p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span>5 / {problems.length} Completed</span>
            <span>Progress: 20%</span>
          </div>
          <div className="w-full h-3 mt-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-3 bg-green-500 rounded-full w-[20%]"
             
            ></div>
          </div>
        </div>
      </div>

      {/* Problem List */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Problems</h2>
        {problems.length === 0 ? (
          <CustomMessage type="info" message="No problems found for this plan." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Difficulty</th>
                  <th className="px-4 py-2">Topic</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">⭕</td>
                    <td  onClick={() => handleProblemClick(p.title)} className="px-4 py-2 text-primary dark:text-dime hover:underline cursor-pointer">
                      {p.title}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          p.difficulty === "easy"
                            ? "bg-green-100 text-green-700"
                            : p.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-2 capitalize">{p.subject || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanDetails;
