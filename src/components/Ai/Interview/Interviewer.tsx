import { useRef, useState, useCallback, useEffect } from "react";
import CustomButton from "../../Custom/CustomButton";

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
}

const RecognitionConstructor =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition: SpeechRecognition | null = RecognitionConstructor
  ? new RecognitionConstructor()
  : null;

interface Message {
  role: "user" | "ai";
  content: string;
  isError?: boolean;
}

const Interviewer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("mern");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [duration, setDuration] = useState(5);
  const [remainingTime, setRemainingTime] = useState(0);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isSpeaking = useRef(false);
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const trimToThirtyWords = (text: string) => {
    const words = text.trim().split(/\s+/).slice(0, 30);
    return words.join(" ");
  };

  const removeConsecutiveDuplicates = (text: string) => {
    const words = text.trim().split(/\s+/);
    const filtered = words.filter((word, i) => word !== words[i - 1]);
    return filtered.join(" ");
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis || isSpeaking.current) return;
    isSpeaking.current = true;
    setAiSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      isSpeaking.current = false;
      setAiSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

const askNextQuestion = useCallback(
  async (lastAnswer: string | null = null) => {
    setLoading(true);

    const prompt = lastAnswer
      ? `Evaluate the user's answer: "${lastAnswer}". Ask the next ${subject} interview question. Keep it under 30 words.`
      : `Start a ${subject.toUpperCase()} interview. Ask the first question. Keep it under 30 words.`;

    const { generateText } = await import("../../../services/gemini");

    let attempt = 0;
    let cleaned = "";
    let isDuplicate = true;

    try {
      while (attempt < 5 && isDuplicate) {
        const response = await generateText(prompt);
        const limited = trimToThirtyWords(response);
        cleaned = removeConsecutiveDuplicates(limited).trim();

        if (!askedQuestions.has(cleaned.toLowerCase())) {
          isDuplicate = false;
        } else {
          attempt++;
        }
      }

      // If all attempts fail due to duplicates
      if (isDuplicate) {
        speak("I have no new questions to ask right now.");
        setLoading(false);
        return;
      }

      // Add cleaned question to the asked set
      setAskedQuestions((prev) => new Set(prev).add(cleaned.toLowerCase()));

      // Speak and line-by-line animate
      speak(cleaned);
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      const words = cleaned.split(" ");
      let index = 0;

      const interval = setInterval(() => {
        if (index >= words.length) {
          clearInterval(interval);
          setLoading(false);
          return;
        }

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          if (last.role === "ai") {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + (last.content ? " " : "") + words[index],
            };
          }

          return updated;
        });

        index++;
      }, 80);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `⚠️ ${message}` },
      ]);
      speak("Sorry, I encountered an error while generating the question.");
      setLoading(false);
    }
  },
  [subject, askedQuestions]
);



  const startInterview = () => {
    setInterviewStarted(true);
    setMessages([]);
    setRemainingTime(duration * 60);
    askNextQuestion();

    timerRef.current = setInterval(() => {
      setRemainingTime((time) => {
        if (time <= 1) {
          stopInterview();
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };

  const stopInterview = () => {
    setInterviewStarted(false);
    setLoading(false);
    if (timerRef.current) clearInterval(timerRef.current);
    speak("The interview has ended. Good job!");
  };

  const handleTypedAnswer = async () => {
    if (!input.trim()) return;
    const answer = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: answer }]);
    setInput("");
    await askNextQuestion(answer);
  };

  const handleVoiceInput = () => {
    if (recognition) {
      recognition.lang = "en-US";
      setUserSpeaking(true);
      recognition.start();
      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        setUserSpeaking(false);
        const transcript = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { role: "user", content: transcript }]);
        await askNextQuestion(transcript);
      };
      recognition.onend = () => setUserSpeaking(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="w-full max-w-2xl h-[600px] flex flex-col lg:flex-row bg-gray-50 dark:bg-dark text-dark dark:text-light">
      <div className="w-full p-6 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all 
              ${userSpeaking ? "animate-pulse-shadow ring-2 ring-blue-400" : ""}`}>
              U
            </div>
            <span className="font-semibold text-lg">You</span>
          </div>

          {interviewStarted && (
            <div className="font-semibold text-red-600 text-xl">
              ⏳ {formatTime(remainingTime)}
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">AI</span>
            <div className={`w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all 
              ${aiSpeaking ? "animate-pulse-shadow ring-2 ring-green-400" : ""}`}>
              🤖
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto custom-scroll bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-4 py-3 rounded-lg shadow 
                ${msg.role === "user" ? "ml-auto bg-blue-100 text-right dark:text-primary" : "mr-auto bg-green-100 dark:text-primary text-left"}`}
            >
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
            </div>
          ))}
          {loading && <p className="text-gray-500">AI is thinking...</p>}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        {interviewStarted ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border dark:bg-gray-700"
                placeholder="Type your answer..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTypedAnswer()}
              />
              <button
                onClick={handleVoiceInput}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                🎙️ Speak
              </button>
              <button
                onClick={handleTypedAnswer}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send
              </button>
            </div>
            <button
              onClick={stopInterview}
              className="w-full py-2 bg-red-600 text-white rounded"
            >
              🛑 Stop Interview
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              aria-label="subject"
              className="p-2 rounded border dark:text-dime dark:bg-primary"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="node.js">Node.js</option>
              <option value="react.js">React.js</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="dsa">DSA</option>
              <option value="python">Python</option>
              <option value="mern">MERN</option>
            </select>

            <select
              aria-label="setTime"
              className="p-2 rounded border dark:text-dime dark:bg-primary"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
            </select>

            <CustomButton
              onClick={startInterview}
              className="py-2 bg-blue-600 text-white rounded"
            >
              🚀 Start Interview
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviewer;
