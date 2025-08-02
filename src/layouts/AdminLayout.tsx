import { useState } from "react";
import { Outlet } from "react-router-dom";  
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dime dark:bg-primary">
      {/* Sidebar  */}
   <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> 

      {/* Header + Page Content */}
      <div className="flex flex-col flex-1">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* Active page content will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
