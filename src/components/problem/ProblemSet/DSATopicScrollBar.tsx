import type { Problem } from "../../../types/code/problem.types";

interface Props {
  problems: Problem[];
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}

const DSATopicScrollBar = ({
  problems,
  selectedTopic,
  setSelectedTopic,
}: Props) => {
  const topicMap: Record<string, number> = {};

  problems.forEach((problem) => {
    const topic = problem.subject?.trim() || "Other";
    topicMap[topic] = (topicMap[topic] || 0) + 1;
  });

  const topics = Object.entries(topicMap).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const allCount = problems.length;
  const topicsWithAll = [["All", allCount], ...topics] as [string, number][];

  return (
    <div className="overflow-x-auto custom-scroll whitespace-nowrap py-2 px-1 bg-dime dark:bg-dark rounded-md shadow-inner">
      <div className="inline-flex gap-3 min-w-full">
        {topicsWithAll.map(([name, count]) => {
          const isActive = selectedTopic === name;
          return (
            <button
              key={name}
              onClick={() => setSelectedTopic(name)}
              className={`px-4 py-2 rounded-full border-2 text-sm flex items-center gap-2 transition
                ${
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "bg-white dark:bg-primary border-gray-300 dark:border-gray-600 text-dark dark:text-white hover:bg-accent hover:text-white"
                }`}
            >
              <span>{name}</span>
              <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DSATopicScrollBar;
