import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdCategory,
  MdLibraryBooks,
  MdOutlinePeople,
  MdCode,
  MdRateReview,
  MdAssessment,
} from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { FaChalkboardTeacher, FaFileInvoiceDollar, FaCertificate } from "react-icons/fa";
import { AiOutlineFileSearch, AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import DropdownMenu from "../Common/DropDownMenu";
// import { BiTestTube } from "react-icons/bi";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Full admin navigation links
const links = [
  { name: "Dashboard", to: "/admin/dashboard", icon: <MdDashboard size={20} /> },

  {
    name: "Courses",
    icon: <RiBook2Fill size={20} />,
    subLinks: [
      {
        name: "All Courses",
        to: "/admin/courses",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Course",
        to: "/admin/courses/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },

  {
    name: "Lessons",
    icon: <MdLibraryBooks size={20} />,
    subLinks: [
      {
        name: "All Lessons",
        to: "/admin/lessons",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Lesson",
        to: "/admin/lessons/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },

  {
    name: "Categories",
    icon: <MdCategory size={20} />,
    subLinks: [
      {
        name: "All Categories",
        to: "/admin/categories",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Category",
        to: "/admin/category/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },

  {
    name: "Subscriptions",
    icon: <FaFileInvoiceDollar size={20} />,
    subLinks: [
      {
        name: "All Plans",
        to: "/admin/subscriptions",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Plan",
        to: "/admin/subscriptions/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },

  {
    name: "Quizzes",
    icon: <AiOutlineFileSearch size={20} />,
    subLinks: [
      {
        name: "All Quizzes",
        to: "/admin/quizzes",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Quiz",
        to: "/admin/quizzes/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },

  {
    name: "Code Management",
    icon: <MdCode size={20} />,
    subLinks: [
      {
        name: "All Problems",
        to: "/admin/problems",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Problem",
        to: "/admin/problems/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },
  {
  name: "Certificates",
  icon: <FaCertificate size={20} />,
  subLinks: [
    {
      name: "All Certificates",
      to: "/admin/certificates",
      icon: <AiOutlineUnorderedList size={16} />,
    },
    {
      name: "Issue Certificate",
      to: "/admin/certificates/issue",
      icon: <AiOutlinePlusCircle size={16} />,
    },
  ],
},
  {
    name: "Instructors",
    icon: <FaChalkboardTeacher size={20} />,
    subLinks: [
      {
        name: "All Instructors",
        to: "/admin/instructors",
        icon: <AiOutlineUnorderedList size={16} />,
      },
      {
        name: "Create Instructor",
        to: "/admin/instructors/create",
        icon: <AiOutlinePlusCircle size={16} />,
      },
    ],
  },

  { name: "Reviews", to: "/admin/reviews", icon: <MdRateReview size={20} /> },
  { name: "Progress", to: "/admin/progress", icon: <MdAssessment size={20} /> },
  { name: "Users", to: "/admin/users", icon: <MdOutlinePeople size={20} /> },
];




const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed md:static top-0 custom-scroll left-0 h-full overflow-y-auto w-64 bg-white dark:bg-dark shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <nav className="flex flex-col p-4 mt-14 space-y-4">
{links.map(({ name, to, icon, subLinks }) =>
  subLinks ? (
    <DropdownMenu
      key={name}
      name={name}
      icon={icon}
      links={subLinks}  // Pass subLinks with icons
      onClose={onClose}
    />
  ) : (
    <Link
      key={to}
      to={to}
      onClick={onClose}
      className={`flex items-center gap-3 p-2 rounded-md transition-all text-sm font-medium
        ${location.pathname === to ? "bg-accent text-primary" : "text-secondary dark:text-dime hover:bg-light dark:hover:text-primary"}`}
    >
      {icon}
      {name}
    </Link>
  )
)}

      </nav>
    </aside>
  );
};

export default AdminSidebar;
