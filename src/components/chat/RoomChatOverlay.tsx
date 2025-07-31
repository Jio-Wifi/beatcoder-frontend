import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useChat } from "../../hooks/chat/useChat";
import VideoGrid from "./VideoGrid";
import ParticipantList from "./ParticipantList";
import ChatPanel from "./ChatPanel";
import Controls from "./Controls";
import { useUser } from "../../hooks/user/userUser";

interface Props {
  onClose: () => void;
}

const RoomChatOverlay: React.FC<Props> = ({ onClose }) => {
  const {
    roomId,
    users,
    localStream,
    remoteStreams,
    joinRoom,
    leaveRoom,
    toggleMute,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
  } = useChat();

  const { user } = useUser();

  useEffect(() => {
    if (!roomId && user?.name) {
      joinRoom("default-room", user.name);
    }
  }, [roomId, user?.name, joinRoom]);

  const handleLeave = () => {
    leaveRoom();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-dime dark:bg-primary z-50 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-primary shadow">
        <h2 className="text-lg font-bold text-gray-800 dark:text-dime">
          Room: {roomId || "Not Joined"} ({user?.name || "Guest"})
        </h2>
        <button
          onClick={onClose}
          aria-label="Close chat"
          title="Close chat"
          className="text-gray-500 hover:text-red-500 transition"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Section */}
        <div className="flex-1 flex flex-col">
          <VideoGrid
            localStream={localStream}
            remoteStreams={remoteStreams}
            currentUserName={user?.name || "You"}
            users={users}
          />
        </div>

        {/* Sidebar */}
        <div className="w-80 dark:bg-primary border-l border-gray-200 flex flex-col">
          <ParticipantList users={users} />
          <div className="flex-1 border-t overflow-y-auto custom-scroll border-gray-200">
            <ChatPanel />
          </div>
        </div>
      </div>

      {/* Controls */}
      <Controls
        onMute={toggleMute}
        onVideo={toggleVideo}
        onShareScreen={startScreenShare}
        onStopShare={stopScreenShare}
        onLeave={handleLeave}
      />
    </div>
  );
};

export default RoomChatOverlay;
