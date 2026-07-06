"use client";

import { useSharedIntersection } from "../providers/intersection";
import { usePerformance } from "../hooks/use-performance";
import { MOTION_TOKENS } from "../config/tokens";

export function SectionFade({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isIntersecting } = useSharedIntersection<HTMLDivElement>();
  const { reducedMotion } = usePerformance();

  if (reducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isIntersecting ? 1 : 0.3,
        transition: `opacity ${MOTION_TOKENS.duration.slow}s cubic-bezier(${MOTION_TOKENS.ease.outExpo.join(",")})`,
        willChange: "opacity",
      }}
    >
      {children}
    </section>
  );
}
