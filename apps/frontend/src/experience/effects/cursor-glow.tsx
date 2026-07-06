"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useMouseContext } from "../providers/mouse";
import { usePerformance } from "../hooks/use-performance";
import { useViewportContext } from "../providers/viewport";
import { MOTION_TOKENS } from "../config/tokens";

export function CursorGlow() {
  const { mouseX, mouseY } = useMouseContext();
  const { reducedMotion } = usePerformance();
  const { isMobile } = useViewportContext();

  const lx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-300, 300]), MOTION_TOKENS.spring.gentle);
  const ly = useSpring(useTransform(mouseY, [-0.5, 0.5], [-200, 200]), MOTION_TOKENS.spring.gentle);

  if (reducedMotion || isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-1/2 left-1/2 -z-50 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen"
      style={{
        x: lx,
        y: ly,
        background: "radial-gradient(circle at center, hsla(37,93%,55%,0.15) 0%, transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}
