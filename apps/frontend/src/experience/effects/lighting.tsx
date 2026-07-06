"use client";

import { motion } from "framer-motion";
import { useMouseContext } from "../providers/mouse";
import { useViewportContext } from "../providers/viewport";
import { usePerformance } from "../hooks/use-performance";

export function AmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-50"
      style={{
        background: "radial-gradient(circle at 50% 0%, hsla(222,22%,15%,0.8) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

export function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-40 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: "url('/noise.webp')",
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

export function MouseRadialLight() {
  const { mouseX, mouseY } = useMouseContext();
  const { isMobile } = useViewportContext();
  const { reducedMotion } = usePerformance();

  if (isMobile || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-30 opacity-40 mix-blend-screen"
      style={
        {
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), hsla(37,93%,55%,0.1), transparent 40%)",
          "--mouse-x": mouseX,
          "--mouse-y": mouseY,
        } as React.CSSProperties
      }
      aria-hidden="true"
    />
  );
}

export function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        background:
          "radial-gradient(circle at center, transparent 30%, hsla(222,47%,11%,0.4) 100%)",
      }}
      aria-hidden="true"
    />
  );
}

export function ThemeLighting() {
  return (
    <>
      <AmbientGlow />
      <Noise />
      <MouseRadialLight />
      <Vignette />
    </>
  );
}
