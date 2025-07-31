import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotPageFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 px-6">
      {/* Icon */}
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />

      {/* Message */}
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-lg text-white font-medium shadow-lg transition 
          bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotPageFound;
