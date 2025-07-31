import React, { useState, useEffect } from "react";
import { useSubmission } from "../../hooks/code/useSubmission";
import type { RecentAccepted } from "../../types/code/submission.types";
import type { SolvedProblem } from "./SolvedProblemsList";
import type { CompletedCourse } from "./CompleteCourse";
import CompleteCourse from "./CompleteCourse";
import SolvedProblemsList from "./SolvedProblemsList";

interface ProblemsAndCoursesProps {
  activeTab: "problems" | "courses";
}

const ProblemsAndCourses: React.FC<ProblemsAndCoursesProps> = ({ activeTab }) => {
  const [search, setSearch] = useState("");

  const { recentAccepted, loading } = useSubmission(); // recentAccepted is RecentAccepted[]

  const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[]>([]);

  const completedCourses: CompletedCourse[] = [
    { name: "React Masterclass", lessonsCompleted: 20, totalLessons: 20 },
    { name: "TypeScript Essentials", lessonsCompleted: 15, totalLessons: 18 },
  ];

  // Map RecentAccepted -> SolvedProblem
  useEffect(() => {
    if (!recentAccepted) return;

    const mapped: SolvedProblem[] = recentAccepted.map((item: RecentAccepted) => ({
      title: item.title || "Untitled Problem",
      difficulty: item.difficulty || "Unknown", 
      solvedOn: new Date(item.solvedAt).toLocaleDateString(),
    }));

    setSolvedProblems(mapped);
  }, [recentAccepted]);

  // Filter by search
  const filteredProblems = solvedProblems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCourses = completedCourses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder={`Search ${activeTab === "problems" ? "problems" : "courses"}...`}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-primary dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Loading {activeTab}...
        </p>
      )}

      {/* Tab Content */}
      {activeTab === "problems" ? (
        <SolvedProblemsList problems={filteredProblems} />
      ) : (
        <CompleteCourse courses={filteredCourses} />
      )}
    </div>
  );
};

export default ProblemsAndCourses;
