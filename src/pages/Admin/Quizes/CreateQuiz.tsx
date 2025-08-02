import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../../hooks/course/useQuiz";
import { useCourse } from "../../../hooks/course/userCourse";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";

const CreateQuiz: React.FC = () => {
  const { createQuiz, loading, error } = useQuiz();
  const { courses, fetchCourses } = useCourse();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    question: "",
    options: ["", ""],
    correctAnswer: "",
  });

  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuiz(formData);
    setSuccess("Quiz created successfully!");
    setTimeout(() => navigate("/admin/quizzes"), 1500);
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>

        {loading && <CustomLoading message="Creating quiz..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Course */}
          <div>
            <label className="block font-medium mb-1">Select Course</label>
            <select
            aria-label="course"
              name="course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-accent"
              required
            >
              <option value="">-- Choose a course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <CustomInput
            label="Question"
            name="question"
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />

          {/* Options */}
          <div>
            <label className="block font-medium mb-1">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <CustomInput
                  type="text"
                  name="option"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                {formData.options.length > 2 && (
                  <CustomButton
                    type="button"
                    onClick={() => removeOption(index)}
                    className="bg-red-500 text-white px-3"
                  >
                    X
                  </CustomButton>
                )}
              </div>
            ))}
            <CustomButton
              type="button"
              onClick={addOption}
              className="bg-green-500 text-white mt-2"
            >
              + Add Option
            </CustomButton>
          </div>

          <CustomInput
            label="Correct Answer"
            name="correctAnswer"
            type="text"
            value={formData.correctAnswer}
            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
            required
          />

          <CustomButton
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-accent to-secondary text-white py-2"
          >
            {loading ? "Creating..." : "Create Quiz"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default CreateQuiz;
