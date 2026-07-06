import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "bg-surface-base ring-offset-surface-ground flex h-10 w-full rounded-md border px-3 py-2 text-sm text-neutral-50 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-error-500 focus-visible:ring-error-500"
            : "border-border-default focus-visible:ring-amber-400",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
