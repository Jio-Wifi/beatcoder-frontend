import { useRef, useEffect, useLayoutEffect, useState } from "react";

import { useCanvasEvents } from "../../../hooks/Lab/useCanvasEvents";
import { useSketch } from "../../../hooks/Lab/useSketch";

const SketchCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawPointsRef = useRef<{ x: number; y: number }[]>([]);
  const { state, dispatch } = useSketch();
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });


  useCanvasEvents(canvasRef, drawPointsRef);


  useLayoutEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const updateSize = () => {
    setCanvasSize({
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    });
  };


  updateSize(); // initial size

  const observer = new ResizeObserver(updateSize);
  observer.observe(canvas);

  return () => observer.disconnect();
}, []);



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

   canvas.width = canvasSize.width;
canvas.height = canvasSize.height;


    const wrapText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) => {
      const words = text.split(" ");
      let line = "";
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      state.elements.forEach((el) => {
        ctx.strokeStyle = el.color;
        ctx.fillStyle = el.color;
        ctx.lineWidth = 2;

      // inside render() -> state.elements.forEach((el) => { ... })

switch (el.type) {
  case "rectangle": {
    ctx.strokeRect(el.x, el.y, el.width || 0, el.height || 0);
    break;
  }

  case "circle": {
    const radius = el.width || 20;
    ctx.beginPath();
    ctx.arc(el.x, el.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    break;
  }

  case "draw": {
    if (el.points && el.points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(el.points[0].x, el.points[0].y);
      for (let i = 1; i < el.points.length; i++) {
        ctx.lineTo(el.points[i].x, el.points[i].y);
      }
      ctx.stroke();
    }
    break;
  }

  case "line": {
    ctx.beginPath();
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x + (el.width || 0), el.y + (el.height || 0));
    ctx.stroke();
    break;
  }

  case "arrow": {
    const endX = el.x + (el.width || 0);
    const endY = el.y + (el.height || 0);
    ctx.beginPath();
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const angle = Math.atan2(endY - el.y, endX - el.x);
    const headlen = 10;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headlen * Math.cos(angle - Math.PI / 6),
      endY - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      endX - headlen * Math.cos(angle + Math.PI / 6),
      endY - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(endX, endY);
    ctx.fill();
    break;
  }

  case "image": {
    if (el.imageSrc) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = el.imageSrc;
      if (img.complete) {
        ctx.drawImage(img, el.x, el.y, el.width || 100, el.height || 100);
      } else {
        img.onload = () => {
          ctx.drawImage(img, el.x, el.y, el.width || 100, el.height || 100);
        };
      }
    }
    break;
  }

  case "text": {
    ctx.font = `${el.fontSize || state.fontSize || 16}px ${el.fontFamily || state.fontFamily || "sans-serif"}`;
    const width = el.width || 150;
    const lineHeight = (el.fontSize || state.fontSize || 16) * 1.2;
    wrapText(ctx, el.text || "", el.x, el.y, width, lineHeight);
    break;
  }
}

        // Draw resize handles
        if (state.selectedElementId === el.id && el.width && el.height) {
          const handles = [
            { x: el.x, y: el.y },
            { x: el.x + el.width, y: el.y },
            { x: el.x, y: el.y + el.height },
            { x: el.x + el.width, y: el.y + el.height },
          ];
          ctx.fillStyle = "#0000ff";
          handles.forEach((h) => ctx.fillRect(h.x - 4, h.y - 4, 8, 8));
        }
      });

      // Live draw preview
      if (
        state.tool === "draw" &&
        drawPointsRef.current.length > 1
      ) {
        ctx.strokeStyle = state.color;
        ctx.beginPath();
        ctx.moveTo(drawPointsRef.current[0].x, drawPointsRef.current[0].y);
        for (let i = 1; i < drawPointsRef.current.length; i++) {
          ctx.lineTo(drawPointsRef.current[i].x, drawPointsRef.current[i].y);
        }
        ctx.stroke();
      }

      requestAnimationFrame(render);
    };

    render();
  }, [state.elements, state.tool, state.color, state.fontSize, state.fontFamily, state.selectedElementId, canvasSize.width, canvasSize.height]);

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
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          state.tool === "select" || state.tool === "hand"
            ? "cursor-move"
            : "cursor-crosshair"
        }`}
        onDoubleClick={(e) => {
          const rect = canvasRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const el = state.elements.find(
            (el) =>
              el.type === "text" &&
              x >= el.x &&
              x <= el.x + (el.width || 150) &&
              y >= el.y &&
              y <= el.y + (el.height || 40)
          );

          if (el) {
            setEditingTextId(el.id);
            dispatch({ type: "SELECT_ELEMENT", payload: el.id });
            dispatch({
              type: "START_CREATING_TEXT",
              payload: { x: el.x, y: el.y },
            });
          }
        }}
      />

      {state.tool === "text" &&
        state.isCreatingText &&
        state.selectedPosition && (
          <textarea
          aria-label="editingTextId"
            autoFocus
            defaultValue={
              editingTextId
                ? state.elements.find((el) => el.id === editingTextId)?.text
                : ""
            }
            className="sketch-textarea"
            style={{
              left: `${state.selectedPosition.x}px`,
              top: `${state.selectedPosition.y}px`,
              position: "absolute",
              fontSize: `${state.fontSize}px`,
              fontFamily: state.fontFamily,
              color: state.color,
              background: "transparent",
              resize: "both",
              minWidth: "100px",
              minHeight: "40px",
            }}
            onBlur={(e) => {
              const text = e.target.value.trim();
              const width = e.target.offsetWidth;
              const height = e.target.offsetHeight;

              if (editingTextId && text) {
                dispatch({
                  type: "UPDATE_ELEMENT",
                  payload: {
                    id: editingTextId,
                    updates: { text, width, height },
                  },
                });
              } else if (!editingTextId && text) {
                dispatch({
                  type: "ADD_ELEMENT",
                  payload: {
                    id: Date.now().toString(),
                    type: "text",
                    x: state.selectedPosition!.x,
                    y: state.selectedPosition!.y,
                    text,
                    color: state.color,
                    fontSize: state.fontSize,
                    fontFamily: state.fontFamily,
                    width,
                    height,
                  },
                });
              }

              setEditingTextId(null);
              dispatch({ type: "FINISH_CREATING_TEXT" });
            }}
          />
        )}
    </div>
  );
};

export default SketchCanvas;
