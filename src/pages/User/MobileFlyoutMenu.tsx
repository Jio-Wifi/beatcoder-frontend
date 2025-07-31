import { useState } from "react";
import {
  FaUser,
  FaMoneyCheckAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoMdNotifications, IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import CustomLink from "../../components/Custom/CustomLink";
import CustomSidebar from "../../components/Custom/CustomSidebar";
import CustomButton from "../../components/Custom/CustomButton"; // ✅ Import CustomButton

type FlyoutMenuProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const MobileFlyoutMenu = ({ activeTab, onTabChange }: FlyoutMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { label: "Basic Info", icon: <FaUser size={18} /> },
    { label: "Account", icon: <MdAccountCircle size={20} /> },
    { label: "Notifications", icon: <IoMdNotifications size={20} /> },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <CustomButton
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-10 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center shadow-md md:hidden"
      >
        {isOpen ? <IoMdClose size={26} /> : <IoSettingsOutline size={26} />}
      </CustomButton>

      {/* Sidebar from Bottom */}
      <CustomSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        
        bottomToTop
        className="p-4"
      >
        <div className="flex flex-col gap-3">
          {tabs.map((tab) => (
            <CustomButton
              key={tab.label}
              onClick={() => {
                onTabChange(tab.label);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium w-full text-left ${
                activeTab === tab.label
                  ? "bg-secondary text-white"
                  : "hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-dark"
              }`}
            >
              {tab.icon}
              {tab.label}
            </CustomButton>
          ))}

          <CustomLink
            to="/subscribe"
            className="flex items-center text-base text-primary dark:text-white gap-3 px-4 py-2 rounded-md font-medium hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-dark"
          >
            <FaMoneyCheckAlt size={18} />
            Billing
          </CustomLink>

          <CustomLink
            to="/order"
            className="flex items-center text-base text-primary dark:text-white gap-3 px-4 py-2 rounded-md font-medium hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-dark"
          >
            <FaBoxOpen size={18} />
            Orders
          </CustomLink>
        </div>
      </CustomSidebar>
    </>
  );
};

export default MobileFlyoutMenu;
