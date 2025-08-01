import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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

  
  console.log(selectedCourse)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const lessons = useMemo(() => selectedCourse?.lessons || [], [selectedCourse]);

  // Fetch course (which includes lessons)
  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
  }, [id, fetchCourseById]);

  // Auto-select first lesson
  useEffect(() => {
    if (lessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(lessons[0]._id);
    }
  }, [lessons, selectedLessonId]);

  const selectedLesson = lessons.find((l) => l._id === selectedLessonId);


  if (courseLoading) return <CustomLoading />;

  if (courseError)
    return <CustomMessage type="error" message={courseError} />;

  if (!selectedCourse)
    return <CustomMessage type="info" message="Course not found." />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white p-6">
      <div className="grid grid-cols-1 md:flex gap-2">
        {/* Left Panel - Lesson List */}
        <LessonList
          lessons={lessons}
          selectedLessonId={selectedLessonId || ""}
          onSelectLesson={setSelectedLessonId}
        />

        {/* Right Panel - Video Player */}
     <CourseVideoPlayer
  videoUrl={selectedLesson?.videoUrl || selectedCourse.videoUrl}
  courseTitle={selectedLesson?.title || selectedCourse.title}
  isPurchased={true}
  description={selectedCourse.description}
  rating={selectedCourse.rating}
  videoDuration={selectedLesson?.videoDuration}
  videoDescription={selectedLesson?.videoDescription}
  createdAt={selectedCourse.createdAt}
  language="English"
  onDownloadCertificate={() =>
    window.open(`/api/certificate/download/${selectedCourse._id}`, "_blank")
  }
/>

      </div>
    </div>
  );
};

export default CourseDetails;
