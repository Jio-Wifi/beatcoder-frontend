import React from "react";
import { formatDistanceToNow } from "date-fns";

interface OverviewTabProps {
  description?: string;
  rating?: number;
  videoDuration?: number;
  videoDescription?: string;
  createdAt?: string;
  language?: string;
  showCertificate?: boolean; // Optional control
  onDownloadCertificate?: () => void;
}

const formatDuration = (seconds?: number): string => {
  if (!seconds) return "Unknown";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

const OverviewTab: React.FC<OverviewTabProps> = ({
  description,
  rating,
  videoDuration,
  videoDescription,
  createdAt,
  language = "English",
  showCertificate = true,
  onDownloadCertificate,
}) => {
  return (
    <div className="text-sm text-gray-800 dark:text-gray-200 space-y-4">
      <div>
        <h3 className="font-semibold mb-1">Course Overview</h3>
        <p>{description || "No course description available."}</p>
      </div>

      {videoDescription && (
        <div>
          <h4 className="font-semibold mb-1">Video Description</h4>
          <p>{videoDescription}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <span className="font-medium">Rating:</span>{" "}
          {rating !== undefined ? (
            <span className="text-yellow-500">⭐ {rating.toFixed(1)}</span>
          ) : (
            "N/A"
          )}
        </div>

        <div>
          <span className="font-medium">Video Duration:</span>{" "}
          {formatDuration(videoDuration)}
        </div>

        <div>
          <span className="font-medium">Language:</span> {language}
        </div>

        <div>
          <span className="font-medium">Published:</span>{" "}
          {createdAt
            ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
            : "Unknown"}
        </div>
      </div>

      {showCertificate && (
        <div className="pt-4">
          <button
            onClick={onDownloadCertificate}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition"
          >
            🎓 Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
