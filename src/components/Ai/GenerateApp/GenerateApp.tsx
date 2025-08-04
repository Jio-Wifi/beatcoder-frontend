import { useState, useMemo } from "react";
import CustomButton from "../../Custom/CustomButton";
import { FiClipboard, FiCheck, FiX, FiDownload, FiGlobe, FiEye, FiArchive } from "react-icons/fi";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
    if (loading || !command.trim()) return;
    setLoading(true);
    setError("");
    setHtml("");
    setCss("");
    setJs("");

    try {
      const { generateText } = await import("../../../services/gemini");

      await new Promise((res) => setTimeout(res, 1000));

      const prompt = `
You are a code generator that returns web projects in JSON format.

The user wants the following project:
"${command}"

Generate a working HTML/CSS/JS website for this idea. 
Do NOT include explanation or markdown.

Respond ONLY in this strict JSON structure:
{
  "html": "<!-- HTML goes here -->",
  "css": "/* CSS goes here */",
  "js": "// JavaScript goes here"
}`.trim();

      const response = await generateText(prompt);
      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}");

      if (jsonStart === -1 || jsonEnd === -1) throw new Error("Invalid JSON format");

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
      setError("\u26A0\uFE0F Failed to generate code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, tab: "html" | "css" | "js") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(""), 1500);
    } catch {
      console.error("Clipboard copy failed");
    }
  };

  const handleBuildAndDownload = () => {
    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}</script>
</body>
</html>
    `.trim();

    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-app.html";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("script.js", js);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "generated-app.zip");
  };

  const handleDeploy = () => {
    window.open("https://app.netlify.com/drop", "_blank");
  };

  const renderTabContent = (value: string, tab: "html" | "css" | "js") => (
    <div className="relative h-full">
      <button
        onClick={() => handleCopy(value, tab)}
        className="absolute right-2 top-2 p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        title="Copy"
      >
        {copiedTab === tab ? <FiCheck className="text-green-500" /> : <FiClipboard />}
      </button>
      <textarea
      aria-label="resize"
        value={value}
        readOnly
        className="w-full h-full custom-scroll p-2 pt-10 border rounded dark:bg-gray-700 resize-none"
      />
    </div>
  );

  const previewDocument = useMemo(() => {
    return `
<!DOCTYPE html>
<html lang="en">
<head><style>${css}</style></head>
<body>${html}<script>${js}</script></body>
</html>`.trim();
  }, [html, css, js]);

  return (
    <div className="w-full h-[600px] flex flex-col md:flex-row overflow-hidden bg-gray-100 dark:bg-gray-900 text-dark dark:text-light">
      <div className="md:w-1/2 p-6 space-y-4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold">🧠 AI Command</h2>
        <textarea
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
          {loading ? "Thinking..." : "⚙️ Generate Code"}
        </CustomButton>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div className="md:w-1/2 p-6 bg-gray-50 dark:bg-gray-800 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">🧾 Generated Code</h2>
          <div className="flex gap-2">
            <button onClick={() => setShowPreview(true)} className="p-2 bg-green-600 text-white rounded hover:bg-green-700" title="Preview">
              <FiEye />
            </button>
            <button onClick={handleBuildAndDownload} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700" title="Download HTML">
              <FiDownload />
            </button>
            <button onClick={handleDownloadZip} className="p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700" title="Download ZIP">
              <FiArchive />
            </button>
            <button onClick={handleDeploy} className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700" title="Deploy to Netlify">
              <FiGlobe />
            </button>
          </div>
        </div>

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

        <div className="flex-1">
          {selectedTab === "html" && renderTabContent(html, "html")}
          {selectedTab === "css" && renderTabContent(css, "css")}
          {selectedTab === "js" && renderTabContent(js, "js")}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-white text-white flex flex-col">
          <div className="flex justify-between items-center p-4 bg-gray-800">
            <h3 className="text-sm font-semibold">🌐 Website Preview</h3>
            <button onClick={() => setShowPreview(false)} className="p-2 bg-red-500 rounded hover:bg-red-600" title="Close">
              <FiX />
            </button>
          </div>
          <iframe
            title="preview"
            className="flex-1 w-full border-none"
            srcDoc={previewDocument}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateApp;
