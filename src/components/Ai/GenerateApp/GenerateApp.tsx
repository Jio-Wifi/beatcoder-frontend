import { useState } from "react";
import CustomButton from "../../Custom/CustomButton";
import { FiClipboard, FiCheck, FiX } from "react-icons/fi";

const GenerateApp = () => {
  const [command, setCommand] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState<"html" | "css" | "js">("html");
  const [copiedTab, setCopiedTab] = useState<"" | "html" | "css" | "js">("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setHtml("");
    setCss("");
    setJs("");

    try {
      const { generateText } = await import("../../../services/gemini");

      const prompt = `
Generate a simple web page based on this instruction:
"${command}"

Return strictly this JSON format:
{
  "html": "<!-- html here -->",
  "css": "/* css here */",
  "js": "// javascript here"
}
`.trim();

      const response = await generateText(prompt);
      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("Invalid JSON");

      const jsonStr = response.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonStr);

      if (!parsed.html && !parsed.css && !parsed.js) {
        throw new Error("Empty code received");
      }

      setHtml(parsed.html || "");
      setCss(parsed.css || "");
      setJs(parsed.js || "");
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to generate code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const createPreviewDocument = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head><style>${css}</style></head>
    <body>
      ${html}
      <script>${js}</script>
    </body>
    </html>
  `;

  const handleCopy = async (text: string, tab: "html" | "css" | "js") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(""), 1500);
    } catch {
      console.error("Clipboard copy failed");
    }
  };

  const renderTabContent = (value: string, tab: "html" | "css" | "js") => (
    <div className="relative h-full">
      <button
        onClick={() => handleCopy(value, tab)}
        className="absolute right-2 top-2 px-2 py-1 text-xs bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600 flex items-center gap-1"
      >
        {copiedTab === tab ? <FiCheck className="text-green-500" /> : <FiClipboard />}
        {copiedTab === tab ? "Copied" : "Copy"}
      </button>
      <textarea
        value={value}
        readOnly
        aria-label={`Generated ${tab.toUpperCase()}`}
        className="w-full h-full custom-scroll p-2 pt-10 border rounded dark:bg-gray-700 resize-none"
      />
    </div>
  );

  return (
    <div className="w-full h-[600px] flex flex-col md:flex-row overflow-hidden bg-gray-100 dark:bg-gray-900 text-dark dark:text-light">
      {/* Left Panel */}
      <div className="md:w-1/2 p-6 space-y-4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold">🧠 AI Command</h2>
        <textarea
          id="commandInput"
          title="App description"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Describe the app you want to generate..."
          className="w-full h-40 p-3 border rounded dark:bg-gray-700"
        />
        <CustomButton
          onClick={handleGenerate}
          disabled={loading || !command.trim()}
          className="disabled:opacity-50"
        >
          {loading ? "Generating..." : "⚙️ Generate Code"}
        </CustomButton>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 p-6 bg-gray-50 dark:bg-gray-800 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">🧾 Generated Code</h2>
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🔍 Preview Website
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-600 mb-4">
          {["html", "css", "js"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as "html" | "css" | "js")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                selectedTab === tab
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {selectedTab === "html" && renderTabContent(html, "html")}
          {selectedTab === "css" && renderTabContent(css, "css")}
          {selectedTab === "js" && renderTabContent(js, "js")}
        </div>
      </div>

      {/* Fullscreen Preview Overlay (Dark Only) */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-white text-white flex flex-col">
          <div className="flex justify-between items-center p-4 bg-gray-800">
            <h3 className="text-sm font-semibold">🌐 Website Preview</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
            >
              <FiX /> Close
            </button>
          </div>
          <iframe
            title="preview"
            className="flex-1 w-full border-none"
            srcDoc={createPreviewDocument()}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateApp;
