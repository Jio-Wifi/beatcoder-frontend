import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const SketchPages = () => {
  const [pages, setPages] = useState<string[]>(["Page 1"]);
  const [activePage, setActivePage] = useState(0);
  const [renamingIndex, setRenamingIndex] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const addPage = () => {
    setPages((prev) => [...prev, `Page ${prev.length + 1}`]);
    setActivePage(pages.length);
  };

  const startRenaming = (index: number, name: string) => {
    setRenamingIndex(index);
    setRenameValue(name);
  };

  const finishRenaming = () => {
    if (renameValue.trim()) {
      setPages((prev) =>
        prev.map((name, i) => (i === renamingIndex ? renameValue.trim() : name))
      );
    }
    setRenamingIndex(null);
    setRenameValue("");
  };

  const removePage = (index: number) => {
    if (pages.length === 1) return;
    setPages((prev) => prev.filter((_, i) => i !== index));
    if (activePage >= pages.length - 1) {
      setActivePage(pages.length - 2);
    }
  };

  return (
    <div className="h-14 bg-white dark:bg-primary flex items-center gap-2 px-4 border-t dark:border-dime overflow-x-auto">
      {pages.map((name, i) => (
        <div
          key={i}
          className={`flex items-center px-3 py-1 rounded transition ${
            i === activePage
              ? "bg-accent text-white"
              : "bg-white dark:bg-dime text-black dark:text-white"
          }`}
        >
          {renamingIndex === i ? (
            <input
            aria-label="rename"
              type="text"
              value={renameValue}
              autoFocus
              onBlur={finishRenaming}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishRenaming();
              }}
              onChange={(e) => setRenameValue(e.target.value)}
              className="bg-transparent outline-none w-24 text-sm"
            />
          ) : (
            <button
              onClick={() => {
                setActivePage(i);
                startRenaming(i, name);
              }}
              className="text-sm font-medium truncate text-secondary"
            >
              {name}
            </button>
          )}
          {pages.length > 1 && (
            <button
              onClick={() => removePage(i)}
              className="ml-2 text-xs hover:text-red-500"
              title="Delete"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addPage}
        className="ml-2 px-3 py-1 bg-secondary text-white rounded flex items-center gap-2 text-sm"
      >
        <FaPlus className="text-xs" /> Page
      </button>
    </div>
  );
};

export default SketchPages;
