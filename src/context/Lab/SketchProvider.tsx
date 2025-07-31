import { SketchContext, initialState, reducer } from "./SketchContext"; 
import { useReducer } from "react";
import React from "react"; 

export const SketchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SketchContext.Provider value={{ state, dispatch }}>
      {children}
    </SketchContext.Provider>
  );
};
