import * as React from "react";
import { PremiumCard } from "@/components/ui/premium-card";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: "none" | "lift" | "glow";
  blur?: "sm" | "md" | "lg";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = "lift", blur = "md", children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    hoverEffect;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    blur;
    // Map the old hoverEffect prop to PremiumCard's glowColor if desired,
    // or just pass through. The new PremiumCard handles lift and glow inherently.
    return (
      <PremiumCard
        ref={ref}
        className={className}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {/* Preserve the translateZ requirement for children to pop out */}
        <div style={{ transform: "translateZ(15px)" }} className="h-full">
          {children}
        </div>
      </PremiumCard>
    );
  },
);
GlassCard.displayName = "GlassCard";
