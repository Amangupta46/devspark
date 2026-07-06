import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-normal ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-ground disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-amber-400 text-neutral-950 hover:bg-amber-300 hover:shadow-[0_0_12px_var(--amber-glow-sm)]",
        secondary:
          "border border-border-interactive bg-transparent text-neutral-200 hover:bg-surface-elevated hover:text-neutral-0",
        ghost: "bg-transparent text-neutral-200 hover:bg-surface-elevated hover:text-neutral-0",
        danger:
          "bg-error-500 text-neutral-50 hover:bg-error-400 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]",
        link: "bg-transparent text-amber-400 underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";
export { buttonVariants };
