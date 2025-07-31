import { type ReactNode } from "react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode; // React Icon
  gradient?: string; // Gradient using your theme colors
  textColor?: string; // Optional text color (default: white)
}

const AdminStatCard = ({
  title,
  value,
  icon,
  gradient = "from-primary to-secondary",
  textColor = "text-white",
}: AdminStatCardProps) => {
  return (
    <div
      className={`relative p-6 rounded-xl shadow-lg bg-gradient-to-r ${gradient} transform hover:scale-105 transition-all duration-300`}
    >
      {/* Icon (faded background) */}
      <div className="absolute top-4 right-4 text-5xl opacity-20">
        {icon}
      </div>

      {/* Title */}
      <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>

      {/* Value */}
      <p className={`text-4xl font-bold mt-3 ${textColor}`}>{value}</p>
    </div>
  );
};

export default AdminStatCard;
