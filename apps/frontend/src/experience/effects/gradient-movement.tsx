"use client";

import { useRef } from "react";
import { useSharedFrame } from "../providers/raf";
import { usePerformance } from "../hooks/use-performance";

export function GradientMovement() {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = usePerformance();
  const time = useRef(0);

  useSharedFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    time.current += delta * 0.0002;
    const x = Math.sin(time.current) * 10;
    const y = Math.cos(time.current * 0.8) * 10;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-25 opacity-50"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, hsla(37,93%,55%,0.1) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 90% 60%, hsla(230,70%,60%,0.08) 0%, transparent 60%)
        `,
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
