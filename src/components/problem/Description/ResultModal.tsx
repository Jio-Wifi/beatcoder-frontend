import React from "react";
import { FiX } from "react-icons/fi";
import type { RunResult } from "../../../types/code/submission.types";

interface RunResultModalProps {
  result: RunResult;
  onClose: () => void;
}

const RunResultModal: React.FC<RunResultModalProps> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-xl w-full max-w-md transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          title="Close"
        >
          <FiX size={22} />
        </button>

        {/* Status */}
        <h2
          className={`text-2xl font-bold mb-4 ${
            result.status === "Accepted"
              ? "text-green-500"
              : result.status === "Wrong Answer"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {result.status}
        </h2>

        {/* Summary */}
        <div className="space-y-3">
          <p className="text-sm">
            <span className="font-semibold">Message:</span> {result.message}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Passed:</span> {result.passed}{" "}
            / {result.passed + result.failed} test cases
          </p>
          <p className="text-sm">
            <span className="font-semibold">Execution Time:</span>{" "}
            {result.executionTime} ms
          </p>
          <p className="text-sm">
            <span className="font-semibold">Memory:</span>{" "}
            {result.memory ? `${result.memory} KB` : "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Language:</span>{" "}
            {result.language ?? "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RunResultModal;
