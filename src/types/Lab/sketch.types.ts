export type ElementType = "select" | "draw" | "rectangle" | "circle" | "text" | "hand";

export interface SketchElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text?: string;
}

// Add to SketchState (types/sketch.types.ts)
export interface SketchState {
  tool: ElementType;
  color: string;
  elements: SketchElement[];
  history: SketchElement[][];
  fileName: string;
  isCreatingText?: boolean;
  selectedPosition?: { x: number; y: number } | null;
  selectedElementId: string | null;
  isDraggingElement: boolean;
  dragOffset: { x: number; y: number } | null;
}


export type Action =
  | { type: "SET_TOOL"; payload: ElementType }
  | { type: "SET_COLOR"; payload: string }
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
  | { type: "DELETE_ELEMENT" };      

