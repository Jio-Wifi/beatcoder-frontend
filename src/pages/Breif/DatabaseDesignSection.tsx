import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AnimatedSection from "../../components/Common/AnimatedSection";

const dbSchema = [
    {
    title: "🧑‍💻 users",
    fields: {
      name: "string",
      email: "string",
      password: "string",
      role: "UserRole",
      submissions: "ObjectId[]",
      createdAt: "Date",
      gender: "Gender | undefined",
      location: "string | undefined",
      birthday: "string | undefined",
      summary: "string | undefined",
      website: "string | undefined",
      github: "string | undefined",
      linkedin: "string | undefined",
      twitter: "string | undefined",
      work: "string | undefined",
      education: "string | undefined",
      skills: "string[] | undefined",
      resetPasswordToken: "string | undefined",
      resetPasswordExpire: "Date | undefined",
    },
  },
 {
  title: "📌 problems",
  fields: {
    title: "string",
    slug: "string",
    description: "string",
    difficulty: "'easy' | 'medium' | 'hard'",
    testCases: "ObjectId[]",
    constraints: "string",
    subject: "string",
    starterCode: "{ [language: string]: string }",
    videoSolutions: `{
  title: string;
  url: string;
  duration?: string;
  language?: string;
  codeLanguage?: 'C++' | 'JavaScript' | 'Python' | 'Java';
  isPremium?: boolean;
  thumbnail?: string;
  description?: string;
  uploadedBy?: string;
  createdAt?: Date;
}[]`,
    createdAt: "Date"
  }
},
{
  title: "🌐 communityStats",
  fields: {
    user: "ObjectId",
    views: "number",
    solutions: "number",
    discussions: "number",
    rank: "number",
    createdAt: "Date",
    updatedAt: "Date"
  }
},
{
  title: "📤 submission",
  fields: {
    user: "ObjectId",
    problem: "ObjectId",
    code: "string",
    language: "string",
    status: "'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Pending'",
    output: "string?",
    error: "string?",
    createdAt: "Date",
    executionTime: "number?",  
    memory: "number?"          
  }
},
{
  title: "🧪 testCase",
  fields: {
    input: "string",
    expectedOutput: "string",
    isPublic: "boolean",
    problem: "ObjectId",
    createdBy: "ObjectId"
  }
},
{
  title: "📂 category",
  fields: {
    name: "string",
    slug: "string"
  }
},
{
  title: "📜 certificate",
  fields: {
    user: "ObjectId",
    course: "ObjectId",
    issuedAt: "Date",
    certificateUrl: "string"
  }
},
{
  title: "🎓 course",
  fields: {
    title: "string",
    description: "string",
    category: "ObjectId",
    lessons: "ObjectId[]",
    instructor: "ObjectId",
    price: "number",
    isPublished: "boolean",
    rating: "number",
    videoUrl: "string",
    thumbnailUrl: "string",
    createdAt: "Date"
  }
},
{
  title: "👨‍🏫 instructor",
  fields: {
    user: "ObjectId",
    bio: "string",
    expertise: "string[]",
    courses: "ObjectId[]"
  }
},
{
  title: "🎬 lesson",
  fields: {
    title: "string",
    content: "string",
    videoUrl: "string",
    videoDescription: "string",
    videoDuration: "number", // in seconds
    videoType: "'mp4' | 'youtube' | 'vimeo'",
    transcript: "string",
    resources: "string[]",
    isFreePreview: "boolean",
    course: "ObjectId",
    order: "number"
  }
},
{
  title: "📈 progress",
  fields: {
    user: "ObjectId",
    course: "ObjectId",
    completedLessons: "ObjectId[]"
  }
},
{
  title: "❓ quiz",
  fields: {
    course: "ObjectId",
    question: "string",
    options: "string[]",
    correctAnswer: "string"
  }
},
{
  title: "⭐ review",
  fields: {
    user: "ObjectId",
    course: "ObjectId",
    rating: "number",
    comment: "string"
  }
},
{
  title: "💳 subscriptionPlan",
  fields: {
    name: "string", // e.g., "Monthly", "Yearly"
    price: "number", // in INR paise (e.g., 3500 = ₹35)
    interval: "'month' | 'year'",
    description: "string",
    razorpayPlanId: "string",
    isActive: "boolean",
    createdAt: "Date"
  }
},
{
  title: "📦 userSubscription",
  fields: {
    userId: "ObjectId",
    planId: "ObjectId",
    razorpaySubscriptionId: "string",
    amount: "number",
    startDate: "Date",
    endDate: "Date",
    status: "'pending' | 'active' | 'expired' | 'cancelled'"
  }
}











 







];

const DatabaseDesignSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <AnimatedSection delay={0.3}>

    <section className="bg-white dark:bg-primary text-gray-800 dark:text-light py-10 px-6 rounded-lg shadow-md mt-4">
      <h2 className="text-3xl font-bold text-secondary dark:text-light mb-6 text-center">
        🗄️ Database Design
      </h2>

      <ul className="space-y-4">
        {dbSchema.map((table, index) => (
          <li
            key={table.title}
            className="rounded-lg border border-transparent dark:border-gray-700 hover:border-indigo-400 hover:scale-[1.01] transition-all duration-300 shadow-sm dark:shadow-md"
          >
            <button
              onClick={() => toggleDropdown(index)}
              className="w-full flex items-center justify-between px-4 py-3 bg-dime dark:bg-dark text-left rounded-t-lg"
            >
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {table.title}
              </span>
              {openIndex === index ? (
                <FaChevronDown className="text-indigo-400" />
              ) : (
                <FaChevronRight className="text-gray-500" />
              )}
            </button>

            {openIndex === index && (
              <pre className="bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 p-4 rounded-b-md font-mono whitespace-pre-wrap overflow-x-auto">
{`{
${Object.entries(table.fields)
  .map(([key, type]) => `  ${key}: ${type},`)
  .join("\n")}
}`}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </section>
    </AnimatedSection>
  );
};

export default DatabaseDesignSection;
