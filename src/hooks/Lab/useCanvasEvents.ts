import { type RefObject, useEffect, useMemo } from "react";
import { useSketch } from "./useSketch";
import { createElement } from "../../utils/createElement";
import type { SketchElement } from "../../types/Lab/sketch.types";

const HANDLE_SIZE = 8;

export const useCanvasEvents = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  drawPointsRef: React.MutableRefObject<{ x: number; y: number }[]>
) => {
  const { state, dispatch } = useSketch();

  // Get the current page's elements
  const elements = useMemo(() => {
  return state.pages.find((p) => p.id === state.currentPageId)?.elements || [];
}, [state.pages, state.currentPageId]);


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

    const isInResizeHandle = (x: number, y: number, el: SketchElement) => {
      const handleX = el.x + (el.width || 0);
      const handleY = el.y + (el.height || 0);
      return (
        x >= handleX - HANDLE_SIZE &&
        x <= handleX + HANDLE_SIZE &&
        y >= handleY - HANDLE_SIZE &&
        y <= handleY + HANDLE_SIZE
      );
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getMousePosition(e);
      startX = x;
      startY = y;

      if (state.tool === "select" || state.tool === "hand") {
        const clickedElement = [...elements].reverse().find((el) => {
          const ex = el.x;
          const ey = el.y;
          const ew = el.width || 0;
          const eh = el.height || 0;

          if (isInResizeHandle(x, y, el)) {
            dispatch({ type: "SELECT_ELEMENT", payload: el.id });
            dispatch({
              type: "START_RESIZING",
              payload: { handle: "bottom-right" },
            });
            return true;
          }

          return x >= ex && x <= ex + ew && y >= ey && y <= ey + eh;
        });

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

      if (state.tool === "text") {
        dispatch({ type: "START_CREATING_TEXT", payload: { x, y } });
        return;
      }

      if (state.tool === "draw") {
        isDrawing = true;
        drawPointsRef.current = [{ x, y }];
        return;
      }

      // Start shape drawing
      isDrawing = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getMousePosition(e);

      if (
        state.tool === "select" &&
        state.resizingHandle &&
        state.selectedElementId
      ) {
        const selected = elements.find((el) => el.id === state.selectedElementId);
        if (selected) {
          const newWidth = Math.max(5, x - selected.x);
          const newHeight = Math.max(5, y - selected.y);

          dispatch({
            type: "RESIZE_ELEMENT",
            payload: { x: newWidth, y: newHeight },
          });
        }
        return;
      }

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
        return;
      }

      if (state.tool === "draw" && isDrawing) {
        drawPointsRef.current.push({ x, y });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (state.resizingHandle) {
        dispatch({ type: "STOP_RESIZING" });
        return;
      }

      if (
        (state.tool === "hand" || state.tool === "select") &&
        state.isDraggingElement
      ) {
        dispatch({ type: "STOP_DRAGGING_ELEMENT" });
        return;
      }

      const { x, y } = getMousePosition(e);

      if (!isDrawing) return;
      isDrawing = false;

      if (state.tool === "draw") {
        const points = [...drawPointsRef.current];
        drawPointsRef.current = [];
        if (points.length < 2) return;

        const element: SketchElement = {
          id: crypto.randomUUID(),
          type: "draw",
          x: points[0].x,
          y: points[0].y,
          color: state.color,
          points,
        };

        dispatch({ type: "ADD_ELEMENT", payload: element });
        return;
      }

      const width = x - startX;
      const height = y - startY;

      const element = createElement({
        type: state.tool,
        x: startX,
        y: startY,
        width,
        height,
        color: state.color,
        fontSize: state.fontSize,
        fontFamily: state.fontFamily,
      });

      if (element) {
        dispatch({ type: "ADD_ELEMENT", payload: element });
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasRef, state.tool, state.color, state.fontSize, state.fontFamily, state.isDraggingElement, state.dragOffset, state.selectedElementId, state.resizingHandle, state.currentPageId, state.pages, dispatch, drawPointsRef, elements]);
};
