import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaCode,
  FaLaptopCode,
  FaCertificate,
  FaUsers,
  FaRobot,
  FaTrophy,
  FaCrown,
  FaRocket,
} from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TiltTorchCard from "../../components/Common/TiltTorchCard";
import AnimatedCard from "../../components/Common/AnimatedCard";
import TechStack from "./TechStack";
import CustomLink from "../../components/Custom/CustomLink";

// Counter Component (animated)
const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const frame = () => {
      start += increment;
      if (start < end) {
        setCount(Math.ceil(start));
        requestAnimationFrame(frame);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(frame);
  }, [end, duration]);
  return <span>{count.toLocaleString()}</span>;
};

// Testimonials Data (for carousel)
const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer @ Google",
    feedback:
      "BeatCoder helped me ace my FAANG interview! The problems felt like LeetCode, but the AI mentor explained everything in simple terms.",
  },
  {
    name: "Riya Patel",
    role: "Full-Stack Developer",
    feedback:
      "I loved the Udemy-like courses, but with hands-on coding! The certificates boosted my resume significantly.",
  },
  {
    name: "Karan Mehta",
    role: "Beginner Developer",
    feedback:
      "The roadmap and interactive lessons made coding fun. I went from beginner to building my first app in 3 months.",
  },
];

const Breif = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const navigate = useNavigate()
 

  // Rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-dime dark:bg-primary text-dark dark:text-dime transition-colors duration-500">
      {/* ----------------------- HERO SECTION ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-20 px-6 text-center max-w-5xl mx-auto"
      >
        <h1 className="text-6xl font-extrabold text-primary dark:text-light">
          Welcome to <span className="text-danger">BeatCoder</span>
        </h1>
        <p className="mt-6 text-xl text-secondary dark:text-accent leading-relaxed">
          BeatCoder combines the best of{" "}
          <span className="text-success font-semibold">LeetCode</span> for
          coding challenges, <span className="text-success font-semibold">Udemy</span> for
          interactive courses, and AI-driven mentorship to make you a
          world-class developer.
        </p>
      </motion.section>

      {/* ----------------------- FEATURES SECTION ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-20 max-w-7xl mx-auto px-6"
      >
        <h2 className="text-4xl text-center font-bold text-primary dark:text-light">
          Features You’ll Love
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {[
            {
              icon: <FaCode className="text-success text-5xl mb-4 mx-auto" />,
              title: "Coding Challenges",
              desc: "Solve 1000+ problems from beginner to expert level.",
            },
            {
              icon: (
                <MdOutlinePlayLesson className="text-accent text-5xl mb-4 mx-auto" />
              ),
              title: "Interactive Courses",
              desc: "Video lessons, quizzes, transcripts, and assignments.",
            },
            {
              icon: <FaRobot className="text-yellow-500 text-5xl mb-4 mx-auto" />,
              title: "AI Mentor",
              desc: "Get real-time AI hints, code reviews, and guidance.",
            },
            {
              icon: <FaCertificate className="text-primary text-5xl mb-4 mx-auto" />,
              title: "Certificates",
              desc: "Earn shareable certificates for completed milestones.",
            },
            {
              icon: <FaUsers className="text-danger text-5xl mb-4 mx-auto" />,
              title: "Leaderboards",
              desc: "Compete, rank up, and join coding contests.",
            },
            {
              icon: <FaLaptopCode className="text-accent text-5xl mb-4 mx-auto" />,
              title: "Admin Dashboard",
              desc: "Full control for course & transaction management.",
            },
            {
              icon: <FaTrophy className="text-yellow-600 text-5xl mb-4 mx-auto" />,
              title: "Contests & Hackathons",
              desc: "Participate in live competitions and earn rewards.",
            },
            {
              icon: <FaCrown className="text-success text-5xl mb-4 mx-auto" />,
              title: "Premium Roadmaps",
              desc: "Step-by-step paths for Web Dev, DSA, and AI.",
            },
            {
              icon: <FaRocket className="text-blue-500 text-5xl mb-4 mx-auto" />,
              title: "Project Builder",
              desc: "Build real-world apps and host them instantly.",
            },
            
          ].map(({ icon, title, desc }) => (
            <TiltTorchCard key={title} className="!shadow-md">
              <div
              
              className=" p-6 rounded-2xl text-center"
            >
              {icon}
              <h3 className="text-2xl font-semibold text-primary dark:text-light">
                {title}
              </h3>
              <p className="text-secondary dark:text-accent mt-3">{desc}</p>
            </div>
            </TiltTorchCard>
          ))}
        </div>
      </motion.section>

      {/* ----------------------- WHY BEATCODER ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-24 max-w-6xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center text-primary dark:text-light">
          Why Choose BeatCoder?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
          {[
            { name: "BeatCoder", leetcode: "Yes", udemy: "Yes", ai: "Yes" },
            { name: "LeetCode", leetcode: "Yes", udemy: "No", ai: "No" },
            { name: "Udemy", leetcode: "No", udemy: "Yes", ai: "No" },
          ].map(({ name, leetcode, udemy, ai }) => (
            <TiltTorchCard key={name}>
              <div
              key={name}
              className="p-6 rounded-xl hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-bold text-primary dark:text-light mb-4">
                {name}
              </h3>
              <p className="text-secondary dark:text-dime">Coding Challenges: {leetcode}</p>
              <p className="text-secondary dark:text-dime">Video Courses: {udemy}</p>
              <p className="text-secondary dark:text-dime">AI Mentor: {ai}</p>
            </div>
            </TiltTorchCard>
          ))}
        </div>
      </motion.section>

      {/* ----------------------- AI-POWERED MENTOR ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-24 bg-accent/10 py-16 px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-primary dark:text-light">
          Meet Your AI Mentor
        </h2>
        <p className="mt-4 text-lg max-w-4xl mx-auto text-secondary dark:text-accent">
          Stuck on a coding problem? Your AI mentor gives hints, explains
          concepts, debugs code, and builds personalized roadmaps — like having
          a tutor 24/7.
        </p>
      </motion.section>

      {/* ----------------------- ROADMAP ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 max-w-5xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-primary dark:text-light text-center">
          BeatCoder Roadmap
        </h2>
        <ul className="mt-10 space-y-6">
          {[
            "Phase 1: Core DSA + Coding Problems",
            "Phase 2: Full-Stack Courses & Certificates",
            "Phase 3: AI Mentor & Hackathon Integration",
            "Phase 4: Global Leaderboards & Projects Hosting",
          ].map((phase, i) => (
            <li
              key={phase}
              className="bg-white dark:bg-dark p-6 rounded-xl shadow-md flex gap-4 items-center"
            >
              <span className="text-danger text-2xl font-bold">{i + 1}</span>
              <p className="text-secondary dark:text-accent">{phase}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ----------------------- INTERACTIVE COUNTERS ----------------------- */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex flex-wrap justify-center gap-10 mt-20 text-center"
      >
        {[
          { label: "Problems Solved", value: 12000 },
          { label: "Active Users", value: 3500 },
          { label: "Certificates Earned", value: 850 },
        ].map(({ label, value }) => (
       <AnimatedCard  key={label} className="!shadow-none">
           <div
            key={label}
            className="bg-white dark:bg-dark p-8 rounded-2xl shadow-lg w-60 hover:scale-105 transition-transform"
          >
            <h3 className="text-4xl font-bold text-primary dark:text-light">
              <Counter end={value} duration={2} />+
            </h3>
            <p className="text-secondary dark:text-accent mt-3">{label}</p>
          </div>
       </AnimatedCard>
        ))}
      </motion.section>

      {/* -----------------------Tech Stack-------------------------- */}
      <TechStack />

      {/* ----------------------- TESTIMONIALS ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-24 max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-primary dark:text-light">
          Success Stories
        </h2>
        <div className="mt-10 bg-white dark:bg-dark p-6 rounded-xl shadow-lg">
          <p className="text-lg text-secondary dark:text-accent italic">
            "{testimonials[testimonialIndex].feedback}"
          </p>
          <h4 className="mt-4 text-primary dark:text-light font-semibold">
            {testimonials[testimonialIndex].name}
          </h4>
          <p className="text-sm text-gray-500">
            {testimonials[testimonialIndex].role}
          </p>
        </div>
      </motion.section>

      {/* ----------------------- CALL TO ACTION ----------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-24 text-center py-16 bg-accent/20"
      >
        <h2 className="text-4xl font-bold text-primary dark:text-light">
          Ready to Beat Code?
        </h2>
        <p className="mt-4 text-lg text-secondary dark:text-accent">
          Join thousands of developers leveling up their careers with BeatCoder.
        </p>
        <button onClick={() => navigate('/subscribe')} className="mt-8 px-6 py-3 text-lg bg-accent text-white rounded-xl hover:bg-accent/80 transition">
          Get Started Now
        </button>
      </motion.section>

      {/* ----------------------- FOOTER ----------------------- */}
      <footer className="mt-24 py-8 bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-secondary dark:text-accent">
          &copy; {new Date().getFullYear()} BeatCoder. Built with ❤️ using React,
          Node.js, and MongoDB.
        </p>
        <p className="mt-3">
          <CustomLink
            to="https://github.com/suber-IQ/beat-coder-client"
            className="text-accent hover:underline flex items-center justify-center gap-1"
          >
            <FaGithub /> Contribute on GitHub
          </CustomLink>
        </p>
      </footer>
    </div>
  );
};

export default Breif;
