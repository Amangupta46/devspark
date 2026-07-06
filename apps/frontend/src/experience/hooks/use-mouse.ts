"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

let sharedX = 0;
let sharedY = 0;
const listeners = new Set<(e: MouseEvent) => void>();

let isListening = false;
function handleSharedMouseMove(e: MouseEvent) {
  sharedX = e.clientX;
  sharedY = e.clientY;
  listeners.forEach((fn) => fn(e));
}

function startListening() {
  if (!isListening && typeof window !== "undefined") {
    isListening = true;
    window.addEventListener("mousemove", handleSharedMouseMove, { passive: true });
  }
}

function stopListening() {
  if (isListening) {
    isListening = false;
    window.removeEventListener("mousemove", handleSharedMouseMove);
  }
}

export function useMouse(springConfig = { stiffness: 150, damping: 15, mass: 0.1 }) {
  const mouseX = useMotionValue(sharedX);
  const mouseY = useMotionValue(sharedY);

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    listeners.add(handleMove);
    startListening();

    return () => {
      listeners.delete(handleMove);
      if (listeners.size === 0) stopListening();
    };
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, smoothX, smoothY };
}
