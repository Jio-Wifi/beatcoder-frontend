import socket from "../../services/socket";
import type { PeerMap } from "../../types/chat/webrtc.types";

export const createPeerConnection = (
  peerId: string,
  localStream: MediaStream,
  peers: PeerMap,
  onStream: (id: string, stream: MediaStream) => void,
  onClose: (id: string) => void
) => {
  const pc = new RTCPeerConnection();

  // Attach local tracks
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  // ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("webrtc-ice-candidate", { to: peerId, candidate: event.candidate });
    }
  };

  // Remote stream
  pc.ontrack = (event) => {
    onStream(peerId, event.streams[0]);
  };

  // Handle disconnection
  pc.onconnectionstatechange = () => {
    if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
      onClose(peerId);
      pc.close();
      delete peers[peerId];
    }
  };

  peers[peerId] = pc;
  return pc;
};

export const makeOffer = async (peerId: string, pc: RTCPeerConnection) => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit("webrtc-offer", { to: peerId, offer });
};

export const handleOffer = async (
  from: string,
  offer: RTCSessionDescriptionInit,
  peers: PeerMap,
  localStream: MediaStream | null,
  onStream: (id: string, stream: MediaStream) => void,
  onClose: (id: string) => void
) => {
  const pc = peers[from] || createPeerConnection(from, localStream!, peers, onStream, onClose);
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  socket.emit("webrtc-answer", { to: from, answer });
};

export const handleAnswer = async (from: string, answer: RTCSessionDescriptionInit, peers: PeerMap) => {
  const pc = peers[from];
  if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
};

export const handleCandidate = async (from: string, candidate: RTCIceCandidateInit, peers: PeerMap) => {
  const pc = peers[from];
  if (pc) await pc.addIceCandidate(new RTCIceCandidate(candidate));
};

export const closeAllPeers = (peers: PeerMap) => {
  Object.values(peers).forEach(pc => pc.close());
  Object.keys(peers).forEach(key => delete peers[key]);
};
