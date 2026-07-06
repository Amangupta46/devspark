"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePerformance } from "../hooks/use-performance";
import { ANIMATION_CONFIG } from "../config/animation";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { reducedMotion } = usePerformance();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: ANIMATION_CONFIG.spring.gentle.stiffness,
    damping: ANIMATION_CONFIG.spring.gentle.damping,
    restDelta: 0.001,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] h-[2px] origin-left bg-amber-400"
      style={{ scaleX }}
    />
  );
}
