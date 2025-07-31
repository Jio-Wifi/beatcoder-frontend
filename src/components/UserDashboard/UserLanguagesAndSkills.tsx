import React, { useState } from "react";
import CustomLoading from "../Common/CustomLoading";

export interface Language {
  name: string;
  problemsSolved: number;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  defaultVisible?: number; // Skills to show before "Show more"
}

interface UserLanguagesAndSkillsProps {
  languages: Language[];
  skillCategories: SkillCategory[];
  isLoading?: boolean;
}

const UserLanguagesAndSkills: React.FC<UserLanguagesAndSkillsProps> = ({
  languages,
  skillCategories,
  isLoading = false,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // ✅ Use CustomLoading instead of plain text
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <CustomLoading message="Loading your stats..." />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Languages Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 dark:text-light mb-2">
          Languages
        </h4>
        {languages.length > 0 ? (
          <ul className="space-y-2 text-sm text-gray-600 dark:text-dime">
            {languages.map((lang) => (
              <li key={lang.name} className="flex justify-between">
                <span>{lang.name}</span>
                <span>{lang.problemsSolved} problems solved</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No language stats yet.</p>
        )}
      </div>

      {/* Skills Section */}
      <div>
        <h4 className="font-semibold text-gray-700 dark:text-light mb-2">
          Skills
        </h4>
        {skillCategories.length > 0 ? (
          skillCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.title);
            const visibleSkills = isExpanded
              ? category.skills
              : category.skills.slice(0, category.defaultVisible ?? 2);

            return (
              <div key={category.title} className="mb-4">
                <h5 className="text-secondary dark:text-accent font-medium">
                  {category.title}
                </h5>
                <ul className="text-sm text-gray-600 dark:text-dime space-y-1">
                  {visibleSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                {category.skills.length > (category.defaultVisible ?? 2) && (
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="text-blue-500 text-xs hover:underline mt-1"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400">No skill stats available.</p>
        )}
      </div>
    </div>
  );
};

export default UserLanguagesAndSkills;
