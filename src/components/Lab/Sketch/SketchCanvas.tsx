import { useRef, useEffect } from "react";
import { useCanvasEvents } from "../../../hooks/Lab/useCanvasEvents";
import { useSketch } from "../../../hooks/Lab/useSketch";

const SketchCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state,dispatch } = useSketch();

  useCanvasEvents(canvasRef as React.RefObject<HTMLCanvasElement>);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    state.elements.forEach((el) => {
      ctx.strokeStyle = el.color;
      ctx.fillStyle = el.color;
      ctx.lineWidth = 2;

      switch (el.type) {
        case "rectangle":
          ctx.strokeRect(el.x, el.y, el.width || 0, el.height || 0);
          break;
       case "circle": {
  const radius = el.width || 20;
  ctx.beginPath();
  ctx.arc(el.x, el.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  break;
}
        case "draw":
          ctx.beginPath();
          ctx.moveTo(el.x, el.y);
          ctx.lineTo(el.x + (el.width || 1), el.y + (el.height || 1));
          ctx.stroke();
          break;
        case "text":
          ctx.font = "16px sans-serif";
          ctx.fillText(el.text || "", el.x, el.y);
          break;
        default:
          break;
      }
    });
  }, [state.elements]);
    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && state.selectedElementId) {
        dispatch({ type: "DELETE_ELEMENT" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.selectedElementId, dispatch]);

  return (
    <div className="flex-1 relative bg-dime dark:bg-dark h-full overflow-hidden">
      <canvas ref={canvasRef} className={`w-full h-full ${state.tool === "select" ? "cursor-move" : "cursor-crosshair"}`} />
{state.tool === "text" && state.isCreatingText && state.selectedPosition && (
  <textarea
    aria-label="text"
    autoFocus
    className="sketch-textarea"
   ref={(el) => {
  if (el && state.selectedPosition) {
    el.style.setProperty("--x", `${state.selectedPosition.x}px`);
    el.style.setProperty("--y", `${state.selectedPosition.y}px`);
  }
}}
    onBlur={(e) => {
      const text = e.target.value.trim();
    if (state.selectedPosition) {
  dispatch({
    type: "ADD_ELEMENT",
    payload: {
      id: Date.now().toString(),
      type: "text",
      x: state.selectedPosition.x,
      y: state.selectedPosition.y,
      text,
      color: state.color,
    },
  });
}

      dispatch({ type: "FINISH_CREATING_TEXT" });
    }}
  />
)}

    </div>
  );
};

export default SketchCanvas;
