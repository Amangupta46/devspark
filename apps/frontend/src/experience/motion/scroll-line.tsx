"use client";

import React, { useRef } from "react";
import { useScroll, motion, useReducedMotion } from "framer-motion";

export function ScrollLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll for the central line based on its own height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div
      ref={containerRef}
      className="absolute top-0 bottom-0 left-4 w-px bg-neutral-800 md:left-1/2 md:-translate-x-1/2"
    >
      {!shouldReduceMotion && (
        <motion.div
          className="w-full origin-top bg-gradient-to-b from-amber-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />
      )}
    </div>
  );
}
