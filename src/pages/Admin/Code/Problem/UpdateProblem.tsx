import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/Custom/CustomInput";
import CustomButton from "../../../../components/Custom/CustomButton";
import CustomLoading from "../../../../components/Common/CustomLoading";
import CustomMessage from "../../../../components/Custom/CustomMessage";
import AnimatedSection from "../../../../components/Common/AnimatedSection";
import { useProblem } from "../../../../hooks/code/useProblem";
import type { Difficulty, Subject } from "../../../../types/code/problem.types";

// List of all valid subjects (same as backend enum)
const subjects: Subject[] = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Hashing",
  "Trees",
  "Graphs",
  "Recursion",
  "Dynamic Programming",
  "Greedy",
  "Heap",
  "Trie",
  "Sorting & Searching",
  "Bit Manipulation",
];

const UpdateProblem: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProblemBySlug, updateProblem, loading, error } = useProblem();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    difficulty: "easy" as Difficulty,
    subject: "Arrays" as Subject, // Default subject until fetched
    constraints: "" as string,
  });
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch problem details by slug
  useEffect(() => {
    const fetchProblem = async () => {
      if (slug) {
        const problem = await getProblemBySlug(slug);
        if (problem) {
          setFormData({
            title: problem.title,
            slug: problem.slug,
            description: problem.description,
            difficulty: problem.difficulty,
            subject: problem.subject, // Populate subject
            constraints: problem.constraints,
          });
        }
      }
    };
    fetchProblem();
  }, [slug, getProblemBySlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slug) {
      const updated = await updateProblem(slug, {
        ...formData,
        difficulty: formData.difficulty as Difficulty,
        subject: formData.subject as Subject,
      });
      if (updated) {
        setSuccess("Problem updated successfully!");
        setTimeout(() => navigate("/admin/problems"), 1500);
      }
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Problem</h2>

        {loading && <CustomLoading message="Loading problem details..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <CustomInput
            label="Slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-accent"
            required
          />

          {/* Difficulty Selector */}
          <select
          aria-label="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-accent"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Subject Selector (New) */}
          <select
          aria-label="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value as Subject })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-accent"
            required
          >
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Constraints"
            value={formData.constraints}
            onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-accent"
          />

          <CustomButton
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-accent to-secondary text-white py-2"
          >
            {loading ? "Updating..." : "Update Problem"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default UpdateProblem;
