import { FiSearch } from "react-icons/fi";
import SliderCard from "../SliderCard";
import DSATopicScrollBar from "./DSATopicScrollBar";
import CustomLoading from "../../Common/CustomLoading";
import CustomError from "../../Common/CustomError";
import QuestionList from "./QuestionList";
import type { Problem } from "../../../types/code/problem.types";

interface CenterContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  difficulty: string;
  setDifficulty: (level: string) => void;
  loading: boolean;
  error: string | null;
  filteredQuestions: Problem[];
  problems: Problem[];
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}


const CenterContent = ({
  searchQuery,
  setSearchQuery,
  difficulty,
  setDifficulty,
  loading,
  error,
  filteredQuestions,
  problems,
  selectedTopic,
  setSelectedTopic
}: CenterContentProps) => {
  return (
    <main className="md:col-span-3 space-y-6">
      <SliderCard />
    <DSATopicScrollBar
  problems={problems}
  selectedTopic={selectedTopic}
  setSelectedTopic={setSelectedTopic}
/>



      {/* 🔍 Search Box with Difficulty Filter */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-grow">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-primary text-dark dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Difficulty Filter */}
        <select
          aria-label="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="min-w-[140px] px-3 py-2 border rounded-md bg-white dark:bg-primary text-dark dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Loading / Error / List */}
      {loading && <CustomLoading message="Loading problems..." />}
      {error && <CustomError message={error} />}
      {!loading && !error && (
        <QuestionList
          questions={filteredQuestions.map((q) => ({
            slug: q.slug,
            title: q.title,
            difficulty: q.difficulty,
          }))}
        />
      )}
    </main>
  );
};

export default CenterContent;
