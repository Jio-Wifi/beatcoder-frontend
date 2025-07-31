import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../../../components/Custom/CustomInput";
import CustomButton from "../../../../components/Custom/CustomButton";
import CustomMessage from "../../../../components/Custom/CustomMessage";
import CustomLoading from "../../../../components/Common/CustomLoading";
import AnimatedSection from "../../../../components/Common/AnimatedSection";
import { useTestCase } from "../../../../hooks/code/useTestCase";

const CreateTestCase: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { createTestCase, loading, error } = useTestCase();

  const [formData, setFormData] = useState({
    input: "",
    expectedOutput: "",
    isPublic: false,
  });
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemId) return;

    await createTestCase({ ...formData, problem: problemId });
    if (!error) {
      setSuccess("Test case created successfully!");
    //   testcases/:problemId
      setTimeout(() => navigate(`/admin/testcases/${problemId}`), 1500);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create Test Case</h2>
        {loading && <CustomLoading message="Creating test case..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Input"
            name="input"
            type="text"
            value={formData.input}
            onChange={(e) => setFormData({ ...formData, input: e.target.value })}
            required
          />
          <CustomInput
            label="Expected Output"
            name="expectedOutput"
            type="text"
            value={formData.expectedOutput}
            onChange={(e) => setFormData({ ...formData, expectedOutput: e.target.value })}
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
            Public Test Case
          </label>
          <CustomButton
            type="submit"
            className="bg-gradient-to-r from-accent to-secondary text-white py-2"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Test Case"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default CreateTestCase;
