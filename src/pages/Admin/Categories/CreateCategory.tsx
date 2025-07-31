import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../../hooks/course/useCategory";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomInput from "../../../components/Custom/CustomInput";

const CreateCategory: React.FC = () => {
  const { createCategory, loading, error } = useCategory();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory({ name });
      setSuccess(true);
      setTimeout(() => navigate("/admin/categories"), 1500); // redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Category</h2>

        {loading && <CustomLoading message="Creating category..." />}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && (
          <CustomMessage
            type="success"
            message="Category created successfully! Redirecting..."
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Category Name"
            name="categoryName"
            value={name}
            placeholder="Enter category name"
            onChange={(e) => setName(e.target.value)}
          />

          <CustomButton
            type="submit"
            disabled={loading}
            children={loading ? "Saving..." : "Create Category"}
          />
        </form>
      </div>
    </AnimatedSection>
  );
};

export default CreateCategory;
