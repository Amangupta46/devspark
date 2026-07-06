"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { usePerformance } from "../hooks/use-performance";
import { useViewport } from "../hooks/use-viewport";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { reducedMotion } = usePerformance();
  const { isMobile } = useViewport();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1, smoothWheel: true, syncTouch: false }}>
      {children}
    </ReactLenis>
  );
}
