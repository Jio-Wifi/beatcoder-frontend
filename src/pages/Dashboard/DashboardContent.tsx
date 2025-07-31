import React from "react";
import DashboardStats from "../../components/UserDashboard/DashboardStats";
import { useSubmission } from "../../hooks/code/useSubmission";
import SubmissionHeatmap from "../../components/UserDashboard/SubmissonHeatMap";
import SubscriptionCard from "../../components/UserDashboard/SubscriptionCard";
import DashboardTabs from "../../components/UserDashboard/DashboardTabs";
import { useUser } from "../../hooks/user/userUser"; // make sure this hook accesses UserContext

const DashboardContent: React.FC = () => {
  const {
    submissionActivity = [],
  } = useSubmission();

  const {
    stats,
    // loading,
  } = useUser();



//   if (loading || !stats || !stats.difficulty) {
//   return <div className="p-6 text-center text-gray-500 dark:text-white">Loading stats...</div>;
// }

  return (
    <main className="w-full h-fit mt-4 dark:bg-dark">
      <div className="grid md:flex flex-wrap gap-4 lg:gap-0 justify-around">
        <DashboardStats
  solved={stats?.solved ?? 0}
  total={stats?.totalProblems ?? 0}
  acceptance={stats?.acceptanceRate ?? 0}
  beats={[40.61, 57.3, 20.51]}
  attempts={stats?.attempting ?? 0}
  submissions={stats?.totalSubmissions ?? 0}
  easySolved={stats?.difficulty?.easy?.solved ?? 0}
  easyTotal={stats?.difficulty?.easy?.total ?? 0}
  mediumSolved={stats?.difficulty?.medium?.solved ?? 0}
  mediumTotal={stats?.difficulty?.medium?.total ?? 0}
  hardSolved={stats?.difficulty?.hard?.solved ?? 0}
  hardTotal={stats?.difficulty?.hard?.total ?? 0}
/>

        <SubmissionHeatmap values={submissionActivity} days={90} />
        <SubscriptionCard />
      </div>

      <DashboardTabs />
    </main>
  );
};

export default DashboardContent;
