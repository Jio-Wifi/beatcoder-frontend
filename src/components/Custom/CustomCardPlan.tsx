import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface Plan {
  id: number;
  title: string;
  slug: string;
  description: string;
  progress: number;
  total: number;
  difficulty: "Easy" | "Medium" | "Hard";
  gradient: string;
}

interface Props {
  plan: Plan;
}

const CustomCardPlan: React.FC<Props> = ({ plan }) => {
  const percent = Math.min(100, Math.round((plan.progress / plan.total) * 100));
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate and send difficulty in state
    navigate(`/study-plan/${plan.slug}`, {
      state: { difficulty: plan.difficulty.toLowerCase() }, // pass to details page
    });
  };

  return (
    <div
      className={`bg-gradient-to-br ${plan.gradient} bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transform hover:scale-[1.02] transition`}
    >
      {/* Title & Description */}
      <div>
        <h2 className="text-xl font-bold text-primary dark:text-light">{plan.title}</h2>
        <p className="text-secondary dark:text-light/90 mt-2">{plan.description}</p>
        <div className="mt-3 text-sm">
          <span
            className={`px-3 py-1 rounded-full ${
              plan.difficulty === "Easy"
                ? "bg-success text-white"
                : plan.difficulty === "Medium"
                ? "bg-accent text-dark"
                : "bg-danger text-white"
            }`}
          >
            {plan.difficulty}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-dark dark:text-light">
          <span>
            {plan.progress}/{plan.total} Completed
          </span>
          <span>{percent}%</span>
        </div>
        <div className="progress-container mt-2">
          <div className="progress-bar" data-progress={percent}></div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleContinue}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r bg-secondary dark:from-primary dark:to-secondary text-light py-2 rounded-xl hover:opacity-90 transition"
      >
        <FaBookOpen /> Continue Plan
      </button>
    </div>
  );
};

export default CustomCardPlan;
