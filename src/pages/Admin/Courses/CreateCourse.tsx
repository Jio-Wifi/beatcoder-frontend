import React, { useState, useRef } from "react";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import { useCourse } from "../../../hooks/course/userCourse";
import { FaStar } from "react-icons/fa";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const CreateCourse: React.FC = () => {
  const { createCourse, loading, error } = useCourse();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLInputElement | null>(null);
  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: number;
    isPublished: boolean;
    rating: number;
    videoUrl: File | null;
    thumbnailUrl: File | null;
  }>({
    title: "",
    description: "",
    price: 0,
    isPublished: false,
    rating: 0,
    videoUrl: null,
    thumbnailUrl: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked, files } = target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file" && files
          ? files[0]
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => payload.append(`${key}[]`, v));
      } else if (value instanceof File) {
        if (key === "videoUrl") {
          payload.append("video", value);
        } else if (key === "thumbnailUrl") {
          payload.append("image", value);
        }
      } else if (typeof value === "boolean") {
        payload.append(key, value ? "true" : "false");
      } else {
        payload.append(key, String(value));
      }
    });

    try {
      await createCourse(payload);

      setSuccessMessage("Course created successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);

      // Reset form and file inputs
      setFormData({
        title: "",
        description: "",
        price: 0,
        isPublished: false,
        rating: 0,
        videoUrl: null,
        thumbnailUrl: null,
      });
      if (videoRef.current) videoRef.current.value = "";
      if (thumbnailRef.current) thumbnailRef.current.value = "";
    } catch (err) {
      console.error("Failed to create course:", err);
    }
  };

  return (
      <AnimatedSection delay={0.2}>
    <div className="p-6 bg-white dark:bg-dark text-primary dark:text-dime rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <div className="fixed top-1/2 left-1/2">
        {loading && <CustomLoading message="Creating course..." />}
        {error && <CustomError message={error} />}
        {successMessage && (
          <CustomMessage message={successMessage} type="success" />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <CustomInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <CustomInput
          label="Price"
          type="number"
          name="price"
          value={formData.price.toString()}
          onChange={handleChange}
        />

        {/* Star Rating Selector */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-secondary dark:text-light mb-1">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition-transform transform hover:scale-110 ${
                  star <= formData.rating
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, rating: star }))
                }
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <label htmlFor="isPublished">Publish Course</label>
        </div>

        <CustomInput
          label="Upload Video"
          name="videoUrl"
          type="file"
          accept="video/*"
          onChange={handleChange}
          ref={videoRef} // clear after submit
        />
        <CustomInput
          label="Upload Thumbnail"
          name="thumbnailUrl"
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={thumbnailRef} // clear after submit
        />

        <CustomButton type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </CustomButton>
      </form>
    </div>
      </AnimatedSection>

  );
};

export default CreateCourse;
