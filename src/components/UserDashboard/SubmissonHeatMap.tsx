import React from "react";
import { format, subDays } from "date-fns";
import type { SubmissionActivity } from "../../types/code/submission.types";
import AnimatedCard from "../Common/AnimatedCard";

interface SubmissionHeatmapProps {
  days?: number;
  values: SubmissionActivity[];
}

const SubmissionHeatmap: React.FC<SubmissionHeatmapProps> = ({
  days = 90,
  values = [],
}) => {
  const today = new Date();

  // Generate default data if backend hasn't returned yet
  const allDays: SubmissionActivity[] =
    values.length > 0
      ? values.map(v => ({ ...v, date: new Date(v.date).toISOString() }))
      : Array.from({ length: days }).map((_, i) => ({
          date: subDays(today, i).toISOString(),
          count: 0,
        }));

  // Reverse for chronological order
  const orderedDays = [...allDays].reverse();

  // Split into weeks
  const weeks: SubmissionActivity[][] = [];
  for (let i = 0; i < orderedDays.length; i += 7) {
    weeks.push(orderedDays.slice(i, i + 7));
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-200 dark:bg-gray-700";
    if (count < 3) return "bg-green-200 dark:bg-green-800";
    if (count < 6) return "bg-green-400 dark:bg-green-600";
    return "bg-green-600 dark:bg-green-400";
  };

  return (
     <AnimatedCard className="!bg-white dark:!bg-primary !w-fit">
    <div className="p-4 rounded">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Submission Activity (Last {days} Days)
      </h3>
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-4 h-4 rounded-sm ${getColor(day.count)} transition-all`}
                title={`${format(new Date(day.date), "MMM dd, yyyy")}: ${day.count} submissions`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end mt-4 gap-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        {[0, 2, 4, 6].map((v, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-sm ${getColor(v)}`}
          ></div>
        ))}
        <span>More</span>
      </div>
    </div>
    </AnimatedCard>
  );
};

export default SubmissionHeatmap;
