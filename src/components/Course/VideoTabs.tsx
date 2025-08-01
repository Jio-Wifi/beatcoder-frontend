import React, { useState } from "react";
import OverviewTab from "./OverviewTab";
import QnATab from "./QnATab";
import NotesTab from "./NotesTab";

const tabs = ["Overview", "Q&A", "Notes"];

interface VideoTabsProps {
  description?: string;
  rating?: number;
  videoDuration?: number;
  videoDescription?: string;
  createdAt?: string;
  language?: string;
  showCertificate?: boolean;
  onDownloadCertificate?: () => void;
}

const VideoTabs: React.FC<VideoTabsProps> = ({
  description,
  rating,
  videoDuration,
  videoDescription,
  createdAt,
  language = "English",
  showCertificate = true,
  onDownloadCertificate,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="mt-4">
      <div className="flex border-b border-gray-300 dark:border-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-gray-600 dark:text-gray-300 hover:text-accent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "Overview" && (
          <OverviewTab
            description={description}
            rating={rating}
            videoDuration={videoDuration}
            videoDescription={videoDescription}
            createdAt={createdAt}
            language={language}
            showCertificate={showCertificate}
            onDownloadCertificate={onDownloadCertificate}
          />
        )}
        {activeTab === "Q&A" && <QnATab />}
        {activeTab === "Notes" && <NotesTab />}
      </div>
    </div>
  );
};

export default VideoTabs;
