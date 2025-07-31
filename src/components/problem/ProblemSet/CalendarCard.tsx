import { format } from "date-fns";
import Calendar from "../../ui/Calendar";

interface CalendarCardProps {
  date: Date;
  onChange: (date: Date) => void;
}

const CalendarCard = ({ date, onChange }: CalendarCardProps) => (
  <div className="bg-white dark:bg-primary p-4 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold mb-2">📅 Calendar</h3>
    <Calendar selected={date} onSelect={onChange} className="rounded-md " />
    <p className="mt-2 text-sm text-primary dark:text-dime">Today: {format(date, "PPP")}</p>
  </div>
);

export default CalendarCard;
