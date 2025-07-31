import React from "react";
import { FaEye, FaComments } from "react-icons/fa";
import { MdCode } from "react-icons/md";
import CustomLoading from "../Common/CustomLoading";

interface CommunityStatsCardProps {
  stats?: {
    views: number;
  solutions: number;
  discussions: number;
  } | null;
  isLoading?: boolean;
}

const CommunityStatsCard: React.FC<CommunityStatsCardProps> = ({
  stats,
  isLoading = false,
}) => {
  // console.log(stats)
  if (isLoading) {
    return (
      <div className="mb-6 bg-white dark:bg-dark p-4 rounded-lg shadow-md flex justify-center">
        <CustomLoading message="Loading stats..." />
      </div>
    );
  }

  const statsData = [
    {
      label: "Views",
      value: stats?.views ?? 0,
      icon: <FaEye className="text-secondary dark:text-accent" />,
    },
    {
      label: "Solutions",
      value: stats?.solutions ?? 0,
      icon: <MdCode className="text-primary dark:text-light" />,
    },
    {
      label: "Discussions",
      value: stats?.discussions ?? 0,
      icon: <FaComments className="text-success dark:text-danger" />,
    },
  ];

  return (
    <div className="mb-6 dark:bg-transparent p-4 rounded-lg shadow-sm dark:shadow-none transition-colors duration-300">
      <h4 className="font-semibold text-primary dark:text-light mb-3">
        Community Stats
      </h4>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-dime">
        {statsData.map((item) => (
          <li
            key={item.label}
            className="flex justify-between items-center hover:bg-dime dark:hover:bg-secondary/30 p-2 rounded-md transition"
          >
            <span className="flex items-center gap-2">
              {item.icon} {item.label}
            </span>
            <span className="font-semibold text-primary dark:text-accent">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityStatsCard;
