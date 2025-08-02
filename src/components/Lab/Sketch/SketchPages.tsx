import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSketch } from "../../../hooks/Lab/useSketch";

const SketchPages = () => {
  const { state, dispatch } = useSketch();
  const { pages, currentPageId } = state;

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const addPage = () => {
    const newId = `page-${Date.now()}`;
    dispatch({
      type: "ADD_PAGE",
      payload: {
        id: newId,
        name: `Page ${pages.length + 1}`,
      },
    });
  };

  const switchPage = (id: string) => {
    dispatch({ type: "SWITCH_PAGE", payload: { id } });
  };

  const startRenaming = (id: string, name: string) => {
    setRenamingId(id);
    setRenameValue(name);
  };

  const finishRenaming = () => {
    if (!renameValue.trim() || !renamingId) return;
    dispatch({
      type: "RENAME_PAGE",
      payload: { id: renamingId, name: renameValue.trim() },
    });
    setRenamingId(null);
    setRenameValue("");
  };

  const removePage = (id: string) => {
    if (pages.length === 1) return;
    dispatch({ type: "REMOVE_PAGE", payload: { id } });
  };

  return (
    <div className="h-14 bg-white dark:bg-primary flex items-center gap-2 px-4 border-t dark:border-dime overflow-x-auto">
      {pages.map((page) => (
        <div
          key={page.id}
          className={`flex items-center px-3 py-1 rounded transition ${
            page.id === currentPageId
              ? "bg-accent text-white"
              : "bg-white dark:bg-dime text-black dark:text-white"
          }`}
        >
          {renamingId === page.id ? (
            <input
              aria-label="rename"
              type="text"
              value={renameValue}
              autoFocus
              onBlur={finishRenaming}
              onKeyDown={(e) => e.key === "Enter" && finishRenaming()}
              onChange={(e) => setRenameValue(e.target.value)}
              className="bg-transparent outline-none w-24 text-sm"
            />
          ) : (
            <span
              onClick={() => switchPage(page.id)}
              onDoubleClick={() => startRenaming(page.id, page.name)}
              className="text-sm font-medium truncate text-secondary cursor-pointer"
            >
              {page.name}
            </span>
          )}

          {pages.length > 1 && (
            <button
              onClick={() => removePage(page.id)}
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
