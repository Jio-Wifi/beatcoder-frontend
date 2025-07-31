import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import CustomLink from "../Custom/CustomLink";
import AnimatedCard from "../Common/AnimatedCard";

import {
  FiBookOpen,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi"; 



const SliderCard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sliderCards = [
    {
      title: "Master Arrays",
      description: "Dive deep into array techniques and solve real-world problems.",
      link: "/topics/arrays",
      gradient: "bg-gradient-to-r from-accent to-primary",
      icon: <FiCpu size={40} className="absolute top-4 right-4 opacity-20" />,
    },
     {
    title: "Interview Crash Course",
    description: "Crack interviews with our focused crash course curated by experts.",
    link: "/study-plan/cracking-coding-interview",
    gradient: "bg-gradient-to-r from-light to-danger",
    icon: <FiBookOpen size={40} className="absolute top-4 right-4 opacity-20" />,
  },
  {
    title: "Top Interview Questions",
    description: "Master the 150 most frequently asked coding interview questions.",
    link: "/study-plan/competitive-track",
    gradient: "bg-gradient-to-r from-success to-dark",
    icon: <FiCheckCircle size={40} className="absolute top-4 right-4 opacity-20" />,
  },
  {
    title: "JavaScript 30 Days Challenge",
    description: "Build your JavaScript skills with daily coding challenges for 30 days.",
    link: "/study-plan/30-days-challenge-javascript",
    gradient: "bg-gradient-to-r from-secondary to-dark",
    icon: <FiZap size={40} className="absolute top-4 right-4 opacity-20" />,
  },
   
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
      aria-label="leftArrow"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-primary shadow-md p-2 rounded-full text-dark dark:text-white hover:bg-accent"
      >
        <FaChevronLeft />
      </button>

      {/* Cards */}
      <div ref={scrollRef} className="flex overflow-hidden gap-4 px-6 py-4 scroll-smooth">
        {sliderCards.map((card, index) => (
          <AnimatedCard key={index} className={`relative min-w-[300px] ${card.gradient} text-white`}>
            {card.icon}
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-sm mt-2 text-white/90">{card.description}</p>
            <div className="mt-4">
              <CustomLink
                to={card.link}
                className="inline-block px-4 py-2 bg-white text-dark text-sm font-semibold rounded-md hover:bg-secondary hover:text-white transition"
              >
                Explore →
              </CustomLink>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Right Arrow */}
      <button
      aria-label="rightArrow"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-primary shadow-md p-2 rounded-full text-dark dark:text-white hover:bg-accent"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default SliderCard;
