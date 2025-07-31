// utils/exportSketch.ts

import type { SketchElement } from "../types/Lab/sketch.types";

export const exportAsImage = (elements: SketchElement[], fileName: string = "sketch.png") => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Calculate canvas size (could be improved by finding max bounds)
  canvas.width = 1200;
  canvas.height = 800;
  ctx.fillStyle = "#ffffff"; // optional background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  elements.forEach((el) => {
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

  // Export canvas to PNG and trigger download
  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
