"use client";

import { useEffect, useRef } from "react";
import { useSharedIntersection } from "../providers/intersection";
import { usePerformance } from "../hooks/use-performance";

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

  useEffect(() => {
    if (reducedMotion || !isIntersecting || !ref.current) return;

    let rAF: number;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      if (!ref.current) return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY === lastScrollY) {
        rAF = requestAnimationFrame(updateParallax);
        return;
      }
      lastScrollY = currentScrollY;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from 0 (entered bottom) to 1 (left top)
      // This is a rough estimation relative to the viewport
      const totalMovement = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      
      let progress = currentPos / totalMovement;
      progress = Math.max(0, Math.min(1, progress));

      // Map progress [0, 1] to [-100*speed, 100*speed]
      const yValue = (progress * 200 - 100) * speed;
      
      ref.current.style.transform = `translateY(${yValue}px)`;
      
      rAF = requestAnimationFrame(updateParallax);
    };

    rAF = requestAnimationFrame(updateParallax);

    return () => cancelAnimationFrame(rAF);
  }, [isIntersecting, reducedMotion, speed, ref]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
