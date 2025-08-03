import AboutBeatCoder from "./AboutBeatCoder";
import ImageShowcase from "./ImageShowcase";

const IntroductionSection = () => {
  return (
    <div className="bg-white dark:bg-primary text-dark dark:text-dime px-6 py-10 rounded-lg shadow-md space-y-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-primary dark:text-light">
        BeatCoder – Coder For Platform
      </h1>

        
      {/* Subtext */}
      <p className="text-base text-center leading-relaxed">
        BeatCoder combines the best of{" "}
        <span className="text-success font-semibold">LeetCode</span> for coding challenges,{" "}
        <span className="text-success font-semibold">Udemy</span> for interactive courses, and
        AI-driven mentorship to make you a world-class developer.
      </p>


      {/* Image */}
      <ImageShowcase />

     

      <hr className="border-t border-dime dark:border-light my-8" />

      {/* Introduction Content */}
      <h2 className="text-3xl font-semibold text-secondary dark:text-light">
        Introduction
      </h2>

      <p className="text-base leading-relaxed">
        BeatCoder is a next-generation coding education platform designed to empower developers, students, and aspiring software engineers through a unique blend of coding challenges, video-based learning, and AI-powered mentorship.
      </p>

      <AboutBeatCoder />
    </div>
  );
};

export default IntroductionSection;
