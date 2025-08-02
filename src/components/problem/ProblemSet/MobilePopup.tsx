import { IoClose } from "react-icons/io5";
import TrendingCompanies from "./TrendingCompanies";
import CalendarCard from "./CalendarCard";

interface MobilePopupProps {
  popup: "calendar" | "trending" | null;
  setPopup: (popup: null) => void;
  date: Date;
  setDate: (date: Date) => void;
}

const MobilePopup = ({ popup, setPopup, date, setDate }: MobilePopupProps) => {
  if (!popup) return null;

  return (
    <div className="fixed top-1/2 md:hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-80 z-[100] bg-white dark:bg-primary rounded-xl shadow-lg p-4 border border-gray-200 dark:border-dark animate-slide-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-primary dark:text-white">
          {popup === "calendar" ? "Calendar" : "Trending Companies"}
        </h2>
        <button aria-label="close" onClick={() => setPopup(null)} className="text-danger">
          <IoClose size={22} />
        </button>
      </div>
      {popup === "calendar" ? (
        <CalendarCard date={date} onChange={setDate} />
      ) : (
        <TrendingCompanies />
      )}
    </div>
  );
};

export default MobilePopup;
