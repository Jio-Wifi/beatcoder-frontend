import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import useAuth  from "../hooks/auth/useAuth";

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestOnlyRoute;
