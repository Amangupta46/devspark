"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface LoaderContextType {
  isLoaded: boolean;
}

const LoaderContext = createContext<LoaderContextType>({ isLoaded: false });

export function useLoader() {
  return useContext(LoaderContext);
}

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Instantly reveal the app on the client to avoid blocking LCP
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  return <LoaderContext.Provider value={{ isLoaded }}>{children}</LoaderContext.Provider>;
}
