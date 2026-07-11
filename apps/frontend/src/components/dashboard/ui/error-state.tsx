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

export function ErrorState({ title = "Something went wrong", message, onRetry, className }: ErrorStateProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "flex w-full flex-col items-center justify-center rounded-xl border border-error-500/20 bg-error-500/5 p-8 text-center shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-500/10 mb-4">
        <AlertCircle className="h-6 w-6 text-error-400" />
      </div>

      <h3 className="font-heading text-lg font-semibold text-error-400">
        {title}
      </h3>
      <p className="mt-2 text-sm text-neutral-400 max-w-sm">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex h-9 items-center justify-center gap-2 rounded-md bg-surface-raised px-4 text-sm font-medium text-neutral-0 transition-colors hover:bg-surface-floating focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 border border-border-default"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
