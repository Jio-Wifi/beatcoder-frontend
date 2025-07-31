import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSubscription } from "../../../hooks/course/useSubscription";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import { AiOutlinePlus } from "react-icons/ai";
import AnimatedSection from "../../../components/Common/AnimatedSection";

const ITEMS_PER_PAGE = 5;

const AllSubscriptionPlan: React.FC = () => {
  const { plans = [], loading, error } = useSubscription();
  console.log("hello")

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Filter subscription plans by name
  const filteredPlans = useMemo(() => {
    return plans.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [plans, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);
  const paginatedPlans = filteredPlans.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Subscription Plans</h2>
          <Link
            to="/admin/subscriptions/create"
            className="flex items-center gap-2 bg-gradient-to-r from-accent to-secondary text-white px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            <AiOutlinePlus size={18} /> Create Plan
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by plan name..."
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        {loading && <CustomLoading message="Loading subscription plans..." />}
        {error && <CustomError message={error} />}

        {!loading && paginatedPlans.length === 0 && (
          <p className="text-center text-gray-500">No subscription plans found.</p>
        )}

        {!loading && paginatedPlans.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark">
                  <th className="p-3 border-b">Plan Name</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Active</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlans.map((plan) => (
                  <tr
                    key={plan._id}
                    className="hover:bg-gray-50 dark:hover:bg-dark/30"
                  >
                    <td className="p-3 border-b">{plan.name}</td>
                    <td className="p-3 border-b">₹{plan.price / 100}</td>
                    <td className="p-3 border-b">
                      {plan.isActive ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-red-600">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default AllSubscriptionPlan;
