import { useState, useEffect } from "react";
import SidebarMenu from "../../../components/problem/SidebarMenu";
import ProblemOverlay from "./ProblemOverlay";
import { useProblem } from "../../../hooks/code/useProblem";
import CustomLoading from "../../../components/Common/CustomLoading";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/Custom/CustomButton";

const Favorite = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { problems, fetchProblems, loading } = useProblem();
  const navigate = useNavigate();

  // Load favorites from localStorage on first render
  useEffect(() => {
    fetchProblems({}, true);
    const stored = localStorage.getItem("favoriteProblems");
    if (stored) setFavoriteIds(JSON.parse(stored));
  }, [fetchProblems]);

  const handleSaveFavorites = (ids: string[]) => {
    setFavoriteIds(ids);
    localStorage.setItem("favoriteProblems", JSON.stringify(ids));
  };

  const handleProblemClick = (slug: string) => {
    navigate(`/problems/${slug}/description`);
  };

  const handleRemoveFavorite = (id: string) => {
    const updated = favoriteIds.filter((fid) => fid !== id);
    handleSaveFavorites(updated);
  };

  const favoriteProblems = problems
    .filter((p) => favoriteIds.includes(p._id))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-dime dark:bg-dark text-dark dark:text-white min-h-screen relative">
      {/* Sidebar */}
      <aside className="md:col-span-1">
        <SidebarMenu />
      </aside>

      {/* Main Content */}
      <div className="md:col-span-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Favorite Problems</h2>
          <CustomButton
            onClick={() => setIsOverlayOpen(true)}
          >
            + Add Problem
          </CustomButton>
        </div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm px-4 py-2 mb-4 border rounded-md dark:bg-dark bg-white text-black dark:text-white border-gray-300 dark:border-gray-700"
        />

        {loading ? (
          <CustomLoading message="Loading your favorites..." />
        ) : favoriteProblems.length ? (
          <ul className="space-y-2">
            {favoriteProblems.map((p,index) => (
              <li
                key={p._id}
                className="p-3 rounded-lg bg-white dark:bg-primary shadow hover:scale-[1.01] transition flex justify-between items-center"
              >
                <div
                  onClick={() => handleProblemClick(p.slug)}
                  className="cursor-pointer"
                >
                  <span className="font-semibold hover:underline">{index + 1}. {p.title}</span>
                  <span className="ml-4 text-sm text-gray-500 dark:text-light capitalize">
                    {p.difficulty}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    handleRemoveFavorite(p._id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite problems found for your search.</p>
        )}
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <ProblemOverlay
          onClose={() => setIsOverlayOpen(false)}
          onSave={handleSaveFavorites}
        />
      )}
    </div>
  );
};

export default Favorite;
