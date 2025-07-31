import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "../../../hooks/course/userCourse";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import { FaStar } from "react-icons/fa";

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { fetchCourseById, updateCourse, selectedCourse, loading, error } =
    useCourse();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [previewThumb, setPreviewThumb] = useState<string>("");
  const [previewVideo, setPreviewVideo] = useState<string>("");

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false); // Track saving state

  const thumbRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) fetchCourseById(id);
  }, [id, fetchCourseById]);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setDescription(selectedCourse.description || "");
      setPrice(selectedCourse.price ?? 0);
      setRating(selectedCourse.rating ?? 0);
      setIsPublished(selectedCourse.isPublished ?? false);
      setPreviewThumb(selectedCourse.thumbnailUrl || "");
      setPreviewVideo(selectedCourse.videoUrl || "");
    }
  }, [selectedCourse]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "thumb" | "video"
  ) => {
    const file = e.target.files?.[0] || null;
    if (type === "thumb") {
      setThumbnail(file);
      setPreviewThumb(
        file ? URL.createObjectURL(file) : selectedCourse?.thumbnailUrl || ""
      );
    } else {
      setVideo(file);
      setPreviewVideo(
        file ? URL.createObjectURL(file) : selectedCourse?.videoUrl || ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setUpdating(true);
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("rating", rating.toString());
    formData.append("isPublished", String(isPublished));

    if (thumbnail) formData.append("image", thumbnail);
    if (video) formData.append("video", video);

    const success = await updateCourse(id, formData);
    setUpdating(false);

    if (success) {
      setSuccessMsg("Course updated successfully!");
      setTimeout(() => navigate("/admin/courses"), 1500);
    }
  };

  if (loading && !selectedCourse)
    return <CustomLoading message="Loading course..." />;

  return (
    <div className="p-6 bg-white dark:bg-primary text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <div className="fixed top-1/2 left-1/2">
        {error && <CustomMessage type="error" message={error} />}
        {successMsg && <CustomMessage type="success" message={successMsg} />}
        {updating && <CustomLoading message="Updating course..." />}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <CustomInput
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-secondary dark:text-light">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="border-2 border-solid rounded-md px-4 py-2 outline-none dark:border-b-accent border-dime dark:text-accent dark:hover:border-b-success dark:border-transparent dark:bg-primary hover:border-light transition-all"
          />
        </div>

        {/* Price */}
        <CustomInput
          label="Price (₹)"
          name="price"
          type="number"
          value={price.toString()}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        {/* Rating */}
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label>Published</label>
        </div>

        {/* Thumbnail Upload */}
        <CustomInput
          label="Thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          ref={thumbRef}
          onChange={(e) => handleFileChange(e, "thumb")}
        />
        {previewThumb && (
          <img
            src={previewThumb}
            alt="Thumbnail"
            className="mt-2 w-32 h-20 object-cover rounded"
          />
        )}

        {/* Video Upload */}
        <CustomInput
          label="Video"
          name="video"
          type="file"
          accept="video/*"
          ref={videoRef}
          onChange={(e) => handleFileChange(e, "video")}
        />
        {previewVideo && (
          <video src={previewVideo} controls className="mt-2 w-64 rounded" />
        )}

        {/* Submit */}
        <CustomButton type="submit" disabled={updating}>
          {updating ? "Saving..." : "Save Changes"}
        </CustomButton>
      </form>
    </div>
  );
};

export default EditCourse;
