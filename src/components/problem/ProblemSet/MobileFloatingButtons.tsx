import { IoCalendar, IoTrendingUp } from "react-icons/io5";

interface MobileFloatingButtonsProps {
  setPopup: (popup: "calendar" | "trending") => void;
}

const MobileFloatingButtons = ({ setPopup }: MobileFloatingButtonsProps) => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 md:hidden z-50">
      <button
        onClick={() => setPopup("calendar")}
        className="bg-accent text-white p-3 rounded-full shadow-md"
        title="Open Calendar"
      >
        <IoCalendar size={22} />
      </button>
      <button
        onClick={() => setPopup("trending")}
        className="bg-accent text-white p-3 rounded-full shadow-md"
        title="Trending Companies"
      >
        <IoTrendingUp size={22} />
      </button>
    </div>
  );
};

export default MobileFloatingButtons;
