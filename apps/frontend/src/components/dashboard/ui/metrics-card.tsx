"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage, e.g. 12.5 for +12.5% or -4.2 for -4.2%
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  sparkline?: number[];
}

export function MetricsCard({ 
  title, 
  value, 
  trend, 
  trendLabel = "vs last month", 
  icon, 
  className,
  sparkline 
}: MetricsCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border-default bg-surface-base p-5 transition-colors hover:border-border-prominent",
        className
      )}
    >
      {/* Subtle Glow Effect on Hover */}
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
           style={{ background: `radial-gradient(400px circle at 50% 100%, var(--primary-glow-lg), transparent)` }} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-neutral-0">{value}</h3>
        </div>
        
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        {trend !== undefined ? (
          <div className="flex items-center space-x-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                isPositive && "bg-success-500/10 text-success-400",
                isNegative && "bg-error-500/10 text-error-400",
                !isPositive && !isNegative && "bg-surface-raised text-neutral-400"
              )}
            >
              {isPositive && <ArrowUpRight className="mr-1 h-3 w-3" />}
              {isNegative && <ArrowDownRight className="mr-1 h-3 w-3" />}
              {!isPositive && !isNegative && <TrendingUp className="mr-1 h-3 w-3" />}
              {Math.abs(trend)}%
            </span>
            <span className="text-xs text-neutral-500">{trendLabel}</span>
          </div>
        ) : (
          <div className="h-5" /> // Spacer
        )}

        {/* Minimal Sparkline representation if provided */}
        {sparkline && sparkline.length > 0 && (
          <div className="flex items-end h-8 gap-[2px]">
            {sparkline.map((val, idx) => {
              const max = Math.max(...sparkline);
              const height = `${(val / max) * 100}%`;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "w-1.5 rounded-t-sm bg-neutral-700 transition-colors duration-300 group-hover:bg-indigo-500",
                    idx === sparkline.length - 1 && "bg-indigo-500"
                  )}
                  style={{ height }}
                />
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
