"use client";

import { ReactNode } from "react";
import { ReactLenis, useLenis as useLenisHook } from "lenis/react";
import { usePerformance } from "../hooks/use-performance";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { reducedMotion } = usePerformance();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.5,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

// Re-export useLenis for components to subscribe to scroll events
export { useLenisHook as useLenis };
