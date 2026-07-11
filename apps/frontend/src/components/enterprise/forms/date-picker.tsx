"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="flex flex-col w-full gap-1.5">
        {label && (
          <label className="text-sm font-medium text-neutral-300">
            {label}
            {props.required && <span className="text-error-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative flex items-center group">
          <div className="absolute left-3 text-neutral-500 pointer-events-none">
            <CalendarIcon className="w-4 h-4" />
          </div>
          
          <input
            type="date"
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-md border bg-surface-base pl-10 pr-3 py-2 text-sm text-neutral-0 outline-none transition-all duration-200",
              "appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer",
              hasError 
                ? "border-error-500/50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10" 
                : "border-border-default hover:border-border-prominent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
              props.disabled && "cursor-not-allowed opacity-50 hover:border-border-default",
              className
            )}
            {...props}
          />
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
DatePicker.displayName = "DatePicker";
