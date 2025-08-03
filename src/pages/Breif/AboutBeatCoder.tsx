import { FaJava, FaJs, FaPython } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";


const AboutBeatCoder = () => {
  return (
    <section>
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-4xl font-bold text-primary dark:text-light">🧠 About BeatCoder</h2>
        
      </div>

      {/* What is BeatCoder */}
      <div className="space-y-4 mt-4">
        <h3 className="text-2xl font-semibold text-secondary">🚀 What is BeatCoder?</h3>
        <p className="leading-relaxed">
          BeatCoder combines the strengths of platforms like <span className="font-medium text-success">LeetCode</span> and{" "}
          <span className="font-medium text-success">Udemy</span>, offering:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>🧩 A rich collection of DSA problems categorized by topic and difficulty.</li>
          <li>💻 Hands-on coding in a beautiful Monaco-based code editor.</li>
          <li>🎓 In-depth video tutorials and walkthroughs to boost understanding.</li>
          <li>🤖 An interactive AI assistant that provides hints, debugging tips, and complexity analysis — without spoiling the solution.</li>
        </ul>
      </div>

      {/* Why BeatCoder */}
      <div className="space-y-4 mt-4">
        <h3 className="text-2xl font-semibold text-secondary">💡 Why BeatCoder?</h3>
        <p className="leading-relaxed">
          BeatCoder isn’t just about solving problems — it’s about learning <strong>how and why</strong> your code works. With structured sets,
          instant feedback, and visual learning, we bridge the gap between theory and practice.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>🔍 Preparing for tech interviews</li>
          <li>🧠 Strengthening CS fundamentals</li>
          <li>📘 Exploring fields like System Design and Generative AI</li>
        </ul>
      </div>

      {/* Educational Videos */}
      <div className="space-y-4 mt-4">
        <h3 className="text-2xl font-semibold text-secondary">🎥 Educational Videos</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>📚 Curated courses in DSA, JavaScript, Python, React, System Design, and more.</li>
          <li>📝 Reference solutions with line-by-line walkthroughs.</li>
          <li>🏁 Weekly challenges with mentor commentary.</li>
          <li>🎬 Videos embedded right in the problem interface.</li>
        </ul>
      </div>

      {/* Personalized Learning */}
      <div className="space-y-4 mt-4">
        <h3 className="text-2xl font-semibold text-secondary">🔍 Personalized & Structured Learning</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>📊 A personal dashboard to track your progress.</li>
          <li>📌 Create and manage custom sprints and bookmarks.</li>
          <li>🏆 Compete on the leaderboard and see your ranking.</li>
          <li>🧠 Get AI-generated problem recommendations tailored to your skill level.</li>
        </ul>
      </div>

            {/* Language Support */}
      <div className="mt-5">
        <h3 className="text-2xl font-semibold text-secondary mb-6 text-center">🧩 Language Support</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* JavaScript */}
          <div className="bg-accent/10 dark:bg-accent/20 border border-accent rounded-xl p-6 text-center shadow hover:scale-105 transition-transform">
            <FaJs size={40} className="mx-auto text-yellow-400" />
            <h4 className="mt-3 font-bold text-lg text-accent">JavaScript</h4>
            <p className="text-sm mt-1">Perfect for frontend and async logic.</p>
          </div>

          {/* Java */}
          <div className="bg-primary/10 dark:bg-dime/20 border dark:border-success  border-primary rounded-xl p-6 text-center shadow hover:scale-105 transition-transform">
            <FaJava size={40} className="mx-auto text-red-600" />
            <h4 className="mt-3 font-bold text-lg text-primary dark:text-dime">Java</h4>
            <p className="text-sm mt-1">Great for OOP and large-scale applications.</p>
          </div>

          {/* Python */}
          <div className="bg-success/10 dark:bg-success/20 border border-success rounded-xl p-6 text-center shadow hover:scale-105 transition-transform">
            <FaPython size={40} className="mx-auto text-blue-500" />
            <h4 className="mt-3 font-bold text-lg text-success">Python</h4>
            <p className="text-sm mt-1">Ideal for fast prototyping and algorithms.</p>
          </div>

          {/* C++ */}
          <div className="bg-secondary/10 dark:bg-secondary/20 border border-secondary rounded-xl p-6 text-center shadow hover:scale-105 transition-transform">
            <SiCplusplus size={40} className="mx-auto text-indigo-500" />
            <h4 className="mt-3 font-bold text-lg text-secondary">C++</h4>
            <p className="text-sm mt-1">Speed and control for hardcore DSA problems.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBeatCoder;
