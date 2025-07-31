import { useState, useEffect, useMemo } from "react";
import { useProblem } from "../../../hooks/code/useProblem";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomButton from "../../../components/Custom/CustomButton";

interface Props {
  onClose: () => void;
  onSave: (ids: string[]) => void; // Pass selected IDs back to parent
}

const ProblemOverlay: React.FC<Props> = ({ onClose, onSave }) => {
  const { problems, loading, error, fetchProblems } = useProblem();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProblems({}, true); // Fetch all problems
  }, [fetchProblems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [problems, searchTerm]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    localStorage.setItem("favoriteProblems", JSON.stringify(selectedIds)); // Save to localStorage
    onSave(selectedIds); // Pass back to parent
    onClose();
  };

  if (loading) return <CustomLoading message="Loading problems..." />;
  if (error) return <CustomMessage type="error" message={error} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white dark:bg-primary text-dark dark:text-white w-3/4 max-h-[80vh] rounded-lg shadow-lg p-6 overflow-y-auto custom-scroll">
        {/* Top-Right Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <CustomButton
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleSave}
          >
            Save Favorites
          </CustomButton>
        </div>

        <h2 className="text-2xl font-bold mb-6">Select Favorite Problems</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border dark:bg-dark dark:text-white"
        />

        {/* Problem List */}
        <ul className="space-y-2">
          {filteredProblems.map((p) => (
            <li
              key={p._id}
              onClick={() => toggleSelect(p._id)}
              className={`p-3 rounded-lg cursor-pointer border ${
                selectedIds.includes(p._id)
                  ? "bg-primary dark:bg-accent text-white"
                  : "bg-gray-100 dark:bg-dark"
              }`}
            >
              <span className="font-semibold">{p.title}</span>
              <span className="ml-4 text-sm text-secondary dark:text-light capitalize">
                {p.difficulty}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemOverlay;
