import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCertificate } from "../../../hooks/course/useCertificate";
import CustomButton from "../../../components/Custom/CustomButton";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomMessage from "../../../components/Custom/CustomMessage";


const IssueCertificate: React.FC = () => {
  const { issueCertificate, loading, error } = useCertificate();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: "",  // as means userID
    course: "", // as means courseID
    certificateUrl: "",
  });
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await issueCertificate(formData);
  if (!error) {
    setSuccess("Certificate issued successfully!");
    setTimeout(() => navigate("/admin/certificates"), 1500);
  }
};
  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Issue Certificate</h2>

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
            label="Course ID"
            name="course"
            type="text"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            required
          />
          <CustomInput
            label="Certificate URL"
            name="certificateUrl"
            type="url"
            value={formData.certificateUrl}
            onChange={(e) =>
              setFormData({ ...formData, certificateUrl: e.target.value })
            }
            required
          />

          <CustomButton
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-accent to-secondary text-white py-2"
          >
            {loading ? "Issuing..." : "Issue Certificate"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default IssueCertificate;
