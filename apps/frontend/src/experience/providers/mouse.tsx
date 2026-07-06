"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMouse } from "../hooks/use-mouse";
import { MotionValue } from "framer-motion";

interface MouseContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

const MouseContext = createContext<MouseContextType | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const mouse = useMouse();

  return <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>;
}

export function useMouseContext() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouseContext must be used within a MouseProvider");
  }
  return context;
}
