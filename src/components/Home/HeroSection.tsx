import { useNavigate } from "react-router-dom";
import TiltTorchCard from "../Common/TiltTorchCard";
import CustomButton from "../Custom/CustomButton";
import CustomLink from "../Custom/CustomLink";
import CustomTitle from "../Custom/CustomTitle";
import { AiOutlineJava } from "react-icons/ai";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiGo,
  SiHtml5,
  SiCss3,
  SiRust,
} from "react-icons/si";
import useAuth from "../../hooks/auth/useAuth";

const HeroSection = () => {
  
  const navigate = useNavigate()
   const { isLoggedIn } = useAuth();

  const techBlocks = [
    { icon: <SiJavascript size={28} color="white" />, bg: "bg-yellow-400" },
    { icon: <SiTypescript size={28} color="white" />, bg: "bg-blue-600" },
    { icon: <SiPython size={28} color="white" />, bg: "bg-blue-400" },
    { icon: <SiCplusplus size={28} color="white" />, bg: "bg-indigo-600" },
    { icon: <AiOutlineJava size={28} color="white" />, bg: "bg-red-500" },
    { icon: <SiGo size={28} color="white" />, bg: "bg-cyan-500" },
    { icon: <SiHtml5 size={28} color="white" />, bg: "bg-orange-500" },
    { icon: <SiCss3 size={28} color="white" />, bg: "bg-blue-500" },
    { icon: <SiRust size={28} color="white" />, bg: "bg-gray-800" },
  ];

  return (
    <section className="w-full px-4 py-12 dark:bg-dark text-dark dark:text-light transition-all duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          <CustomTitle>Crack the Code to Success</CustomTitle>

          <p className="text-lg text-secondary dark:text-dime">
            Elevate your programming skills, solve real-world problems, and unlock the world of coding opportunities.
          </p>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <CustomButton onClick={() => navigate("/problemset")}>Start Solving</CustomButton>
             {/* Show only if user is NOT logged in */}
            {!isLoggedIn && (
              <CustomLink to="/account/signup">
                Join Now
              </CustomLink>
            )}
          </div>
        </div>

        {/* Right Section with Tilt Torch Card */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <TiltTorchCard className="w-[300px] h-[300px] bg-white dark:bg-primary grid grid-cols-3 gap-2">
            {techBlocks.map((block, index) => (
              <div
                key={index}
                className={`w-full h-20 flex items-center justify-center rounded-md ${block.bg} hover:scale-105 hover:shadow-md transition-all duration-300`}
              >
                {block.icon}
              </div>
            ))}
          </TiltTorchCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
