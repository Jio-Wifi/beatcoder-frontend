// src/components/Course/CourseVideoPlayer.tsx
import React from "react";

interface CourseVideoPlayerProps {
  videoUrl?: string;
  courseTitle: string;
  instructorName: string;
  rating?: number;
  isPurchased?: boolean;
}

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({
  videoUrl,
  courseTitle,
  instructorName,
  rating,
  isPurchased = false,
}) => {
  const displayUrl = isPurchased
    ? videoUrl
    : "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"; // Free trial video

  return (
    <div className="bg-white w-full md:order-2 dark:bg-primary h-full p-4 rounded-md shadow-md flex flex-col">
      <div className="w-full h-64 bg-black rounded-md overflow-hidden mb-4">
        {displayUrl ? (
          <video controls className="w-full h-full">
            <source src={displayUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-center text-gray-400 mt-10">Video not available</p>
        )}
      </div>

      <h2 className="text-xl font-semibold text-secondary dark:text-accent mb-2">
        {courseTitle}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
        Instructor: {instructorName}
      </p>
      {rating && (
        <p className="text-sm text-yellow-500">⭐ {rating.toFixed(1)}</p>
      )}
    </div>
  );
};

export default CourseVideoPlayer;
