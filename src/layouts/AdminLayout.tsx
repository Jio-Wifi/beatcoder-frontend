import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:grid md:grid-cols-[250px_1fr] bg-dime dark:bg-primary">
      {/* Sidebar - hidden on small screens unless toggled */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden
          ${sidebarOpen ? "block" : "hidden"}
        `}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-white dark:bg-dark shadow-md transform transition-transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0 md:block
        `}
      >
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Header + Page Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
