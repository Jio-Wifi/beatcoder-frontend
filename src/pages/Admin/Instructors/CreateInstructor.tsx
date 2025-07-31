import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaBook } from "react-icons/fa"; // Icons for selection and course
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomLoading from "../../../components/Common/CustomLoading";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import { useInstructor } from "../../../hooks/course/useInstructor";
import { useCourse } from "../../../hooks/course/userCourse";

const CreateInstructor: React.FC = () => {
  const { createInstructor, loading, error } = useInstructor();
  const { courses, fetchCourses, loading: courseLoading } = useCourse();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: "",
    bio: "",
    expertise: "",
    courseIds: [] as string[], // selected courses
  });
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const toggleCourseSelection = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      courseIds: prev.courseIds.includes(courseId)
        ? prev.courseIds.filter((id) => id !== courseId)
        : [...prev.courseIds, courseId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createInstructor({
      user: formData.user,
      bio: formData.bio,
      expertise: formData.expertise.split(",").map((item) => item.trim()),
      courses: formData.courseIds,
    });

    setSuccess("Instructor created successfully!");
    setTimeout(() => navigate("/admin/instructors"), 1500);
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Instructor</h2>
        {(loading || courseLoading) && <CustomLoading message="Loading..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="User ID"
            name="user"
            type="text"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            required
          />

          <CustomInput
            label="Bio"
            name="bio"
            type="text"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
          />

          <CustomInput
            label="Expertise (comma-separated)"
            name="expertise"
            type="text"
            value={formData.expertise}
            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
            required
          />

          {/* Custom Course Selection */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Assign Courses
            </label>
            <div className="flex flex-wrap gap-3">
              {courses.map((course) => {
                const isSelected = formData.courseIds.includes(course._id);
                return (
                  <button
                    key={course._id}
                    type="button"
                    onClick={() => toggleCourseSelection(course._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      isSelected
                        ? "bg-green-500 text-white border-green-500 shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-400"
                    }`}
                  >
                    <FaBook />
                    {course.title}
                    {isSelected && <FaCheck />}
                  </button>
                );
              })}
            </div>
            {formData.courseIds.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Select at least one course for this instructor.
              </p>
            )}
          </div>

          <CustomButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Instructor"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default CreateInstructor;
