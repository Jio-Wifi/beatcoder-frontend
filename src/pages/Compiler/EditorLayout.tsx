import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FileTabs from "../../components/Compiler/FileTabs";
import FileActions from "../../components/Compiler/FileActions";
import MonacoEditor from "../../components/Compiler/MonacoEditor";
import RunControls from "../../components/Compiler/RunControls";
import OutputDisplay from "../../components/Compiler/OutputDisplay";
import { useCompiler } from "../../hooks/compiler/useCompiler";
import CustomButton from "../../components/Custom/CustomButton";

type File = {
  id: string;
  name: string;
  language: string;
  content: string;
};

const defaultFile: File = {
  id: uuidv4(),
  name: "main.cpp",
  language: "cpp",
  content: "// Write your C++ code here",
};

const EditorLayout: React.FC = () => {
  const [files, setFiles] = useState<File[]>([defaultFile]);
  const [activeFileId, setActiveFileId] = useState(defaultFile.id);
  const [input, setInput] = useState("");
  const { execute, result, error, loading } = useCompiler();

  const activeFile = files.find((f) => f.id === activeFileId);

  const createNewFile = () => {
    const newFile: File = {
      id: uuidv4(),
      name: `file-${files.length + 1}.js`,
      language: "javascript",
      content: "// New file",
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const deleteFile = (id: string) => {
    if (files.length === 1) return;
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (id === activeFileId) setActiveFileId(files[0].id);
  };

  const updateContent = (value: string | undefined) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFileId ? { ...f, content: value || "" } : f
      )
    );
  };

  const downloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = activeFile.name;
    a.click();
  };

  const setLanguage = (lang: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFileId ? { ...f, language: lang } : f
      )
    );
  };

  const handleRun = () => {
    if (!activeFile) return;
    execute({
      code: activeFile.content,
      language: activeFile.language,
      input,
    });
  };
const renameFile = (id: string, newName: string) => {
  setFiles((prev) =>
    prev.map((file) => (file.id === id ? { ...file, name: newName } : file))
  );
};


  return (
    <div className="w-full md:h-screen flex flex-col px-2 py-4 space-y-3 bg-dime dark:bg-dark">
      {/* Top: File Tabs + Actions + Run */}
      <div className="space-y-2">
        <FileTabs
          files={files}
          activeFileId={activeFileId}
          setActiveFileId={setActiveFileId}
          deleteFile={deleteFile}
          renameFile={renameFile}
        />
        <div className="flex flex-wrap justify-between items-center gap-3">
          <FileActions
            language={activeFile?.language || "javascript"}
            setLanguage={setLanguage}
            onDownload={downloadFile}
            onCreate={createNewFile}
          />
          <CustomButton
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </CustomButton>
        </div>
      </div>

      {/* Main Editor + I/O */}
      <div className="flex flex-1 gap-4 flex-wrap md:flex-nowrap">
        {/* Left: Code Editor */}
        <div className="w-full md:w-2/3 md:h-full rounded-xl border shadow-sm bg-white">
          <MonacoEditor
            language={activeFile?.language || "javascript"}
            content={activeFile?.content || ""}
            onChange={updateContent}
          />
        </div>

    {/* Right - Input + Output */}
<div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
  {/* Input Section */}
  <div className="flex-1 bg-white dark:bg-primary border rounded-lg p-3 shadow-md overflow-hidden">
    <RunControls input={input} setInput={setInput} loading={loading} />
  </div>

  {/* Output Section */}
  <div className="flex-1 bg-white dark:bg-primary border rounded-lg p-3 shadow-md overflow-auto">
    <OutputDisplay result={result} error={error} loading={loading} />
  </div>
</div>

      </div>
    </div>
  );
};

export default EditorLayout;
