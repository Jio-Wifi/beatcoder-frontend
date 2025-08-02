// utils/exportSketch.ts
import type { SketchElement } from "../types/Lab/sketch.types";

export const exportAsImage = (elements: SketchElement[], fileName: string = "sketch.png") => {
  if (!elements.length) return;

  const padding = 50;

  // Dynamically calculate canvas bounds
  const bounds = elements.reduce(
    (acc, el) => {
      const ex = el.x + (el.width || 0);
      const ey = el.y + (el.height || 0);
      return {
        minX: Math.min(acc.minX, el.x),
        minY: Math.min(acc.minY, el.y),
        maxX: Math.max(acc.maxX, ex),
        maxY: Math.max(acc.maxY, ey),
      };
    },
    { minX: Infinity, minY: Infinity, maxX: 0, maxY: 0 }
  );

  const width = bounds.maxX - bounds.minX + padding * 2;
  const height = bounds.maxY - bounds.minY + padding * 2;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  elements.forEach((el) => {
    const offsetX = el.x - bounds.minX + padding;
    const offsetY = el.y - bounds.minY + padding;

    ctx.strokeStyle = el.color || "#000";
    ctx.fillStyle = el.color || "#000";
    ctx.lineWidth = 2;

    switch (el.type) {
      case "rectangle":
        ctx.strokeRect(offsetX, offsetY, el.width || 0, el.height || 0);
        break;

      case "circle": {
        const radius = el.width || 20;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      }

      case "draw":
        if (el.points && el.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(el.points[0].x - bounds.minX + padding, el.points[0].y - bounds.minY + padding);
          for (let i = 1; i < el.points.length; i++) {
            ctx.lineTo(el.points[i].x - bounds.minX + padding, el.points[i].y - bounds.minY + padding);
          }
          ctx.stroke();
        }
        break;

      case "line": {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.lineTo(offsetX + (el.width || 0), offsetY + (el.height || 0));
        ctx.stroke();
        break;
      }

      case "arrow": {
        const endX = offsetX + (el.width || 0);
        const endY = offsetY + (el.height || 0);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        const angle = Math.atan2(endY - offsetY, endX - offsetX);
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

      case "text": {
        ctx.font = `${el.fontSize || 16}px ${el.fontFamily || "sans-serif"}`;
        ctx.fillStyle = el.color || "#000";
        ctx.fillText(el.text || "", offsetX, offsetY);
        break;
      }

      case "image": {
        if (el.imageSrc) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = el.imageSrc;
          img.onload = () => {
            ctx.drawImage(img, offsetX, offsetY, el.width || 100, el.height || 100);
            const link = document.createElement("a");
            link.download = fileName;
            link.href = canvas.toDataURL("image/png");
            link.click();
          };
          return; // delay export until image loads
        }
        break;
      }

      default:
        break;
    }
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
