import React from "react";
import { FaEdit } from "react-icons/fa";
import { useCommunityStats } from "../../hooks/code/useCommunityStats";
import { useSkillStats } from "../../hooks/code/useSkillStats";
import { useSubmission } from "../../hooks/code/useSubmission";

import CommunityStatsCard from "../../components/UserDashboard/CommunityStatsCard";
import UserProfileCard from "../../components/UserDashboard/UserProfileCard";
import CustomLink from "../../components/Custom/CustomLink";
import UserLanguagesAndSkills from "../../components/UserDashboard/UserLanguagesAndSkills";
import useAuth from "../../hooks/auth/useAuth";

const UserSidebar: React.FC = () => {
  const { user } = useAuth();

  const { stats, loading: statsLoading } = useCommunityStats();
  // console.log(stats)

  const { skills, loading: skillsLoading } = useSkillStats();

  const { languageStats, loading: languagesLoading } = useSubmission();

  return (
    <aside className="md:w-80 shadow-none flex flex-col p-4 text-primary dark:text-dime">
      {/* User Profile Card */}
      <div className="bg-white dark:bg-primary pt-4 rounded-md shadow-md">
      <UserProfileCard
        avatarUrl="https://img.icons8.com/?size=100&id=23309&format=png&color=000000"
        username={user?.name ?? "Guest"}
        displayName={user?.email ?? ""}
        rank={stats?.rank?.toString() ?? "N/A"} // Now valid
      />

      {/* Edit Profile Button */}
     <div className="flex justify-center">
       <CustomLink
        to="/profile"
        className="flex items-center justify-center w-[90%] py-2 mb-4 
          text-white rounded-lg transition 
          bg-gradient-to-r from-primary to-secondary 
          dark:from-accent dark:to-primary 
          hover:from-secondary hover:to-primary 
          dark:hover:from-light dark:hover:to-accent"
      >
        <FaEdit className="mr-2" /> Edit Profile
      </CustomLink>
     </div>

      {/* Community Stats (Views, Solutions, Discussions) */}
      <CommunityStatsCard stats={stats} isLoading={statsLoading} />

      {/* Languages & Skills (Dynamic) */}
      <UserLanguagesAndSkills
        languages={(languageStats || []).map((lang) => ({
          name: lang.language,
          problemsSolved: lang.problemsSolved,
        }))}
        skillCategories={
          Array.isArray(skills)
            ? skills.map((s) => ({
                title: s.category,
                skills: s.items,
                defaultVisible: 2,
              }))
            : []
        }
        isLoading={languagesLoading || skillsLoading}
      />
      </div>
    </aside>
  );
};

export default UserSidebar;
