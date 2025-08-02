import { useState } from "react";

import { useProblem } from "../../hooks/code/useProblem";
import SidebarMenu from "../../components/problem/SidebarMenu";
import CenterContent from "../../components/problem/ProblemSet/CenterContent";
import RightSidebar from "../../components/problem/ProblemSet/RightSidebar";
import MobileFloatingButtons from "../../components/problem/ProblemSet/MobileFloatingButtons";
import MobilePopup from "../../components/problem/ProblemSet/MobilePopup";

const ProblemSet = () => {
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState(""); // <-- new difficulty filter
  const [popup, setPopup] = useState<"calendar" | "trending" | null>(null);

  const { problems, loading, error } = useProblem();

  console.log(problems)

  const [selectedTopic, setSelectedTopic] = useState("All");

const filteredQuestions = problems.filter((q) =>
  q.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (difficulty ? q.difficulty.toLowerCase() === difficulty.toLowerCase() : true) &&
  (selectedTopic === "All" ? true : q.subject?.toLowerCase() === selectedTopic.toLowerCase())
);

//   // Apply search and difficulty filters
// const filteredQuestions = problems.filter((q) =>
//   q.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//   (difficulty ? q.difficulty.toLowerCase() === difficulty.toLowerCase() : true)
// );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-dime dark:bg-dark text-dark dark:text-white min-h-screen relative">
      {/* Left Sidebar */}
      <aside className="col-span-1">
        <SidebarMenu />
      </aside>

      {/* Center Content */}
<CenterContent
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  loading={loading}
  error={error}
  filteredQuestions={filteredQuestions}
  problems={problems}
  selectedTopic={selectedTopic}
  setSelectedTopic={setSelectedTopic}
/>


      {/* Right Sidebar */}
      <RightSidebar date={date} setDate={setDate} />

      {/* Mobile Floating Buttons */}
      <MobileFloatingButtons setPopup={setPopup} />

      {/* Mobile Popup */}
      <MobilePopup popup={popup} setPopup={setPopup} date={date} setDate={setDate} />
    </div>
  );
};

export default ProblemSet;
