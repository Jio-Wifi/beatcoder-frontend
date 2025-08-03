import {
  FaCode,
  FaFileCode,
  FaPaintBrush,
  FaChartBar,
  FaVideo,
  FaRobot,
  FaSun,
  FaMoon,
  FaBook,
  FaBookOpen,
  FaHeart,
  FaNetworkWired,
  FaLaptopCode,
  FaUserShield,
  FaUserCircle,
  FaClipboardList,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";
import AnimatedSection from "../../components/Common/AnimatedSection";


const features = [
  {
    icon: <FaBook className="text-light" size={24} />,
    title: "Structured Courses",
    desc: "Interactive lessons in DSA, GenAI, System Design, JS, Python, and more.",
  },
  {
    icon: <FaCode className="text-success" size={24} />,
    title: "Built-in Compiler",
    desc: "Solve problems in real-time using our Monaco-based multi-language compiler.",
  },
  {
    icon: <FaPaintBrush className="text-secondary" size={24} />,
    title: "Sketch & Draw Tools",
    desc: "Whiteboard, sketching, and drawing tools for system design or notes.",
  },
  {
    icon: <FaNetworkWired className="text-indigo-500" size={24} />,
    title: "Flow Editor",
    desc: "Visual flowchart editor to map out logic, DSA flows, and system architectures.",
  },
  {
    icon: <FaClipboardList className="text-blue-500" size={24} />,
    title: "Study Plans",
    desc: "Follow curated weekly and monthly study paths with progress tracking.",
  },
  {
    icon: <FaHeart className="text-pink-500" size={24} />,
    title: "Favorites",
    desc: "Bookmark problems, videos, or lessons you want to revisit anytime.",
  },
  {
    icon: <FaVideo className="text-danger" size={24} />,
    title: "Video & Chat Rooms",
    desc: "Live coding rooms, mentorship sessions, and peer discussions in one place.",
  },
  {
    icon: <FaRobot className="text-purple-600" size={24} />,
    title: "AI Tutor & Interview AI",
    desc: "Chat-based coding mentor and mock interview bot with real-time feedback.",
  },
  {
    icon: <FaLaptopCode className="text-teal-500" size={24} />,
    title: "App Generator",
    desc: "Generate full-stack boilerplates using AI prompts and drag-drop UI builder.",
  },
  {
    icon: <FaBookOpen className="text-yellow-500" size={24} />,
    title: "Editorial & Solutions",
    desc: "Detailed editorials, community solutions, and visual explanations.",
  },
  {
    icon: <FaUserShield className="text-rose-500" size={24} />,
    title: "Admin Dashboard",
    desc: "Manage courses, lessons, categories, users, quizzes, and platform settings.",
  },
  {
    icon: <FaFileCode className="text-orange-400" size={24} />,
    title: "Text Editor & Code Library",
    desc: "Build, edit, organize, and store reusable code snippets or full projects.",
  },
  {
    icon: <FaGraduationCap className="text-success" size={24} />,
    title: "Certificates & Progress",
    desc: "Earn certifications and track daily, weekly, and yearly learning activity.",
  },
  {
    icon: <FaUsers className="text-light" size={24} />,
    title: "Instructors & Reviews",
    desc: "Explore top-rated instructors and their curated learning paths.",
  },
  {
    icon: <FaUserCircle className="text-blue-600" size={24} />,
    title: "User Dashboard",
    desc: "View your submissions, bookmarks, stats, and upcoming tasks.",
  },
  {
    icon: <FaChartBar className="text-emerald-500" size={24} />,
    title: "Analytics & Insights",
    desc: "Monitor performance, time spent, accuracy, and leaderboard position.",
  },
  {
    icon: <FaSun className="text-orange-300" size={24} />,
    title: "Light Mode",
    desc: "Clean interface optimized for readability in bright environments.",
  },
  {
    icon: <FaMoon className="text-gray-300" size={24} />,
    title: "Dark Mode",
    desc: "Eye-friendly layout perfect for focused coding at night.",
  },
];

const KeyFeatures = () => {
  return (
    <AnimatedSection delay={0.3}>
    <section className="px-6 py-16 mt-4 bg-white dark:bg-primary">
      <h2 className="text-3xl font-bold text-center dark:text-light text-primary mb-10">
        🔑 Key Features of BeatCoder
      </h2>

      <div className="grid grid-cols-1 rounded-2xl sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
            <div
            key={idx}
            className="bg-dime dark:bg-dark/90 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="mb-3">{feature.icon}</div>
            <h4 className="text-lg font-semibold text-secondary dark:text-success mb-1">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-700  dark:text-accent">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
    </AnimatedSection>
  );
};

export default KeyFeatures;
