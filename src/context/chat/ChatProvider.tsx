import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { ChatContext } from "./ChatContext";
import type { ChatMessage, RoomUser } from "../../types/chat/chat.types";
import type { PeerMap, RemoteStreamMap } from "../../types/chat/webrtc.types";
import {
  connectChat,
  joinRoom as joinRoomSocket,
  leaveRoom as leaveRoomSocket,
  sendRoomMessage,
  listenRoomUsers,
  listenRoomMessages,
  listenSystemMessages,
  listenOffer,
  listenAnswer,
  listenIceCandidate,
  emitToggleVideo,
  removeAllChatListeners,
} from "../../services/chat/chat.service";
import {
  handleOffer,
  handleAnswer,
  handleCandidate,
  replaceVideoTrack,
  closeAllPeers,
} from "../../services/chat/webrtc.service";

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamMap>({});
  const [screenTrack, setScreenTrack] = useState<MediaStreamTrack | null>(null);

  const peersRef = useRef<PeerMap>({});

  /** Start local video/audio */
  const startLocalStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    return stream;
  }, []);

  /** Stop all tracks */
  const stopLocalStream = useCallback(() => {
    localStream?.getTracks().forEach((t) => t.stop());
    setLocalStream(null);
  }, [localStream]);

  /** Screen share */
  const stopScreenShare = useCallback(() => {
    if (!screenTrack || !localStream) return;
    screenTrack.stop();
    const camTrack = localStream.getVideoTracks()[0];
    replaceVideoTrack(camTrack, peersRef.current);
    setScreenTrack(null);
  }, [screenTrack, localStream]);

  const startScreenShare = useCallback(async () => {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const track = displayStream.getTracks()[0];
    setScreenTrack(track);
    replaceVideoTrack(track, peersRef.current);
    track.onended = () => stopScreenShare();
  }, [stopScreenShare]);

  const toggleMute = () => {
    const track = localStream?.getAudioTracks()[0];
    if (track) track.enabled = !track.enabled;
  };

  const toggleVideo = () => {
    const track = localStream?.getVideoTracks()[0];
    if (track && roomId) {
      track.enabled = !track.enabled;
      emitToggleVideo(roomId, track.enabled);
    }
  };

  /** Socket + WebRTC */
  useEffect(() => {
    connectChat();

    // Stable callbacks
    const handleUsers = (u: RoomUser[]) => setUsers(u);
    const handleMsg = (msg: ChatMessage) => setMessages((prev) => [...prev, msg]);
    const handleSysMsg = (msg: string) =>
      setMessages((prev) => [
        ...prev,
        { user: "System", message: msg, time: new Date().toISOString() },
      ]);

    listenRoomUsers(handleUsers);
    listenRoomMessages(handleMsg);
    listenSystemMessages(handleSysMsg);

    listenOffer(async ({ from, offer }) => {
      await handleOffer(
        from,
        offer,
        peersRef.current,
        localStream,
        (id, stream) => setRemoteStreams((prev) => ({ ...prev, [id]: stream })),
        (id) => setRemoteStreams((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        })
      );
    });

    listenAnswer(({ from, answer }) => {
      handleAnswer(from, answer, peersRef.current);
    });

    listenIceCandidate(({ from, candidate }) => {
      handleCandidate(from, candidate, peersRef.current);
    });

    const peersSnapshot = peersRef.current;
    return () => {
      removeAllChatListeners();
      closeAllPeers(peersSnapshot);
    };
  }, [localStream]);

  /** Join & Leave */
  const joinRoom = async (room: string, name: string) => {
    if (!room || !name) return;
    setUsername(name);
    setRoomId(room);
    await startLocalStream();
    joinRoomSocket(room, name);
  };

  const leaveRoom = () => {
    if (roomId && username) leaveRoomSocket(roomId, username);
    closeAllPeers(peersRef.current);
    stopLocalStream();
    setRemoteStreams({});
    setUsers([]);
    setMessages([]);
    setRoomId(null);
    setUsername("");
  };

  const sendMessage = (msg: string) => {
    if (roomId && username) sendRoomMessage(roomId, username, msg);
  };

  return (
    <ChatContext.Provider
      value={{
        username,
        roomId,
        users,
        messages,
        localStream,
        remoteStreams,
        joinRoom,
        leaveRoom,
        sendMessage,
        toggleMute,
        toggleVideo,
        startScreenShare,
        stopScreenShare,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
