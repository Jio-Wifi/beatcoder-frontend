import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface MonacoEditorProps {
  language: string;
  content: string;
  onChange: (value: string | undefined) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language,
  content,
  onChange,
}) => {
  const [theme, setTheme] = useState<"vs-dark" | "light">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "vs-dark" : "light");

    const observer = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains("dark");
      setTheme(isNowDark ? "vs-dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="md:h-full w-full bg-white dark:bg-primary rounded overflow-hidden">
      <Editor
        height="250px"
        theme={theme}
        language={language}
        value={content}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default MonacoEditor;
