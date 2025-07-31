import { useContext } from "react";
import { TestCaseContext } from "../../context/code/testcase/TestCaseContext";

export const useTestCase = () => {
  const context = useContext(TestCaseContext);
  if (!context) {
    throw new Error("useTestCase must be used within a TestCaseProvider");
  }
  return context;
};
