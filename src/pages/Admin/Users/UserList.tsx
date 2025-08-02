import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import { useUser } from "../../../hooks/user/userUser";

const ITEMS_PER_PAGE = 5; // Show 5 users per page

const UserList: React.FC = () => {
  const { users, fetchUsers, deleteAdminUser, loading, error } = useUser();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filtered Users (by search)
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-2xl font-bold">All Users</h2>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to first page
            }}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-dark text-gray-900 dark:text-gray-100 w-72"
          />
        </div>

        {/* Loading & Error States */}
        {loading && <CustomLoading message="Loading users..." />}
        {error && <CustomError message={error} />}

        {/* Empty State */}
        {!loading && paginatedUsers.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        {/* Users Table */}
        {!loading && paginatedUsers.length > 0 && (
          <>
            <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b">Created At</th>
                  <th className="p-3 border-b text-center">Details</th>
                  <th className="p-3 border-b text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-dark/30"
                  >
                    <td className="p-3 border-b">{user.name}</td>
                    <td className="p-3 border-b">{user.email}</td>
                    <td className="p-3 border-b capitalize">{user.role}</td>
                    <td className="p-3 border-b">
                      {new Date(user.createdAt || "").toLocaleDateString()}
                    </td>
                    {/* View Details */}
                    <td className="p-3 border-b text-center">
                      <Link
                        to={`/admin/users/${user._id}`}
                        className="text-green-500 hover:underline"
                      >
                        <AiOutlineEye size={20} />
                      </Link>
                    </td>
                    {/* Delete Button */}
                    <td className="p-3 border-b text-center">
                      <button
                      aria-label="deletAdminUser"
                        onClick={() => deleteAdminUser(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-accent text-white"
                }`}
              >
                Prev
              </button>
              <span className="px-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-accent text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AnimatedSection>
  );
};

export default UserList;
