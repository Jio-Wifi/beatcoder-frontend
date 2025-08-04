import { useRef, useState } from "react";
import { generateText } from "../../../services/gemini";
import { SiGoogleassistant } from "react-icons/si";

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((event: MinimalSpeechRecognitionErrorEvent) => void) | null;
    onstart: (() => void) | null;
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

  interface MinimalSpeechRecognitionErrorEvent extends Event {
    error: string;
    message?: string;
  }
}

const RecognitionConstructor =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const AiAssistance = () => {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "speaking" | "waiting">("idle");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSpeaking = useRef(false);

  const speak = (text: string) => {
    if (!window.speechSynthesis || isSpeaking.current) return;

    isSpeaking.current = true;
    setStatus("speaking");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onend = () => {
      isSpeaking.current = false;
      setStatus("waiting");
      startListening(); // restart listening
    };

    window.speechSynthesis.speak(utterance);
  };

  const respondToVoice = async (message: string) => {
    try {
      const response = await generateText(message);
      speak(response);
    } catch {
      speak("Something went wrong.");
    }
  };

  const startListening = () => {
    if (!RecognitionConstructor || status === "listening" || isSpeaking.current) return;

    const recognition = new RecognitionConstructor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setStatus("listening");

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      recognition.stop();
      await respondToVoice(transcript);
    };

    recognition.onerror = () => {
      setStatus("idle");
      speak("Sorry, I didn't catch that.");
    };

    recognition.onend = () => {
      if (!isSpeaking.current && listening) {
        setStatus("waiting");
        startListening(); // keep listening loop alive
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const startConversation = () => {
    setStatus("waiting");
    setListening(true);
    speak("Hi! How can I help you today?");
    setTimeout(startListening, 1500);
  };

  const stopConversation = () => {
    setStatus("idle");
    setListening(false);
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel();
    isSpeaking.current = false;
  };

  const handleToggle = () => {
    if (listening || status !== "idle") {
      stopConversation();
    } else {
      startConversation();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-40 right-6 z-50 w-14 h-14 rounded-full transition-all duration-300 text-white text-2xl shadow-lg flex items-center justify-center ${
        listening ? "bg-red-600 hover:bg-red-700" : "bg-secondary hover:bg-blue-700"
      }`}
      title={listening ? "Stop Conversation" : "Start Conversation"}
    >
      {listening ? "✕" : <SiGoogleassistant />}
    </button>
  );
};

export default AiAssistance;
