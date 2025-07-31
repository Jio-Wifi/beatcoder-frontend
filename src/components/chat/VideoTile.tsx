import React, { useRef, useEffect } from "react";

interface Props {
  stream: MediaStream;
  username: string;
}

const VideoTile: React.FC<Props> = ({ stream, username }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="max-h-full max-w-full rounded-lg shadow-lg"
      />
      <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
        {username}
      </span>
    </div>
  );
};

export default VideoTile;
