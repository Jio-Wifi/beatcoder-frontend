import React, { useState, useCallback } from "react";
import { CompilerContext } from "./CompilerContext";
import { executeCode } from "../../services/compiler/compiler.service";
import type { CompilerPayload, CompilerResponse } from "../../types/compiler/compiler.types";

interface Props {
  children: React.ReactNode;
}

export const CompilerProvider: React.FC<Props> = ({ children }) => {
  const [result, setResult] = useState<CompilerResponse | null>(null);
  const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
  //  console.log(result)
 

  const execute = useCallback(
    async (payload: CompilerPayload): Promise<CompilerResponse | null> => {
      console.log(payload)
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const response = await executeCode(payload);
        setResult(response);
        return response;
      } catch (err) {
        const message = (err as Error).message ?? "Execution failed";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <CompilerContext.Provider value={{ result, loading, error, execute }}>
      {children}
    </CompilerContext.Provider>
  );
};
