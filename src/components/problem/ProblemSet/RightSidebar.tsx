import CalendarCard from "./CalendarCard";
import TrendingCompanies from "./TrendingCompanies";


interface RightSidebarProps {
  date: Date;
  setDate: (date: Date) => void;
}

const RightSidebar = ({ date, setDate }: RightSidebarProps) => {
  return (
    <aside className="md:col-span-1 space-y-4 hidden md:block">
      <CalendarCard date={date} onChange={setDate} />
      <TrendingCompanies />
    </aside>
  );
};

export default RightSidebar;
