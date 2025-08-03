import GeminiContainer from "../Chat/GeminiContainer";
import GenerateApp from "../GenerateApp/GenerateApp";
import Interviewer from "../Interview/Interviewer";


export const tabs = [
  { id: "chat", label: "Chat", component: <GeminiContainer /> },
  { id: "interview", label: "Interview", component: <Interviewer /> },
  { id: "generate", label: "Generate App", component: <GenerateApp /> },
  { id: "other", label: "Other Tools", component: <div className="p-4">More features coming...</div> },
];
