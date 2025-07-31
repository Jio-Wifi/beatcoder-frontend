import {
  FaMousePointer,
  FaPen,
  FaCircle,
  FaSquare,
  FaPalette,
  FaFont,
  FaHandPaper,
} from "react-icons/fa";
import { useSketch } from "../../../hooks/Lab/useSketch";

const SketchToolbar = () => {
  const { state, dispatch } = useSketch();

  const setTool = (tool: typeof state.tool) =>
    dispatch({ type: "SET_TOOL", payload: tool });

  const setColor = (color: string) =>
    dispatch({ type: "SET_COLOR", payload: color });

  return (
    <div className="absolute top-4 left-4 z-20 flex gap-2 bg-white dark:bg-primary p-2 rounded shadow items-center dark:text-accent">
      {/* Select Tool */}
      <button
        aria-label="select"
        onClick={() => setTool("select")}
        className={`p-2 rounded ${state.tool === "select" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}
      >
        <FaMousePointer />
      </button>

      {/* Hand (Pan/Move) Tool */}
      <button
        aria-label="hand"
        onClick={() => setTool("hand")}
        className={`p-2 rounded ${state.tool === "hand" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}
      >
        <FaHandPaper />
      </button>

      {/* Draw Tool */}
      <button
        aria-label="draw"
        onClick={() => setTool("draw")}
        className={`p-2 rounded ${state.tool === "draw" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}
      >
        <FaPen />
      </button>

      {/* Circle Tool */}
      <button
        aria-label="circle"
        onClick={() => setTool("circle")}
        className={`p-2 rounded ${state.tool === "circle" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}
      >
        <FaCircle />
      </button>

      {/* Rectangle Tool */}
      <button
        aria-label="rectangle"
        onClick={() => setTool("rectangle")}
        className={`p-2 rounded ${state.tool === "rectangle" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}
      >
        <FaSquare />
      </button>

      {/* Text Tool */}
      <button
        aria-label="text"
        onClick={() => setTool("text")}
        className={`p-2 rounded ${state.tool === "text" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}
      >
        <FaFont />
      </button>

      {/* Color Picker */}
      <div className="flex items-center gap-4 ml-2">
        <FaPalette className="text-xl" />
        <input
          aria-label="color"
          type="color"
          value={state.color}
          onChange={(e) => setColor(e.target.value)}
          className="w-6 h-6 border-0"
        />
      </div>
    </div>
  );
};

export default SketchToolbar;
