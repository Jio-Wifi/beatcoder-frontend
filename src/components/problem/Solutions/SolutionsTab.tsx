import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSubmission } from "../../../hooks/code/useSubmission";
import { useUser } from "../../../hooks/user/userUser";
import CustomLoading from "../../Common/CustomLoading";
import CustomMessage from "../../Custom/CustomMessage";

const SolutionsTab = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    submissions = [],
    loading,
    error,
    fetchSubmissionBySlug,
  } = useSubmission();
  const { fetchUserNameById } = useUser();

  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [modalCode, setModalCode] = useState<string | null>(null);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false); // ✅ add

  // ✅ Only fetch on mount or slug change
  useEffect(() => {
    if (slug && !hasFetchedOnce) {
      fetchSubmissionBySlug(slug).finally(() => setHasFetchedOnce(true));
    }
  }, [slug, fetchSubmissionBySlug, hasFetchedOnce]);

  // ✅ Resolve usernames after data is loaded
  useEffect(() => {
    const loadUserNames = async () => {
      const unknownIds = Array.from(new Set(submissions.map((s) => s.user))).filter(
        (id) => !userNames[id]
      );

      if (unknownIds.length === 0) return;

      const entries = await Promise.all(
        unknownIds.map(async (id) => {
          try {
            const name = await fetchUserNameById(id);
            return [id, name ?? "User"];
          } catch {
            return [id, "User"];
          }
        })
      );

      setUserNames((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
    };

    if (hasFetchedOnce && submissions.length > 0) {
      loadUserNames();
    }
  }, [fetchUserNameById, submissions, userNames, hasFetchedOnce]);

  const languages = useMemo(() => {
    const unique = new Set(submissions.map((s) => s.language));
    return ["All", ...Array.from(unique)];
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return selectedLanguage === "All"
      ? submissions
      : submissions.filter((s) => s.language === selectedLanguage);
  }, [submissions, selectedLanguage]);

  // ✅ prevent flicker or empty UI before data is loaded
  if (!hasFetchedOnce || loading) return <CustomLoading message="Loading community solutions..." />;
  if (error) return <CustomMessage type="error" message={error} />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Community Solutions</h2>
        <select
          aria-label="language"
          className="border dark:border-zinc-700 rounded px-3 py-1 text-sm dark:bg-zinc-800"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {filteredSubmissions.length === 0 ? (
        <p className="text-gray-500">No submissions for selected language.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-zinc-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-800 text-sm text-left">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Language</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission._id} className="text-sm dark:text-white">
                  <td className="p-2 border">
                    {userNames[submission.user] ?? submission.user.slice(0, 6)}
                  </td>
                  <td className="p-2 border">{submission.language}</td>
                  <td className="p-2 border">{submission.status}</td>
                  <td className="p-2 border">
                    {submission.executionTime ? `${submission.executionTime} ms` : "-"}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setModalCode(submission.code)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing code */}
      {modalCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-lg font-semibold mb-2">Submitted Code</h3>
            <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded overflow-x-auto text-sm">
              {modalCode}
            </pre>
            <button
              onClick={() => setModalCode(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionsTab;
