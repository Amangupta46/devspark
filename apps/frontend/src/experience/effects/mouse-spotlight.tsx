"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MOTION_TOKENS } from "../config/tokens";
import { usePerformance } from "../hooks/use-performance";

interface MouseSpotlightProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function MouseSpotlight({
  children,
  className = "",
  glowColor = "hsla(37,93%,55%,0.15)",
}: MouseSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = usePerformance();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, MOTION_TOKENS.spring.bouncy);
  const springY = useSpring(mouseY, MOTION_TOKENS.spring.bouncy);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, reducedMotion],
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!reducedMotion && (
        <motion.div
          className="rounded-inherit pointer-events-none absolute -inset-px -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 40%)`,
            // @ts-expect-error custom property for framer-motion template
            "--mouse-x": springX.get() + "px",
            "--mouse-y": springY.get() + "px",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
