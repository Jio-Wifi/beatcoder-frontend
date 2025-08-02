import {
  FaMousePointer,
  FaPen,
  FaCircle,
  FaSquare,
  FaPalette,
  FaFont,
  FaHandPaper,
  FaLongArrowAltRight,
  FaSlash,
  FaImage,
} from "react-icons/fa";
import { useSketch } from "../../../hooks/Lab/useSketch";
import { useRef } from "react";

const SketchToolbar = () => {
  const { state, dispatch } = useSketch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const setTool = (tool: typeof state.tool) =>
    dispatch({ type: "SET_TOOL", payload: tool });

  const setColor = (color: string) =>
    dispatch({ type: "SET_COLOR", payload: color });

  const toolButton = (
    icon: React.ReactNode,
    label: string,
    toolKey: typeof state.tool,
    onClick?: () => void
  ) => (
    <button
      aria-label={label}
      onClick={onClick || (() => setTool(toolKey))}
      className={`p-2 rounded ${
        state.tool === toolKey
          ? "bg-accent dark:text-primary"
          : "hover:bg-dime"
      }`}
    >
      {icon}
    </button>
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageSrc = reader.result as string;
      dispatch({
        type: "ADD_ELEMENT",
        payload: {
          id: crypto.randomUUID(),
          type: "image",
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          color: "#000",
          imageSrc,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 bg-white dark:bg-primary p-2 rounded shadow items-center dark:text-accent">
      {toolButton(<FaMousePointer />, "select", "select")}
      {toolButton(<FaHandPaper />, "hand", "hand")}
      {toolButton(<FaPen />, "draw", "draw")}
      {toolButton(<FaCircle />, "circle", "circle")}
      {toolButton(<FaSquare />, "rectangle", "rectangle")}
      {toolButton(<FaSlash />, "line", "line")}
      {toolButton(<FaLongArrowAltRight />, "arrow", "arrow")}
     {toolButton(<FaFont />, "text", "text", () => {
  setTool("text");
  dispatch({ type: "START_CREATING_TEXT", payload: { x: 100, y: 100 } }); // Optional: Set default position
})}


      {/* 🖼️ Image tool with upload */}
      {toolButton(<FaImage />, "image", "image", () => {
        imageInputRef.current?.click(); // Trigger hidden input
      })}

      <input
        aria-label="file"
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* 🎨 Color Picker */}
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
