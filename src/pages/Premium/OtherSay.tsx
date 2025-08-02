import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import CustomHeading from "../../components/Custom/CustomHeading";
import CustomTitle from "../../components/Custom/CustomTitle";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sumit",
    message:
      "I gained all my coding skills from BeatCoder, the reward is two on-site interviews with Facebook and LinkedIn, respectively. I am lucky to get Facebook’s job offer!",
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Rohit Negi",
    message:
      "After buckling down and studying the questions on BeatCoder, the result is two internship offers from Facebook and Bloomberg.",
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Sonu",
    message:
      "Had my on-site interviews at Amazon and today the recruiter told me that I will get a job offer. Thank you to the whole BeatCoder team!",
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
];

const OtherSay = () => {
  return (
    <section className="max-w-container mx-auto px-4 py-16">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <CustomTitle>What Others</CustomTitle>
        <CustomHeading>Are Saying About Us?</CustomHeading>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white dark:bg-primary rounded-lg shadow-md dark:shadow-accent/20 p-6 flex flex-col gap-4"
          >
            <p className="text-secondary dark:text-light/90 text-sm leading-relaxed">
              “{t.message}”
            </p>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-success dark:text-accent text-sm">
                — {t.name}
              </h4>
              <div className="flex space-x-2">
                {t.socials.linkedin && (
                  <Link to={t.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={18} className="text-blue-600 hover:scale-110 transition" />
                  </Link>
                )}
                {t.socials.twitter && (
                  <Link to={t.socials.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={18} className="text-sky-400 hover:scale-110 transition" />
                  </Link>
                )}
                {t.socials.github && (
                  <Link to={t.socials.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub size={18} className="text-gray-800 dark:text-white hover:scale-110 transition" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

{/*     
      <div className="mt-10 text-center">
        <CustomButton>Upgrade to Premium</CustomButton>
      </div> */}
    </section>
  );
};

export default OtherSay;
