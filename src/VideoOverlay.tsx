import React, { useEffect, useRef, useState } from "react";

interface Props {
  onClose: () => void;
}

const VideoOverlay: React.FC<Props> = ({ onClose }) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ask for camera + mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => {
        console.error("Failed to get media:", err);
        setError("Unable to access camera/mic");
      });

    return () => {
      // Stop all tracks when closing
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-[80%] h-[80%] bg-gray-900 rounded-lg shadow-lg flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
        >
          ✕
        </button>

        {/* Show Error */}
        {error && (
          <div className="text-red-400 font-semibold">{error}</div>
        )}

        {/* Local Video */}
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default VideoOverlay;
