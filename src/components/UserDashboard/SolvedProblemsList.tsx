import React from "react";
import { FiCode } from "react-icons/fi";

export interface SolvedProblem {
  title: string;
  difficulty: string;
  solvedOn: string;
}

interface SolvedProblemsListProps {
  problems: SolvedProblem[];
}

const SolvedProblemsList: React.FC<SolvedProblemsListProps> = ({ problems }) => {
  if (!problems.length) {
    return (
      <div className="p-4 text-center text-secondary dark:text-accent bg-dime dark:bg-dark rounded-lg shadow">
        No problems solved yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Title with custom colors */}
      <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-accent">
        <FiCode /> Problems Solved
      </h3>

      {problems.map((problem, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center bg-dime dark:bg-primary p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div>
            {/* Title with light/dark contrast */}
            <p className="font-medium text-dark dark:text-white">{problem.title}</p>

            {/* Difficulty with secondary tone */}
            <p className="text-sm text-secondary dark:text-accent">
              Difficulty: {problem.difficulty }
            </p>
          </div>

          {/* Date with subdued tone */}
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Solved on: {problem.solvedOn}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SolvedProblemsList;
