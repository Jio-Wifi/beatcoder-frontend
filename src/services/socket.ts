import io  from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL as string, {
  autoConnect: false,         // connect manually (good if you join after auth)
  transports: ["websocket"],  // low-latency signaling
  reconnection: true,         // auto-reconnect if disconnected
  reconnectionAttempts: 5,    // retry 5 times
  reconnectionDelay: 1000,    // 1s between retries
});

export default socket;
