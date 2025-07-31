import { useState } from "react";
import type { ReactNode } from "react";
import LoaderContext from "./LoaderContext";
import FullScreenLoader from "../../components/FullScreenLoader";

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && <FullScreenLoader />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
