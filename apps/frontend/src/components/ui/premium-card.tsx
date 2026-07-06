"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION_TRANSITIONS } from "@/experience/config/tokens";
import { useSharedFrame } from "@/experience/providers/raf";

export interface PremiumCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  tiltIntensity?: number;
  glowColor?: string;
}

export const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  (
    { children, className, tiltIntensity = 15, glowColor = "hsla(37,93%,55%,0.15)", ...props },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    // Mouse tracking values
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const rawMouseX = useMotionValue(0);
    const rawMouseY = useMotionValue(0);

    // Spring physics for smooth tilt and lighting
    const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

    // Calculate rotation based on mouse position relative to center
    const rotateX = useTransform(smoothMouseY, [0, 1], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(smoothMouseX, [0, 1], [-tiltIntensity, tiltIntensity]);

    // Reflection sweep
    const glareX = useTransform(smoothMouseX, [0, 1], [-100, 200]);
    const glareY = useTransform(smoothMouseY, [0, 1], [-100, 200]);
    const glareOpacity = useTransform(smoothMouseY, [0, 0.5, 1], [0.1, 0.4, 0.1]);

    // Derived backgrounds that use hooks unconditionally
    const spotlightBackground = useTransform(
      [rawMouseX, rawMouseY],
      ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`,
    );

    const glareBackgroundPosition = useTransform([glareX, glareY], ([gx, gy]) => `${gx}% ${gy}%`);

    // Idle floating animation
    const time = React.useRef(0);
    const idleY = useMotionValue(0);

    useSharedFrame((_, delta) => {
      if (shouldReduceMotion) return;
      time.current += delta * 0.001;
      // Gentle 4px float if not hovered, otherwise smooth out
      const targetY = isHovered ? 0 : Math.sin(time.current * 1.5) * 4;
      idleY.set(idleY.get() + (targetY - idleY.get()) * 0.1);
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      rawMouseX.set(e.clientX - rect.left);
      rawMouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    // Combine refs
    const setRefs = React.useCallback(
      (node: HTMLDivElement) => {
        innerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <motion.div
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("group relative z-0 outline-none", className)}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          y: idleY,
        }}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.02, transition: MOTION_TRANSITIONS.cardHover }
        }
        whileTap={
          shouldReduceMotion ? {} : { scale: 0.98, transition: MOTION_TRANSITIONS.microInteraction }
        }
        tabIndex={0}
        {...props}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-3xl border border-white/5 bg-neutral-950/40 backdrop-blur-2xl transition-all duration-500 group-hover:border-white/10 group-hover:bg-neutral-900/50 group-focus-visible:ring-2 group-focus-visible:ring-amber-500/50"
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 30px 60px -15px rgba(0,0,0,0.6)",
          }}
        >
          {/* ── Background Noise ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
            style={{ backgroundImage: "url('/noise.webp')", backgroundRepeat: "repeat" }}
          />

          {/* ── Idle Gradient Mesh ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
            style={{
              background: `
                radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
              `,
            }}
          />

          {/* ── Dynamic Mouse Spotlight ── */}
          {!shouldReduceMotion && (
            <motion.div
              className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: spotlightBackground,
              }}
            />
          )}

          {/* ── Glare / Reflection Sweep ── */}
          {!shouldReduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 25%, transparent 30%)",
                backgroundSize: "200% 200%",
                backgroundPosition: glareBackgroundPosition,
                opacity: isHovered ? glareOpacity : 0,
              }}
            />
          )}

          {/* ── 3D Content Wrapper ── */}
          <div
            className="relative z-30 h-full w-full"
            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    );
  },
);
PremiumCard.displayName = "PremiumCard";
