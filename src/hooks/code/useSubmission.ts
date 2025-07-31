import { useContext } from "react";
import { SubmissionContext } from "../../context/code/submission/SubmissionContext";

export const useSubmission = () => {
  const context = useContext(SubmissionContext);
  if (!context) throw new Error("useSubmission must be used within a SubmissionProvider");
  return context;
};