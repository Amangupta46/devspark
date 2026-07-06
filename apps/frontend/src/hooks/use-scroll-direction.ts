import { useState, useEffect } from "react";

export type ScrollDirection = "up" | "down" | "none";

export function useScrollDirection(thresholdY = 10, offsetThresholdY = 50) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("none");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // Update scroll y position state
      setScrollY(currentScrollY);

      const diff = Math.abs(currentScrollY - lastScrollY);

      if (currentScrollY <= offsetThresholdY) {
        setScrollDirection("none");
      } else if (diff >= thresholdY) {
        const direction: ScrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        setScrollDirection(direction);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [thresholdY, offsetThresholdY]);

  return { scrollDirection, scrollY };
}
