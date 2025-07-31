import { useContext } from "react";
import { AnalyticsContext } from "../../context/course/analyatic/AnalyaticContext";

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};
