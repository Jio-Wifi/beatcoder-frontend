import { format } from "date-fns";

export const formatTime = (date: string | Date) => {
  return format(new Date(date), "HH:mm"); // e.g., "14:35"
};
