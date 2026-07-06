"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useReducedMotion } from "framer-motion";

export function AnimatedCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      spring.set(value);
    }
  }, [isInView, spring, value, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const unsubscribe = spring.on("change", (v) => {
      // For decimals like 4.9 vs integers
      if (value % 1 !== 0) {
        setDisplayValue(Number(v.toFixed(1)));
      } else {
        setDisplayValue(Math.floor(v));
      }
    });
    return unsubscribe;
  }, [spring, value, shouldReduceMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center space-y-2 p-6">
      <span className="bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent md:text-5xl lg:text-6xl">
        {displayValue}
        {suffix}
      </span>
      <span className="text-sm font-medium tracking-widest text-neutral-400 uppercase">
        {label}
      </span>
    </div>
  );
}
