import { useState } from "react";
import { tabs } from "./tabs";

const TabLayout = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-sm bg-dime dark:bg-dark text-dark dark:text-light">
      
      {/* Top Horizontal Tabs */}
      <div className="flex flex-wrap border-b dark:border-secondary/50 bg-white dark:bg-dark shadow-sm z-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-3 font-semibold border-b-2 whitespace-nowrap
              transition duration-200 text-sm sm:text-base
              ${activeTab === tab.id
                ? "border-primary text-primary dark:border-accent dark:text-accent"
                : "border-transparent text-gray-500 hover:text-dark dark:hover:text-light"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full overflow-y-auto ">
        {tabs.find((t) => t.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default TabLayout;
