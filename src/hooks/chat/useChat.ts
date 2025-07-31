import { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};
