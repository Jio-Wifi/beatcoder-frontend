import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import useAuth  from "../hooks/auth/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/account/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
