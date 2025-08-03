import {
  FaReact,
  FaNodeJs,
  FaKey,
  FaRobot,
  FaGlobeAmericas,
} from "react-icons/fa";
import {
  SiMongodb,
  SiRedis,
  SiCloudinary,
  SiSocketdotio,
} from "react-icons/si";
import { MdCode } from "react-icons/md";
import { FaBolt } from "react-icons/fa6";
import AnimatedSection from "../../components/Common/AnimatedSection";

const architectureLayers = [
  {
    title: "Frontend",
    tools: "Vite + React + Typescript + TailwindCSS",
    icon: <FaReact className="text-sky-500" size={30} />,
  },
  {
    title: "Backend",
    tools: "Node.js + Express + Typescript",
    icon: <FaNodeJs className="text-green-600" size={30} />,
  },
  {
    title: "Database",
    tools: "MongoDB with Mongoose",
    icon: <SiMongodb className="text-green-500" size={30} />,
  },
  {
    title: "Caching",
    tools: "Redis",
    icon: <SiRedis className="text-red-500" size={30} />,
  },
  {
    title: "Code Execution",
    tools: "Judge0 API",
    icon: <MdCode className="text-indigo-500" size={30} />,
  },
  {
    title: "Authentication",
    tools: "JWT, Refresh & Access Token",
    icon: <FaKey className="text-yellow-500" size={30} />,
  },
  {
    title: "Media Management",
    tools: "Cloudinary",
    icon: <SiCloudinary className="text-blue-500" size={30} />,
  },
  {
    title: "AI Tutor",
    tools: "Google AI",
    icon: <FaRobot className="text-purple-500" size={30} />,
  },
  {
    title: "Real-time Communication",
    tools: "Socket.IO",
    icon: <SiSocketdotio className="text-pink-600" size={30} />,
  },
  {
    title: "WebSocket Layer",
    tools: "Native WebSocket API for streaming data",
    icon: <FaGlobeAmericas className="text-emerald-500" size={30} />,
  },
  {
    title: "Collaborative Tools",
    tools: "Live text editor, chat, and sketch board",
    icon: <MdCode className="text-orange-500" size={30} />,
  },
  {
    title: "DSA Visualizer",
    tools: "Custom-built interactive visualizations",
    icon: <FaBolt className="text-indigo-600" size={30} />,
  },
];


const ArchitectureLayers = () => {
  return (
    <AnimatedSection delay={0.3}>
    
    <section className="bg-white mt-4 dark:bg-primary text-gray-800  dark:text-dime px-6 py-12 rounded-xl shadow-md max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center text-primary dark:text-light mb-10">
        🧱 Architecture Layers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {architectureLayers.map((layer, index) => (
          <div
            key={index}
            className="border border-dime dark:border-gray-700 bg-light/10 dark:bg-white/5 rounded-xl p-5 shadow hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center space-x-3 mb-3">
              {layer.icon}
              <h4 className="text-xl font-semibold text-secondary">{layer.title}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {layer.tools}
            </p>
          </div>
        ))}
      </div>
    </section>
    </AnimatedSection>
  );
};

export default ArchitectureLayers;
