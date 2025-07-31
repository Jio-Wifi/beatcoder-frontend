import { useContext } from "react";
import { CompilerContext } from "../../context/compiler/CompilerContext";

export const useCompiler = () => useContext(CompilerContext);
