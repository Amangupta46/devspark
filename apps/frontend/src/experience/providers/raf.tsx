"use client";

import { useEffect } from "react";

type FrameCallback = (time: number, delta: number) => void;

const subscribers = new Set<FrameCallback>();
let isRunning = false;
let lastTime = 0;
let rafId = 0;

function loop(time: number) {
  if (!lastTime) lastTime = time;
  const delta = time - lastTime;
  lastTime = time;

  subscribers.forEach((callback) => {
    callback(time, delta);
  });

  if (isRunning && subscribers.size > 0) {
    rafId = requestAnimationFrame(loop);
  } else {
    isRunning = false;
  }
}

function startLoop() {
  if (!isRunning && typeof window !== "undefined") {
    isRunning = true;
    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  }
}

function stopLoop() {
  if (isRunning) {
    isRunning = false;
    cancelAnimationFrame(rafId);
  }
}

/**
 * A hook that subscribes to a single, global requestAnimationFrame loop.
 * Prevents multiple components from starting their own rAF loops.
 */
export function useSharedFrame(callback: FrameCallback) {
  useEffect(() => {
    subscribers.add(callback);
    startLoop();

    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        stopLoop();
      }
    };
  }, [callback]);
}
