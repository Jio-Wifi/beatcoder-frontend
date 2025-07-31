import { useState } from "react";
import CustomLoading from "../../components/Common/CustomLoading";


import BasicInfo from "./BasicInfo";
import Account from "./Account";
import Notifications from "./Notifications";
import MobileFlyoutMenu from "./MobileFlyoutMenu";

import { FaUser, FaMoneyCheckAlt, FaBoxOpen } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import CustomLink from "../../components/Custom/CustomLink";
import { LuExternalLink } from "react-icons/lu";
import CustomError from "../../components/Common/CustomError";
import { useUser } from "../../hooks/user/userUser";

const tabs = [
  { label: "Basic Info", icon: <FaUser size={18} /> },
  { label: "Account", icon: <MdAccountCircle size={20} /> },
  { label: "Notifications", icon: <IoMdNotifications size={20} /> },
];

const Profile = () => {
  const { user, loading, error } = useUser();
  const [activeTab, setActiveTab] = useState("Basic Info");

  if (loading) return <CustomLoading message="Loading user info..." />;
  if (error) return <CustomError message={error} />;
  if (!user) return <CustomError message="User not found." />;

  return (
    <div className="flex mt-6 flex-col md:flex-row min-h-screen overflow-x-hidden bg-dime dark:bg-dark text-dark dark:text-white">
      {/* Sidebar (Desktop) */}
      <aside className="w-full hidden md:block max-h-max md:w-1/4 p-4 bg-white dark:bg-primary border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark">
        <h2 className="text-xl font-semibold mb-4 text-primary dark:text-light">Settings</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded font-medium ${
                activeTab === tab.label
                  ? "bg-secondary text-white"
                  : "hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-dark"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

      {/* Billing → /subscribe */}
<CustomLink
  to="/subscribe"
  className="w-full flex items-center justify-between px-4 py-2 rounded font-medium hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-dark"
>
  <div className="flex text-base text-primary dark:text-white items-center gap-3">
    <FaMoneyCheckAlt size={18} />
    Billing
  </div>
  <LuExternalLink className="text-danger" size={18} />
</CustomLink>

{/* Orders → /order */}
<CustomLink
  to="/order"
  className="w-full flex items-center justify-between px-4 py-2 rounded font-medium hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-dark"
>
  <div className="flex text-base text-primary dark:text-white items-center gap-3">
    <FaBoxOpen size={18} />
    Orders
  </div>
  <LuExternalLink className="text-danger" size={18} />
</CustomLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-container p-4 sm:p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-primary dark:text-light">{activeTab}</h1>
        <section className="bg-white dark:bg-primary p-6 rounded-lg shadow-md space-y-4">
          {activeTab === "Basic Info" && <BasicInfo user={user} />}
          {activeTab === "Account" && <Account user={user} />}
          {activeTab === "Notifications" && <Notifications />}
        </section>
      </main>

      {/* Flyout menu (Mobile) */}
      <MobileFlyoutMenu activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Profile;
