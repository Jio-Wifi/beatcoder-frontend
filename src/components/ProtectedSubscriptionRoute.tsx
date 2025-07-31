import React, { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSubscription } from "../hooks/course/useSubscription";
import useAuth from "../hooks/auth/useAuth";
import CustomLoading from "./Common/CustomLoading";

interface ProtectedSubscriptionRouteProps {
  children: JSX.Element;
}

const ProtectedSubscriptionRoute: React.FC<ProtectedSubscriptionRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const { isSubscribed, checkSubscription, loading } = useSubscription();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (user?._id) {
        await checkSubscription(user._id);
      }
      setChecked(true);
    };
    verify();
  }, [user?._id, checkSubscription]);

  if (loading || !checked) return <CustomLoading />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isSubscribed) {
    return <Navigate to="/subscribe" replace />;
  }

  return children;
};

export default ProtectedSubscriptionRoute;
