import { MdDashboard, MdLibraryBooks, MdRateReview, MdAssessment, MdCategory, MdCode, MdOutlinePeople } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaFileInvoiceDollar, FaCertificate, FaChalkboardTeacher } from "react-icons/fa";

export const links = [
  { name: "Dashboard", to: "/admin/dashboard", icon: <MdDashboard size={20} /> },
  { name: "Courses", to: "/admin/courses", icon: <RiBook2Fill size={20} /> },
  { name: "Lessons", to: "/admin/lessons", icon: <MdLibraryBooks size={20} /> },
  { name: "Enrollments", to: "/admin/enrollments", icon: <AiOutlineFileSearch size={20} /> },
  { name: "Reviews", to: "/admin/reviews", icon: <MdRateReview size={20} /> },
  { name: "Progress", to: "/admin/progress", icon: <MdAssessment size={20} /> },
  { name: "Categories", to: "/admin/categories", icon: <MdCategory size={20} /> },
  { name: "Transactions", to: "/admin/transactions", icon: <FaFileInvoiceDollar size={20} /> },
  { name: "Quizzes", to: "/admin/quizzes", icon: <AiOutlineFileSearch size={20} /> },
  { name: "Certificates", to: "/admin/certificates", icon: <FaCertificate size={20} /> },
  { name: "Instructors", to: "/admin/instructors", icon: <FaChalkboardTeacher size={20} /> },
  { name: "Code Management", to: "/admin/code", icon: <MdCode size={20} /> },
  { name: "Users", to: "/admin/users", icon: <MdOutlinePeople size={20} /> },
];
