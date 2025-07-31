import { useState } from "react";
import { FiSend, FiStopCircle } from "react-icons/fi";
import CustomTextarea from "../Custom/CustomTextArea";
import CustomButton from "../Custom/CustomButton";

interface GeminiInputProps {
  onSubmit: (prompt: string) => void;
  onStop?: () => void; // optional stop handler
  isGenerating?: boolean; // show/hide stop button
}

const GeminiInput: React.FC<GeminiInputProps> = ({
  onSubmit,
  onStop,
  isGenerating = false,
}) => {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt("");
    }
  };

  return (
    <div className="space-y-3">
      {/* Textarea for user input */}
      <CustomTextarea
        name="gemini-prompt"
        value={prompt}
        placeholder="Ask BeatCoder anything..."
        rows={3}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full bg-dime text-dark dark:bg-primary dark:text-accent"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <CustomButton
          onClick={handleSend}
          className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-accent text-light dark:text-dark"
        >
          <FiSend size={18} />
          Send
        </CustomButton>

        {/* Show Stop button only when AI is generating */}
        {isGenerating && onStop && (
          <CustomButton
            onClick={onStop}
            className="flex items-center justify-center gap-2 bg-danger hover:bg-light text-light dark:text-dark"
          >
            <FiStopCircle size={18} />
            Stop
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default GeminiInput;
