import {
  MdVideoLibrary,
  MdLock,
  MdBusiness,
  MdCode,
  MdBugReport,
  MdFlashOn,
  MdLeaderboard,
  MdOutlineLaptopMac,
  MdFolder,
  MdDiscount,
  MdCloud,
} from "react-icons/md";

import CustomHeading from "../../components/Custom/CustomHeading";
import CustomTitle from "../../components/Custom/CustomTitle";

const PremiumFeatures = () => {
  const features = [
    {
      title: "Video Solutions",
      icon: <MdVideoLibrary size={22} className="text-accent" />,
      description:
        "Unlock elaborate premium video solutions like this. Each video includes a detailed conceptual overview and code walkthrough.",
    },
    {
      title: "Access to Premium Content",
      icon: <MdLock size={22} className="text-accent" />,
      description:
        "Gain exclusive access to a growing collection of premium questions, Explore cards, and solutions.",
    },
    {
      title: "Select Questions by Company",
      icon: <MdBusiness size={22} className="text-accent" />,
      description:
        "Target your studying more accurately. We have nearly 200 questions from Google alone.",
    },
    {
      title: "Autocomplete",
      icon: <MdCode size={22} className="text-accent" />,
      description:
        "Get intelligent code autocompletion based on language and context.",
    },
    {
      title: "Debugger",
      icon: <MdBugReport size={22} className="text-accent" />,
      description:
        "Debug your code interactively, line-by-line, right inside the editor.",
    },
    {
      title: "Lightning Judge",
      icon: <MdFlashOn size={22} className="text-accent" />,
      description:
        "Get priority judging using an exclusive queue — 3X shorter wait times.",
    },
    {
      title: "Sort Questions by Prevalence",
      icon: <MdLeaderboard size={22} className="text-accent" />,
      description:
        "Discover frequently asked interview questions based on real data.",
    },
    {
      title: "Interview Simulations",
      icon: <MdOutlineLaptopMac size={22} className="text-accent" />,
      description:
        "Practice timed assessments like a real interview with company-matched questions.",
    },
    {
      title: "Unlimited Playgrounds",
      icon: <MdFolder size={22} className="text-accent" />,
      description:
        "Create unlimited Playgrounds and organize them into folders.",
    },
    {
      title: "Additional Discounts",
      icon: <MdDiscount size={22} className="text-accent" />,
      description: "Get special discounts on select content and services.",
    },
    {
      title: "Cloud Storage",
      icon: <MdCloud size={22} className="text-accent" />,
      description:
        "Code and layouts are saved to the cloud, so you can switch devices seamlessly.",
    },
  ];

  return (
    <div className="px-4 pt-16">
      <CustomTitle>What's Included</CustomTitle>
      <CustomHeading>Premium Features</CustomHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-primary p-5 rounded-lg shadow hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-primary dark:text-success mb-1 flex items-center gap-2">
              <span>{feature.icon}</span>
              {feature.title}
            </h3>

            <p className="text-sm text-secondary dark:text-light/80">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* <div className="mt-10 text-center">
        <CustomButton>Upgrade to Premium</CustomButton>
      </div> */}
    </div>
  );
};

export default PremiumFeatures;
