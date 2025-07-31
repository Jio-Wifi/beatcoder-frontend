import { type RefObject, useEffect } from "react";
import { useSketch } from "./useSketch";
import { createElement } from "../../utils/createElement";

export const useCanvasEvents = (
  canvasRef: RefObject<HTMLCanvasElement | null>
) => {
  const { state, dispatch } = useSketch();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    const getMousePosition = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getMousePosition(e);
      startX = x;
      startY = y;

      // Select/Hand tool click: select element if exists
      if (state.tool === "hand" || state.tool === "select") {
        const clickedElement = [...state.elements].reverse().find(
          (el) =>
            x >= el.x &&
            x <= el.x + (el.width || 0) &&
            y >= el.y &&
            y <= el.y + (el.height || 0)
        );

        if (clickedElement) {
          dispatch({ type: "SELECT_ELEMENT", payload: clickedElement.id });

          if (state.tool === "hand") {
            dispatch({
              type: "START_DRAGGING_ELEMENT",
              payload: {
                id: clickedElement.id,
                offsetX: x - clickedElement.x,
                offsetY: y - clickedElement.y,
              },
            });
          }
        } else {
          dispatch({ type: "DESELECT_ELEMENT" });
        }

        return;
      }

      // Text tool
      if (state.tool === "text") {
        dispatch({
          type: "START_CREATING_TEXT",
          payload: { x, y },
        });
        return;
      }

      // Start drawing other elements
      isDrawing = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getMousePosition(e);

      // Drag selected element
      if (
        (state.tool === "hand" || state.tool === "select") &&
        state.isDraggingElement &&
        state.selectedElementId &&
        state.dragOffset
      ) {
        dispatch({
          type: "UPDATE_ELEMENT_POSITION",
          payload: {
            x: x - state.dragOffset.x,
            y: y - state.dragOffset.y,
          },
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const { x, y } = getMousePosition(e);

      // Stop dragging
      if (
        (state.tool === "hand" || state.tool === "select") &&
        state.isDraggingElement
      ) {
        dispatch({ type: "STOP_DRAGGING_ELEMENT" });
        return;
      }

      // Text click again
      if (state.tool === "text") {
        dispatch({
          type: "START_CREATING_TEXT",
          payload: { x, y },
        });
        return;
      }

      // Finish drawing
      if (!isDrawing) return;
      isDrawing = false;

      const width = x - startX;
      const height = y - startY;

      const element = createElement(
        state.tool,
        startX,
        startY,
        width,
        height,
        state.color
      );

      dispatch({ type: "ADD_ELEMENT", payload: element });
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    canvasRef,
    state.tool,
    state.color,
    state.isDraggingElement,
    state.dragOffset,
    state.selectedElementId,
    state.elements,
    dispatch,
  ]);
};
