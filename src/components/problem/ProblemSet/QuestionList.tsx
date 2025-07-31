import CustomLink from "../../Custom/CustomLink";

interface QuestionListProps {
  questions: { slug: string; title: string; difficulty: string }[]; // Include slug
}

const QuestionList = ({ questions }: QuestionListProps) => (
  <ul className="space-y-2 max-h-[400px] custom-scroll overflow-y-auto pr-2">
    {questions.map((q) => (
      <CustomLink
        key={q.slug} // Use slug as the unique key
        to={`/problems/${q.slug}/description`} // Use slug for navigation
        className="block text-secondary dark:text-dime font-semibold"
      >
        <li className="p-4 border rounded-lg bg-white dark:bg-dark flex justify-between hover:bg-accent/10 dark:hover:bg-accent/20 transition">
          <span>{q.title}</span>
          <span
            className={
              q.difficulty === "easy"
                ? "text-success"
                : q.difficulty === "medium"
                ? "text-secondary"
                : "text-danger"
            }
          >
            {q.difficulty.toUpperCase()}
          </span>
        </li>
      </CustomLink>
    ))}
  </ul>
);

export default QuestionList;
