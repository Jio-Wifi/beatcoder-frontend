import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; 
import { useCategory } from "../../../hooks/course/useCategory"; 
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const ITEMS_PER_PAGE = 5;

const CategoryList: React.FC = () => {
  const {
    categories,
    fetchCategories,
    deleteCategory,
    loading,
    error,
  } = useCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/category/edit/${id}`);
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Category Management</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        {loading && <CustomLoading message="Loading categories..." />}
        {error && <CustomError message={error} />}

        {!loading && paginatedCategories.length === 0 && (
          <p className="text-center text-gray-500">No categories found.</p>
        )}

        {!loading && paginatedCategories.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Slug</th>
                  <th className="p-3 border-b">Created At</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="hover:bg-gray-50 dark:hover:bg-dark/30"
                  >
                    <td className="p-3 border-b">{cat.name}</td>
                    <td className="p-3 border-b">{cat.slug}</td>
                    <td className="p-3 border-b">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b flex gap-3">
                      <button
                        onClick={() => handleEdit(cat._id)}
                        className="text-blue-500 hover:underline flex items-center gap-1"
                      >
                        <AiOutlineEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-500 hover:underline flex items-center gap-1"
                      >
                        <AiOutlineDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default CategoryList;
