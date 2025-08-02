import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/Custom/CustomInput";
import CustomButton from "../../../../components/Custom/CustomButton";
import CustomMessage from "../../../../components/Custom/CustomMessage";
import CustomLoading from "../../../../components/Common/CustomLoading";
import AnimatedSection from "../../../../components/Common/AnimatedSection";
import { useTestCase } from "../../../../hooks/code/useTestCase";

const UpdateTestCase: React.FC = () => {
  const { testcaseId } = useParams<{ testcaseId: string }>(); // Only use testcaseId
  const { getTestCaseById, updateTestCase, loading, error } = useTestCase(); 
  const navigate = useNavigate();

  console.log(getTestCaseById)

  const [formData, setFormData] = useState({
    input: "",
    expectedOutput: "",
    isPublic: false,
  });
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch single test case by ID and populate form
  useEffect(() => {
    const loadTestCase = async () => {
      if (!testcaseId) return;
      const testCase = await getTestCaseById(testcaseId); // Fetch single test case
      if (testCase) {
        setFormData({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          isPublic: testCase.isPublic,
        });
      }
    };
    loadTestCase();
  }, [testcaseId, getTestCaseById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testcaseId) return;

    await updateTestCase(testcaseId, formData);
    setSuccess("Test case updated successfully!");
    setTimeout(() => navigate("/admin/problems"), 1500); // Redirect back
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Test Case</h2>
        {loading && <CustomLoading message="Loading..." />}
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
          <div className="flex items-center gap-2">
            <input
            aria-label="publicTest"
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
            <label>Public Test Case</label>
          </div>
          <CustomButton type="submit" disabled={loading} className="bg-accent text-white py-2">
            {loading ? "Updating..." : "Update Test Case"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default UpdateTestCase;
