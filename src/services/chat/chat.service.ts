import socket from "../socket";
import type {
  WebRTCOfferPayload,
  WebRTCAnswerPayload,
  WebRTCCandidatePayload,
} from "../../types/chat/webrtc.types";
import type { ChatMessage, RoomUser } from "../../types/chat/chat.types";


export const connectChat = () => {
  if (!socket.connected) {
    socket.connect(); // IMPORTANT
  }
};



/** Room actions */
export const joinRoom = (roomId: string, username: string) => {
  socket.emit("join-room", { roomId, username });
};

export const leaveRoom = (roomId: string, username: string) => {
  socket.emit("leave-room", { roomId, username });
};

/** Messaging */
export const sendRoomMessage = (roomId: string, user: string, message: string) => {
  socket.emit("chat-message", { roomId, user, message });
};

export const emitToggleVideo = (roomId: string, enabled: boolean) => {
  socket.emit("toggle-video", { roomId, enabled });
};

/** Listeners */
export const listenRoomUsers = (cb: (users: RoomUser[]) => void) =>
  socket.on("room-users", cb);

export const listenRoomMessages = (cb: (msg: ChatMessage) => void) =>
  socket.on("chat-message", cb);

export const listenSystemMessages = (cb: (msg: string) => void) =>
  socket.on("system-message", cb);

/** WebRTC Signaling */
export const listenOffer = (cb: (data: WebRTCOfferPayload) => void) =>
  socket.on("webrtc-offer", cb);

export const listenAnswer = (cb: (data: WebRTCAnswerPayload) => void) =>
  socket.on("webrtc-answer", cb);

export const listenIceCandidate = (cb: (data: WebRTCCandidatePayload) => void) =>
  socket.on("webrtc-ice-candidate", cb);

export const sendOffer = (to: string, offer: RTCSessionDescriptionInit) => {
  socket.emit("webrtc-offer", { to, offer });
};

export const sendAnswer = (to: string, answer: RTCSessionDescriptionInit) => {
  socket.emit("webrtc-answer", { to, answer });
};

export const sendIceCandidate = (to: string, candidate: RTCIceCandidateInit) => {
  socket.emit("webrtc-ice-candidate", { to, candidate });
};

export const removeAllChatListeners = () => {
  socket.removeAllListeners();
};
