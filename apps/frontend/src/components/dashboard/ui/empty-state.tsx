"use client";

import React from "react";
import { motion } from "framer-motion";
import { fade } from "@/motion/variants";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ElementType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      variants={fade}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "border-border-default bg-surface-base/50 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center",
        className,
      )}
    >
      <div className="bg-surface-raised mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <Icon className="h-8 w-8 text-neutral-500" />
      </div>

      <h3 className="font-heading text-neutral-0 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-400">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="ring-offset-surface-ground mt-8 inline-flex h-10 items-center justify-center rounded-md bg-indigo-500 px-6 text-sm font-medium text-white shadow-md shadow-indigo-500/20 ring-offset-2 transition-colors hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none active:scale-95"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
