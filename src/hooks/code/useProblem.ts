import { useContext } from "react";
import ProblemContext from "../../context/code/problem/ProblemContext";

export const useProblem = () => {
  const context = useContext(ProblemContext);
  if (!context) throw new Error("useProblem must be used within a ProblemProvider");
  return context;
};
