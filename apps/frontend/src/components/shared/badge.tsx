import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "amber";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-surface-elevated text-neutral-300 border-border-default",
      amber: "bg-amber-400/10 text-amber-400 border-amber-400/25",
      success: "bg-success-400/10 text-success-400 border-success-400/25",
      warning: "bg-warning-400/10 text-warning-400 border-warning-400/25",
      error: "bg-error-400/10 text-error-400 border-error-400/25",
      info: "bg-info-400/10 text-info-400 border-info-400/25",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";
