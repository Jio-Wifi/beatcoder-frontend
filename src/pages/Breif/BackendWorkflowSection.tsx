import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AnimatedSection from "../../components/Common/AnimatedSection";

const apiEndpoints = [
   {
    title: "🔐 Authentication",
    routes: [
      "POST /auth/register",
      "POST /auth/refresh",
      "POST /auth/login",
      "POST /auth/logout",
      "POST /auth/forgot-password",
      "POST /auth/change-password",
    ],
  },
  {
    title: "👤 User & Admin",
    routes: [
      "GET /user/profile",
      "PATCH /user/profile",
      "DELETE /user/profile",
      "GET /user/",
      "GET /user/:id",
      "PUT /user/:id",
      "DELETE /user/:id",
      "GET /user/:userId/name",
    ],
  },
  {
    title: "📈 User Stats & Activity",
    routes: [
      "GET /user/stats/me",
      "GET /user/activity",
      "PUT /user/activity",
    ],
  },
  {
    title: "📌 Problems",
    routes: [
      "GET /problems/",
      "GET /problems/:slug",
      "POST /problems/",
      "PUT /problems/:slug",
      "DELETE /problems/:slug",
    ],
  },
  {
    title: "🧪 Test Cases",
    routes: [
      "POST /testcase/",
      "GET /testcase/problem/:problemId",
      "GET /testcase/:id",
      "PUT /testcase/:id",
      "DELETE /testcase/:id",
    ],
  },
  {
    title: "📝 Submissions",
    routes: [
      "POST /submission/submit",
      "POST /submission/run",
      "GET /submission/me",
      "GET /submission/:id",
      "GET /submission/my/problem/:slug",
      "GET /submission/problem/:slug",
      "GET /submission/me/languages",
      "GET /submission/accept/me",
      "GET /submission/me/activity",
    ],
  },
  {
    title: "🌍 Community Stats",
    routes: [
      "POST /community/stats",
      "GET /community/stats/me",
      "PUT /community/stats",
      "PATCH /community/stats",
      "DELETE /community/stats",
    ],
  },
  {
    title: "🧠 Skill Stats",
    routes: ["GET /skill/me"],
  },
  {
    title: "💻 Code Execution",
    routes: ["POST /compiler/execute"],
  },
  {
    title: "📚 Courses",
    routes: [
      "GET /course/",
      "GET /course/:id",
      "POST /course/",
      "PUT /course/:id",
      "DELETE /course/:id",
    ],
  },
  {
    title: "🎬 Lessons",
    routes: [
      "GET /lesson/",
      "GET /lesson/course/:courseId",
      "GET /lesson/:id",
      "POST /lesson/",
      "PUT /lesson/:id",
      "DELETE /lesson/:id",
    ],
  },
  {
    title: "🗂️ Categories",
    routes: [
      "GET /category/",
      "GET /category/:id",
      "POST /category/",
      "PUT /category/:id",
      "DELETE /category/:id",
    ],
  },
  {
    title: "📝 Quizzes",
    routes: [
      "GET /quiz/",
      "GET /quiz/:id",
      "POST /quiz/",
      "PUT /quiz/:id",
      "DELETE /quiz/:id",
    ],
  },
  {
    title: "🏆 Certificates",
    routes: [
      "GET /certificate/",
      "GET /certificate/:id",
      "GET /certificate/user/:userId",
      "POST /certificate/",
      "DELETE /certificate/:id",
    ],
  },
  {
    title: "🧑‍🏫 Instructors",
    routes: [
      "GET /instructor/",
      "GET /instructor/:id",
      "POST /instructor/",
      "PUT /instructor/:id",
      "DELETE /instructor/:id",
    ],
  },
  {
    title: "📈 Progress",
    routes: [
      "GET /progress/",
      "GET /progress/:id",
      "POST /progress/",
      "PUT /progress/:id",
      "DELETE /progress/:id",
    ],
  },
  {
    title: "⭐ Reviews",
    routes: [
      "GET /review/",
      "GET /review/:id",
      "POST /review/",
      "DELETE /review/:id",
    ],
  },
  {
    title: "📦 Subscription",
    routes: [
      // Admin only
      "/subscription/plans [POST] - Create new plan (Admin only)",
      "/subscription/revenue [GET] - Total revenue (Admin only)",
      "/subscription/settlements [GET] - Razorpay settlements (Admin only)",

      // Authenticated user
      "/subscription/start [POST] - Start subscription",
      "/subscription/cancel [POST] - Cancel subscription",
      "/subscription/check/:userId [GET] - Check user's subscription status",
      "/subscription/user/details [GET] - Get user's subscription details",

      // Public
      "/subscription/plans [GET] - Fetch all plans",
      "/subscription/webhook [POST] - Razorpay webhook",
    ],
  },
  {
  title: "📊 Analytics",
  routes: [
    "GET /analytics/        → Dashboard overview (admin only)",
    "GET /analytics/revenue → Simulated revenue analytics (admin only)",
    "GET /analytics/subscriptions → Monthly subscriptions analytics (admin only)",
  ],
}

];

const BackendWorkflowSection = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <AnimatedSection delay={0.3}>
    <section className="py-12 px-6 mt-4 bg-white dark:bg-primary">
      <h2 className="text-3xl font-bold text-primary dark:text-light mb-6 text-center">
        ⚙️ Backend Workflow
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto">
        {apiEndpoints.map(({ title, routes }) => {
          const isOpen = openSections.includes(title);

          return (
            <div key={title} className="bg-white dark:bg-dark rounded-lg shadow">
              <button
                onClick={() => toggleSection(title)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-xl font-semibold text-secondary hover:bg-dime dark:hover:bg-gray-800 transition"
              >
                {title}
                {isOpen ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>

             {isOpen && (
  <pre className="bg-dime dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 p-4 rounded-b-md overflow-x-auto whitespace-pre-wrap transition-all duration-300 border-l-4 border-secondary hover:border-primary hover:scale-[1.02] hover:shadow-md">
    {routes.join("\n")}
  </pre>
)}
            </div>
          );
        })}
      </div>
    </section>
    </AnimatedSection>
  );
};

export default BackendWorkflowSection;
