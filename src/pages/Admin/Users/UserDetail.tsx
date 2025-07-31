import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineArrowLeft } from "react-icons/ai";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import { useUser } from "../../../hooks/user/userUser";

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { fetchUserById, deleteAdminUser, selectedUser, loading, error } =
    useUser();

  useEffect(() => {
    if (userId) fetchUserById(userId);
  }, [userId, fetchUserById]);

  const handleDelete = async () => {
    if (!userId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      await deleteAdminUser(userId);
      navigate("/admin/users"); // Redirect after deletion
    }
  };

  if (loading) return <CustomLoading message="Loading user details..." />;
  if (error) return <CustomError message={error} />;

  if (!selectedUser) {
    return (
      <AnimatedSection delay={0.2}>
        <p className="text-center text-gray-500">User not found.</p>
      </AnimatedSection>
    );
  }

  const {
    name,
    email,
    role,
    createdAt,
    gender,
    location,
    birthday,
    summary,
    website,
    github,
    linkedin,
    twitter,
    work,
    education,
    skills,
  } = selectedUser;

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <AiOutlineArrowLeft /> Back
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {name}</p>
            <p><span className="font-semibold">Email:</span> {email}</p>
            <p><span className="font-semibold">Role:</span> {role}</p>
            <p><span className="font-semibold">Joined:</span> {new Date(createdAt).toLocaleDateString()}</p>
            {gender && <p><span className="font-semibold">Gender:</span> {gender}</p>}
            {birthday && <p><span className="font-semibold">Birthday:</span> {new Date(birthday).toLocaleDateString()}</p>}
          </div>
          <div className="space-y-2">
            {location && <p><span className="font-semibold">Location:</span> {location}</p>}
            {work && <p><span className="font-semibold">Work:</span> {work}</p>}
            {education && <p><span className="font-semibold">Education:</span> {education}</p>}
            {summary && <p><span className="font-semibold">About:</span> {summary}</p>}
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-1">
          {website && (
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                {website}
              </a>
            </p>
          )}
          {github && (
            <p>
              <span className="font-semibold">GitHub:</span>{" "}
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                {github}
              </a>
            </p>
          )}
          {linkedin && (
            <p>
              <span className="font-semibold">LinkedIn:</span>{" "}
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                {linkedin}
              </a>
            </p>
          )}
          {twitter && (
            <p>
              <span className="font-semibold">Twitter:</span>{" "}
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                {twitter}
              </a>
            </p>
          )}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <span className="font-semibold">Skills:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Delete Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <AiOutlineDelete /> Delete
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default UserDetail;
