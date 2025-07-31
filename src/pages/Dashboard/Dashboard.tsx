import React from "react";
import UserSidebar from "./UserSidebar";
import DashboardContent from "./DashboardContent";

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:flex md:h-[calc(100vh-72px)]">
      {/* Left Sidebar */}
      <UserSidebar />

      {/* Main Section */}
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
