"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { label: string; value: string | number }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="flex flex-col w-full gap-1.5">
        {label && (
          <label className="text-sm font-medium text-neutral-300">
            {label}
            {props.required && <span className="text-error-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative flex items-center">
          <select
            ref={ref}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border bg-surface-base px-3 py-2 pr-10 text-sm text-neutral-0 outline-none transition-all duration-200 cursor-pointer",
              hasError 
                ? "border-error-500/50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10" 
                : "border-border-default hover:border-border-prominent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
              props.disabled && "cursor-not-allowed opacity-50 hover:border-border-default",
              className
            )}
            {...props}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          
          <div className="pointer-events-none absolute right-3 text-neutral-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              className="flex items-center gap-1.5 text-xs text-error-400 mt-0.5 overflow-hidden"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {hint && !hasError && (
          <p className="text-xs text-neutral-500 mt-0.5">{hint}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
