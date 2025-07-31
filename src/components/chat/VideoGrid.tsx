import React, { useState, useEffect } from "react";
import VideoTile from "./VideoTile";
import type { RemoteStreamMap } from "../../types/chat/webrtc.types";

interface Props {
  localStream: MediaStream | null;
  remoteStreams: RemoteStreamMap;
  currentUserName: string;
  users?: { id: string; username: string }[];
}

const VideoGrid: React.FC<Props> = ({
  localStream,
  remoteStreams,
  currentUserName,
  users = [],
}) => {
  const [allStreams, setAllStreams] = useState<
    { id: string; stream: MediaStream; username: string }[]
  >([]);
  const [activeUser, setActiveUser] = useState<string>("");

  useEffect(() => {
    const combined = [
      ...(localStream
        ? [{ id: "local", stream: localStream, username: currentUserName }]
        : []),
      ...Object.entries(remoteStreams).map(([id, stream]) => {
        const user = users.find((u) => u.id === id);
        return { id, stream, username: user?.username || `User ${id.slice(0, 4)}` };
      }),
    ];
    setAllStreams(combined);
    if (!activeUser && combined.length > 0) setActiveUser(combined[0].id);
  }, [localStream, remoteStreams, users, currentUserName, activeUser]);

  const activeStream = allStreams.find((s) => s.id === activeUser) || allStreams[0];

  return (
    <div className="flex flex-col w-full h-full">
      {/* Scrollable User Circles */}
      <div className="flex overflow-x-auto p-3 gap-4 bg-white dark:bg-dark border-b border-gray-200">
        {allStreams.map(({ id, username, stream }) => (
          <div
            key={id}
            onClick={() => setActiveUser(id)}
            className={`flex flex-col items-center cursor-pointer min-w-[72px] transition-transform ${
              activeUser === id
                ? "scale-110 ring-2 ring-blue-500"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <div className="relative w-16 h-16 rounded-full bg-gray-200 border border-gray-300 overflow-hidden shadow">
              <video
                ref={(el) => {
                  if (el) el.srcObject = stream;
                }}
                autoPlay
                playsInline
                muted={id === "local"}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="mt-2 text-xs text-gray-700 dark:text-dime text-center truncate max-w-[72px]">
              {id === "local" ? `${username} (You)` : username}
            </p>
          </div>
        ))}
      </div>

      {/* Main Spotlight Video */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-primary">
        {activeStream ? (
          <VideoTile
            stream={activeStream.stream}
            username={
              activeStream.id === "local"
                ? `${activeStream.username} (You)`
                : activeStream.username
            }
          />
        ) : (
          <p className="text-gray-500">No active video</p>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
