"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, error, hint, icon, rightElement, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
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
          {icon && (
            <div className={cn(
              "absolute left-3 text-neutral-500 transition-colors duration-200",
              isFocused ? "text-indigo-400" : "",
              hasError ? "text-error-400" : ""
            )}>
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              "flex h-10 w-full rounded-md border bg-surface-base px-3 py-2 text-sm text-neutral-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 outline-none transition-all duration-200",
              icon ? "pl-10" : "",
              rightElement ? "pr-10" : "",
              hasError 
                ? "border-error-500/50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10" 
                : "border-border-default hover:border-border-prominent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
              props.disabled && "cursor-not-allowed opacity-50 hover:border-border-default",
              className
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3">
              {rightElement}
            </div>
          )}
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
TextField.displayName = "TextField";
