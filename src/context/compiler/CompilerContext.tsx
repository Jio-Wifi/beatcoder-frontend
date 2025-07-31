import { createContext } from "react";
import type { CompilerPayload, CompilerResponse } from "../../types/compiler/compiler.types";

interface CompilerContextType {
  result: CompilerResponse | null;
  loading: boolean;
  error: string | null;
  execute: (payload: CompilerPayload) => Promise<CompilerResponse | null>;
}

export const CompilerContext = createContext<CompilerContextType>({
  result: null,
  loading: false,
  error: null,
  execute: async () => null,
});
