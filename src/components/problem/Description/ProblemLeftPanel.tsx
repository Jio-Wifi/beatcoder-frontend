import ProblemTabs from "../../ProblemTabs";
import DescriptionTab from "./DescriptionTab";
import EditorialTab from "../Editorial/EditorialTab";
import SolutionsTab from "../Solutions/SolutionsTab";
import SubmissionsTab from "../Submissions/SubmissionsTab";
import type { Difficulty } from "../../../types/code/problem.types";


interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  problem: {
    title: string;
    description: string;
    difficulty: Difficulty;
    constraints?: string;
  };
  leftWidth: number;
  onMouseDown: () => void;
}

const ProblemLeftPanel = ({ activeTab, onTabChange, problem, leftWidth, onMouseDown }: Props) => {
  return (
    <>
      <div
  className="p-4 overflow-y-auto bg-white dark:bg-dark dynamic-width"
  ref={(el) => {
    if (el) {
      el.style.setProperty('--dynamic-width', `${leftWidth}%`);
    }
  }}
>

        <ProblemTabs activeTab={activeTab} onTabChange={onTabChange} />
        {
            activeTab === "submissions" ? " " :
             <h1 className="text-2xl mt-6 font-bold text-primary dark:text-white mb-4">
          {problem.title}
        </h1>
        }
       
        <div className="mt-4 text-sm dark:text-white">
          {activeTab === "description" && (
            <DescriptionTab description={problem.description} difficulty={problem.difficulty} constraints={problem.constraints  ?? "No constraints provided"} />
          )}
          {activeTab === "editorial" && <EditorialTab />}
          {activeTab === "solutions" && <SolutionsTab />}
          {activeTab === "submissions" && <SubmissionsTab />}
        </div>
      </div>

      {/* Divider for resizing */}
      <div
        onMouseDown={onMouseDown}
        className="w-1 bg-gray-300 dark:bg-gray-700 cursor-col-resize"
      ></div>
    </>
  );
};

export default ProblemLeftPanel;
