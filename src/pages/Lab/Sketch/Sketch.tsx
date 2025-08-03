import LabSidebar from "../../../components/Lab/LabSidebar";
import SketchCanvas from "../../../components/Lab/Sketch/SketchCanvas";
import SketchPages from "../../../components/Lab/Sketch/SketchPages";
import SketchToolbar from "../../../components/Lab/Sketch/SketchToolbar";
import { SketchProvider } from "../../../context/Lab/SketchProvider";
import { useContext } from "react";
import { SketchContext } from "../../../context/Lab/SketchContext";
import { exportAsImage } from "../../../utils/exportSketch";

const TopRightActions = () => {
  const { state, dispatch } = useContext(SketchContext);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all elements?")) {
      dispatch({ type: "CLEAR_ALL" });
    }
  };

  const handleDownload = () => {
    if (!state.elements.length) {
      alert("Nothing to export!");
      return;
    }

    const name = state.fileName?.trim() || "sketch.png";
    exportAsImage(state.elements, name);
  };

  return (
    <div className="absolute top-24 sm:mt-14 md:top-4 md:mt-0 right-4 z-50 flex flex-col md:flex-row gap-2">
      <button
        onClick={handleClear}
        className="px-5 py-2 rounded bg-danger text-white hover:bg-red-700"
        aria-label="Clear Canvas"
      >
        Clear
      </button>
      <button
        onClick={handleDownload}
        className="px-5 py-2 rounded bg-primary text-white hover:bg-secondary"
        aria-label="Download Canvas"
      >
        Download
      </button>
    </div>
  );
};

const Sketch = () => {
  return (
    <SketchProvider>
      <div className="flex flex-col h-[calc(100vh-72px)] overflow-y-auto custom-scroll">
        <div className="flex flex-grow">
          <LabSidebar />
          <div className="flex-grow relative z-0 bg-dime dark:bg-dark">
            <SketchToolbar />
            <SketchCanvas />
            <TopRightActions />
          </div>
        </div>
        <div className="sticky bottom-0 z-10 bg-white dark:bg-dark border-t border-gray-300 dark:border-gray-700">
          <SketchPages />
        </div>
      </div>
    </SketchProvider>
  );
};

export default Sketch;
