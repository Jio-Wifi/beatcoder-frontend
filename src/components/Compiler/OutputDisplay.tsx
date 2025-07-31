import React from "react";
import type { CompilerResponse } from "../../types/compiler/compiler.types";

interface OutputProps {
  result: CompilerResponse | null;
  error: string | null;
  loading: boolean;
}

const OutputDisplay: React.FC<OutputProps> = ({ result, error, loading }) => {
  return (
    <div className="bg-white dark:bg-primary text-primary dark:text-dime p-4 rounded h-60 overflow-auto">
      <h2 className="font-semibold mb-2 ">Output:</h2>
      {loading && <p>Running...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {result?.stdout && <pre>{result.stdout}</pre>}
      {result?.stderr && <pre className="text-red-400">{result.stderr}</pre>}
      {result?.compile_output && (
        <pre className="text-yellow-300">{result.compile_output}</pre>
      )}
    </div>
  );
};

export default OutputDisplay;
