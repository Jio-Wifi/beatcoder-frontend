import type { SketchElement, Tool } from "../types/Lab/sketch.types";
export const createElement = (
  type: Tool,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  text: string = ""
): SketchElement => {
  return {
    id: crypto.randomUUID(),
    type,
    x,
    y,
    width,
    height,
    color,
    text: type === "text" ? text : undefined,
  };
};
