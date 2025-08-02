import React, { useState, useEffect } from "react";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import { useLesson } from "../../../hooks/course/useLesson";
import { useCourse } from "../../../hooks/course/userCourse";
import { AiOutlinePlus } from "react-icons/ai";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const AddLesson: React.FC = () => {
  const { createLesson, loading, error } = useLesson();
  const {
    courses,
    fetchCourses,
    loading: coursesLoading,
    error: courseError,
  } = useCourse();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");
  const [order, setOrder] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [resources, setResources] = useState<string[]>([]);
  const [videoDescription, setVideoDescription] = useState("");
  const [videoType, setVideoType] = useState<"mp4" | "youtube" | "vimeo">(
    "mp4"
  );

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleResourceChange = (value: string, index: number) => {
    const updated = [...resources];
    updated[index] = value;
    setResources(updated);
  };

  const addResourceField = () => setResources([...resources, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!course) {
      setSuccessMessage("");
      return alert("Please select a course before creating the lesson.");
    }

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
      await createLesson(formData);
      setSuccessMessage("Lesson created successfully!");
      setTitle("");
      setContent("");
      setCourse("");
      setOrder(1);
      setVideoFile(null);
      setIsFreePreview(false);
      setResources([]);
      setVideoDescription("");
      setVideoType("mp4");
    } catch {
      setSuccessMessage("");
    }
  };

  return (
    <AnimatedSection delay={0.2}>

    <div
      className="p-6 rounded-lg shadow-md max-w-5xl mx-auto 
                    bg-white text-gray-900 
                    dark:bg-dark dark:text-gray-100 
                    transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Lesson</h2>

      <div className="fixed top-1/2 left-1/2">
        {loading && <CustomLoading />}
        {coursesLoading && <CustomLoading />}
        {(error || courseError) && (
          <CustomMessage type="error" message={error || courseError || ""} />
        )}
        {successMessage && (
          <CustomMessage type="success" message={successMessage} />
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          label="Title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lesson title"
        />

        <CustomInput
          label="Content"
          name="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter lesson content"
        />

        {/* Course Dropdown with Dark Mode + Styled */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Select Course
          </label>
          <select
          aria-label="course"
            className="w-full p-3 rounded-lg border shadow-sm 
               bg-white text-gray-900 
               border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary
               hover:border-secondary
               dark:bg-dark dark:text-gray-100 dark:border-gray-600 
               dark:focus:border-accent dark:focus:ring-accent
               transition-all duration-200 ease-in-out"
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

        <CustomInput
          label="Order"
          name="order"
          type="number"
          value={String(order)}
          onChange={(e) => setOrder(Number(e.target.value))}
        />

        <CustomInput
          label="Video File"
          name="video"
          type="file"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />

        <CustomInput
          label="Video Description"
          name="videoDescription"
          type="text"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          placeholder="Enter video description"
        />

        <div>
          <label className="block mb-1 font-medium">Video Type</label>
          <select
          aria-label="videoType"
            className="w-full border p-2 rounded 
                       bg-white text-gray-900 
                       dark:bg-dark dark:text-gray-100 
                       dark:border-gray-600"
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

        <div className="flex items-center">
          <input
          aria-label="checkbox"
            type="checkbox"
            checked={isFreePreview}
            onChange={(e) => setIsFreePreview(e.target.checked)}
            className="mr-2"
          />
          <span>Free Preview</span>
        </div>
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
            className="mt-2 flex items-center gap-2 bg-blue-500 text-white"
          >
            <AiOutlinePlus size={18} />
            Add Resource
          </CustomButton>
        </div>

        <CustomButton
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white"
        >
          {loading ? "Creating..." : "Create Lesson"}
        </CustomButton>
      </form>
    </div>
    </AnimatedSection>
  );
};

export default AddLesson;
