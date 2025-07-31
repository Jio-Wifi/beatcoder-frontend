import { FaUndo } from "react-icons/fa";
import { useSketch } from "../../../hooks/Lab/useSketch";

const SketchSidebar = () => {
  const { dispatch } = useSketch();

  return (
    <div className="h-full w-16 bg-white dark:bg-primary border-r border-gray-200 dark:border-dime flex flex-col items-center pt-4 gap-4">
      <button aria-label="undo" onClick={() => dispatch({ type: "UNDO" })} className="text-xl text-primary dark:text-accent hover:text-accent">
        <FaUndo />
      </button>
    </div>
  );
};

export default SketchSidebar;
