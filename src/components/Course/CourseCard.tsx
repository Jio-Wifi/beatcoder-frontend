import React from "react";
import { useNavigate } from "react-router-dom";
import type { Course } from "../../types/course/course.types";
import { useSubscription } from "../../hooks/course/useSubscription"; // <-- Subscription hook
import CustomMessage from "../Custom/CustomMessage";
import AnimatedCard from "../Common/AnimatedCard";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const { isSubscribed, loading, error } = useSubscription();

  const handleStartLearning = () => {
    if (isSubscribed) {
      navigate(`/explore/course/${course._id}`);
    } else {
      // Show subscription popup or redirect to subscription page
      navigate('/subscribe')
    }
  };

  return (
    <AnimatedCard className="!bg-transparent !shadow-none">
    <div className="bg-white dark:bg-primary rounded-2xl shadow-lg overflow-hidden">
      <img
        src={course.thumbnailUrl || "https://via.placeholder.com/400x200"}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-secondary dark:text-accent mb-2">
            {course.title}
          </h3>
          <div className="flex justify-between items-center">
            {course.rating && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ⭐ {course.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {course.description || "No description available."}
        </p>

        {/* Show error or loading state */}
        {loading && <CustomMessage type="info" message="Checking subscription..." />}
        {error && <CustomMessage type="error" message={error} />}

        {/* Conditional button */}
        {isSubscribed ? (
          <button
            onClick={handleStartLearning}
            className="mt-4 w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition"
          >
            Start Learning
          </button>
        ) : (
          <button
            onClick={handleStartLearning}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
          >
            Subscribe to Access
          </button>
        )}
      </div>
    </div>
    </AnimatedCard>
  );
};

export default CourseCard;
