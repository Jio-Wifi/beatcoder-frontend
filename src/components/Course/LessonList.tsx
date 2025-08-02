import React, { useState, useMemo } from "react";

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
  const [expandedLessonId, setExpandedLessonId] = useState("");

  const sortedLessons = useMemo(
    () => [...lessons].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [lessons]
  );

  return (
    <div className="bg-white flex-1  order-2 md:order-2 dark:bg-primary h-full p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold pr-2 text-secondary dark:text-accent">
          Lessons
        </h2>

        {lessons.length > 0 && (
          <select
            aria-label="Expand lesson content"
            className="border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-dark text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            value={expandedLessonId}
            onChange={(e) => setExpandedLessonId(e.target.value)}
          >
            <option value="">Hide Content</option>
            {sortedLessons.map((lesson) => (
              <option key={lesson._id} value={lesson._id}>
                {lesson.order ? `${lesson.order}. ` : ""}
                {lesson.title}
              </option>
            ))}
          </select>
        )}
      </div>

      <ul className="space-y-3 sticky overflow-y-auto max-h-screen">
  {sortedLessons.map((lesson) => (
    <li key={lesson._id}>
      <button
        type="button"
        onClick={() => onSelectLesson(lesson._id)}
        className={`w-full text-left p-3 rounded-lg cursor-pointer transition focus:outline-none ${
          selectedLessonId === lesson._id
            ? "bg-accent text-white"
            : "hover:bg-gray-100 dark:hover:bg-dark text-gray-900 dark:text-gray-200"
        }`}
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

        {lesson.content && expandedLessonId === lesson._id && (
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            {lesson.content}
          </p>
        )}

        {lesson.isPreview && (
          <p className="text-xs text-success mt-1">Preview Available</p>
        )}
      </button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default LessonList;
