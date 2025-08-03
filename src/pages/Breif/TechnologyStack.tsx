import { FaReact, FaNodeJs, FaEnvelope } from "react-icons/fa";
import {
  SiTailwindcss,
  SiVite,
  SiSocketdotio,
  SiAxios,
  SiFramer,
  SiDatefns,
  SiChartdotjs,
  SiPostcss,
  SiCkeditor4,
  SiExpress,
  SiMongodb,
  SiRedis,
  SiCloudinary,
  SiGooglecloud,
  SiJsonwebtokens,
} from "react-icons/si";
import { GrValidate } from "react-icons/gr";
import { TbApiApp } from "react-icons/tb";
import { SlLayers } from "react-icons/sl";
import { MdOutlineCode, MdLockOutline } from "react-icons/md";
import AnimatedSection from "../../components/Common/AnimatedSection";

const TechnologyStack = () => {
  return (
    <AnimatedSection delay={0.3}>
    <section className="bg-white mt-4 dark:bg-primary text-gray-900 dark:text-white px-6 py-12 rounded-lg shadow-md space-y-10">
      <h2 className="text-4xl font-bold text-center text-primary dark:text-light">🛠️ Technology Stack</h2>

       {/* Frontend */}
      <div>
        <h3 className="text-2xl font-semibold flex items-center gap-2 text-secondary">
          <FaReact className="text-sky-500" /> Frontend
        </h3>
        <ul className="list-disc list-inside mt-3 space-y-2 text-base ml-4">
          <li><FaReact className="inline mr-1 text-sky-500" /> React 19 + React DOM</li>
          <li><SiVite className="inline mr-1 text-yellow-500" /> Vite + TypeScript + <SiPostcss className="inline text-pink-500" /> PostCSS</li>
          <li><SiTailwindcss className="inline mr-1 text-cyan-400" />Tailwind CSS Context-Api</li>
          <li><TbApiApp className="inline mr-1 text-cyan-400" /> Context-Api</li>
          <li><SiCkeditor4 className="inline mr-1 text-blue-500" /> Monaco Editor (Code Editor)</li>
          <li><SiFramer className="inline mr-1 text-pink-300" /> Framer Motion (Animations)</li>
          <li><SiChartdotjs className="inline mr-1 text-purple-500" /> Chart.js + react-chartjs-2</li>
          <li><SiDatefns className="inline mr-1 text-green-600" /> date-fns (Time formatting)</li>
          <li><MdOutlineCode className="inline mr-1 text-indigo-500" /> Prism.js (Code syntax highlighting)</li>
          <li><SiAxios className="inline mr-1 text-teal-500" /> Axios (API calls)</li>
          <li><SiSocketdotio className="inline mr-1 text-pink-600" /> Socket.IO Client</li>
        </ul>
      </div>

  {/* Backend */}
<div>
  <h3 className="text-2xl font-semibold flex items-center gap-2 text-secondary">
    <FaNodeJs className="text-green-500" />
    Backend
  </h3>

  <ul className="list-disc list-inside mt-4 space-y-2 text-base ml-4">
    <li className="flex items-center gap-2">
      <SiExpress className="text-gray-700 dark:text-gray-300" />
      <span>Node 18+, Express 5</span>
    </li>
    <li className="flex items-center gap-2">
      <SiMongodb className="text-green-500" />
      <span>MongoDB with Mongoose</span>
    </li>
    <li className="flex items-center gap-2">
      <SiRedis className="text-red-500" />
      <span>Redis for caching</span>
    </li>
    <li className="flex items-center gap-2">
      <SiCloudinary className="text-blue-500" />
      <span>Cloudinary for media uploads</span>
    </li>
    <li className="flex items-center gap-2">
      <FaEnvelope className="text-yellow-500" />
      <span>Nodemailer for emails</span>
    </li>
    <li className="flex items-center gap-2">
      <SiGooglecloud className="text-blue-600" />
      <span>Google APIs (OAuth, etc.)</span>
    </li>
    <li className="flex items-center gap-2">
      <SiJsonwebtokens className="text-yellow-400" />
      <span>JWT for auth</span>
    </li>
    <li className="flex items-center gap-2">
      <GrValidate  className="text-indigo-500" />
      <span>Validator for input sanitization</span>
    </li>
    <li className="flex items-center gap-2">
      <MdLockOutline className="text-gray-500" />
      <span>Bcrypt for password hashing</span>
    </li>
    <li className="flex items-center gap-2">
      <SlLayers  className="text-pink-500" />
      <span>CORS config & middleware</span>
    </li>
  </ul>
</div>
     
    </section>
    </AnimatedSection>
  );
};

export default TechnologyStack;
