import { useContext } from "react";
import LoaderContext from "../context/loader/LoaderContext";

const useLoader = () => useContext(LoaderContext);

export default useLoader;
