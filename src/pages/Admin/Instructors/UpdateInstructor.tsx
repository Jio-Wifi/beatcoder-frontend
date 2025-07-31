import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomLoading from "../../../components/Common/CustomLoading";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import { useInstructor } from "../../../hooks/course/useInstructor";

const UpdateInstructor: React.FC = () => {
  const { instructorId } = useParams<{ instructorId: string }>();
  const { instructors, fetchInstructors, updateInstructor, loading, error } = useInstructor();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ bio: "", expertise: "" });
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  useEffect(() => {
    const instructor = instructors.find((i) => i._id === instructorId);
    if (instructor) {
      setFormData({
        bio: instructor.bio,
        expertise: instructor.expertise.join(", "),
      });
    }
  }, [instructorId, instructors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorId) return;
    await updateInstructor(instructorId, {
      bio: formData.bio,
      expertise: formData.expertise.split(",").map((item) => item.trim()),
    });
    setSuccess("Instructor updated successfully!");
    setTimeout(() => navigate("/admin/instructors"), 1500);
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Instructor</h2>
        {loading && <CustomLoading message="Loading instructor..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <CustomButton type="submit" disabled={loading} className="bg-accent text-white py-2">
            {loading ? "Updating..." : "Update Instructor"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default UpdateInstructor;
