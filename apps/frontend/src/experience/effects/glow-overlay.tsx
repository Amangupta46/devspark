"use client";

import { useSharedFrame } from "../providers/raf";
import { useRef } from "react";
import { usePerformance } from "../hooks/use-performance";

export function GlowOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = usePerformance();
  const time = useRef(0);

  useSharedFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    time.current += delta * 0.0001;
    const s = 1 + Math.sin(time.current) * 0.05;
    ref.current.style.transform = `scale(${s})`;
  });

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-40 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute top-[10%] left-[20%] h-[800px] w-[800px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="absolute right-[10%] bottom-[20%] h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[100px]" />
    </div>
  );
}
