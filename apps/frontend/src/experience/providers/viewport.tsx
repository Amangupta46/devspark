"use client";

import { createContext, useContext, ReactNode } from "react";
import { useViewport, ViewportSize } from "../hooks/use-viewport";

interface ViewportContextType {
  size: ViewportSize;
  isMobile: boolean;
}

const ViewportContext = createContext<ViewportContextType | null>(null);

export function ViewportProvider({ children }: { children: ReactNode }) {
  const viewport = useViewport();

  return <ViewportContext.Provider value={viewport}>{children}</ViewportContext.Provider>;
}

export function useViewportContext() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewportContext must be used within a ViewportProvider");
  }
  return context;
}
