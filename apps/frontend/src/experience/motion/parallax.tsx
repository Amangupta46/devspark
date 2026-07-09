"use client";

import { useEffect, useRef } from "react";
import { useSharedIntersection } from "../providers/intersection";
import { usePerformance } from "../hooks/use-performance";
import { useLenis } from "../providers/smooth-scroll";

export function Parallax({
  children,
  speed = 1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { ref, isIntersecting } = useSharedIntersection<HTMLDivElement>();
  const { reducedMotion } = usePerformance();
  // Cache element offset to avoid getBoundingClientRect in scroll handler
  const cachedOffset = useRef({ top: 0, height: 0 });

  // Calculate and cache element position on mount and resize
  useEffect(() => {
    if (!ref.current) return;

    const recalculate = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      cachedOffset.current = {
        top: rect.top + window.scrollY,
        height: rect.height,
      };
    };

    recalculate();

    // Recalculate on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(recalculate, 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  // Lenis-synced parallax — uses interpolated scroll for buttery smooth movement
  useLenis((lenis) => {
    if (reducedMotion || !isIntersecting || !ref.current) return;

    const scrollY = lenis.scroll;
    const windowHeight = window.innerHeight;
    const { top, height } = cachedOffset.current;

    // Calculate progress from 0 (entered bottom) to 1 (left top)
    const totalMovement = windowHeight + height;
    const currentPos = scrollY + windowHeight - top;

    let progress = currentPos / totalMovement;
    progress = Math.max(0, Math.min(1, progress));

    // Map progress [0, 1] to [-100*speed, 100*speed]
    const yValue = (progress * 200 - 100) * speed;

    ref.current.style.transform = `translateY(${yValue}px)`;
  });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
