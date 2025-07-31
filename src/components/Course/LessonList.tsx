import React, { useState } from "react";

interface Lesson {
  _id: string;
  title: string;
  content?: string;
  order?: number;
  duration?: string;
  isPreview?: boolean;
}

interface LessonListProps {
  lessons: Lesson[];
  selectedLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  selectedLessonId,
  onSelectLesson,
}) => {
  const [expandedLessonId, setExpandedLessonId] = useState<string>("");

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpandedLessonId(e.target.value);
  };

  return (
    <div className="bg-white order-2 md:order-1 dark:bg-primary h-full md:w-full p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-secondary dark:text-accent">
          Course Lessons
        </h2>

        {/* Dropdown for selecting lesson content visibility */}
        {lessons.length > 0 && (
          <select
            className="border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-dark text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            value={expandedLessonId}
            onChange={handleDropdownChange}
          >
            <option value="">Hide Content</option>
            {lessons
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.order ? `${lesson.order}. ` : ""}
                  {lesson.title}
                </option>
              ))}
          </select>
        )}
      </div>

      <ul className="space-y-3">
        {lessons
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((lesson) => (
            <li
              key={lesson._id}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedLessonId === lesson._id
                  ? "bg-accent text-white"
                  : "hover:bg-gray-100 dark:hover:bg-dark text-gray-900 dark:text-gray-200"
              }`}
              onClick={() => onSelectLesson(lesson._id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {lesson.order ? `${lesson.order}. ` : ""}
                  {lesson.title}
                </span>
                {lesson.duration && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {lesson.duration}
                  </span>
                )}
              </div>

              {/* Show content only for the selected dropdown lesson */}
              {lesson.content && expandedLessonId === lesson._id && (
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  {lesson.content}
                </p>
              )}

              {lesson.isPreview && (
                <p className="text-xs text-success mt-1">Preview Available</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LessonList;
