import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "bg-surface-base ring-offset-surface-ground flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm text-neutral-50 transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea";
