import React from "react";

interface CustomLoadingProps {
  message?: string;
}

const CustomLoading: React.FC<CustomLoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="flex items-center gap-3 text-gray-600 dark:text-white">
        <svg
          className="animate-spin h-6 w-6 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default CustomLoading;
