export interface ChatMessage {
  user: string;
  message: string;
  time: string; // ISO timestamp
}

export interface RoomUser {
  id: string;        // socket ID
  username: string;
  video?: boolean;   // true if user has video enabled
}
