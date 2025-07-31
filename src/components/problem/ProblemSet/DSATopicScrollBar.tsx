import CustomLink from "../../Custom/CustomLink";

const DSATopicScrollBar = () => {
  const dsaTopics = [
    { name: "Arrays", count: 12 },
    { name: "Strings", count: 9 },
    { name: "Linked List", count: 6 },
    { name: "Stacks", count: 4 },
    { name: "Queues", count: 5 },
    { name: "Trees", count: 10 },
    { name: "Graphs", count: 7 },
    { name: "Recursion", count: 3 },
    { name: "Backtracking", count: 4 },
    { name: "Sorting", count: 8 },
    { name: "Searching", count: 6 },
    { name: "Hashing", count: 3 },
    { name: "Dynamic Programming", count: 11 },
    { name: "Greedy", count: 5 },
    { name: "Sliding Window", count: 2 },
    { name: "Two Pointers", count: 4 },
    { name: "Bit Manipulation", count: 2 },
    { name: "Mathematics", count: 6 },
    { name: "Heap", count: 3 },
    { name: "Trie", count: 1 },
  ];

  return (
    <div className="overflow-x-auto custom-scroll whitespace-nowrap py-2 px-1 bg-dime dark:bg-dark rounded-md shadow-inner">
      <div className="inline-flex gap-3 min-w-full">
        {dsaTopics.map((topic) => (
         <CustomLink
  key={topic.name}
  to={`/topics/${topic.name.toLowerCase().replace(/\s+/g, "-")}`}
  className="no-underline px-4 py-2 rounded-full bg-white dark:bg-primary border-transparent border-2 dark:hover:border-light dark:hover:border-2 border-gray-300 dark:border-gray-600 text-sm text-dark dark:text-white hover:bg-accent hover:text-white transition flex items-center gap-2"
>
  <span>{topic.name}</span>
  <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full">
    {topic.count}
  </span>
</CustomLink>

        ))}
      </div>
    </div>
  );
};

export default DSATopicScrollBar;
