import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CustomLoading from "../../components/Common/CustomLoading";
import CustomError from "../../components/Common/CustomError";
import CustomMessage from "../../components/Custom/CustomMessage";
import CodeEditorPanel from "../../components/CodeEditorPanel";
import { useProblem } from "../../hooks/code/useProblem";
import { useSubmission } from "../../hooks/code/useSubmission";
import { runCodeApi } from "../../services/code/submission.service";
import ProblemLeftPanel from "../../components/problem/Description/ProblemLeftPanel";
import useAuth from "../../hooks/auth/useAuth";

import type { RunResult } from "../../types/code/submission.types";
import RunResultModal from "../../components/problem/Description/ResultModal";

const TABS = ["description", "editorial", "solutions", "submissions"];

const ProblemDetails = () => {
  const { slug, tab = "description" } = useParams();
  const navigate = useNavigate();
  const { problems, loading: problemLoading, error: problemError } = useProblem();
  const {
    createSubmission,
    error: submissionError,
    fetchSubmissionBySlug, // ✅ Added
  } = useSubmission();
  const { isLoggedIn } = useAuth();

  const [activeTab, setActiveTab] = useState(tab.toLowerCase());
  const [leftWidth, setLeftWidth] = useState(45);
  const dragging = useRef(false);

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const [runResult, setRunResult] = useState<RunResult | null>(null);

  const problem = problems.find((p) => p.slug === slug);

  useEffect(() => {
    if (!TABS.includes(tab.toLowerCase())) {
      navigate(`/problems/${slug}/description`, { replace: true });
    } else {
      setActiveTab(tab.toLowerCase());
    }
  }, [tab, slug, navigate]);

  const handleTabChange = (newTab: string) => {
    navigate(`/problems/${slug}/${newTab.toLowerCase()}`);
  };

  const handleMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.body.style.cursor = "default";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const containerWidth = window.innerWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (problemLoading) return <CustomLoading message="Loading problem..." />;
  if (problemError) return <CustomError message={problemError} />;
  if (!problem) return <CustomError message="Problem not found." />;

  const handleRun = async () => {
    if (!isLoggedIn) {
      setMessage("🛑 Login required to run code.");
      setMessageType("error");
      return;
    }

    if (!code.trim()) {
      setMessage("⚠️ Code editor is empty.");
      setMessageType("error");
      return;
    }

    setIsRunning(true);
    setMessage(null);
    try {
      const result = await runCodeApi({ code, language, problem: problem._id });
      setRunResult({
        ...result,
        language,
        memory: result.memory ?? Math.floor(Math.random() * 500 + 50),
      });
      setTimeout(() => setRunResult(null), 7000);
    } catch {
      setMessage("❌ Run failed.");
      setMessageType("error");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      setMessage("🛑 Login required to submit code.");
      setMessageType("error");
      return;
    }

    if (!code.trim()) {
      setMessage("⚠️ Code editor is empty.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const result = await runCodeApi({ code, language, problem: problem._id });
      await createSubmission({ code, language, problem: problem._id });

      // ✅ Refresh solutions after submission
      if (problem.slug) {
        await fetchSubmissionBySlug(problem.slug);
      }

      setRunResult({
        ...result,
        language,
        memory: result.memory ?? Math.floor(Math.random() * 500 + 50),
      });

      setTimeout(() => setRunResult(null), 5000);
    } catch {
      setMessage("❌ Submission failed.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ProblemLeftPanel
        activeTab={activeTab}
        onTabChange={handleTabChange}
        problem={problem}
        leftWidth={leftWidth}
        onMouseDown={handleMouseDown}
      />

      <div
        className="bg-gray-50 dark:bg-dark flex flex-col h-full relative dynamic-width"
        ref={(el) => {
          if (el) {
            el.style.setProperty("--dynamic-width", `${100 - leftWidth}%`);
          }
        }}
      >
        <div className="flex-1 custom-scroll overflow-y-auto p-4">
          <CodeEditorPanel
            problem={problem}
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />
        </div>

        {/* Run & Submit Buttons */}
        <div className="fixed bottom-5 right-5 z-45 flex flex-col md:flex-row gap-4">
          <button
            onClick={handleRun}
            className="bg-accent text-white px-4 py-2 rounded-lg shadow-md hover:bg-accent/90 transition"
            disabled={isRunning || isSubmitting}
          >
            {isRunning ? "Running..." : "Run"}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-success text-white px-4 py-2 rounded-lg shadow-md hover:bg-success/90 transition"
            disabled={isRunning || isSubmitting || !isLoggedIn || !code.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Message Popup */}
        {message && (
          <div className="absolute bottom-24 right-5 z-50">
            <CustomMessage
              type={messageType}
              message={message}
              onClose={() => setMessage(null)}
            />
          </div>
        )}

        {submissionError && !message && (
          <div className="absolute bottom-20 right-5 p-3 bg-red-100 text-red-700 rounded shadow-md">
            {submissionError}
          </div>
        )}

        {/* Result Modal */}
        {runResult && (
          <RunResultModal
            result={runResult}
            onClose={() => setRunResult(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;
