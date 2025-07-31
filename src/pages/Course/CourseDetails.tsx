import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLesson } from "../../hooks/course/useLesson";
import LessonList from "../../components/Course/LessonList";
import CourseVideoPlayer from "../../components/Course/CourseVideoPlayer";
import { useCourse } from "../../hooks/course/userCourse";
import CustomLoading from "../../components/Common/CustomLoading";
import CustomMessage from "../../components/Custom/CustomMessage";

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    selectedCourse,
    fetchCourseById,
    loading: courseLoading,
    error: courseError,
  } = useCourse();

  const {
    lessons,
    selectedLesson,
    fetchLessons,
    fetchLessonById,
    loading: lessonLoading,
  } = useLesson();

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Fetch course details and lessons
  useEffect(() => {
    if (id) {
      fetchCourseById(id);
      fetchLessons(id); // Load lessons for this course
    }
  }, [id, fetchCourseById, fetchLessons]);

  // Fetch selected lesson details
  useEffect(() => {
    if (selectedLessonId) {
      fetchLessonById(selectedLessonId);
    }
  }, [selectedLessonId, fetchLessonById]);

  // Auto-select the first lesson once lessons load
  useEffect(() => {
    if (lessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(lessons[0]._id);
    }
  }, [lessons, selectedLessonId]);

  if (courseLoading || lessonLoading) return <CustomLoading />;

  if (courseError)
    return <CustomMessage type="error" message={courseError} />;

  if (!selectedCourse)
    return <CustomMessage type="info" message="Course not found." />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white p-6">
      <div className="max-w-container mx-auto grid grid-cols-1 md:flex gap-2">
        {/* Left Panel - Lesson List */}
        <LessonList
          lessons={lessons}
          selectedLessonId={selectedLessonId || ""}
          onSelectLesson={(lessonId) => setSelectedLessonId(lessonId)}
        />

        {/* Right Panel - Video Player */}
        <CourseVideoPlayer
          videoUrl={selectedLesson?.videoUrl || selectedCourse.videoUrl}
          courseTitle={selectedLesson?.title || selectedCourse.title}
          instructorName={selectedCourse.instructor?.name || "Unknown"}
          rating={selectedCourse.rating}
          isPurchased={true} // Replace with real enrollment check
        />
      </div>
    </div>
  );
};

export default CourseDetails;
