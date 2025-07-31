import AnimatedCard from "../Common/AnimatedCard";
import CustomHeading from "../Custom/CustomHeading";
import CustomTitle from "../Custom/CustomTitle";

const upcomingContests = [
  {
    name: "CodeSprint July",
    date: "2025-07-20",
    time: "18:30 IST",
    platform: "Codeforces",
  },
  {
    name: "Weekly Challenge 102",
    date: "2025-07-22",
    time: "20:00 IST",
    platform: "LeetCode",
  },
  {
    name: "Mega DSA Contest",
    date: "2025-07-25",
    time: "17:00 IST",
    platform: "HackerRank",
  },
];

const UpcomingContestsSection = () => {
  return (
    <section className="py-12 px-4  transition-colors">
      <CustomHeading>Upcoming Contests</CustomHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
        {upcomingContests.map((contest) => (
          <AnimatedCard key={contest.name} className="bg-white dark:bg-primary">
            <CustomTitle>{contest.name}</CustomTitle>
            <p className="text-dark dark:text-dime mt-1">
              📅 {contest.date}
            </p>
            <p className="text-primary dark:text-dime">⏰ {contest.time}</p>
            <p className="text-sm text-accent dark:text-secondary mt-2 font-medium">
              Platform: {contest.platform}
            </p>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
};

export default UpcomingContestsSection;
