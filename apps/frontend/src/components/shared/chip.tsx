import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  onDismiss?: () => void;
  onClick?: () => void;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, active = false, onDismiss, onClick, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "duration-normal inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-semibold transition-all select-none",
          active
            ? "border-amber-400 bg-amber-400 text-neutral-950 hover:bg-amber-300"
            : "bg-surface-elevated border-border-default hover:text-neutral-0 hover:bg-surface-raised text-neutral-300",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className={cn(
              "rounded-full p-0.5 transition-colors focus:outline-none",
              active
                ? "text-neutral-950 hover:bg-amber-500/20"
                : "hover:text-neutral-0 hover:bg-surface-elevated text-neutral-400",
            )}
            aria-label="Remove filter"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  },
);
Chip.displayName = "Chip";
