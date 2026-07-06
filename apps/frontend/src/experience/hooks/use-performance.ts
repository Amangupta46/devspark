"use client";

import { useEffect, useState } from "react";

let globalReducedMotion = false;
let globalDpr = 1;
const subscribers = new Set<() => void>();
let isInitialized = false;

function initGlobals() {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  globalReducedMotion = mediaQuery.matches;

  const calculateDpr = () => {
    const isMobile = window.innerWidth < 768;
    globalDpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    subscribers.forEach((cb) => cb());
  };

  mediaQuery.addEventListener("change", (e) => {
    globalReducedMotion = e.matches;
    subscribers.forEach((cb) => cb());
  });

  let timeoutId: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(calculateDpr, 150);
  }, { passive: true });

  calculateDpr();
}

export function usePerformance() {
  const [state, setState] = useState({ reducedMotion: globalReducedMotion, dpr: globalDpr });

  useEffect(() => {
    initGlobals();
    const update = () => setState({ reducedMotion: globalReducedMotion, dpr: globalDpr });
    subscribers.add(update);
    update(); // Ensure state is perfectly in sync on mount
    
    return () => {
      subscribers.delete(update);
    };
  }, []);

  return state;
}
