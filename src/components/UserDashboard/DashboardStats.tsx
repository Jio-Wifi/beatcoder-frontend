import React, { useState, useEffect, useMemo } from "react";
import AnimatedCard from "../Common/AnimatedCard";
// import TiltTorchCard from "../Common/TiltTorchCard";

interface DashboardStatsProps {
  solved: number;
  total: number;
  acceptance: number;
  beats: number[];
  attempts: number;
  submissions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  solved,
  total,
  acceptance,
  beats,
  attempts,
  submissions,
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = useMemo(
    () => [
      { label: "Solved", value: `${solved}/${total}`, subLabel: `${attempts} Attempting` },
      { label: "Acceptance", value: `${acceptance.toFixed(2)}%`, subLabel: `${submissions} submissions` },
      { label: "Beats", value: `${beats[0]}%`, subLabel: `${attempts} Attempting` },
      { label: "Beats", value: `${beats[1]}%`, subLabel: `0 Attempting` },
      { label: "Beats", value: `${beats[2]}%`, subLabel: `0 Attempting` },
    ],
    [solved, total, acceptance, beats, attempts, submissions]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (solved / total) * circumference;

  return (

    <AnimatedCard className="!bg-white dark:!bg-primary !w-fit">
      <div className="flex items-center justify-between p-4 px-6 transition-colors duration-300">
        {/* Circle with Rotating Stats */}
        <div className="relative flex items-center justify-center w-[160px] h-[160px]">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 h-full w-full"
          >
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-light dark:stroke-secondary"
              strokeWidth="3"
              fill="transparent"
            />
            {/* Progress Ring (Accent) */}
            <circle

              cx="50"
              cy="50"
              r={radius}
              className="stroke-accent"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={`${progress} ${circumference - progress}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dasharray 0.5s ease" }}
            />
          </svg>

          {/* Rotating Stat Text */}
          <div className="absolute flex flex-col items-center text-center text-sm">
            <div className="text-[30px] font-semibold leading-[32px] text-primary dark:text-light">
              {stats[activeIndex].value}
            </div>
            <div className="text-xs text-secondary dark:text-accent">
              {stats[activeIndex].label}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stats[activeIndex].subLabel}
            </div>
          </div>
        </div>

        {/* Difficulty Mini-Cards */}
        <div className="flex flex-col gap-3 w-[100px]">
          {/* Easy */}
          <div className="rounded flex flex-col items-center justify-center py-2 bg-dime dark:bg-dark shadow transition-all duration-300">
            <div className="text-xs font-medium text-success">Easy</div>
            <div className="text-primary dark:text-light text-xs font-semibold">
              {easySolved}/{easyTotal}
            </div>
          </div>
          {/* Medium */}
          <div className="rounded flex flex-col items-center justify-center py-2 bg-dime dark:bg-dark shadow transition-all duration-300">
            <div className="text-xs font-medium text-secondary">Medium</div>
            <div className="text-primary dark:text-light text-xs font-semibold">
              {mediumSolved}/{mediumTotal}
            </div>
          </div>
          {/* Hard */}
          <div className="rounded flex flex-col items-center justify-center py-2 bg-dime dark:bg-dark shadow transition-all duration-300">
            <div className="text-xs font-medium text-danger">Hard</div>
            <div className="text-primary dark:text-light text-xs font-semibold">
              {hardSolved}/{hardTotal}
            </div>
          </div>
        </div>
      </div>
      </AnimatedCard>
  );
};

export default DashboardStats;
