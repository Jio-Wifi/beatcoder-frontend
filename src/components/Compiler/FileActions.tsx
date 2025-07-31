import { FaDownload, FaPlus } from "react-icons/fa";
import CustomButton from "../Custom/CustomButton";

interface FileActionsProps {
  language: string;
  setLanguage: (lang: string) => void;
  onDownload: () => void;
  onCreate: () => void;
}

const FileActions: React.FC<FileActionsProps> = ({
  language,
  setLanguage,
  onDownload,
  onCreate,
}) => {
  return (
    <div className="flex items-center gap-4">
      <select
      aria-label="language"
        className="border rounded bg-white text-secondary dark:text-dime px-4 py-2 dark:bg-primary"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
        {/* className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2" */}
        {/* className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-2" */}

      <CustomButton
        onClick={onCreate}
        className="flex items-center gap-3"
      >
        <FaPlus /> New File
      </CustomButton>

      <CustomButton
        onClick={onDownload}
        className="flex items-center gap-3"
      >
        <FaDownload /> Download
      </CustomButton>
    </div>
  );
};

export default FileActions;
