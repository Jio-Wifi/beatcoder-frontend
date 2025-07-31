// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { FaBook, FaUsers, FaRupeeSign } from "react-icons/fa";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import AdminAnalytics from "./Analytics/AdminAnalytics";
import { useSubscription } from "../../hooks/course/useSubscription";
import { useCourse } from "../../hooks/course/userCourse";

const AdminDashboard = () => {
  const { courses, fetchCourses } = useCourse();
  const { plans, fetchPlans } = useSubscription();

  const [subscriptionCount, setSubscriptionCount] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);

  useEffect(() => {
    fetchCourses();
    fetchPlans();

    // Count active subscriptions (or all plans)
    const activeSubs = plans.filter((p) => p.isActive).length;
    setSubscriptionCount(activeSubs);

    // Example: Calculate total revenue from active plans (price in paise → convert to INR)
    const totalRevenue = plans.reduce((acc, p) => acc + (p.isActive ? p.price : 0), 0) / 100;
    setRevenue(totalRevenue);
  }, [fetchCourses, fetchPlans, plans]);

  return (
    <>
      <h2 className="text-2xl font-bold text-primary dark:text-accent mb-6">
        Welcome, Admin!
      </h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminStatCard
          title="Total Courses"
          value={courses.length}
          icon={<FaBook />}
          gradient="from-primary to-secondary"
        />
        <AdminStatCard
          title="Active Subscriptions"
          value={subscriptionCount.toLocaleString()}
          icon={<FaUsers />}
          gradient="from-success to-accent"
        />
        <AdminStatCard
          title="Revenue"
          value={`₹${revenue.toLocaleString()}`}
          icon={<FaRupeeSign />}
          gradient="from-danger to-light"
          textColor="text-dark"
        />
      </div>

      {/* Analytics Section */}
      <AdminAnalytics />
    </>
  );
};

export default AdminDashboard;
