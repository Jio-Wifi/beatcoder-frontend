import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiShare2, FiRefreshCcw } from "react-icons/fi";
import GeminiInput from "./GeminiInput";

interface Message {
  role: "user" | "ai";
  text: string;
}

const GeminiContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [stopRequested, setStopRequested] = useState(false);
  const [lastPrompt, setLastPrompt] = useState(""); // For Regenerate
  const stopRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleGenerate = async (prompt: string) => {
    setLastPrompt(prompt);
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setLoading(true);
    setStopRequested(false);
    stopRef.current = false;

    const { generateText } = await import("../../../services/gemini");
    const result = await generateText(prompt);

    const lines = result.split("\n").filter((line) => line.trim() !== "");
    let currentText = "";

    // Placeholder for AI
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    // Reveal line by line
    for (let i = 0; i < lines.length; i++) {
      if (stopRef.current) break;
      await new Promise((r) => setTimeout(r, 500));
      currentText += (currentText ? "\n" : "") + lines[i];
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = { role: "ai", text: currentText };
        return msgs;
      });
    }

    setLoading(false);
  };

  const handleStop = () => {
    stopRef.current = true;
    setStopRequested(true);
    setLoading(false);
  };

  const handleShare = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Response copied to clipboard!");
  };

  const handleRegenerate = () => {
    if (lastPrompt) handleGenerate(lastPrompt);
  };

  // Find last AI message for share button
  const lastAiMessage = [...messages].reverse().find((m) => m.role === "ai");

  return (
    <div className="w-full max-w-[260px]  h-[450px] md:max-w-2xl md:h-[600px] flex flex-col shadow-xl backdrop-blur-md animate-fade-up
      bg-white text-dark dark:bg-dark dark:text-light">
      
      {/* Header */}
      <div className="p-4 border-b border-dime dark:border-secondary/50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-secondary dark:text-accent">
          BeatCoder AI
        </h2>
        {/* Show share and regenerate buttons only when AI has responded */}
        {lastAiMessage && !loading && (
          <div className="flex gap-3">
            <button
              onClick={() => handleShare(lastAiMessage.text)}
              className="p-2 rounded-full bg-accent text-dark hover:bg-secondary hover:text-light transition"
              title="Copy response"
            >
              <FiShare2 size={18} />
            </button>
            <button
              onClick={handleRegenerate}
              className="p-2 rounded-full bg-secondary text-light hover:bg-accent hover:text-dark transition"
              title="Regenerate response"
            >
              <FiRefreshCcw size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Chat Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-4">
        {messages.length === 0 && !loading && (
          <p className="text-primary dark:text-light text-center">
            Start chatting with AI...
          </p>
        )}

        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`whitespace-pre-line max-w-[80%] px-4 py-2 rounded-lg shadow-md
              ${msg.role === "user" 
                ? "ml-auto bg-secondary text-light" 
                : "mr-auto bg-primary/50 text-dark dark:text-accent"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {loading && !stopRequested && (
          <div className="mr-auto bg-primary/50 text-dark dark:text-accent px-4 py-2 rounded-lg animate-pulse">
            BeatCoder is thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-dime dark:border-secondary/50">
        <GeminiInput
          onSubmit={handleGenerate}
          onStop={handleStop}
          isGenerating={loading}
        />
      </div>
    </div>
  );
};

export default GeminiContainer;
