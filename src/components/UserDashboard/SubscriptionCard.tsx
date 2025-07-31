import React, { useContext, useMemo } from "react";
import { FiClock, FiTrendingUp, FiCreditCard } from "react-icons/fi";
import TiltTorchCard from "../Common/TiltTorchCard";
import SubscriptionContext from "../../context/course/subscription/SubscriptionContext";
import AnimatedCard from "../Common/AnimatedCard";

const SubscriptionCard: React.FC = () => {
  const { activePlan, subscriptionStatus, loading, error } =
    useContext(SubscriptionContext);

  // Format plan info or fallback defaults
  const plan = useMemo(() => {
    if (!activePlan) {
      return {
        name: "Free Plan",
        price: "₹0",
        expiresOn: "Unlimited",
        status: "Inactive",
      };
    }

    const priceInRupees = `₹${(activePlan.price / 100).toFixed(0)}`;
    const expiresOn = activePlan?.endDate
      ? new Date(activePlan.endDate).toLocaleDateString()
      : "N/A";

    return {
      name: activePlan.name,
      price: priceInRupees,
      expiresOn,
      status: subscriptionStatus === "active" ? "Active" : "Inactive",
    };
  }, [activePlan, subscriptionStatus]);

  if (loading) {
    return (
      <TiltTorchCard className="w-fit max-w-md !shadow-none">
        <div className="p-6 text-center text-gray-500 dark:text-gray-300">
          Loading subscription details...
        </div>
      </TiltTorchCard>
    );
  }

  if (error) {
    return (
      <TiltTorchCard className="w-fit max-w-md !shadow-none">
        <div className="p-6 text-center text-red-500">
          Failed to load subscription.
        </div>
      </TiltTorchCard>
    );
  }

  return (
    <AnimatedCard className="!bg-white dark:!bg-primary">
      <div className="p-6 min-w-80 flex flex-col space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide flex items-center gap-2">
          <FiCreditCard className="text-indigo-500" size={22} />
          Subscription Status
        </h2>

        {/* Plan Details */}
        <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <p className="flex items-center gap-2">
            <FiTrendingUp className="text-purple-500" size={16} />
            <span className="font-medium text-gray-800 dark:text-gray-100">
              Plan:
            </span>{" "}
            {plan.name}
          </p>
          <p className="flex items-center gap-2">
            <FiCreditCard className="text-green-500" size={16} />
            <span className="font-medium text-gray-800 dark:text-gray-100">
              Price:
            </span>{" "}
            {plan.price} / {activePlan?.interval ?? "month"}
          </p>
          <p className="flex items-center gap-2">
            <FiClock className="text-yellow-500" size={16} />
            <span className="font-medium text-gray-800 dark:text-gray-100">
              Expires On:
            </span>{" "}
            {plan.expiresOn}
          </p>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
              plan.status === "Active"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {plan.status}
          </span>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default SubscriptionCard;
