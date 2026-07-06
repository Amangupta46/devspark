"use client";

import { useEffect, useState } from "react";

export type ViewportSize = "mobile" | "tablet" | "laptop" | "desktop" | "ultrawide";

export function useViewport() {
  const [size, setSize] = useState<ViewportSize>("desktop");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      const width = window.innerWidth;
      let newSize: ViewportSize = "desktop";

      if (width < 768) {
        newSize = "mobile";
      } else if (width < 1024) {
        newSize = "tablet";
      } else if (width < 1440) {
        newSize = "laptop";
      } else if (width < 1920) {
        newSize = "desktop";
      } else {
        newSize = "ultrawide";
      }

      setSize(prev => (prev !== newSize ? newSize : prev));
      setIsMobile(prev => (prev !== (newSize === "mobile") ? newSize === "mobile" : prev));
    };

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    handleResize();
    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return { size, isMobile };
}
