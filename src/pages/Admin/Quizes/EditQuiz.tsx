import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../../hooks/course/useQuiz";
import { useCourse } from "../../../hooks/course/userCourse";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomInput from "../../../components/Custom/CustomInput";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";

const EditQuiz: React.FC = () => {
  const { quizId } = useParams();
  const { selectedQuiz, fetchQuizById, updateQuiz, loading, error } = useQuiz();
  const { courses, fetchCourses } = useCourse();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    question: "",
    options: [""],
    correctAnswer: "",
  });

  const [success, setSuccess] = useState<string | null>(null);

  // Fetch courses and quiz details
  useEffect(() => {
    fetchCourses();
    if (quizId) {
      fetchQuizById(quizId);
    }
  }, [quizId, fetchCourses, fetchQuizById]);

  // Populate form once quiz is fetched
  useEffect(() => {
    if (selectedQuiz) {
      setFormData({
        course: selectedQuiz.course, // string (ID)
        question: selectedQuiz.question,
        options: selectedQuiz.options,
        correctAnswer: selectedQuiz.correctAnswer,
      });
    }
  }, [selectedQuiz]);

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
    try {
      if (quizId) {
        await updateQuiz(quizId, {
          question: formData.question,
          options: formData.options,
          correctAnswer: formData.correctAnswer,
        });
        setSuccess("Quiz updated successfully!");
        setTimeout(() => navigate("/admin/quizzes"), 1500);
      }
    } catch (err) {
      console.error("Quiz update failed", err);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Quiz</h2>

        {loading && <CustomLoading message="Updating quiz..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Dropdown */}
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

          {/* Question */}
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

          {/* Correct Answer */}
          <CustomInput
            label="Correct Answer"
            name="correctAnswer"
            type="text"
            value={formData.correctAnswer}
            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
            required
          />

          {/* Submit Button */}
          <CustomButton
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-accent to-secondary text-white py-2"
          >
            {loading ? "Updating..." : "Update Quiz"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default EditQuiz;
