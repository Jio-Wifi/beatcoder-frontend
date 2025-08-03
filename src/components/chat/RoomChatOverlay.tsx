import React, { useEffect, useState } from "react";
import { FiX,  FiMessageSquare } from "react-icons/fi";
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle

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
      <div className="flex flex-1 overflow-hidden relative">
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
        <div
          className={`
            fixed md:static top-0 right-0 h-full w-72 md:w-80 bg-white dark:bg-primary
            border-l border-gray-200 shadow-lg z-40 transition-transform duration-300
            flex flex-col
            ${sidebarOpen ? "translate-x-0" : "translate-x-full"} 
            md:translate-x-0
          `}
        >
          <div className="flex justify-between items-center p-3 border-b border-gray-200 md:hidden">
            <span className="font-semibold text-gray-700 dark:text-dime">Sidebar</span>
            <button aria-label="cross" onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-red-500">
              <FiX size={20} />
            </button>
          </div>
          <ParticipantList users={users} />
          <div className="flex-1 border-t overflow-y-auto custom-scroll border-gray-200">
            <ChatPanel />
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
        aria-label="toggle"
          onClick={() => setSidebarOpen(true)}
          className="absolute bottom-20 right-4 z-30 p-3 bg-primary text-white rounded-full shadow-lg md:hidden"
        >
          <FiMessageSquare size={20} />
        </button>
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
