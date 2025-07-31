import AnimatedCard from "../Common/AnimatedCard";
import CustomHeading from "../Custom/CustomHeading";
import CustomTitle from "../Custom/CustomTitle";

const staticStats = {
  problemsSolved: 120,
  streak: 5,
  accuracy: "89%",
  rank: 58,
};

const UserStatsSection = () => {
  return (
    <section className="py-12 px-4 bg-gray-100 dark:bg-gray-900 transition-colors">
      <CustomHeading>Your Progress</CustomHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
        <AnimatedCard className="bg-white dark:bg-gray-800">
          <CustomTitle>{staticStats.problemsSolved}</CustomTitle>
          <p className="text-gray-700 dark:text-gray-300">Problems Solved</p>
        </AnimatedCard>

        <AnimatedCard className="bg-white dark:bg-gray-800">
          <CustomTitle>{staticStats.streak} 🔥</CustomTitle>
          <p className="text-gray-700 dark:text-gray-300">Current Streak</p>
        </AnimatedCard>

        <AnimatedCard className="bg-white dark:bg-gray-800">
          <CustomTitle>{staticStats.accuracy}</CustomTitle>
          <p className="text-gray-700 dark:text-gray-300">Accuracy</p>
        </AnimatedCard>

        <AnimatedCard className="bg-white dark:bg-gray-800">
          <CustomTitle>#{staticStats.rank}</CustomTitle>
          <p className="text-gray-700 dark:text-gray-300">Leaderboard Rank</p>
        </AnimatedCard>
      </div>
    </section>
  );
};

export default UserStatsSection;
