import { createContext } from "react";
import type { ChatMessage, RoomUser } from "../../types/chat/chat.types";

interface ChatContextType {
  username: string;
  roomId: string | null;
  users: RoomUser[];
  messages: ChatMessage[];
  localStream: MediaStream | null;
  remoteStreams: Record<string, MediaStream>;
  joinRoom: (roomId: string, username: string) => Promise<void>;
  leaveRoom: () => void;
  sendMessage: (msg: string) => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);
