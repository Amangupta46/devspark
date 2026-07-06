import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  label: string;
  className?: string;
  analyticsId: string;
  section: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function CTAButton({
  href,
  label,
  className,
  analyticsId,
  section,
  variant = "primary",
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all duration-normal ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-ground disabled:pointer-events-none disabled:opacity-50 active:scale-95";

  const variants = {
    primary:
      "bg-amber-400 text-neutral-950 hover:bg-amber-300 hover:shadow-[0_0_12px_var(--amber-glow-sm)]",
    secondary:
      "border border-border-interactive bg-transparent text-neutral-200 hover:bg-surface-elevated hover:text-neutral-0",
    ghost: "bg-transparent text-neutral-200 hover:bg-surface-elevated hover:text-neutral-0",
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      data-component="cta-button"
      data-section={section}
      data-analytics={analyticsId}
    >
      {label}
    </Link>
  );
}
