// src/pages/Admin/Category/EditCategory.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategory } from "../../../hooks/course/useCategory";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomMessage from "../../../components/Custom/CustomMessage";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomInput from "../../../components/Custom/CustomInput";

const EditCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { selectedCategory, fetchCategoryById, updateCategory, loading, error } =
    useCategory();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryById(categoryId);
    }
  }, [categoryId, fetchCategoryById]);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;

    try {
      await updateCategory(categoryId, { name });
      setSuccess(true);
      setTimeout(() => navigate("/admin/categories"), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !selectedCategory) {
    return <CustomLoading message="Loading category..." />;
  }

  if (error) {
    return (
      <AnimatedSection delay={0.2}>
        <div className="text-red-500">{error}</div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

        {success && (
          <CustomMessage
            type="success"
            message="Category updated successfully! Redirecting..."
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
          >
            {loading ? "Saving..." : "Update Category"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default EditCategory;
