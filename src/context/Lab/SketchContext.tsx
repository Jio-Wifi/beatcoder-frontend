import { createContext } from "react";
import type { Action, SketchState } from "../../types/Lab/sketch.types";

export const initialState: SketchState = {
  tool: "select",
  color: "#0B1D51",
  bgColor: "#FFFFFF",
  fontSize: 16,
  fontFamily: "Arial",
  fileName: "Untitled Sketch",

  elements: [],
  history: [],
  pages: [
    {
      id: "page-1",
      name: "Page 1",
      elements: [],
    },
  ],
  currentPageId: "page-1",

  isCreatingText: false,
  selectedPosition: null,
  isDraggingElement: false,
  selectedElementId: null,
  dragOffset: null,
  resizingHandle: null,
};

export function reducer(state: SketchState, action: Action): SketchState {
  switch (action.type) {
    case "SET_TOOL":
      return { ...state, tool: action.payload };

    case "SET_COLOR":
      return { ...state, color: action.payload };

    case "SET_BG_COLOR":
      return { ...state, bgColor: action.payload };

    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.payload };

    case "SET_FONT_FAMILY":
      return { ...state, fontFamily: action.payload };

    case "SET_FILENAME":
      return { ...state, fileName: action.payload };

    case "ADD_ELEMENT": {
  const updatedPages = state.pages.map((page) =>
    page.id === state.currentPageId
      ? { ...page, elements: [...page.elements, action.payload] }
      : page
  );
  return {
    ...state,
    elements: [...state.elements, action.payload],
    history: [...state.history, state.elements],
    pages: updatedPages,
  };
}


    case "UPDATE_ELEMENT": {
      const updatedElements = state.elements.map((el) =>
        el.id === action.payload.id ? { ...el, ...action.payload.updates } : el
      );
      return {
        ...state,
        elements: updatedElements,
        pages: state.pages.map((page) =>
          page.id === state.currentPageId
            ? { ...page, elements: updatedElements }
            : page
        ),
      };
    }

    case "SELECT_ELEMENT":
      return { ...state, selectedElementId: action.payload };

    case "DESELECT_ELEMENT":
      return { ...state, selectedElementId: null };

    case "DELETE_ELEMENT": {
      const updatedElements = state.elements.filter(
        (el) => el.id !== state.selectedElementId
      );
      return {
        ...state,
        selectedElementId: null,
        elements: updatedElements,
        pages: state.pages.map((page) =>
          page.id === state.currentPageId
            ? { ...page, elements: updatedElements }
            : page
        ),
      };
    }

    case "UNDO": {
      const prev = state.history[state.history.length - 1] || [];
      return {
        ...state,
        elements: prev,
        history: state.history.slice(0, -1),
        pages: state.pages.map((page) =>
          page.id === state.currentPageId ? { ...page, elements: prev } : page
        ),
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
        dragOffset: {
          x: action.payload.offsetX,
          y: action.payload.offsetY,
        },
      };

    case "UPDATE_ELEMENT_POSITION": {
      const updatedElements = state.elements.map((el) =>
        el.id === state.selectedElementId
          ? { ...el, x: action.payload.x, y: action.payload.y }
          : el
      );
      return {
        ...state,
        elements: updatedElements,
        pages: state.pages.map((page) =>
          page.id === state.currentPageId
            ? { ...page, elements: updatedElements }
            : page
        ),
      };
    }

    case "STOP_DRAGGING_ELEMENT":
      return {
        ...state,
        isDraggingElement: false,
        dragOffset: null,
        selectedElementId: null,
      };

    case "START_RESIZING":
      return {
        ...state,
        resizingHandle: action.payload.handle,
      };

    case "STOP_RESIZING":
      return {
        ...state,
        resizingHandle: null,
      };

    case "RESIZE_ELEMENT": {
      const updatedElements = state.elements.map((el) =>
        el.id === state.selectedElementId
          ? { ...el, width: action.payload.x, height: action.payload.y }
          : el
      );
      return {
        ...state,
        elements: updatedElements,
        pages: state.pages.map((page) =>
          page.id === state.currentPageId
            ? { ...page, elements: updatedElements }
            : page
        ),
      };
    }

    case "CLEAR_ALL":
      return {
        ...state,
        elements: [],
        history: [...state.history, state.elements],
        pages: state.pages.map((page) =>
          page.id === state.currentPageId ? { ...page, elements: [] } : page
        ),
      };

   case "ADD_PAGE":
  return {
    ...state,
    pages: [...state.pages, { id: action.payload.id, name: action.payload.name, elements: [] }],
    currentPageId: action.payload.id,
    elements: [],
    history: [],
  };


   case "SWITCH_PAGE": {
  const selectedPage = state.pages.find((p) => p.id === action.payload.id);
  return selectedPage
    ? {
        ...state,
        currentPageId: selectedPage.id,
        elements: selectedPage.elements,
        history: [],
      }
    : state;
}



    case "IMPORT_ELEMENTS":
      return {
        ...state,
        elements: action.payload,
        history: [...state.history, state.elements],
        pages: state.pages.map((page) =>
          page.id === state.currentPageId
            ? { ...page, elements: action.payload }
            : page
        ),
      };

    case "EXPORT_ELEMENTS":
      return state;

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
