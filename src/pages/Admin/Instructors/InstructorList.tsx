import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import { useInstructor } from "../../../hooks/course/useInstructor";

const InstructorList: React.FC = () => {
  const { instructors, deleteInstructor, loading, error } = useInstructor();


  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">All Instructors</h2>
          <Link
            to="/admin/instructors/create"
            className="px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-md"
          >
            + Add Instructor
          </Link>
        </div>

        {loading && <CustomLoading message="Loading instructors..." />}
        {error && <CustomError message={error} />}
        {!loading && instructors.length === 0 && (
          <p className="text-center text-gray-500">No instructors found.</p>
        )}

        {!loading && instructors.length > 0 && (
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark">
                <th className="p-3 border-b">Instructor</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Bio</th>
                <th className="p-3 border-b">Expertise</th>
                <th className="p-3 border-b">Courses</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr
                  key={instructor._id}
                  className="hover:bg-gray-50 dark:hover:bg-dark/30"
                >
                  {/* Show instructor name (from populated user) */}
                  <td className="p-3 border-b">
                    {instructor.user?.name || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {instructor.user?.email || "N/A"}
                  </td>
                  <td className="p-3 border-b">{instructor.bio || "—"}</td>
                  <td className="p-3 border-b">
                    {instructor.expertise?.length
                      ? instructor.expertise.join(", ")
                      : "—"}
                  </td>
                  <td className="p-3 border-b">
                    {instructor.courses?.length
                      ? instructor.courses
                          .map((course) =>
                            typeof course === "object" ? course.title : course
                          )
                          .join(", ")
                      : "No Courses"}
                  </td>
                  <td className="p-3 border-b flex gap-4">
                    <Link
                      to={`/admin/instructors/edit/${instructor._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      <AiOutlineEdit size={20} />
                    </Link>
                    <button
                    aria-label="instructorId"
                      onClick={() => deleteInstructor(instructor._id)}
                      className="text-red-500 hover:underline"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AnimatedSection>
  );
};

export default InstructorList;
