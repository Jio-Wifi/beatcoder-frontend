import React, { useState } from "react";
import ProblemsAndCourses from "./ProblemsAndCourses";
import { motion } from "framer-motion";

const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"problems" | "courses">("problems");

  const tabs = [
    { key: "problems", label: "Problems Solved" },
    { key: "courses", label: "Courses" },
  ] as const;

  return (
      <div className="w-full bg-white dark:bg-primary mt-8 rounded-md shadow-md p-6 overflow-y-auto h-96 custom-scroll">
        {/* Tab Header */}
        <div className="flex space-x-6 border-b border-gray-300 dark:border-gray-700 mb-6 relative">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 ease-in-out
                ${
                  activeTab === tab.key
                    ? "text-accent dark:text-light"
                    : "text-primary dark:text-dime hover:text-secondary"
                }
              `}
            >
              {tab.label}

              {/* Active Tab Indicator */}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ProblemsAndCourses activeTab={activeTab} />
        </motion.div>
      </div>
  );
};

export default DashboardTabs;
