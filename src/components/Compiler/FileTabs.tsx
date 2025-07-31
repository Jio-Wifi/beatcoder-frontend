import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

type File = {
  id: string;
  name: string;
};

interface FileTabsProps {
  files: File[];
  activeFileId: string;
  setActiveFileId: (id: string) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, newName: string) => void;
}

const FileTabs: React.FC<FileTabsProps> = ({
  files,
  activeFileId,
  setActiveFileId,
  deleteFile,
  renameFile,
}) => {
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFileId && tempName.trim()) {
      renameFile(editingFileId, tempName.trim());
    }
    setEditingFileId(null);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 whitespace-nowrap min-w-max px-1 pb-1">
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => {
              if (!editingFileId) setActiveFileId(file.id);
            }}
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded border transition-all duration-200 ${
              activeFileId === file.id
                ? "bg-white text-secondary dark:bg-primary dark:text-dime"
                : "bg-white text-primary dark:bg-secondary dark:text-dime"
            }`}
          >
            {editingFileId === file.id ? (
              <form onSubmit={handleRename}>
                <input
                 aria-label="code"
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleRename}
                  autoFocus
                  className="text-primary dark:text-dime px-1 rounded border w-24 text-sm"
                />
              </form>
            ) : (
              <span className="text-sm">{file.name}</span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setTempName(file.name);
                setEditingFileId(file.id);
              }}
              className="hover:text-yellow-400"
              title="Edit file name"
            >
              <FaEdit size={12} />
            </button>

            <button
              aria-label="delete file"
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(file.id);
              }}
              className="hover:text-red-500"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileTabs;
