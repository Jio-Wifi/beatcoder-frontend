import React from "react";
import { format } from "date-fns";

interface CustomCalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
  className?: string;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selected, onSelect, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-dark text-dark dark:text-white rounded-md border p-4 cursor-pointer text-center ${className}`}
      onClick={() => onSelect(new Date())}
    >
      <p className="text-sm">📅 Today is</p>
      <p className="text-lg font-semibold text-primary dark:text-dime">{format(selected, "PPP")}</p>
    </div>
  );
};

export default CustomCalendar;
