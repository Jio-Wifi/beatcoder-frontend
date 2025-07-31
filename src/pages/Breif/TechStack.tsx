import {
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiTypescript, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

const TechStack = () => {
  const stacks = [
    { name: "React.js", icon: <FaReact className="text-cyan-400" />, desc: "Modern UI library for building fast, scalable apps." },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, desc: "Server-side runtime for scalable, event-driven apps." },
    { name: "Express.js", icon: <SiExpress className="text-gray-300" />, desc: "Fast, minimalist backend framework for APIs." },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, desc: "NoSQL database for flexible and high-performance apps." },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, desc: "Type-safe JavaScript for scalable development." },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-400" />, desc: "Utility-first CSS framework for responsive UIs." },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-24 py-20 px-6 bg-gradient-to-r from-primary via-secondary to-accent text-center text-light rounded-t-[3rem]"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-10">Our Tech Stack</h2>
      <p className="max-w-3xl mx-auto text-lg mb-16 text-light/80">
        BeatCoder is built using the powerful **MERN stack** and modern tools, ensuring 
        **speed, scalability, and flexibility** for both learners and admins.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {stacks.map(({ name, icon, desc }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-white/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold">{name}</h3>
            <p className="text-light/80 mt-3 text-center">{desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TechStack;
