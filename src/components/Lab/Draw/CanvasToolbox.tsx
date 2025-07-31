import { FaMousePointer, FaPen, FaCircle, FaSquare, FaPalette } from "react-icons/fa";

const CanvasToolbox = ({ currentTool, setTool, setColor, color }: {
  currentTool: string;
  setTool: (tool: string) => void;
  setColor: (color: string) => void;
  color: string;
}) => {
  return (
    <div className="absolute top-4 left-4 z-50 flex gap-2 bg-white dark:bg-primary p-2 rounded shadow items-center dark:text-accent">
      <button aria-label="tool" onClick={() => setTool("select")} className={`p-2 rounded ${currentTool === "select" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}><FaMousePointer /></button>
      <button aria-label="draw" onClick={() => setTool("draw")} className={`p-2 rounded ${currentTool === "draw" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}><FaPen /></button>
      <button aria-label="circle" onClick={() => setTool("circle")} className={`p-2 rounded ${currentTool === "circle" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}><FaCircle /></button>
      <button aria-label="rectangle" onClick={() => setTool("rectangle")} className={`p-2 rounded ${currentTool === "rectangle" ? "bg-accent dark:text-primary" : "hover:bg-dime"}`}><FaSquare /></button>
      <div className="flex items-center gap-4">
        <FaPalette className="text-xl" />
        <input aria-label="select color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-6 h-6 border-0 cursor-pointer" />
      </div>
    </div>
  );
};

export default CanvasToolbox;
