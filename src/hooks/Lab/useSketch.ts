import { useContext } from "react";
import { SketchContext } from "../../context/Lab/SketchContext";

export const useSketch = () => useContext(SketchContext);
