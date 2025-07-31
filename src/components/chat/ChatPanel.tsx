import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../../hooks/chat/useChat";
import CustomButton from "../Custom/CustomButton";

const ChatPanel: React.FC = () => {
  const { messages, sendMessage, username } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-primary">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs ${
              msg.user === username
                ? "bg-blue-100 ml-auto text-blue-800"
                : msg.user === "System"
                ? "text-gray-400 text-sm italic mx-auto"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.user !== "System" && (
              <p className="text-xs font-semibold">{msg.user}</p>
            )}
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none dark:text-dime focus:ring focus:ring-blue-300"
        />
        <CustomButton
          onClick={handleSend}
          className="ml-3 px-4 py-2"
        >
          Send
        </CustomButton>
      </div>
    </div>
  );
};

export default ChatPanel;
