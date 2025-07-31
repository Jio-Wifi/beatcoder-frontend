export interface PeerMap {
  [peerId: string]: RTCPeerConnection;
}

export interface RemoteStreamMap {
  [peerId: string]: MediaStream;
}

export interface WebRTCOfferPayload {
  from: string;
  offer: RTCSessionDescriptionInit;
}

export interface WebRTCAnswerPayload {
  from: string;
  answer: RTCSessionDescriptionInit;
}

export interface WebRTCCandidatePayload {
  from: string;
  candidate: RTCIceCandidateInit;
}
