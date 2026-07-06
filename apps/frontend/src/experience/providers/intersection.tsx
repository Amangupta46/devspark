"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Singleton observer to share across all components
let sharedObserver: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, (isIntersecting: boolean) => void>();

function getSharedObserver() {
  if (typeof window === "undefined") return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = callbacks.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      },
      { threshold: [0, 0.1, 0.5, 1], rootMargin: "0px 0px -50px 0px" },
    );
  }
  return sharedObserver;
}

/**
 * A hook that registers an element with a single, global IntersectionObserver
 * to prevent creating multiple observer instances across the app.
 */
export function useSharedIntersection<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasOnce, setHasOnce] = useState(false);

  const callback = useCallback((intersecting: boolean) => {
    setIsIntersecting(intersecting);
    if (intersecting) {
      setHasOnce(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver();
    if (!observer) return;

    callbacks.set(el, callback);
    observer.observe(el);

    return () => {
      callbacks.delete(el);
      observer.unobserve(el);
    };
  }, [callback]);

  return { ref, isIntersecting, hasOnce };
}
