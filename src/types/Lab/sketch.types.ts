export type ElementType =
  | "select"
  | "draw"
  | "rectangle"
  | "circle"
  | "text"
  | "hand"
  | "line"
  | "arrow"
  | "diamond"
  | "image";

export interface SketchElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text?: string;
  opacity?: number;
  strokeStyle?: "solid" | "dashed" | "dotted";
  fontSize?: number;
  fontFamily?: string;
  bgColor?: string;
  rotation?: number;
  points?: { x: number; y: number }[];
  imageSrc?: string;
}

export interface SketchPage {
  id: string;
  name: string;
  elements: SketchElement[];
}

export interface SketchState {
  tool: ElementType;
  color: string;
  bgColor: string;
  fontSize: number;
  fontFamily: string;
  fileName: string;
  elements: SketchElement[]; // deprecated, use currentPage.elements
  history: SketchElement[][];
  pages: SketchPage[];
  currentPageId: string;
  isCreatingText?: boolean;
  selectedPosition?: { x: number; y: number } | null;
  selectedElementId: string | null;
  isDraggingElement: boolean;
  dragOffset: { x: number; y: number } | null;
  resizingHandle?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | null;
}
export type Action =
  | { type: "SET_TOOL"; payload: ElementType }
  | { type: "SET_COLOR"; payload: string }
  | { type: "SET_BG_COLOR"; payload: string }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_FONT_FAMILY"; payload: string }
  | { type: "SET_FILENAME"; payload: string }
  | { type: "ADD_ELEMENT"; payload: SketchElement }
  | { type: "UPDATE_ELEMENT"; payload: { id: string; updates: Partial<SketchElement> } }
  | { type: "UNDO" }
  | { type: "START_CREATING_TEXT"; payload: { x: number; y: number } }
  | { type: "FINISH_CREATING_TEXT" }
  | { type: "CLEAR_ALL" }
  | { type: "START_DRAGGING_ELEMENT"; payload: { id: string; offsetX: number; offsetY: number } }
  | { type: "UPDATE_ELEMENT_POSITION"; payload: { x: number; y: number } }
  | { type: "STOP_DRAGGING_ELEMENT" }
  | { type: "SELECT_ELEMENT"; payload: string }
  | { type: "DESELECT_ELEMENT" }
  | { type: "DELETE_ELEMENT" }
  | { type: "ADD_PAGE"; payload: { id: string; name: string } }
  | { type: "SWITCH_PAGE"; payload: { id: string } }
  | { type: "REMOVE_PAGE"; payload: { id: string } } // ✅ Add this
  | { type: "RENAME_PAGE"; payload: { id: string; name: string } } // ✅ Add this
  | { type: "IMPORT_ELEMENTS"; payload: SketchElement[] }
  | { type: "EXPORT_ELEMENTS" }
  | { type: "START_RESIZING"; payload: { handle: "top-left" | "top-right" | "bottom-left" | "bottom-right" } }
  | { type: "STOP_RESIZING" }
  | { type: "RESIZE_ELEMENT"; payload: { x: number; y: number } };
