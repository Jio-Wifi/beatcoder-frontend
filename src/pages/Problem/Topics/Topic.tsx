import React, { useState, useEffect, type JSX } from "react";
import { useParams } from "react-router-dom";
import {
  MdDataArray,
  MdOutlineFunctions,
  MdManageSearch,
} from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import {
  FaStackOverflow,
  FaMountain,
  FaProjectDiagram,
  FaSitemap,
} from "react-icons/fa";
import { HiOutlineQueueList, HiOutlineHashtag } from "react-icons/hi2";
import { GiTreeBranch } from "react-icons/gi";
import { SiGoogletagmanager } from "react-icons/si";
import { CgRepeat } from "react-icons/cg";
import { BiChip } from "react-icons/bi";
import type { Subject } from "../../../types/code/problem.types";
import { useProblem } from "../../../hooks/code/useProblem";
import CustomLink from "../../../components/Custom/CustomLink";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

const ICON_SIZE = 22;

const subjectIcons: Record<Subject, JSX.Element> = {
  Arrays: <MdDataArray size={ICON_SIZE} />,
  Strings: <AiOutlineFontSize size={ICON_SIZE} />,
  "Linked List": <BsLink45Deg size={ICON_SIZE} />,
  Stack: <FaStackOverflow size={ICON_SIZE} />,
  Queue: <HiOutlineQueueList size={ICON_SIZE} />,
  Hashing: <HiOutlineHashtag size={ICON_SIZE} />,
  Trees: <GiTreeBranch size={ICON_SIZE} />,
  Graphs: <FaProjectDiagram size={ICON_SIZE} />,
  Recursion: <CgRepeat size={ICON_SIZE} />,
  "Dynamic Programming": <MdOutlineFunctions size={ICON_SIZE} />,
  Greedy: <SiGoogletagmanager size={ICON_SIZE} />,
  Heap: <FaMountain size={ICON_SIZE} />,
  Trie: <FaSitemap size={ICON_SIZE} />,
  "Sorting & Searching": <MdManageSearch size={ICON_SIZE} />,
  "Bit Manipulation": <BiChip size={ICON_SIZE} />,
};

const Topic: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const { problems, fetchProblems, loading, error } = useProblem();

  const [selectedSubject, setSelectedSubject] = useState<Subject>("Arrays");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Convert slug (like "linked-list") to match backend enum ("Linked List")
    const formattedSubject = (subject || "arrays")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") as Subject;

    setSelectedSubject(formattedSubject);

    // Force fetch problems for this subject
    fetchProblems({ subject: formattedSubject }, true).catch((err) =>
      console.error("Failed to fetch problems:", err)
    );
  }, [fetchProblems, subject]);

  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-container mx-auto min-h-screen dark:bg-dark text-gray-900 dark:text-gray-100">
      <div className="mt-8 bg-white dark:bg-transparent grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-md shadow-md">
        {/* Left: Selected subject */}
        <aside className="space-y-4">
          <div className="cursor-default p-6 flex items-center gap-4 rounded-xl shadow-md bg-gradient-to-r from-secondary to-success text-white">
            {subjectIcons[selectedSubject]}
            <span className="text-lg font-semibold">{selectedSubject}</span>
          </div>
        </aside>

        {/* Right: Problems List */}
        <main className="md:col-span-3 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              <span className="capitalize">{selectedSubject}</span> Problems
            </h2>
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent
                bg-white dark:bg-primary dark:border-gray-600 text-gray-900 dark:text-gray-200"
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scroll max-h-[70vh] pr-2">
            {loading && <p className="text-gray-500">Loading problems...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <ul className="space-y-4">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((q) => (
                  <CustomLink
                    key={q._id}
                    to={`/problems/${slugify(q.title)}/description`}
                    className="block text-secondary dark:text-dime font-semibold"
                  >
                    <li className="p-4 border rounded-lg bg-white dark:bg-primary dark:border-gray-700 flex justify-between hover:bg-accent/10 dark:hover:bg-accent/20 transition">
                      <span>{q.title}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          q.difficulty === "easy"
                            ? "text-green-600"
                            : q.difficulty === "medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {q.difficulty.toUpperCase()}
                      </span>
                    </li>
                  </CustomLink>
                ))
              ) : (
                <p className="text-gray-500">No problems found for this topic.</p>
              )}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Topic;
