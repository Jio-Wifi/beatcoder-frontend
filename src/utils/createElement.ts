import type { SketchElement, ElementType } from "../types/Lab/sketch.types";

interface CreateElementOptions {
  type: ElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  fontSize?: number;
  fontFamily?: string;
  text?: string;
  bgColor?: string;
  opacity?: number;
  strokeStyle?: "solid" | "dashed" | "dotted";
  points?: { x: number; y: number }[];
  imageSrc?: string;
}

export const createElement = ({
  type,
  x,
  y,
  width = 0,
  height = 0,
  color,
  fontSize,
  fontFamily,
  text,
  bgColor,
  opacity,
  strokeStyle,
  points,
  imageSrc,
}: CreateElementOptions): SketchElement => {
  const base: SketchElement = {
    id: crypto.randomUUID(),
    type,
    x,
    y,
    width,
    height,
    color,
    fontSize,
    fontFamily,
    text: type === "text" ? text || "" : undefined,
    bgColor,
    opacity,
    strokeStyle,
    rotation: 0,
    imageSrc: type === "image" ? imageSrc : undefined,
  };

  // Handle freehand draw tool
  if (type === "draw") {
    base.points = points || [{ x, y }];
  }

  // Handle line/arrow tool
  if (type === "line" || type === "arrow") {
    base.points = points || [];
  }

  return base;
};
