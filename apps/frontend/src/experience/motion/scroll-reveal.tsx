"use client";

import { useSharedIntersection } from "../providers/intersection";
import { usePerformance } from "../hooks/use-performance";
import { MOTION_TOKENS } from "../config/tokens";
import { useEffect, useState } from "react";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, hasOnce } = useSharedIntersection<HTMLDivElement>();
  const { reducedMotion } = usePerformance();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (hasOnce) {
      const timer = setTimeout(() => setShouldAnimate(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [hasOnce, delay]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shouldAnimate ? 1 : 0,
        transform: shouldAnimate ? "translateY(0)" : "translateY(20px)",
        transition: `opacity ${MOTION_TOKENS.duration.slow}s cubic-bezier(${MOTION_TOKENS.ease.outExpo.join(",")}), transform ${MOTION_TOKENS.duration.slow}s cubic-bezier(${MOTION_TOKENS.ease.outExpo.join(",")})`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
