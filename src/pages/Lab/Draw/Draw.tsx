import { useRef, useEffect, useState, useCallback } from "react";
import LabSidebar from "../../../components/Lab/LabSidebar";
import CanvasToolbox from "../../../components/Lab/Draw/CanvasToolbox";
import PageTabs from "../../../components/Lab/Draw/PageTabs";

const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("draw");
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState("#0B1D51");
  const [pages, setPages] = useState(["Page 1"]);
  const [currentPage, setCurrentPage] = useState(0);

   const getStorageKey = useCallback(() => `drawing_page_${currentPage}`, [currentPage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      const image = new Image();
      image.src = saved;
      image.onload = () => ctx.drawImage(image, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const startDrawing = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;
      if (tool === "draw") {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      }
      setStart({ x: offsetX, y: offsetY });
      setIsDrawing(true);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing || !start) return;
      const { offsetX, offsetY } = e;
      if (tool === "draw") {
        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    };

    const stopDrawing = (e: MouseEvent) => {
      if (!isDrawing || !start) return;
      const { offsetX, offsetY } = e;
      ctx.strokeStyle = color;
      if (tool === "circle") {
        const radius = Math.hypot(offsetX - start.x, offsetY - start.y) / 2;
        ctx.beginPath();
        ctx.arc((offsetX + start.x) / 2, (offsetY + start.y) / 2, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === "rectangle") {
        const width = offsetX - start.x;
        const height = offsetY - start.y;
        ctx.strokeRect(start.x, start.y, width, height);
      }
      setIsDrawing(false);
      ctx.closePath();
      const data = canvas.toDataURL("image/png");
      localStorage.setItem(getStorageKey(), data);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [tool, isDrawing, currentPage, color, getStorageKey, start]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem(getStorageKey());
    }
  };

 const handleDownload = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;

  // use the page title as filename, fallback to page number if empty
  const name = pages[currentPage]?.trim() || `Page_${currentPage + 1}`;
  const safeName = name.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // sanitize

  link.download = `${safeName}.png`;
  link.click();
};

  const renamePage = (index: number, newName: string) => {
  setPages((prev) => {
    const updated = [...prev];
    updated[index] = newName;
    return updated;
  });
};


  const addPage = () => {
    setPages((prev) => [...prev, `Page ${prev.length + 1}`]);
    setCurrentPage(pages.length);
  };

  const deletePage = (index: number) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    localStorage.removeItem(`drawing_page_${index}`);
    setPages(updatedPages);
    setCurrentPage((prev) => (index === 0 ? 0 : prev - 1));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] overflow-y-auto custom-scroll">
      <div className="flex flex-grow">
        <LabSidebar />
        <div className="flex-grow relative z-0 bg-dime dark:bg-dark">
          <CanvasToolbox currentTool={tool} setTool={setTool} color={color} setColor={setColor} />
          <canvas ref={canvasRef} className="w-full h-[calc(100vh-96px)]" />
          <div className="absolute top-20 md:top-4 right-4 z-50 flex gap-2">
            <button onClick={handleClear} className="px-4 py-1 rounded bg-danger text-white hover:bg-red-700">Clear</button>
            <button onClick={handleDownload} className="px-4 py-1 rounded bg-primary text-white hover:bg-secondary">Download</button>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-10 bg-white dark:bg-dark border-t border-gray-300 dark:border-gray-700">
    <PageTabs
  pages={pages}
  currentPage={currentPage}
  setPage={setCurrentPage}
  addPage={addPage}
  deletePage={deletePage}
  renamePage={renamePage}
/>
</div>
    </div>
  );
};

export default Draw;
