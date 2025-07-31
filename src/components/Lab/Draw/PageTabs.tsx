import { useState } from "react";

const PageTabs = ({
  pages,
  currentPage,
  setPage,
  addPage,
  deletePage,
  renamePage,
}: {
  pages: string[];
  currentPage: number;
  setPage: (index: number) => void;
  addPage: () => void;
  deletePage: (index: number) => void;
  renamePage: (index: number, newName: string) => void;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");

  const handleRename = (index: number) => {
    renamePage(index, tempName.trim() || pages[index]);
    setEditingIndex(null);
  };

  return (
    <div className="flex justify-start gap-2 p-2 px-4 overflow-x-auto bg-dime dark:bg-dark border-t border-gray-300 dark:border-gray-700">
      {pages.map((page, i) => (
        <div
          key={i}
          onClick={() => setPage(i)}
          className={`relative px-3 py-1 rounded flex items-center gap-2 cursor-pointer ${
            currentPage === i ? "bg-primary text-white" : "bg-white dark:bg-dark border"
          }`}
        >
          {editingIndex === i ? (
            <input
            aria-label="input"
              autoFocus
              type="text"
              className="bg-transparent border-b dark:text-dime border-gray-400 dark:border-gray-600 text-sm outline-none px-1 w-24"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => handleRename(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename(i);
                if (e.key === "Escape") setEditingIndex(null);
              }}
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditingIndex(i);
                setTempName(page);
              }}
              className="text-sm truncate max-w-[100px]"
              title="Double click to rename"
            >
              {page}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deletePage(i);
            }}
            className="text-xs"
            title="Delete"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addPage}
        className="px-3 py-1 rounded bg-success text-white shrink-0"
      >
        + Page
      </button>
    </div>
  );
};

export default PageTabs;
