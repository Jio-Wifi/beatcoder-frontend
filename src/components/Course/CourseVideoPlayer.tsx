import React, { useEffect, useRef } from "react";
import VideoTabs from "./VideoTabs";

interface CourseVideoPlayerProps {
  videoUrl?: string;
  courseTitle: string;
  isPurchased?: boolean;
  description?: string;
  rating?: number;
  videoDuration?: number;
  videoDescription?: string;
  createdAt?: string;
  language?: string;
  showCertificate?: boolean;
  onDownloadCertificate?: () => void;
}

const fallbackVideo =
  "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({
  videoUrl,
  courseTitle,
  isPurchased = false,
  description,
  rating,
  videoDuration,
  videoDescription,
  createdAt,
  language = "English",
  showCertificate = true,
  onDownloadCertificate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayUrl = isPurchased && videoUrl ? videoUrl : fallbackVideo;

  // Reset video when src changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [displayUrl]);

  return (
    <div className="bg-white w-full md:w-[950px] md:order-1 dark:bg-primary p-4 rounded-md shadow-md flex flex-col">
      <div className="w-full bg-black rounded-md overflow-hidden mb-4">
        <video
          ref={videoRef}
          controls
          className="w-full"
          preload="metadata"
          controlsList="nodownload"
        >
          <source src={displayUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2 className="text-xl font-semibold text-secondary dark:text-accent mb-2">
        {courseTitle}
      </h2>

      {/* Tabs below video */}
      <VideoTabs
        description={description}
        rating={rating}
        videoDuration={videoDuration}
        videoDescription={videoDescription}
        createdAt={createdAt}
        language={language}
        showCertificate={showCertificate}
        onDownloadCertificate={onDownloadCertificate}
      />
    </div>
  );
};

export default CourseVideoPlayer;
