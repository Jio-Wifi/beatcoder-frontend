type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = ["Description", "Editorial", "Solutions", "Submissions"];

const ProblemTabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
            activeTab === tab.toLowerCase()
              ? "bg-accent text-white"
              : "bg-gray-200 dark:bg-gray-700 text-dark dark:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProblemTabs;
