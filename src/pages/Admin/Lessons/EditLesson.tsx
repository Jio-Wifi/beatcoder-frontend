import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";
import { useLesson } from "../../../hooks/course/useLesson";
import { useCourse } from "../../../hooks/course/userCourse";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const EditLesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>(); // FIXED
  const navigate = useNavigate();

  const { selectedLesson, fetchLessonById, updateLesson, loading, error } =
    useLesson();
  const { courses, fetchCourses } = useCourse();

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState(""); // course ID
  const [order, setOrder] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [resources, setResources] = useState<string[]>([]);
  const [videoDescription, setVideoDescription] = useState("");
  const [videoType, setVideoType] = useState<"mp4" | "youtube" | "vimeo">("mp4");

  const [successMessage, setSuccessMessage] = useState("");

  // Fetch lesson & courses when page loads
  useEffect(() => {
    if (lessonId) fetchLessonById(lessonId);
    fetchCourses();
  }, [lessonId, fetchLessonById, fetchCourses]);

  // Populate the form once lesson is fetched
  useEffect(() => {
    if (selectedLesson) {
      setTitle(selectedLesson.title || "");
      setContent(selectedLesson.content || "");
      setOrder(selectedLesson.order ?? 1);
      setCourse(
        typeof selectedLesson.course === "object"
          ? selectedLesson.course._id
          : selectedLesson.course
      );
      setIsFreePreview(selectedLesson.isFreePreview ?? false);
      setResources(selectedLesson.resources || []);
      setVideoDescription(selectedLesson.videoDescription || "");
      setVideoType(selectedLesson.videoType || "mp4");
    }
  }, [selectedLesson]);

  // Handle resource input change
  const handleResourceChange = (value: string, index: number) => {
    const updated = [...resources];
    updated[index] = value;
    setResources(updated);
  };

  const addResourceField = () => setResources([...resources, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonId) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("course", course);
    formData.append("order", String(order));
    formData.append("isFreePreview", String(isFreePreview));
    formData.append("videoDescription", videoDescription);
    formData.append("videoType", videoType);
    resources.forEach((res) => formData.append("resources[]", res));
    if (videoFile) formData.append("video", videoFile);

    try {
      await updateLesson(lessonId, formData);
      setSuccessMessage("Lesson updated successfully!");
      setTimeout(() => navigate("/admin/lessons"), 1500);
    } catch {
      setSuccessMessage("");
    }
  };

  return (
    <AnimatedSection delay={0.2}>
    <div
      className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 
                 rounded-lg shadow-md max-w-5xl mx-auto transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Lesson</h2>
      <div className="fixed top-1/2 left-1/2">
      {loading && <CustomLoading />}
      {error && <CustomMessage type="error" message={error} />}
      {successMessage && (
        <CustomMessage type="success" message={successMessage} />
      )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lesson Title */}
        <CustomInput
          label="Lesson Title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lesson title"
        />

        {/* Content */}
        <CustomInput
          label="Content"
          name="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter lesson content"
        />

        {/* Course Selector */}
        <div>
          <label className="block mb-1 font-medium">Select Course</label>
          <select
          aria-label="course"
            className="w-full p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Order */}
        <CustomInput
          label="Order"
          name="order"
          type="number"
          value={String(order)}
          onChange={(e) => setOrder(Number(e.target.value))}
        />

        {/* Current Video Preview */}
        {selectedLesson?.videoUrl && (
          <div>
            <p className="font-medium mb-2">Current Video</p>
            <video
              src={selectedLesson.videoUrl}
              controls
              className="w-full rounded-md border mb-3"
            />
          </div>
        )}

        {/* Upload New Video */}
        <CustomInput
          label="Upload New Video (optional)"
          name="video"
          type="file"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />

        {/* Video Description */}
        <CustomInput
          label="Video Description"
          name="videoDescription"
          type="text"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          placeholder="Enter video description"
        />

        {/* Video Type */}
        <div>
          <label className="block mb-1 font-medium">Video Type</label>
          <select
          aria-label="videoType"
            className="w-full p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
            value={videoType}
            onChange={(e) =>
              setVideoType(e.target.value as "mp4" | "youtube" | "vimeo")
            }
          >
            <option value="mp4">MP4</option>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
          </select>
        </div>

        {/* Free Preview Checkbox */}
        <div className="flex items-center">
          <input
          aria-label="preview"
            type="checkbox"
            checked={isFreePreview}
            onChange={(e) => setIsFreePreview(e.target.checked)}
            className="mr-2"
          />
          <span>Free Preview</span>
        </div>

        {/* Resource Inputs */}
        <div>
          <label className="block mb-1 font-medium">Resources</label>
          {resources.map((res, idx) => (
            <CustomInput
              key={idx}
              label={`Resource ${idx + 1}`}
              name={`resource-${idx}`}
              type="text"
              value={res}
              onChange={(e) => handleResourceChange(e.target.value, idx)}
            />
          ))}
          <CustomButton
            type="button"
            onClick={addResourceField}
            className="mt-2 bg-blue-500 text-white"
          >
            Add Resource
          </CustomButton>
        </div>

        {/* Submit Button */}
        <CustomButton
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white"
        >
          {loading ? "Updating..." : "Update Lesson"}
        </CustomButton>
      </form>
    </div>
    </AnimatedSection>
  );
};

export default EditLesson;
