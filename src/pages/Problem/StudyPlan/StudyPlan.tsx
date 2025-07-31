import React from "react";
import SidebarMenu from "../../../components/problem/SidebarMenu";
import CustomCardPlan, { type Plan } from "../../../components/Custom/CustomCardPlan";


const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


const studyPlans = [
  {
    id: 1,
    title: "Beginner Plan",
    description: "Kickstart your coding journey.",
    progress: 30,
    total: 50,
    difficulty: "Easy",
    gradient: "dark:from-accent dark:to-secondary",
    slug: slugify("Beginner Plan"),
  },
  {
    id: 2,
    title: "DSA Mastery",
    description: "Sharpen your data structures skills.",
    progress: 12,
    total: 40,
    difficulty: "Medium",
    gradient: "dark:from-primary dark:to-accent",
    slug: slugify("DSA Mastery"),
  },
  {
    id: 3,
    title: "Competitive Track",
    description: "Get contest-ready with tough challenges.",
    progress: 5,
    total: 30,
    difficulty: "Hard",
    gradient: "dark:from-danger dark:to-primary",
    slug: slugify("Competitive Track"),
  },
] as const satisfies readonly Plan[];

const challengePlans = [
  {
    id: 4,
    title: "30 Days Challenge - JavaScript",
    description: "Master JS fundamentals in 30 days.",
    progress: 10,
    total: 30,
    difficulty: "Medium",
    gradient: "dark:from-primary dark:to-secondary",
    slug: slugify("30 Days Challenge - JavaScript"),
  },
  {
    id: 5,
    title: "30 Days Coding Challenge",
    description: "Sharpen problem-solving skills daily.",
    progress: 5,
    total: 30,
    difficulty: "Easy",
    gradient: "dark:from-accent dark:to-secondary",
    slug: slugify("30 Days Coding Challenge"),
  },
  {
    id: 6,
    title: "30 Days of C++",
    description: "Learn and practice C++ with daily problems.",
    progress: 15,
    total: 30,
    difficulty: "Medium",
    gradient: "dark:from-primary dark:to-accent",
    slug: slugify("30 Days of C++"),
  },
  {
    id: 7,
    title: "30 Days of Java",
    description: "Grasp Java essentials with hands-on coding.",
    progress: 7,
    total: 30,
    difficulty: "Medium",
    gradient: "dark:from-danger dark:to-primary",
    slug: slugify("30 Days of Java"),
  },
  {
    id: 8,
    title: "30 Days of Python",
    description: "Improve Python coding skills every day.",
    progress: 20,
    total: 30,
    difficulty: "Easy",
    gradient: "dark:from-secondary dark:to-accent",
    slug: slugify("30 Days of Python"),
  },
] as const satisfies readonly Plan[];

const interviewPlans = [
  {
    id: 9,
    title: "Cracking Coding Interview",
    description: "Ace interviews with handpicked problems.",
    progress: 3,
    total: 20,
    difficulty: "Hard",
    gradient: "dark:from-primary dark:to-danger",
    slug: slugify("Cracking Coding Interview"),
  },
] as const satisfies readonly Plan[];

const inDepthTopics = [
  {
    id: 10,
    title: "In-Depth Topics",
    description: "Master DP, Graphs, and Advanced Algorithms.",
    progress: 8,
    total: 25,
    difficulty: "Hard",
    gradient: "dark:from-secondary dark:to-primary",
    slug: slugify("In-Depth Topics"),
  },
] as const satisfies readonly Plan[];

const StudyPlan: React.FC = () => {
  return (
    <div className="bg-dime dark:bg-dark text-dark dark:text-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <SidebarMenu />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-4 space-y-10">
          <Section title="Study Plans" data={studyPlans} />
          <Section title="30 Days Challenge" data={challengePlans} />
          <Section title="Cracking Coding Interview" data={interviewPlans} />
          <Section title="In-Depth Topics" data={inDepthTopics} />
        </main>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  data: readonly Plan[];
}

const Section: React.FC<SectionProps> = ({ title, data }) => (
  <section>
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
      {data.map((plan) => (
        <CustomCardPlan key={plan.id} plan={plan} />
      ))}
    </div>
  </section>
);

export default StudyPlan;
