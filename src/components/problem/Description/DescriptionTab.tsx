import type { Difficulty } from "../../../types/code/problem.types";

type Props = {
  description: string;
  difficulty: Difficulty;
  constraints: string;
};

const difficultyColorMap: Record<Difficulty, string> = {
  easy: "text-green-600",
  medium: "text-yellow-600",
  hard: "text-red-600",
};

// 🔍 Utility to extract example input/output
const extractExample = (text: string) => {
  const inputMatch = text.match(/\*\*Input\*\*\s*```([\s\S]*?)```/);
  const outputMatch = text.match(/\*\*Output\*\*\s*```([\s\S]*?)```/);

  return {
    input: inputMatch?.[1]?.trim() || "",
    output: outputMatch?.[1]?.trim() || "",
  };
};

const DescriptionTab = ({ description, difficulty, constraints }: Props) => {
  const { input, output } = extractExample(description);

  return (
    <div className="space-y-6">
      {/* Difficulty */}
      <div>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Difficulty:{" "}
        </span>
        <span className={`capitalize font-semibold ${difficultyColorMap[difficulty]}`}>
          {difficulty}
        </span>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">
          Problem Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {description.split("### Example")[0].trim()}
        </p>
      </div>

      {/* Example (extracted dynamically) */}
      {input && output && (
        <div>
          <h3 className="text-lg font-medium text-primary dark:text-white mb-1">
            Example
          </h3>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Input:
              </p>
              <pre className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                {input}
              </pre>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Output:
              </p>
              <pre className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Constraints */}
      <div>
        <h3 className="text-lg font-medium text-primary dark:text-white mb-1">
          Constraints
        </h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
          {constraints
            .split("\n")
            .filter((c) => c.trim() !== "")
            .map((line, index) => (
              <li key={index}>{line}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DescriptionTab;
