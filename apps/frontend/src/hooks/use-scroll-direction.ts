import { useState, useCallback, useMemo } from "react";
import { useLenis } from "@/experience/providers/smooth-scroll";

export type ScrollDirection = "up" | "down" | "none";

export function useScrollDirection(thresholdY = 10, offsetThresholdY = 50) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("none");
  const [scrollPhase, setScrollPhase] = useState<0 | 1 | 2>(0);

  const lastScrollYRef = useCallback(() => {
    let lastScrollY = 0;
    return (currentScrollY: number) => {
      const diff = Math.abs(currentScrollY - lastScrollY);

      // Determine phase instead of storing raw scrollY
      let phase: 0 | 1 | 2 = 0;
      if (currentScrollY > 200) phase = 2;
      else if (currentScrollY > 50) phase = 1;

      setScrollPhase(phase);

      if (currentScrollY <= offsetThresholdY) {
        setScrollDirection("none");
      } else if (diff >= thresholdY) {
        const direction: ScrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        setScrollDirection(direction);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
  }, [thresholdY, offsetThresholdY]);

  const handleScroll = useMemo(() => lastScrollYRef(), [lastScrollYRef]);

  // Subscribe to Lenis scroll events for perfectly synced direction detection
  useLenis((lenis) => {
    handleScroll(lenis.scroll);
  });

  return { scrollDirection, scrollPhase };
}
