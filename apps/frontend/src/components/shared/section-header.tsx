import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  subheading?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, subheading, title, description, align = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "max-w-2xl space-y-4",
          align === "center" ? "mx-auto text-center" : "",
          className,
        )}
        {...props}
      >
        {subheading && (
          <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
            {subheading}
          </span>
        )}
        <h2 className="text-4xl leading-tight font-extrabold tracking-tighter text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="text-lg leading-relaxed text-neutral-400 md:text-xl">{description}</p>
        )}
      </div>
    );
  },
);
SectionHeader.displayName = "SectionHeader";
