import React from "react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiLogOut } from "react-icons/fi";

interface Props {
  onMute: () => void;
  onVideo: () => void;
  onShareScreen: () => void;
  onStopShare: () => void;
  onLeave: () => void;
}

const Controls: React.FC<Props> = ({ onMute, onVideo, onShareScreen, onStopShare, onLeave }) => {
  const [muted, setMuted] = React.useState(false);
  const [videoOff, setVideoOff] = React.useState(false);
  const [sharing, setSharing] = React.useState(false);

  const handleMute = () => {
    setMuted(!muted);
    onMute();
  };

  const handleVideo = () => {
    setVideoOff(!videoOff);
    onVideo();
  };

  const handleShare = () => {
    if (sharing) {
      onStopShare();
    } else {
      onShareScreen();
    }
    setSharing(!sharing);
  };

  return (
    <div className="flex justify-center items-center gap-6 bg-white dark:bg-primary border-t border-gray-200 py-3">
      <button
        onClick={handleMute}
        title={muted ? "Unmute" : "Mute"}
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        {muted ? <FiMicOff size={20} /> : <FiMic size={20} />}
      </button>

      <button
        onClick={handleVideo}
        title={videoOff ? "Turn Video On" : "Turn Video Off"}
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        {videoOff ? <FiVideoOff size={20} /> : <FiVideo size={20} />}
      </button>

      <button
        onClick={handleShare}
        title={sharing ? "Stop Sharing" : "Share Screen"}
        className={`p-3 rounded-full ${
          sharing ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <FiMonitor size={20} />
      </button>

      <button
        onClick={onLeave}
        title="Leave Room"
        className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white"
      >
        <FiLogOut size={20} />
      </button>
    </div>
  );
};

export default Controls;
