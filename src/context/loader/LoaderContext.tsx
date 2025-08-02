import { createContext } from "react";
import type { LoaderContextProps } from "../../types/loader.types";

const LoaderContext = createContext<LoaderContextProps>({
  showLoader: () => {},
  hideLoader: () => {},
});

export default LoaderContext;
