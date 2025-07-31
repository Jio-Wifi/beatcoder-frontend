import AnimatedCard from "../Common/AnimatedCard";
import CustomHeading from "../Custom/CustomHeading";
import CustomTitle from "../Custom/CustomTitle";

const featured = [
  { title: "Two Sum", difficulty: "Easy" },
  { title: "Longest Substring", difficulty: "Medium" },
  { title: "Median of Arrays", difficulty: "Hard" },
];

const FeaturedProblemsSection = () => (
  <section className="py-12  transition-colors duration-300">
    <CustomHeading>Featured Problems</CustomHeading>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6 px-4">
      {featured.map((problem) => (
        <AnimatedCard
          key={problem.title}
          className="bg-white dark:bg-primary transition-colors duration-300"
        >
          <CustomTitle>{problem.title}</CustomTitle>
          <p
            className={`mt-2 font-semibold ${
              problem.difficulty === "Hard"
                ? "text-danger"
                : problem.difficulty === "Medium"
                ? "text-secondary"
                : "text-accent"
            }`}
          >
            {problem.difficulty}
          </p>
        </AnimatedCard>
      ))}
    </div>
  </section>
);

export default FeaturedProblemsSection;
