import React, { useEffect, useRef, useState } from "react";
import { FiMaximize2, FiMinimize2, FiMessageSquare } from "react-icons/fi";
import Editor from "@monaco-editor/react";
import TestCaseSection from "./TestCase/TestCaseSection";
import type { Problem } from "../types/code/problem.types";
import CustomMessage from "./Custom/CustomMessage";
import useAuth from "../hooks/auth/useAuth";
import RoomChatOverlay from "./chat/RoomChatOverlay";
import AiAssistance from "./Ai/AiAssistance/AiAssistance";

interface CodeEditorPanelProps {
  problem: Problem;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const languageMap: Record<string, string> = {
  javascript: "javascript",
  python: "python",
  cpp: "cpp",
  java: "java",
};

const starterCodeKeyMap: Record<string, string> = {
  javascript: "JavaScript",
  python: "Python",
  cpp: "C++",
  java: "Java",
};

const CodeEditorPanel = ({
  problem,
  code,
  setCode,
  language,
  setLanguage,
}: CodeEditorPanelProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [editorHeight, setEditorHeight] = useState(256);
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });
  const [theme, setTheme] = useState<"custom-dark" | "vs-light">("custom-dark");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isDraggingRef = useRef(false);
  const { isLoggedIn } = useAuth(); // Get logged-in user

  useEffect(() => {
    const starter =
      problem?.starterCode?.[starterCodeKeyMap[language]] || "";
    setCode(starter);
  }, [problem, language, setCode]);

  useEffect(() => {
    if (code.trim().length === 0) {
      setErrorMsg("Code editor cannot be empty.");
    } else {
      setErrorMsg(null);
    }
  }, [code]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "custom-dark" : "vs-light");
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const startDragging = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    document.body.style.cursor = "row-resize";

    const startY = e.clientY;
    const startHeight = editorHeight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newHeight = startHeight + (e.clientY - startY);
      if (newHeight > 100) {
        setEditorHeight(newHeight);
      }
    };

    const stopDragging = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);
  };

  return (
    <div
      className={`space-y-4 ${
        isFullScreen ? "fixed inset-0 z-50 bg-white dark:bg-primary p-4" : ""
      }`}
    >
      {/* Language Selector + Fullscreen Toggle + Chat Button */}
      <div className="flex items-center justify-between gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select programming language"
          className="px-3 py-2 border rounded-md cursor-pointer bg-accent dark:text-dime dark:bg-primary"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>

        {/* Join Room Chat Button */}
       {
        isLoggedIn && (
           <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2 bg-accent dark:text-dime dark:bg-primary  px-3 py-2 rounded-md"
        >
          <FiMessageSquare size={18} />
          Join Room Chat
        </button>
        )
       }

        <AiAssistance />

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullScreen((prev) => !prev)}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          title={isFullScreen ? "Minimize" : "Maximize"}
        >
          {isFullScreen ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
        </button>
      </div>

      {/* Monaco Code Editor */}
      <div
        className={`border rounded-md overflow-hidden editor-container ${
          isFullScreen ? "fullscreen" : "resizable"
        }`}
        ref={(el) => {
          if (el && !isFullScreen) {
            el.style.setProperty("--dynamic-height", `${editorHeight}px`);
          }
        }}
      >
        <Editor
          height="100%"
          language={languageMap[language]}
          value={code}
          theme={theme}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "monospace",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          onMount={(editor, monaco) => {
            monaco.editor.defineTheme("custom-dark", {
              base: "vs-dark",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#0a1640",
                "editor.foreground": "#f1f0f0",
                "editorCursor.foreground": "#FFE3A9",
                "editor.lineHighlightBackground": "#0B1D51",
                "editor.lineHighlightBorder": "#0B1D51",
                "editorLineNumber.foreground": "#8CCDEB",
                "editor.selectionBackground": "#725CAD80",
                "editor.inactiveSelectionBackground": "#725CAD40",
                "editorIndentGuide.background": "#1e2a5c",
                "editorIndentGuide.activeBackground": "#8CCDEB",
              },
            });

            editor.onDidChangeCursorPosition((e) => {
              setCursorPos({
                line: e.position.lineNumber,
                column: e.position.column,
              });
            });
          }}
        />
      </div>

      {/* Drag Bar */}
      {!isFullScreen && (
        <div
          onMouseDown={startDragging}
          className="h-2 cursor-row-resize bg-gray-300 dark:bg-gray-600 rounded-md"
          title="Drag to resize editor"
        ></div>
      )}

      {/* Cursor Position */}
      <div className="text-xs text-gray-500 dark:text-gray-300">
        {cursorPos.line}Ln {cursorPos.column}Cl
      </div>

      {/* Error Message */}
      {errorMsg && (
        <CustomMessage
          type="error"
          message={errorMsg}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {/* Test Cases */}
      {!isFullScreen && <TestCaseSection problemId={problem._id} />}

      {/* Chat Overlay */}
      {isChatOpen && <RoomChatOverlay onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default CodeEditorPanel;
