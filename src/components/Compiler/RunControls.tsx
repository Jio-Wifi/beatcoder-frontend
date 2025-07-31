import React from "react";

interface RunControlsProps {
  input: string;
  setInput: (val: string) => void;
  loading?: boolean;
}

const RunControls: React.FC<RunControlsProps> = ({ input, setInput }) => {
  return (
    <div className="space-y-2">
     <textarea
  className="w-full h-60 resize-none rounded-lg p-3 text-primary dark:text-dime border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-auto"
  placeholder="Enter input here..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>
      
    </div>
  );
};

export default RunControls;
