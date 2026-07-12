"use client";

import React from "react";
import { motion } from "framer-motion";
import { scaleIn } from "@/motion/variants";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "border-error-500/20 bg-error-500/5 flex w-full flex-col items-center justify-center rounded-xl border p-8 text-center shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]",
        className,
      )}
    >
      <div className="bg-error-500/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <AlertCircle className="text-error-400 h-6 w-6" />
      </div>

      <h3 className="font-heading text-error-400 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-400">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-surface-raised text-neutral-0 hover:bg-surface-floating focus-visible:ring-error-500 border-border-default mt-6 flex h-9 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
