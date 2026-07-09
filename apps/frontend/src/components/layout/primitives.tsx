import * as React from "react";
import { cn } from "@/lib/utils";

// MaxWidth Container
export interface MaxWidthProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const MaxWidth = React.forwardRef<HTMLDivElement, MaxWidthProps>(
  ({ className, size = "xl", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-container-sm",
      md: "max-w-container-md",
      lg: "max-w-container-lg",
      xl: "max-w-container-xl",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-6 md:px-8", sizeClasses[size], className)}
        {...props}
      />
    );
  },
);
MaxWidth.displayName = "MaxWidth";

// Section Container
export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "header" | "footer";
}

export const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  ({ className, as: Component = "section", ...props }, ref) => {
    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn("overflow-hidden py-24 md:py-32 lg:py-40", className)}
        {...props}
      />
    );
  },
);
SectionContainer.displayName = "SectionContainer";

// Section Division
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "dark" | "darker" | "glass" | "transparent";
  id: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background = "dark", id, children, style, ...props }, ref) => {
    const bgClasses = {
      dark: "bg-neutral-900 text-neutral-50",
      darker: "bg-neutral-950 text-neutral-50",
      glass: "bg-surface-base/60 text-neutral-50 md:backdrop-blur-md border-y border-border-subtle",
      transparent: "bg-transparent text-neutral-50",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative overflow-hidden py-24 md:py-32 lg:py-40",
          bgClasses[background],
          className,
        )}
        data-section-id={id}
        data-scroll-anchor={id}
        style={{
          contentVisibility: id === "hero" ? undefined : "auto",
          contain: id === "hero" ? undefined : "layout style paint",
          ...style,
        }}
        {...props}
      >
        {children}
      </section>
    );
  },
);
Section.displayName = "Section";

// Content Wrapper
export interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "sm" | "md" | "lg";
}

export const ContentWrapper = React.forwardRef<HTMLDivElement, ContentWrapperProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    const spacingClasses = {
      none: "mt-0",
      sm: "mt-8 md:mt-12",
      md: "mt-12 md:mt-16",
      lg: "mt-16 md:mt-24",
    };

    return (
      <div ref={ref} className={cn("w-full", spacingClasses[spacing], className)} {...props} />
    );
  },
);
ContentWrapper.displayName = "ContentWrapper";

// Noise Layer
export const NoiseLayer = React.memo(() => {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
      aria-hidden="true"
    />
  );
});
NoiseLayer.displayName = "NoiseLayer";

// Gradient Layer (Radial ambient highlights)
export interface GradientLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "center" | "bottom" | "top-right" | "bottom-left";
  color?: "amber" | "teal" | "mixed";
}

export const GradientLayer: React.FC<GradientLayerProps> = ({
  className,
  position = "center",
  color = "amber",
  ...props
}) => {
  const positionClasses = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    "top-right": "top-0 right-0 -translate-y-1/4 translate-x-1/4",
    "bottom-left": "bottom-0 left-0 translate-y-1/4 -translate-x-1/4",
  };

  const colorClasses = {
    amber: "from-amber-500/10 via-amber-600/5 to-transparent",
    teal: "from-teal-500/10 via-teal-600/5 to-transparent",
    mixed: "from-amber-500/5 via-teal-500/5 to-transparent",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute -z-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br opacity-70 blur-[120px]",
        positionClasses[position],
        colorClasses[color],
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
};
GradientLayer.displayName = "GradientLayer";

// Background Layer Coordinator
export interface BackgroundLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  showNoise?: boolean;
  showGradient?: boolean;
  gradientPosition?: GradientLayerProps["position"];
  gradientColor?: GradientLayerProps["color"];
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  showNoise = true,
  showGradient = false,
  gradientPosition = "center",
  gradientColor = "amber",
  className,
  ...props
}) => {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)} {...props}>
      {showNoise && <NoiseLayer />}
      {showGradient && <GradientLayer position={gradientPosition} color={gradientColor} />}
    </div>
  );
};
BackgroundLayer.displayName = "BackgroundLayer";

// Divider
export const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-border-subtle h-[1px] w-full", className)}
        role="separator"
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";

// Spacer
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-6 md:h-8",
      md: "h-12 md:h-16",
      lg: "h-20 md:h-28",
      xl: "h-28 md:h-40",
    };

    return <div ref={ref} className={cn("w-full", sizeClasses[size], className)} {...props} />;
  },
);
Spacer.displayName = "Spacer";

// Flex Stack
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    { className, direction = "column", align = "stretch", justify = "start", gap = 4, ...props },
    ref,
  ) => {
    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };

    const gapClasses = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "column" ? "flex-col" : "flex-row",
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          className,
        )}
        {...props}
      />
    );
  },
);
Stack.displayName = "Stack";

// Grid
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 6 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 0 | 2 | 4 | 6 | 8 | 10 | 12;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, colsMd, colsLg, gap = 6, ...props }, ref) => {
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    };

    const colMdClasses = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
      12: "md:grid-cols-12",
    };

    const colLgClasses = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
      12: "lg:grid-cols-12",
    };

    const gapClasses = {
      0: "gap-0",
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colClasses[cols],
          colsMd && colMdClasses[colsMd],
          colsLg && colLgClasses[colsLg],
          gapClasses[gap],
          className,
        )}
        {...props}
      />
    );
  },
);
Grid.displayName = "Grid";
