import { sendOffer, sendAnswer, sendIceCandidate } from "./chat.service";
import type { PeerMap } from "../../types/chat/webrtc.types";

export const createPeerConnection = (
  peerId: string,
  localStream: MediaStream,
  peers: PeerMap,
  onTrack: (id: string, stream: MediaStream) => void,
  onDisconnect: (id: string) => void
): RTCPeerConnection => {
  const pc = new RTCPeerConnection();

  // Add local tracks
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

  pc.onicecandidate = (event) => {
    if (event.candidate) sendIceCandidate(peerId, event.candidate);
  };

  pc.ontrack = (event) => {
    onTrack(peerId, event.streams[0]);
  };

  pc.onconnectionstatechange = () => {
    if (["disconnected", "failed"].includes(pc.connectionState)) {
      pc.close();
      delete peers[peerId];
      onDisconnect(peerId);
    }
  };

  peers[peerId] = pc;
  return pc;
};

export const makeOffer = async (peerId: string, pc: RTCPeerConnection) => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  sendOffer(peerId, offer);
};

export const handleOffer = async (
  from: string,
  offer: RTCSessionDescriptionInit,
  peers: PeerMap,
  localStream: MediaStream | null,
  onTrack: (id: string, stream: MediaStream) => void,
  onDisconnect: (id: string) => void
) => {
  if (!localStream) return;
  const pc =
    peers[from] || createPeerConnection(from, localStream, peers, onTrack, onDisconnect);
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  sendAnswer(from, answer);
};

export const handleAnswer = async (
  from: string,
  answer: RTCSessionDescriptionInit,
  peers: PeerMap
) => {
  const pc = peers[from];
  if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
};

export const handleCandidate = async (
  from: string,
  candidate: RTCIceCandidateInit,
  peers: PeerMap
) => {
  const pc = peers[from];
  if (pc) await pc.addIceCandidate(new RTCIceCandidate(candidate));
};

export const closeAllPeers = (peers: PeerMap) => {
  Object.values(peers).forEach((pc) => pc.close());
  Object.keys(peers).forEach((id) => delete peers[id]);
};

export const replaceVideoTrack = (track: MediaStreamTrack, peers: PeerMap) => {
  Object.values(peers).forEach((pc) => {
    const sender = pc.getSenders().find((s) => s.track?.kind === "video");
    if (sender) sender.replaceTrack(track);
  });
};
