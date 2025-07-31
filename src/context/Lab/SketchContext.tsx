import { createContext } from "react";
import type { Action, SketchState } from "../../types/Lab/sketch.types";

export const initialState: SketchState = {
  tool: "select",
  color: "#0B1D51",
  elements: [],
  history: [],
  fileName: "Untitled Sketch",
  isCreatingText: false,
  selectedPosition: null,

  isDraggingElement: false,
  selectedElementId: null,
  dragOffset: null,
};

export function reducer(state: SketchState, action: Action): SketchState {
  switch (action.type) {
    case "SET_TOOL":
      return { ...state, tool: action.payload };

    case "SET_COLOR":
      return { ...state, color: action.payload };

    case "SET_FILENAME":
      return { ...state, fileName: action.payload };

    case "ADD_ELEMENT":
      return {
        ...state,
        elements: [...state.elements, action.payload],
        history: [...state.history, state.elements],
      };

    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? { ...el, ...action.payload.updates }
            : el
        ),
      };

    case "SELECT_ELEMENT":
      return { ...state, selectedElementId: action.payload };

    case "DESELECT_ELEMENT":
      return { ...state, selectedElementId: null };

    case "DELETE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter(
          (el) => el.id !== state.selectedElementId
        ),
        selectedElementId: null,
      };

    case "UNDO": {
      const prev = state.history[state.history.length - 1] || [];
      return {
        ...state,
        elements: prev,
        history: state.history.slice(0, -1),
      };
    }

    case "START_CREATING_TEXT":
      return {
        ...state,
        isCreatingText: true,
        selectedPosition: action.payload,
      };

    case "FINISH_CREATING_TEXT":
      return {
        ...state,
        isCreatingText: false,
        selectedPosition: null,
      };
    case "START_DRAGGING_ELEMENT":
      return {
        ...state,
        selectedElementId: action.payload.id,
        isDraggingElement: true,
        dragOffset: { x: action.payload.offsetX, y: action.payload.offsetY },
      };

    case "UPDATE_ELEMENT_POSITION":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === state.selectedElementId
            ? { ...el, x: action.payload.x, y: action.payload.y }
            : el
        ),
      };

    case "STOP_DRAGGING_ELEMENT":
      return {
        ...state,
        isDraggingElement: false,
        dragOffset: null,
        selectedElementId: null,
      };
    case "CLEAR_ALL":
      return {
        ...state,
        elements: [],
        history: [...state.history, state.elements],
      };

    default:
      return state;
  }
}

export const SketchContext = createContext<{
  state: SketchState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});
