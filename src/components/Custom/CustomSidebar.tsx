import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

export type SidebarItem = {
  to: string;
  label: string;
  icon: ReactNode;
  className?: string;
};

type CustomSidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  items?: SidebarItem[];
  className?: string;
  children?: ReactNode;
  bottomToTop?: boolean;
};

const CustomSidebar = ({
  isOpen,
  setIsOpen,
  items,
  className = "",
  children,
  bottomToTop = false,
}: CustomSidebarProps) => {
  const baseClasses = bottomToTop
    ? `fixed right-6 bottom-28 w-64 top-auto z-40 bg-white dark:bg-primary rounded-t-xl shadow-xl transition-transform duration-300 ease-in-out md:hidden`
    : `fixed top-28 left-0 h-fit w-fit lg:w-64 bg-white dark:bg-primary z-40 shadow-md transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`;

  // ✅ Fix: Apply translate-y-full when closed
  const animationClass = bottomToTop
    ? isOpen
      ? "translate-y-0"
      : "translate-y-[200%]" // 👈 ensures it's fully hidden upward
    : isOpen
    ? "translate-x-0"
    : "-translate-x-full";

  return (
    <div className={clsx(baseClasses, animationClass, className)}>
      <nav className="flex flex-col gap-4 p-6 pt-4 text-primary dark:text-dime">
        {children
          ? children
          : items?.map(({ to, icon, label, className }, index) => (
              <Link
                key={index}
                to={to}
                className={clsx(
                  "flex items-center gap-2 p-2 hover:text-secondary dark:hover:text-accent",
                  className
                )}
                onClick={() => setIsOpen(false)}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
      </nav>
    </div>
  );
};

export default CustomSidebar;