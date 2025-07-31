import React, { useEffect, useRef } from "react";

interface GeminiResponseProps {
  response: string;
  loading: boolean;
}

const GeminiResponse: React.FC<GeminiResponseProps> = ({
  response,
  loading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when response updates
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response, loading]);

  return (
    <div className="mt-4 bg-primary/10 dark:bg-primary/40 rounded-lg p-4 text-dark dark:text-light min-h-[200px] max-h-[250px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-secondary dark:text-accent">
        Gemini Reply:
      </h3>

      {loading ? (
        <p className="animate-pulse text-accent mt-2">Thinking...</p>
      ) : (
        <p className="mt-2 whitespace-pre-line">
          {response || "Ask me something..."}
        </p>
      )}

      <div ref={scrollRef} />
    </div>
  );
};

export default GeminiResponse;
